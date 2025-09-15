# zkEscrow Demo 🛡️

**Try it live:** [https://zkescrow.vercel.app](https://zkescrow.vercel.app)

---

## What does this app do?

This single‑page demo lets **any two wallets** try an escrow trade without touching the CLI:

1. **Wrap Credits** – The caller pays `amount` public credits; the contract mints a private `WALEO` record for them.
2. **Deposit** – The UI automatically picks that record and locks it to an `escrowId` + recipient.
3. **Release** – The sender releases the escrow, creating a new WALEO record for the recipient.
4. **Unwrap Credits** – The recipient’s wallet auto‑finds that record and converts it back to public credits.

No manual copy‑pasting of ciphertext, no need to pre‑fund the contract – just four clicks.

---

## Table of Contents

1. [Demo Flow](#demo-flow)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Directory Guide](#directory-guide)
5. [Troubleshooting](#troubleshooting)
6. [License](#license)

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
* **Leo** – `zkescrow_v2.aleo` contract (see `contracts/`)

---

## Quick Start

```bash
# 1 – clone
$ git clone https://github.com/mikenike360/ZKescrow
$ cd ZKescrow

# 2 – install deps
$ yarn install   # or npm / yarn

# 3 – run
$ yarn dev
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
│   └── zkescrow_v2.aleo
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

## License

MIT © 2025 VenomLabs

---
