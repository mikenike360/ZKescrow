import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import BackArrow from '@/components/ui/BackArrow';

const WhitepaperPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Whitepaper - ZK Escrow v2" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <BackArrow />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="text-center border-b pb-8">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                ZK Escrow v2
              </h1>
              <p className="text-xl text-gray-600">A Trustless Escrow Service on Aleo</p>
              <p className="text-sm text-gray-500 mt-2">Version 2.0 | {new Date().getFullYear()}</p>
            </div>

            {/* Abstract */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Abstract</h2>
              <p className="text-gray-700 leading-relaxed">
                ZK Escrow v2 is a decentralized escrow service built on the Aleo blockchain, leveraging zero-knowledge 
                proofs to provide secure, trustless transactions between parties. The protocol eliminates the need for 
                centralized intermediaries while maintaining privacy and security through cryptographic guarantees.
              </p>
            </section>

            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Traditional escrow services require trust in a centralized third party to hold and release funds. 
                This introduces counterparty risk, potential censorship, and privacy concerns. ZK Escrow v2 addresses 
                these challenges by implementing a fully decentralized escrow mechanism on Aleo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Built on Aleo's zero-knowledge virtual machine, the protocol ensures transaction privacy while 
                maintaining verifiable correctness of all operations.
              </p>
            </section>

            {/* Technical Architecture */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Technical Architecture</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">2.1 Core Components</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The zk_escrow_v2.aleo program consists of the following key components:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm font-mono">
                <div><span className="font-bold text-blue-600">Escrow Struct:</span> Contains sender, recipient, and amount information</div>
                <div><span className="font-bold text-blue-600">Mapping Storage:</span> On-chain storage for escrow states indexed by unique IDs</div>
                <div><span className="font-bold text-blue-600">Public Transitions:</span> Transparent operations for escrow lifecycle management</div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">2.2 State Management</h3>
              <p className="text-gray-700 leading-relaxed">
                Escrow states are stored on-chain using Aleo's mapping primitive, providing a transparent and 
                verifiable record of all escrow transactions. Each escrow is identified by a unique u64 ID chosen 
                by the creator.
              </p>
            </section>

            {/* Protocol Operations */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Protocol Operations</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">3.1 Create Escrow</h3>
                  <p className="text-gray-700">
                    The sender initiates an escrow by depositing public credits to the contract with a unique ID 
                    and recipient address. The funds are locked in the contract until released or claimed.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">3.2 Release</h3>
                  <p className="text-gray-700">
                    The sender can release funds to the designated recipient or any other address. This provides 
                    flexibility for multi-party transactions while maintaining sender control.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">3.3 Claim</h3>
                  <p className="text-gray-700">
                    The designated recipient can claim the escrowed funds at any time, provided they meet the 
                    recipient verification requirements.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold text-red-700 mb-2">3.4 Cancel</h3>
                  <p className="text-gray-700">
                    Either the sender or recipient can cancel the escrow and return funds, providing an exit 
                    mechanism for changed circumstances.
                  </p>
                </div>
              </div>
            </section>

            {/* Security Model */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Security Model</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">4.1 Access Control</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The protocol implements role-based access control:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Only the sender can release funds</li>
                <li>Only the designated recipient can claim funds</li>
                <li>Both parties can initiate cancellation</li>
                <li>All operations require amount verification to prevent errors</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">4.2 Cryptographic Guarantees</h3>
              <p className="text-gray-700 leading-relaxed">
                Leveraging Aleo's zero-knowledge proofs, all operations are cryptographically verified while 
                maintaining privacy. The protocol ensures that only authorized parties can execute specific 
                operations through on-chain verification.
              </p>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Use Cases</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-2">💼 Freelance Payments</h3>
                  <p className="text-sm text-gray-700">
                    Secure milestone-based payments for freelance work with funds held until deliverables are met.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">🛍️ Marketplace Transactions</h3>
                  <p className="text-sm text-gray-700">
                    Safe peer-to-peer marketplace transactions with buyer protection and seller assurance.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-2">🤝 Business Agreements</h3>
                  <p className="text-sm text-gray-700">
                    Trustless execution of business contracts with conditional fund release mechanisms.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-2">🏠 Real Estate</h3>
                  <p className="text-sm text-gray-700">
                    Secure holding of deposits and earnest money for real estate transactions.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Conclusion</h2>
              <p className="text-gray-700 leading-relaxed">
                ZK Escrow v2 demonstrates the power of zero-knowledge proofs in creating trustless financial 
                infrastructure. By eliminating the need for centralized intermediaries while maintaining strong 
                security guarantees, the protocol enables a new paradigm of peer-to-peer commerce on Aleo.
              </p>
            </section>

            {/* References */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>[1] Aleo Documentation - <a href="https://developer.aleo.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">developer.aleo.org</a></li>
                <li>[2] Leo Programming Language - <a href="https://leo-lang.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">leo-lang.org</a></li>
                <li>[3] Zero-Knowledge Proofs - Academic Research and Implementation</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

WhitepaperPage.getLayout = (page) => <Layout>{page}</Layout>;
export default WhitepaperPage;

