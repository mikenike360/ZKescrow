import credits.aleo;

program zk_escrow_v2.aleo {

    
    const contract_owner: address = aleo1xh0ncflwkfzga983lwujsha729c8nwu7phfn8aw7h3gahhj0ms8qytrxec;

    // Escrow structure for managing deposits
    struct Escrow {
        sender: address,
        recipient: address,
        amount: u64,
    }

    // Mapping to store escrows
    mapping escrows: u64 => Escrow;

    @noupgrade
    async constructor() {
        // The Leo compiler automatically generates the constructor logic.
    }


    // Create a new escrow
    async transition create_escrow(
        public id: u64,
        public recipient: address,
        public amount: u64
    ) -> Future {
        assert(amount > 0u64);

        // Transfer credits from user to this escrow contract
        let transfer_future: Future = credits.aleo/transfer_public_as_signer(self.address, amount);

        return finalize_create_escrow(transfer_future, id, recipient, amount, self.caller);
    }

    // Finalize the creation of escrow
    async function finalize_create_escrow(
        transfer_future: Future,
        id: u64,
        recipient: address,
        amount: u64,
        sender: address
    ) {
        transfer_future.await();
        
        assert(!escrows.contains(id));
        escrows.set(id, Escrow { sender, recipient, amount });
    }

    // Release credits from escrow (called by sender)
    async transition release(
        public id: u64,
        public amount: u64,
        public recipient: address
    ) -> Future {
        // Transfer credits from escrow contract to recipient
        let transfer_future: Future = credits.aleo/transfer_public(recipient, amount);

        return finalize_release(transfer_future, id, amount, recipient, self.caller);
    }

    // Finalize the release of credits from escrow
    async function finalize_release(
        transfer_future: Future,
        id: u64,
        amount: u64,
        recipient: address,
        caller: address
    ) {
        transfer_future.await();
        
        let escrow_data: Escrow = escrows.get(id);
        assert_eq(caller, escrow_data.sender); // Only sender can release
        assert_eq(amount, escrow_data.amount); // Amount must match
        // Note: recipient can be different from escrow_data.recipient (sender can release to anyone)
        escrows.remove(id);
    }

    // Claim credits from escrow (called by recipient)
    async transition claim(
        public id: u64,
        public amount: u64,
        public recipient: address
    ) -> Future {
        // Transfer credits from escrow contract to recipient
        let transfer_future: Future = credits.aleo/transfer_public(recipient, amount);

        return finalize_claim(transfer_future, id, amount, recipient);
    }

    // Finalize the claim of credits from escrow
    async function finalize_claim(
        transfer_future: Future,
        id: u64,
        amount: u64,
        recipient: address
    ) {
        transfer_future.await();
        
        let escrow_data: Escrow = escrows.get(id);
        assert_eq(recipient, escrow_data.recipient); // Only recipient can claim
        assert_eq(amount, escrow_data.amount); // Amount must match
        escrows.remove(id);
    }

    // Cancel escrow and return funds to sender
    async transition cancel(
        public id: u64,
        public amount: u64,
        public recipient: address
    ) -> Future {
        // Transfer credits from escrow contract back to sender
        let transfer_future: Future = credits.aleo/transfer_public(recipient, amount);

        return finalize_cancel(transfer_future, id, amount, recipient);
    }

    // Finalize the cancellation of escrow
    async function finalize_cancel(
        transfer_future: Future,
        id: u64,
        amount: u64,
        recipient: address
    ) {
        transfer_future.await();
        
        // Check if escrow exists before trying to access it
        assert(escrows.contains(id));
        let escrow_data: Escrow = escrows.get(id);
        
        // Allow cancellation by either the sender (main contract) or the recipient (bounty creator)
        // This allows the bounty creator to cancel even though the main contract is the sender
        assert(recipient == escrow_data.sender || recipient == escrow_data.recipient);
        assert_eq(amount, escrow_data.amount);
        escrows.remove(id);
    }

}