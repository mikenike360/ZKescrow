import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletNotConnectedError } from '@demox-labs/aleo-wallet-adapter-base';
import { Transaction, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base';
import { useState } from 'react';
import { getFeeForFunction } from '@/utils/feeCalculator';

const PROGRAM_ID = 'zkescrow_combinedv2.aleo';
const WRAP_FUNCTION = 'wrap_public_credits';
const NETWORK = WalletAdapterNetwork.TestnetBeta;

const Dashboard: NextPageWithLayout = () => {
  const { publicKey, connected, requestTransaction, transactionStatus } = useWallet();
  const [amount, setAmount] = useState('100u64');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWrap = async () => {
    setResult(null);
    setLoading(true);
    try {
      if (!connected || !publicKey) throw new WalletNotConnectedError();

      // Build inputs: [to_address, amount]
      const inputs = [publicKey, amount];

      // Compute fee dynamically
      const fee = 1000000;

      // Create & submit tx
      const tx = Transaction.createTransaction(
        publicKey,
        NETWORK,
        PROGRAM_ID,
        WRAP_FUNCTION,
        inputs,
        fee,
        false
      );
      const txId = await requestTransaction(tx);
      setResult(`Submitted! TX ID: ${txId}`);

      // Poll for finalization
      for (let i = 0; i < 60; i++) {
        const status = await transactionStatus(txId);
        if (status === 'Finalized') {
          setResult((prev) => prev + '\nFinalized.');
          break;
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (e) {
      setResult(`Error: ${e instanceof Error ? e.message : e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo title="zkEscrow Dashboard" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">zkEscrow Dashboard</h1>

        {connected ? (
          <p className="mb-4 text-gray-600">
            Connected: <span className="font-mono">{publicKey}</span>
          </p>
        ) : (
          <p className="mb-4 text-red-500">Wallet not connected.</p>
        )}

        <div className="mb-6">
          <label className="block mb-1 font-medium">Amount to Wrap:</label>
          <input
            type="text"
            className="w-64 rounded border px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button onClick={handleWrap} disabled={!connected || loading}>
          {loading ? 'Wrapping…' : 'Wrap Public Credits'}
        </Button>

        {result && (
          <div className="mt-6 rounded border bg-gray-100 p-4 text-sm whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </>
  );
};

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;
export default Dashboard;
