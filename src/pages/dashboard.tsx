import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletNotConnectedError,
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { useState } from 'react';

// ──────────────────────────────────────────
const PROGRAM_ID = 'zkescrow_combinedv2.aleo';
const NETWORK = WalletAdapterNetwork.TestnetBeta;

const WRAP_FN = 'wrap_public_credits';
const UNWRAP_FN = 'unwrap_public_credits';
const DEPOSIT_FN = 'deposit';
const RELEASE_FN = 'release';

const FEE = 1_000_000;
// ──────────────────────────────────────────

const DashboardDemo: NextPageWithLayout = () => {
  const {
    publicKey,
    connected,
    requestTransaction,
    transactionStatus,
    requestRecords,
  } = useWallet();

  const [logs, setLogs] = useState<string[]>([]);
  const log = (l: string) => setLogs((p) => [...p, l]);

  const [amount, setAmount] = useState('100u64');
  const [escrowId, setEscrowId] = useState('1u64');
  const [recipient, setRecipient] = useState('');
  const [unwrapRecipient, setUnwrapRecipient] = useState('');
  const [releaseAmount, setReleaseAmount] = useState('');
  const [releaseRecipient, setReleaseRecipient] = useState('');
  const [loading, setLoading] = useState(false);

  // helper
  const submitAndPoll = async (tx: Transaction, fn: string) => {
    const id = await requestTransaction(tx);
    log(`[INFO] ${fn} submitted -> ${id}`);
    for (let i = 0; i < 60; i++) {
      const st = await transactionStatus(id);
      if (st === 'Finalized') {
        log(`[DONE] ${fn} finalized`);
        break;
      }
      if (st === 'Rejected' || st === 'Failed') {
        log(`[ERR] ${fn} ${st}`);
        break;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
  };

  // 1. Wrap
  const wrap = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    try {
      const tx = Transaction.createTransaction(
        publicKey,
        NETWORK,
        PROGRAM_ID,
        WRAP_FN,
        [publicKey, amount],
        FEE,
        false
      );
      await submitAndPoll(tx, WRAP_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // 2. Unwrap (auto-fetch WALEO record)
  const unwrap = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    try {
      const all = await requestRecords(PROGRAM_ID);
      const tokens = all.filter((r: any) => !r.spent && r.data?.amount) as Record[];
      if (!tokens.length) {
        log('[ERR] unwrap: no WALEO records');
        setLoading(false);
        return;
      }
      const token = tokens[0];
      const rcpt = unwrapRecipient || publicKey;
      const tx = Transaction.createTransaction(
        publicKey,
        NETWORK,
        PROGRAM_ID,
        UNWRAP_FN,
        [token, rcpt],
        FEE,
        false
      );
      await submitAndPoll(tx, UNWRAP_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Deposit (auto-fetch WALEO record)
  const deposit = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    try {
      const all = await requestRecords(PROGRAM_ID);
      const tokens = all.filter((r: any) => !r.spent && r.data?.amount) as Record[];
      if (!tokens.length) {
        log('[ERR] deposit: no WALEO records');
        setLoading(false);
        return;
      }
      const token = tokens[0];
      const rcpt = recipient || publicKey;
      const tx = Transaction.createTransaction(
        publicKey,
        NETWORK,
        PROGRAM_ID,
        DEPOSIT_FN,
        [escrowId, rcpt, token],
        FEE,
        false
      );
      await submitAndPoll(tx, DEPOSIT_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. Release (allow custom amount or fallback to escrow record)
  const release = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    try {
      const rcpt = releaseRecipient || publicKey;
      let args: any[];

      if (releaseAmount) {
        // user-specified amount
        args = [escrowId, releaseAmount, rcpt];
      } else {
        // fetch the escrow record to get its amount
        const all = await requestRecords(PROGRAM_ID);
        const tokens = all.filter((r: any) => !r.spent && r.data?.escrow_id === escrowId) as Record[];
        if (!tokens.length) {
          log('[ERR] release: no matching escrow record');
          setLoading(false);
          return;
        }
        const token = tokens[0];
        args = [escrowId, token, rcpt];
      }

      const tx = Transaction.createTransaction(
        publicKey,
        NETWORK,
        PROGRAM_ID,
        RELEASE_FN,
        args,
        FEE,
        false
      );
      await submitAndPoll(tx, RELEASE_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo title="zkEscrow Demo" />
      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold">zkEscrow Demo</h1>
        {connected ? (
          <p className="text-sm text-gray-600 break-all">Connected as <span className="font-mono">{publicKey}</span></p>
        ) : (
          <p className="text-red-500">Wallet not connected.</p>
        )}

        {/* Wrap */}
        <div className="border rounded p-4 space-y-4">
          <h2 className="text-xl font-medium">1. Wrap Credits</h2>
          <input className="border rounded px-3 py-2 w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button onClick={wrap} disabled={!connected || loading}>Wrap</Button>
        </div>

        {/* Deposit */}
        <div className="border rounded p-4 space-y-4">
          <h2 className="text-xl font-medium">2. Deposit to Escrow</h2>
          <input className="border rounded px-3 py-2 w-full" placeholder="Escrow ID" value={escrowId} onChange={(e) => setEscrowId(e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Recipient address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <Button onClick={deposit} disabled={!connected || loading}>Deposit</Button>
        </div>

        {/* Release */}
        <div className="border rounded p-4 space-y-4">
          <h2 className="text-xl font-medium">3. Release Escrow</h2>
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Escrow ID"
            value={escrowId}
            onChange={(e) => setEscrowId(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Amount (e.g. 5000000u64) - leave blank to use escrow balance"
            value={releaseAmount}
            onChange={(e) => setReleaseAmount(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Recipient address for release"
            value={releaseRecipient}
            onChange={(e) => setReleaseRecipient(e.target.value)}
          />
          <Button onClick={release} disabled={!connected || loading}>Release</Button>
        </div>

        {/* Unwrap */}
        <div className="border rounded p-4 space-y-4">
          <h2 className="text-xl font-medium">4. Unwrap Credits</h2>
          <input className="border rounded px-3 py-2 w-full" placeholder="Recipient address (optional)" value={unwrapRecipient} onChange={(e) => setUnwrapRecipient(e.target.value)} />
          <Button onClick={unwrap} disabled={!connected || loading}>Unwrap</Button>
        </div>

        {/* Console */}
        <div className="border rounded p-4 bg-gray-50 text-xs whitespace-pre-wrap max-h-60 overflow-y-auto">
          {logs.length ? logs.map((l, i) => <div key={i}>{l}</div>) : 'No output yet.'}
        </div>
      </div>
    </>
  );
};

DashboardDemo.getLayout = (page) => <Layout>{page}</Layout>;
export default DashboardDemo;
