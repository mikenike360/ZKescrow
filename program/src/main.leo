import credits.aleo;

program zkescrow_combinedv2.aleo {
    const HOLDER: address =
        aleo1xh0ncflwkfzga983lwujsha729c8nwu7phfn8aw7h3gahhj0ms8qytrxec;

    record WALEO {
        owner: address,
        amount: u64,
    }

    struct Escrow {
        sender: address,
        recipient: address,
        amount: u64,
    }

    mapping escrows: u64 => Escrow;

    async transition wrap_public_credits(
        public to: address,
        public amount: u64
    ) -> (WALEO, Future) {
        assert(amount > 0u64);
        let token: WALEO = WALEO { owner: to, amount };

        //let future: Future = credits.aleo/transfer_public(HOLDER, amount);

        let future: Future = credits.aleo/transfer_public_as_signer(HOLDER, amount);

        return (token, finalize_wrap_public_credits(future));
    }

    async function finalize_wrap_public_credits(
        public future: Future
    ) {
        future.await();
    }

    async transition unwrap_public_credits(
        private token: WALEO,
        public recipient: address
    ) -> (u64, Future) {
        assert_eq(token.owner, self.caller);
        let amt: u64 = token.amount;
        let future: Future = credits.aleo/transfer_public(recipient, amt);
        return (amt, finalize_unwrap_public_credits(future));
    }

    async function finalize_unwrap_public_credits(
        public future: Future
    ) {
        future.await();
    }

    async transition deposit(
        public id: u64,
        private recipient: address,
        private token: WALEO
    ) -> (u8, Future) {
        assert_eq(token.owner, self.caller);
        assert(token.amount > 0u64);
        return (0u8, finalize_deposit(id, recipient, token.amount, self.caller));
    }

    async function finalize_deposit(
        public id: u64,
        public recipient: address,
        public amount: u64,
        public sender: address
    ) {
        assert(!escrows.contains(id));
        escrows.set(id, Escrow { sender, recipient, amount });
    }

    async transition release(
        public id: u64,
        public amount: u64,
        public recipient: address
    ) -> (WALEO, Future) {
        let out: WALEO = WALEO { owner: recipient, amount };
        return (out, finalize_release(id, amount, recipient, self.caller));
    }

    async function finalize_release(
        public id: u64,
        public amount: u64,
        public recipient: address,
        public caller: address
    ) {
        let e: Escrow = escrows.get(id);
        assert_eq(caller, e.sender);
        assert_eq(recipient, e.recipient);
        assert_eq(amount, e.amount);
        escrows.remove(id);
    }

    async transition claim(
        public id: u64,
        public amount: u64
    ) -> (WALEO, Future) {
        let out: WALEO = WALEO { owner: self.caller, amount };
        return (out, finalize_claim(id, amount, self.caller));
    }

    async function finalize_claim(
        public id: u64,
        public amount: u64,
        public caller: address
    ) {
        let e: Escrow = escrows.get(id);
        assert_eq(caller, e.recipient);
        assert_eq(amount, e.amount);
        escrows.remove(id);
    }

    async transition cancel(
        public id: u64,
        public amount: u64
    ) -> (WALEO, Future) {
        let out: WALEO = WALEO { owner: self.caller, amount };
        return (out, finalize_cancel(id, amount, self.caller));
    }

    async function finalize_cancel(
        public id: u64,
        public amount: u64,
        public caller: address
    ) {
        let e: Escrow = escrows.get(id);
        assert_eq(caller, e.sender);
        assert_eq(amount, e.amount);
        escrows.remove(id);
    }
}
