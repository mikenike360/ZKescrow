import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import Link from 'next/link';

const BoardPage: NextPageWithLayout = () => {
  const { publicKey } = useWallet();

  return (
    <>
      <NextSeo title="Board - ZK Escrow v2" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Escrow Board
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              View and manage active escrow agreements on the Aleo blockchain
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-700 mb-8">
              The Escrow Board feature is currently under development. This page will allow you to:
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📋</span>
                  <div>
                    <h3 className="font-bold text-lg text-green-700 mb-2">View All Escrows</h3>
                    <p className="text-sm text-gray-700">
                      Browse all active escrow agreements on the network with detailed information about sender, recipient, and amounts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🔍</span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">Search & Filter</h3>
                    <p className="text-sm text-gray-700">
                      Search for specific escrows by ID, filter by your address, and sort by amount or creation date.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💼</span>
                  <div>
                    <h3 className="font-bold text-lg text-purple-700 mb-2">Your Escrows</h3>
                    <p className="text-sm text-gray-700">
                      View escrows where you're the sender or recipient, with quick actions to release, claim, or cancel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h3 className="font-bold text-lg text-orange-700 mb-2">Analytics</h3>
                    <p className="text-sm text-gray-700">
                      See network statistics including total volume, number of escrows, and activity trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900 mb-4">
                <strong>Note:</strong> This feature requires indexing blockchain data to efficiently query and display escrow information. We're working on implementing a robust indexing solution.
              </p>
              <p className="text-sm text-blue-800">
                In the meantime, you can interact with escrows directly through the Dashboard.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Roadmap</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <div>
                  <strong>Smart Contract:</strong> The zk_escrow_v2.aleo program is deployed and functional
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <div>
                  <strong>Frontend Interface:</strong> Dashboard for creating and managing escrows
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">⏳</span>
                <div>
                  <strong>Blockchain Indexer:</strong> Service to index and track all escrow events
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">⏳</span>
                <div>
                  <strong>API Layer:</strong> Backend to serve indexed data to the frontend
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">⏳</span>
                <div>
                  <strong>Board UI:</strong> Interactive interface for browsing and managing escrows
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

BoardPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BoardPage;

