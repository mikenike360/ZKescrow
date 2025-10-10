import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import BackArrow from '@/components/ui/BackArrow';

const TermsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Terms & Conditions - ZK Escrow v2" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <BackArrow />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="text-center border-b pb-8">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Terms & Conditions
              </h1>
              <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to ZK Escrow v2. These Terms and Conditions ("Terms") govern your use of our decentralized 
                application (dApp) and the zk_escrow_v2.aleo smart contract. By accessing or using our service, you 
                agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <strong>Important:</strong> Please read these Terms carefully before using ZK Escrow v2. If you do 
                not agree to these Terms, do not use our service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By connecting your wallet and interacting with ZK Escrow v2, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms, as well as our Privacy Policy. These Terms apply 
                to all users of the service.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ZK Escrow v2 is a decentralized escrow service built on the Aleo blockchain. The service allows users to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Create escrow agreements by depositing Aleo credits</li>
                <li>Release escrowed funds to designated recipients</li>
                <li>Claim funds as a designated recipient</li>
                <li>Cancel escrow agreements under specified conditions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                The service is provided as-is through a web interface that interacts with the zk_escrow_v2.aleo 
                smart contract deployed on the Aleo blockchain.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">3.1 Wallet Security</h3>
              <p className="text-gray-700 leading-relaxed mb-4">You are solely responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Maintaining the security of your wallet and private keys</li>
                <li>All transactions initiated from your wallet</li>
                <li>Verifying transaction details before signing</li>
                <li>Backing up your wallet recovery phrases</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">3.2 Lawful Use</h3>
              <p className="text-gray-700 leading-relaxed">
                You agree to use ZK Escrow v2 only for lawful purposes and in compliance with all applicable laws 
                and regulations in your jurisdiction. You may not use the service for any illegal activities, 
                including but not limited to money laundering, fraud, or terrorist financing.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">3.3 Due Diligence</h3>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for conducting your own due diligence before entering into any escrow agreement, 
                including verifying the identity and trustworthiness of counterparties.
              </p>
            </section>

            {/* Risks and Disclaimers */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Risks and Disclaimers</h2>
              
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ Important Risk Disclosures</h3>
                <ul className="list-disc list-inside space-y-2 text-red-900 text-sm ml-4">
                  <li>Cryptocurrency transactions are irreversible</li>
                  <li>Smart contracts may contain bugs or vulnerabilities</li>
                  <li>Blockchain networks may experience congestion or downtime</li>
                  <li>The value of cryptocurrencies is highly volatile</li>
                  <li>There is no guarantee of profit or recovery of funds</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.1 No Warranty</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.2 Smart Contract Risks</h3>
              <p className="text-gray-700 leading-relaxed">
                While we strive to ensure the security and correctness of the zk_escrow_v2.aleo smart contract, 
                we cannot guarantee that it is completely free from bugs or vulnerabilities. Users interact with 
                the smart contract at their own risk.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.3 Third-Party Services</h3>
              <p className="text-gray-700 leading-relaxed">
                ZK Escrow v2 relies on third-party services including wallet providers, RPC nodes, and the Aleo 
                blockchain itself. We are not responsible for any failures, errors, or issues arising from these 
                third-party services.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE DEVELOPERS, CONTRIBUTORS, OR SERVICE 
                PROVIDERS OF ZK ESCROW V2 BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
                DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF 
                DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You acknowledge and agree that your use of ZK Escrow v2 is at your sole risk, and you will be solely 
                responsible for any damage to your computer system or loss of data resulting from such use.
              </p>
            </section>

            {/* No Control Over Blockchain */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. No Control Over Blockchain</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not own, control, or operate the Aleo blockchain or any wallet software. We cannot control, 
                reverse, or refund any blockchain transactions. We are not responsible for any blockchain-related 
                issues including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
                <li>Network congestion or high transaction fees</li>
                <li>Failed or pending transactions</li>
                <li>Lost or stolen private keys</li>
                <li>Blockchain forks or protocol changes</li>
              </ul>
            </section>

            {/* Fees */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Fees</h2>
              <p className="text-gray-700 leading-relaxed">
                All transactions on the Aleo blockchain require payment of network fees (gas fees). These fees are 
                paid to validators and are not collected by ZK Escrow v2. You are responsible for ensuring you have 
                sufficient Aleo credits to cover both your escrow amount and associated network fees.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ZK Escrow v2 is a trustless, automated service. We do not mediate disputes between parties. All 
                escrow logic is enforced by the smart contract code. Users are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Verifying escrow details before creation</li>
                <li>Communicating with counterparties</li>
                <li>Resolving disputes independently</li>
                <li>Understanding the irreversible nature of blockchain transactions</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The ZK Escrow v2 web interface, documentation, and related materials are provided under an open-source 
                license. The zk_escrow_v2.aleo smart contract is publicly deployed on the Aleo blockchain and is 
                auditable by anyone.
              </p>
            </section>

            {/* Modifications to Terms */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. The updated version will be indicated by an 
                updated "Last Updated" date. Your continued use of the service after any changes constitutes acceptance 
                of the new Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                You may stop using ZK Escrow v2 at any time by disconnecting your wallet. However, any existing escrow 
                agreements on the blockchain will continue to exist and be enforceable according to the smart contract 
                code.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws applicable to decentralized 
                applications and blockchain technology. As a decentralized service, ZK Escrow v2 operates globally and 
                is not subject to any single jurisdiction.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about these Terms, please reach out through our community channels or visit 
                our GitHub repository.
              </p>
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Created by:</strong> VenomLabs<br />
                  <strong>Website:</strong> <a href="https://venomlabs.xyz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">venomlabs.xyz</a>
                </p>
              </div>
            </section>

            {/* Final Acknowledgment */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                BY USING ZK ESCROW V2, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THESE TERMS AND AGREE TO BE 
                BOUND BY THEM. YOU ALSO ACKNOWLEDGE THE RISKS INVOLVED IN USING BLOCKCHAIN TECHNOLOGY AND CRYPTOCURRENCY, 
                AND AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR ANY OUTCOMES RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

TermsPage.getLayout = (page) => <Layout>{page}</Layout>;
export default TermsPage;

