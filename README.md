# ZK Escrow v2 🛡️

A trustless escrow service built on the Aleo blockchain using zero-knowledge proofs.

**Try it live:** [https://zkescrow.vercel.app](https://zkescrow.vercel.app)

---

## What is ZK Escrow v2?

ZK Escrow v2 is a **decentralized escrow protocol** that enables secure peer-to-peer transactions on Aleo. Built with the `zk_escrow_v2.aleo` smart contract, it holds public credits in escrow until both parties fulfill their obligations—no centralized intermediary required.

### Why ZK Escrow v2?

- 🔒 **Trustless** – Smart contract enforces agreements automatically
- 🔐 **Secure** – Leverages Aleo's zero-knowledge cryptography
- 💰 **Simple** – Works directly with public credits (no token wrapping)
- 🧩 **Composable** – Other protocols can integrate it (like ZKontract)
- ✅ **Transparent** – All code is open-source and auditable

---

## How It Works

| Step | Function | Who Can Execute | Description |
|------|----------|----------------|-------------|
| 1 | `create_escrow` | Anyone | Deposits public credits with a unique ID and recipient address. Funds are locked in the contract. |
| 2 | `release` | Sender only | Releases escrowed funds to the recipient (or any address). Removes escrow. |
| 3 | `claim` | Recipient only | Recipient claims their escrowed funds. Removes escrow. |
| 4 | `cancel` | Sender or Recipient | Cancels the escrow and returns funds to specified address. Removes escrow. |

### Example Transaction Flow

```
Alice wants to pay Bob 1 ALEO for services:

1. Alice creates escrow:
   create_escrow(id: 1, recipient: Bob, amount: 1000000)
   → 1M microcredits locked in contract

2. Two completion paths:
   
   a) Alice releases when satisfied:
      release(id: 1, amount: 1000000, recipient: Bob)
      → Bob receives 1 ALEO
   
   b) Bob claims directly:
      claim(id: 1, amount: 1000000, recipient: Bob)
      → Bob receives 1 ALEO

3. Or cancel if needed:
   cancel(id: 1, amount: 1000000, recipient: Alice)
   → Alice gets refund
```

---

## Features

### 🎨 Modern Web Interface

- **Tabbed Dashboard** – Clean, organized interface with 4 function tabs
- **Smart Input Validation** – Real-time validation with helpful error messages
- **Example Values** – Pre-filled examples to guide users
- **Transaction Log** – Terminal-style log showing transaction status
- **Responsive Design** – Beautiful on desktop and mobile
- **Theme Selector** – 15+ DaisyUI themes to choose from

### 📄 Documentation Pages

- **Whitepaper** – Technical architecture and security model
- **Examples** – Real-world integration with ZKontract
- **Privacy Policy** – Data handling and blockchain transparency
- **Terms & Conditions** – User agreements and disclaimers

### 🔗 Integration Ready

Used in production by **ZKontract** (zkontract_v2.aleo) for managing bounty payments. See the Examples page for code samples.

---

## Tech Stack

**Frontend:**
- Next.js 13 – React framework
- TypeScript – Type-safe development
- Tailwind CSS – Utility-first styling
- DaisyUI v5 – Component library
- Aleo Wallet Adapter – Wallet integration
- next-seo – SEO optimization

**Smart Contract:**
- Leo Language – Aleo's programming language
- zk_escrow_v2.aleo – Deployed on Mainnet

**Deployment:**
- Vercel – Frontend hosting
- Aleo Mainnet – Smart contract deployment

---

## Quick Start

### Prerequisites

- Node.js 18+ and Yarn
- An Aleo wallet (Leo Wallet recommended)
- Aleo credits on Mainnet for transactions

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/VenomLabsXyz/ZKescrow
cd ZKescrow/zkescrow

# 2. Install dependencies
yarn install

# 3. Run development server
yarn dev
```

### Usage

1. Open `http://localhost:3000` in your browser
2. Connect your Aleo wallet (Leo Wallet)
3. Navigate to **Dashboard**
4. Choose a function tab (Create, Release, Claim, or Cancel)
5. Fill in the required fields
6. Click the action button and approve in your wallet
7. Monitor transaction status in the log

---

## Project Structure

```
zkescrow/
├── program/                    # Leo smart contract
│   ├── src/
│   │   └── main.leo           # zk_escrow_v2.aleo source
│   ├── build/                 # Compiled contract
│   └── program.json           # Contract metadata
│
├── src/                       # Next.js application
│   ├── pages/                 # Route pages
│   │   ├── index.tsx         # Landing page
│   │   ├── dashboard.tsx     # Main escrow interface
│   │   ├── board.tsx         # Escrow browser (coming soon)
│   │   ├── examples.tsx      # Integration guide
│   │   ├── whitepaper.tsx    # Technical docs
│   │   ├── privacy-policy.tsx
│   │   └── terms.tsx
│   │
│   ├── components/
│   │   └── ui/               # Reusable components
│   │       ├── button/       # Button components
│   │       ├── Footer.tsx    # Footer with links
│   │       └── ...
│   │
│   ├── layouts/
│   │   └── _layout.tsx       # Main layout with header
│   │
│   ├── config/
│   │   └── network.ts        # Network config
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   │
│   └── assets/
│       └── css/
│           └── globals.css   # Global styles
│
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## Smart Contract (zk_escrow_v2.aleo)

### Program Structure

```leo
program zk_escrow_v2.aleo {
    // Escrow data structure
    struct Escrow {
        sender: address,
        recipient: address,
        amount: u64
    }

    // On-chain storage
    mapping escrows: u64 => Escrow;

    // Functions: create_escrow, release, claim, cancel
}
```

### Key Features

- **Public Transitions** – All operations use public credits for transparency
- **Unique IDs** – Each escrow has a user-defined u64 ID
- **Flexible Release** – Sender can release to any address, not just original recipient
- **Dual Completion** – Either sender releases OR recipient claims
- **Mutual Cancel** – Both parties can cancel and refund

---

## Integration with ZKontract

ZK Escrow v2 serves as the payment layer for ZKontract, a decentralized bounty platform. The integration demonstrates the protocol's composability:

```leo
import zk_escrow_v2.aleo;

program zkontract_v2.aleo {
    // Post bounty → create escrow
    async transition post_bounty(...) -> Future {
        let escrow_future = zk_escrow_v2.aleo/create_escrow(
            bounty_id, creator_address, payment_amount
        );
        return finalize_post_bounty(escrow_future, ...);
    }

    // Accept proposal → release escrow to proposer
    async transition accept_proposal(...) -> Future {
        let release_future = zk_escrow_v2.aleo/release(
            bounty_id, payment_amount, proposer_address
        );
        return finalize_accept_proposal(release_future, ...);
    }

    // Cancel bounty → cancel escrow and refund
    async transition cancel_bounty_escrow(...) -> Future {
        let cancel_future = zk_escrow_v2.aleo/cancel(
            bounty_id, payment_amount, caller
        );
        return finalize_cancel_bounty_escrow(cancel_future, ...);
    }
}
```

Visit the **Examples** page in the app for complete code and explanations.

---

## Network Configuration

The app is configured for **Aleo Mainnet**:

- **Network:** `WalletAdapterNetwork.MainnetBeta`
- **Program ID:** `zk_escrow_v2.aleo`
- **RPC URL:** `https://mainnet.aleorpc.com`

Configuration is set in `src/types/index.ts` and `src/config/network.ts`.

---

## Troubleshooting

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Wallet popup doesn't appear | Network mismatch or program not deployed | Verify you're on Mainnet and program is deployed |
| Transaction fails immediately | Insufficient funds | Ensure wallet has enough credits for amount + fees (~0.1 ALEO fee) |
| "Wallet not connected" | Connection lost | Disconnect and reconnect wallet |
| Can't create escrow | Escrow ID already exists | Choose a different unique ID (e.g., use timestamp) |
| Release/claim fails | Amount mismatch | Amount must exactly match the escrowed amount |
| Unknown error | Wallet adapter issue | Try refreshing the page or clearing browser cache |

### Debug Tips

1. **Check the transaction log** at the bottom of the Dashboard for detailed error messages
2. **Verify inputs** using the example values provided in yellow boxes
3. **Confirm wallet connection** – green dot should be pulsing
4. **Check network** – Must be on Mainnet
5. **Test with small amounts** – Try 1000000 microcredits (0.001 ALEO) first

### Getting Help

- Check the **Examples** page for integration patterns
- Read the **Whitepaper** for technical details
- Open an issue on GitHub
- Contact VenomLabs

---

## Development

### Build Commands

```bash
# Development server with hot reload
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Type checking
yarn type-check

# Linting
yarn lint
```

### Smart Contract Development

```bash
cd program

# Build the Leo contract
leo build

# Run tests (if any)
leo test

# Deploy to network (requires credentials)
leo deploy
```

---

## Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main branch

### Smart Contract Deployment

The `zk_escrow_v2.aleo` program is already deployed on Aleo Mainnet. To deploy updates:

```bash
cd program
leo deploy --network mainnet
```

**Note:** The contract uses `@noupgrade` so updates require a new program name.

---

## Security Considerations

- ✅ Open-source and auditable code
- ✅ No centralized servers or databases
- ✅ All transactions require wallet signature approval
- ✅ Escrow amounts are verified on-chain
- ⚠️ Always verify transaction details before signing
- ⚠️ Smart contracts are immutable—test thoroughly before deploying
- ⚠️ Keep your private keys secure and never share them

---

## Roadmap

- [x] Core escrow smart contract (zk_escrow_v2.aleo)
- [x] Web interface with wallet integration
- [x] Tabbed dashboard for all 4 functions
- [x] Documentation pages (whitepaper, privacy, terms)
- [x] Integration examples with ZKontract
- [ ] Escrow Board with blockchain indexer
- [ ] Search and filter functionality
- [ ] Analytics dashboard
- [ ] Multi-signature escrow support
- [ ] Milestone-based escrow releases

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Report bugs** – Open an issue with reproduction steps
2. **Suggest features** – Share ideas for improvements
3. **Submit PRs** – Fix bugs or add features
4. **Improve docs** – Help make documentation clearer
5. **Test** – Try the app and report issues

---

## Links & Resources

- **Live App:** [zkescrow.vercel.app](https://zkescrow.vercel.app)
- **GitHub:** [github.com/VenomLabsXyz/ZKescrow](https://github.com/VenomLabsXyz/ZKescrow)
- **VenomLabs:** [venomlabs.xyz](https://venomlabs.xyz)
- **Aleo:** [aleo.org](https://aleo.org)
- **Leo Docs:** [developer.aleo.org](https://developer.aleo.org)

---

## License

MIT © 2025 VenomLabs

---

## Acknowledgments

Built with ❤️ by VenomLabs

Special thanks to:
- The Aleo team for the amazing blockchain platform
- The Leo language developers
- The Aleo Wallet Adapter team
- The open-source community

---

**Ready to try it?** Connect your wallet and create your first escrow! 🚀

