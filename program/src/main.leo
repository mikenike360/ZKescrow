import credits.aleo;

program zkescrow.aleo {

    // Token record for escrow transfers (owner is required)
    record Token {
        owner: address,
        amount: u64,
    }

    // Escrow state structure (renamed 'owner' to 'sender')
    struct Escrow {
        sender: address,
        recipient: address,
        amount: u64,
    }

    // Escrow storage
    mapping escrows: u64 => Escrow;

    const MINT_AUTHORITY: address = aleo1xh0ncflwkfzga983lwujsha729c8nwu7phfn8aw7h3gahhj0ms8qytrxec;

    transition mint_token(public recipient: address, public amount: u64) -> Token {
        assert_eq(self.caller, MINT_AUTHORITY);

        return Token {
            owner: recipient,
            amount,
        };
    }


    transition wrap(public amount: u64, payment: credits.aleo/credits) -> Token {
        assert_eq(payment.owner, self.caller);
        assert_eq(payment.microcredits, amount);

        return Token {
            owner: self.caller,
            amount,
        };
    }


    // STEP 1: Fund the escrow
    async transition fund(public id: u64, private recipient: address, private token: Token, public memo: field) -> (u8, Future) {
        assert_eq(token.owner, self.caller);

        return (0u8, finalize_fund(id, recipient, token.amount, self.caller));
    }

    async function finalize_fund(id: u64, recipient: address, amount: u64, sender: address) {
        assert(!escrows.contains(id));

        let entry: Escrow = Escrow {
            sender,
            recipient,
            amount,
        };

        escrows.set(id, entry);
    }

    // STEP 2: RELEASE    async transition release(public id: u64) -> (Token, Future) {
        let dummy: Token = Token {
            owner: self.call       return (dummy, finalize_release(id, self.caller));
    }

    async function finalize_release(id: u64, caller: address) {
        let entry: Escrow = escrows.get(id);
        assert_eq(caller, entry.sender);

        escrows.remove(id);
    }

    // STEP 3: CLAIM
    async transition claim(public id: u64) -> (Token, Future) {
        let dummy: Token = Token {
            owner: self.caller,
            amount: 0u64,
        };

        return (dummy, finalize_claim(id, self.caller));
    }

    async function finalize_claim(id: u64, caller: address) {
        let entry: Escrow = escrows.get(id);
        assert_eq(caller, entry.recipient);

        escrows.remove(id);
    }

    transition unwrap(private token: Token, public memo: field) -> u64 {
        assert_eq(token.owner, self.caller);
        assert(token.amount > 0u64);

        return token.amount;
    }

}
