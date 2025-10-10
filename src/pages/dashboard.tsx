import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletNotConnectedError,
  Transaction,
} from '@demox-labs/aleo-wallet-adapter-base';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { CURRENT_NETWORK, PROGRAM_ID } from '@/types';
import { useState } from 'react';

// ──────────────────────────────────────────

const CREATE_ESCROW_FN = 'create_escrow';
const RELEASE_FN = 'release';
const CLAIM_FN = 'claim';
const CANCEL_FN = 'cancel';

const FEE = 100000;
// ──────────────────────────────────────────

const DashboardDemo: NextPageWithLayout = () => {
  const { wallet, publicKey, connected } = useWallet();

  const [logs, setLogs] = useState<string[]>([]);
  const log = (l: string) => setLogs((p) => [...p, l]);

  // Create Escrow inputs
  const [createId, setCreateId] = useState('');
  const [createRecipient, setCreateRecipient] = useState('');
  const [createAmount, setCreateAmount] = useState('');

  // Release inputs
  const [releaseId, setReleaseId] = useState('');
  const [releaseAmount, setReleaseAmount] = useState('');
  const [releaseRecipient, setReleaseRecipient] = useState('');

  // Claim inputs
  const [claimId, setClaimId] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimRecipient, setClaimRecipient] = useState('');

  // Cancel inputs
  const [cancelId, setCancelId] = useState('');
  const [cancelAmount, setCancelAmount] = useState('');
  const [cancelRecipient, setCancelRecipient] = useState('');

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'release' | 'claim' | 'cancel'>('create');

  // helper
  const submitAndPoll = async (tx: Transaction, fn: string) => {
    if (!wallet || !wallet.adapter) {
      log('[ERR] Wallet not connected');
      return;
    }
    const id = await (wallet.adapter as LeoWalletAdapter).requestTransaction(tx);
    log(`[INFO] ${fn} submitted -> ${id}`);
    for (let i = 0; i < 60; i++) {
      const st = await (wallet.adapter as LeoWalletAdapter).transactionStatus(id);
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

  // 1. Create Escrow
  const createEscrow = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    if (!createId || !createRecipient || !createAmount) {
      log('[ERR] Please fill in all fields for Create Escrow');
      return;
    }
    setLoading(true);
    try {
      const inputs = [createId + 'u64', createRecipient, createAmount + 'u64'];
      log(`[DEBUG] Creating transaction with inputs: ${JSON.stringify(inputs)}`);
      log(`[DEBUG] Program: ${PROGRAM_ID}, Network: ${CURRENT_NETWORK}`);
      
      const tx = Transaction.createTransaction(
        publicKey,
        CURRENT_NETWORK,
        PROGRAM_ID,
        CREATE_ESCROW_FN,
        inputs,
        FEE,
        false
      );
      await submitAndPoll(tx, CREATE_ESCROW_FN);
    } catch (e) {
      log(`[ERR] Error: ${e}`);
      console.error('Full error:', e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Release
  const release = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    if (!releaseId || !releaseAmount || !releaseRecipient) {
      log('[ERR] Please fill in all fields for Release');
      return;
    }
    setLoading(true);
    try {
      const tx = Transaction.createTransaction(
        publicKey,
        CURRENT_NETWORK,
        PROGRAM_ID,
        RELEASE_FN,
        [releaseId + 'u64', releaseAmount + 'u64', releaseRecipient],
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

  // 3. Claim
  const claim = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    if (!claimId || !claimAmount || !claimRecipient) {
      log('[ERR] Please fill in all fields for Claim');
      return;
    }
    setLoading(true);
    try {
      const tx = Transaction.createTransaction(
        publicKey,
        CURRENT_NETWORK,
        PROGRAM_ID,
        CLAIM_FN,
        [claimId + 'u64', claimAmount + 'u64', claimRecipient],
        FEE,
        false
      );
      await submitAndPoll(tx, CLAIM_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. Cancel
  const cancel = async () => {
    if (!connected || !publicKey) throw new WalletNotConnectedError();
    if (!cancelId || !cancelAmount || !cancelRecipient) {
      log('[ERR] Please fill in all fields for Cancel');
      return;
    }
    setLoading(true);
    try {
      const tx = Transaction.createTransaction(
        publicKey,
        CURRENT_NETWORK,
        PROGRAM_ID,
        CANCEL_FN,
        [cancelId + 'u64', cancelAmount + 'u64', cancelRecipient],
        FEE,
        false
      );
      await submitAndPoll(tx, CANCEL_FN);
    } catch (e) {
      log(`Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo title="zkEscrow - zk_escrow_v2.aleo" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ZK Escrow v2
              </h1>
              <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mt-2"></div>
            </div>
            
            {connected ? (
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Connected</span>
                <span className="font-mono text-xs text-green-600 max-w-[200px] truncate">{publicKey}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-700">Wallet not connected</span>
              </div>
            )}

            {/* Info Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  About zk_escrow_v2.aleo
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  A trustless escrow service on Aleo that holds funds securely between parties using public credits.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">1.</span>
                    <span><strong>Create:</strong> Deposit credits with unique ID</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span><strong>Release:</strong> Sender releases funds</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">3.</span>
                    <span><strong>Claim:</strong> Recipient claims funds</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">4.</span>
                    <span><strong>Cancel:</strong> Either party cancels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'create'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">1. Create</span>
                <span className="sm:hidden">Create</span>
              </button>
              <button
                onClick={() => setActiveTab('release')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'release'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">2. Release</span>
                <span className="sm:hidden">Release</span>
              </button>
              <button
                onClick={() => setActiveTab('claim')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'claim'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">3. Claim</span>
                <span className="sm:hidden">Claim</span>
              </button>
              <button
                onClick={() => setActiveTab('cancel')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'cancel'
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">4. Cancel</span>
                <span className="sm:hidden">Cancel</span>
              </button>
            </div>
          </div>

          {/* Create Escrow */}
          {activeTab === 'create' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 space-y-5 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <div>
                <h2 className="text-3xl font-bold text-green-700">Create Escrow</h2>
                <p className="text-base text-gray-700 font-medium">Deposit credits into escrow</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
              <div className="font-bold text-amber-900 mb-2">💡 Example values:</div>
              <div className="space-y-1.5 text-amber-950">
                <div>• Escrow ID: <code className="bg-white px-2 py-1 rounded font-semibold text-gray-900">1</code></div>
                <div>• Recipient: <code className="bg-white px-2 py-1 rounded text-[11px] font-mono text-gray-900">aleo1rhgdu77hgyqd3xjj8ucu3jj9r58kryjd3q882ed6rqqp33nxwgyxqy92vkf</code></div>
                <div>• Amount: <code className="bg-white px-2 py-1 rounded font-semibold text-gray-900">1000000</code> <span className="text-amber-800 font-medium">(= 0.001 ALEO)</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Escrow ID</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1"
                  value={createId}
                  onChange={(e) => setCreateId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Recipient Address</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-white font-mono text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="aleo1..."
                  value={createRecipient}
                  onChange={(e) => setCreateRecipient(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Amount (microcredits)</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1000000"
                  value={createAmount}
                  onChange={(e) => setCreateAmount(e.target.value)}
                />
                <p className="text-sm text-gray-700 font-medium mt-2 ml-1">💰 1 ALEO = 1,000,000 microcredits</p>
              </div>
              <Button 
                onClick={createEscrow} 
                disabled={!connected || loading} 
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? '⏳ Processing...' : '✅ Create Escrow'}
              </Button>
            </div>
          </div>
          )}

          {/* Release */}
          {activeTab === 'release' && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 space-y-5 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-700">Release Escrow</h2>
                <p className="text-base text-gray-700 font-medium">Sender releases funds to recipient</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 text-sm">
              <div className="font-bold text-blue-900 mb-1">🔐 Sender only</div>
              <p className="text-blue-950">Release escrowed funds. Amount must match the escrow amount.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Escrow ID</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1"
                  value={releaseId}
                  onChange={(e) => setReleaseId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Amount (must match escrow)</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1000000"
                  value={releaseAmount}
                  onChange={(e) => setReleaseAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Recipient Address</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white font-mono text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="aleo1..."
                  value={releaseRecipient}
                  onChange={(e) => setReleaseRecipient(e.target.value)}
                />
              </div>
              <Button 
                onClick={release} 
                disabled={!connected || loading} 
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? '⏳ Processing...' : '🚀 Release Funds'}
              </Button>
            </div>
          </div>
          )}

          {/* Claim */}
          {activeTab === 'claim' && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 space-y-5 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <div>
                <h2 className="text-3xl font-bold text-purple-700">Claim Escrow</h2>
                <p className="text-base text-gray-700 font-medium">Recipient claims their funds</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 text-sm">
              <div className="font-bold text-purple-900 mb-1">💎 Recipient only</div>
              <p className="text-purple-950">Claim your escrowed funds. You must be the designated recipient.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Escrow ID</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1"
                  value={claimId}
                  onChange={(e) => setClaimId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Amount (must match escrow)</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1000000"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Your Address (must be recipient)</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none bg-white font-mono text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder={publicKey || 'aleo1...'}
                  value={claimRecipient}
                  onChange={(e) => setClaimRecipient(e.target.value)}
                />
                <p className="text-sm text-gray-700 font-medium mt-2 ml-1">👛 Use your connected wallet address</p>
              </div>
              <Button 
                onClick={claim} 
                disabled={!connected || loading} 
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? '⏳ Processing...' : '💰 Claim Funds'}
              </Button>
            </div>
          </div>
          )}

          {/* Cancel */}
          {activeTab === 'cancel' && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 space-y-5 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                4
              </div>
              <div>
                <h2 className="text-3xl font-bold text-red-700">Cancel Escrow</h2>
                <p className="text-base text-gray-700 font-medium">Either party can cancel and refund</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 text-sm">
              <div className="font-bold text-red-900 mb-1">⚠️ Sender or Recipient</div>
              <p className="text-red-950">Cancel the escrow and return funds. Specify the refund recipient address.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Escrow ID</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1"
                  value={cancelId}
                  onChange={(e) => setCancelId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Amount (must match escrow)</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="1000000"
                  value={cancelAmount}
                  onChange={(e) => setCancelAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Refund Recipient Address</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none bg-white font-mono text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="aleo1... (sender or recipient)"
                  value={cancelRecipient}
                  onChange={(e) => setCancelRecipient(e.target.value)}
                />
                <p className="text-sm text-gray-700 font-medium mt-2 ml-1">🔄 Address to receive refunded credits</p>
              </div>
              <Button 
                onClick={cancel} 
                disabled={!connected || loading} 
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? '⏳ Processing...' : '❌ Cancel Escrow'}
              </Button>
            </div>
          </div>
          )}

          {/* Transaction Console */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-semibold text-slate-400 ml-2">Transaction Log</span>
            </div>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-green-400 whitespace-pre-wrap max-h-80 overflow-y-auto custom-scrollbar">
              {logs.length ? (
                logs.map((l, i) => (
                  <div key={i} className="mb-1 hover:bg-slate-900 px-2 py-1 rounded transition-colors">
                    {l}
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-center py-8">
                  <div className="text-4xl mb-2">🔍</div>
                  <div>No transactions yet.</div>
                  <div className="text-xs mt-1">Connect your wallet and try creating an escrow!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardDemo.getLayout = (page) => <Layout>{page}</Layout>;
export default DashboardDemo;
