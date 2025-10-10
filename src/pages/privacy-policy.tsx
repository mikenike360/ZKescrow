import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import BackArrow from '@/components/ui/BackArrow';

const PrivacyPolicyPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Privacy Policy - ZK Escrow v2" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <BackArrow />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="text-center border-b pb-8">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to ZK Escrow v2. We are committed to protecting your privacy and ensuring the security of your 
                information. This Privacy Policy explains how our decentralized application (dApp) operates and what 
                minimal information is processed when you use our service.
              </p>
            </section>

            {/* Decentralized Nature */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Decentralized Application</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ZK Escrow v2 is a fully decentralized application running on the Aleo blockchain. Unlike traditional 
                web services, we:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Do not operate centralized servers to store user data</li>
                <li>Do not collect, store, or process personal information</li>
                <li>Do not require account creation or email addresses</li>
                <li>Do not track user behavior or analytics</li>
              </ul>
            </section>

            {/* Blockchain Interactions */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Blockchain Interactions</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">2.1 Wallet Connection</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use ZK Escrow v2, you must connect a compatible Aleo wallet (such as Leo Wallet). When you connect 
                your wallet:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Your wallet address is temporarily used to sign transactions</li>
                <li>We do not have access to your private keys</li>
                <li>You maintain full control of your funds at all times</li>
                <li>Wallet connection is local to your browser session</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">2.2 On-Chain Data</h3>
              <p className="text-gray-700 leading-relaxed">
                All escrow transactions are recorded on the Aleo blockchain, which is a public, immutable ledger. 
                This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Transaction data is publicly visible on the blockchain</li>
                <li>Wallet addresses involved in escrows are part of the public record</li>
                <li>Zero-knowledge proofs protect transaction privacy while ensuring validity</li>
                <li>We cannot delete or modify blockchain data</li>
              </ul>
            </section>

            {/* Zero-Knowledge Privacy */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Zero-Knowledge Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Aleo's zero-knowledge proof technology provides enhanced privacy for blockchain transactions. While 
                transaction validity is publicly verifiable, certain details can remain private through cryptographic 
                proofs. However, the zk_escrow_v2.aleo program uses public transitions, meaning escrow details are 
                transparent on the blockchain for auditability.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">4.1 Wallet Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you use a wallet to interact with ZK Escrow v2, you are subject to that wallet provider's 
                privacy policy and terms of service. We recommend reviewing their policies.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">4.2 RPC Nodes</h3>
              <p className="text-gray-700 leading-relaxed">
                Your wallet may connect to RPC (Remote Procedure Call) nodes to interact with the Aleo blockchain. 
                These nodes may log IP addresses and transaction data as part of normal blockchain operation.
              </p>
            </section>

            {/* Cookies and Local Storage */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies and Local Storage</h2>
              <p className="text-gray-700 leading-relaxed">
                Our dApp may use browser local storage to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Remember your wallet connection preference</li>
                <li>Store UI preferences and settings</li>
                <li>Cache transaction logs for display purposes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                This data is stored locally in your browser and is never transmitted to our servers (as we don't 
                operate any servers). You can clear this data at any time through your browser settings.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to ensuring the security of our application:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Our smart contracts are open-source and auditable</li>
                <li>We use industry-standard cryptographic practices</li>
                <li>All transactions require explicit user approval through wallet signatures</li>
                <li>We regularly update dependencies to patch security vulnerabilities</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <strong>Important:</strong> Always verify transaction details in your wallet before signing. Never 
                share your private keys or seed phrases with anyone.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of a decentralized application:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>You have full control over your wallet and funds</li>
                <li>You can disconnect your wallet at any time</li>
                <li>You can clear browser data to remove local preferences</li>
                <li>You have the right to verify all smart contract code</li>
              </ul>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an 
                updated "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy 
                periodically for any changes.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy or our practices, please reach out through our 
                community channels or visit our GitHub repository.
              </p>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Created by:</strong> VenomLabs<br />
                  <strong>Website:</strong> <a href="https://venomlabs.xyz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">venomlabs.xyz</a>
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                This Privacy Policy applies only to the ZK Escrow v2 web interface. It does not apply to the underlying 
                Aleo blockchain protocol, third-party wallets, or other services you may use in connection with our dApp. 
                Use of ZK Escrow v2 is at your own risk. Always do your own research and never invest more than you can 
                afford to lose.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

PrivacyPolicyPage.getLayout = (page) => <Layout>{page}</Layout>;
export default PrivacyPolicyPage;

