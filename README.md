# zkEscrow Demo 🛡️

A minimal React + Tailwind front‑end that drives the \`\` smart contract on Aleo Testnet Beta.

```
wrap → deposit → release → unwrap
```

> **Goal:** show judges (or teammates) a complete escrow flow in four clicks, with zero manual copy‑pasting of private records.

---

## Table of Contents

1. [Demo Flow](#demo-flow)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Directory Guide](#directory-guide)
5. [Troubleshooting](#troubleshooting)
6. [Roadmap / Ideas](#roadmap--ideas)
7. [License](#license)

---

## Demo Flow

| Step | UI Card            | Contract Transition                       | What Happens                                                                           |
| ---- | ------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------- |
|  1   | **Wrap Credits**   | `wrap_public_credits(to, amount)`         | Debits caller’s public balance, mints a private `WALEO` record.                        |
|  2   | **Deposit**        | `deposit(id, recipient, token)`           | Places the WALEO record under an escrow ID. Record auto‑selected from wallet.          |
|  3   | **Release**        | `release(id, amount, recipient)`          | Sender moves the escrowed amount to the recipient as a new WALEO record.               |
|  4   | **Unwrap Credits** | `unwrap_public_credits(token, recipient)` | Contract pays public credits to the recipient. WALEO record auto‑selected from wallet. |

---

## Tech Stack

* **Next.js / React 18** – SPA front‑end
* **Tailwind CSS** – utility‑first styling
* **Aleo Wallet Adapter** – connect, sign, fetch private records
* **TypeScript** – end‑to‑end strict types
* **Leo** – `zkescrow_combinedv2.aleo` contract (see `contracts/`)

---

## Quick Start

```bash
# 1 – clone
$ git clone https://github.com/<your‑org>/zkescrow-demo.git
$ cd zkescrow-demo

# 2 – install deps
$ pnpm install   # or npm / yarn

# 3 – env (optional)
# If you forked the contract with a new ID, set it here
$ echo "NEXT_PUBLIC_PROGRAM_ID=zkescrow_combinedv2.aleo" > .env.local

# 4 – run
$ pnpm dev
```

Then open `http://localhost:3000`, connect Leo Wallet Testnet Beta, and click through the four cards.

---

## Directory Guide

```
.
├── src/
│   ├── pages/
│   │   ├── index.tsx      # landing page
│   │   └── dashboard.tsx  # demo UI
│   └── utils/
│       └── ...            # helper hooks
├── contracts/
│   └── zkescrow_combinedv2.aleo
└── README.md
```

---

## Troubleshooting

| Symptom                                 | Likely Cause                              | Fix                                                               |
| --------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| Wallet pop‑up doesn’t appear            | Wrong `PROGRAM_ID` or wrong network       | Check `.env.local` matches deployed contract on **Testnet Beta**. |
| `INVALID_PARAMS: not a valid record`    | Wallet didn’t sync your WALEO records yet | Click *Refresh* in Leo Wallet then retry.                         |
| Deposit says “no unspent WALEO records” | You wrapped with another address          | Make sure the same wallet that wrapped is depositing.             |

---

## Roadmap / Ideas

* Add **Claim** / **Cancel** flows to UI (buyer‐protection paths).
* Persist logs to IndexedDB so refresh doesn’t clear history.
* CI pipeline: ESLint + Prettier + Leo unit tests.

---

## License

MIT © 2025 Your Name / Org
