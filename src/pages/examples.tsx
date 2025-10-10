import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import BackArrow from '@/components/ui/BackArrow';

const ExamplesPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Examples - ZK Escrow v2 Integration" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Integration Examples
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How ZKontract leverages zk_escrow_v2.aleo for trustless bounty payments
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
            
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ZKontract is a decentralized bounty platform built on Aleo that uses zk_escrow_v2.aleo as its core 
                payment infrastructure. This integration demonstrates the versatility and composability of the escrow 
                protocol.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="text-blue-900 font-semibold mb-2">🔗 Key Integration Point:</p>
                <p className="text-sm text-blue-800">
                  ZKontract's main program (<code className="bg-white px-2 py-0.5 rounded">zkontract_v2.aleo</code>) imports and calls zk_escrow_v2.aleo functions 
                  to manage bounty payments securely.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How ZKontract Uses ZK Escrow v2</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-xl">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-green-600">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">Bounty Creation</h3>
                    <p className="text-gray-700 mb-3">
                      When a user posts a bounty on ZKontract, they deposit credits into an escrow through the 
                      <code className="bg-white px-2 py-1 rounded mx-1 text-sm">post_bounty</code> function.
                    </p>
                    <div className="bg-white/70 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                      <pre className="text-gray-800">{`async transition post_bounty(
    caller: address,
    bounty_id: u64,
    creator_address: address,
    payment_amount: u64
) -> Future {
    assert_eq(caller, creator_address);
    assert(payment_amount > 0u64);
    assert(bounty_id > 0u64);

    // Create escrow - set creator as recipient for potential cancellation
    let escrow_future: Future = zk_escrow_v2.aleo/create_escrow(
        bounty_id,
        creator_address,
        payment_amount
    );
    
    return finalize_post_bounty(escrow_future, bounty_id, creator_address, payment_amount);
}`}</pre>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-xl">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-blue-600">2</span>
                    <div>
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Proposal Submission</h3>
                      <p className="text-gray-700 mb-3">
                        Contributors submit proposals for bounties through a separate submission system. 
                        Proposal data is stored off-chain (S3), while the escrow remains locked on-chain.
                      </p>
                      <div className="bg-white/70 rounded-lg p-4">
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>✅ Proposal ID and metadata stored in database</li>
                          <li>✅ Files uploaded to S3 storage</li>
                          <li>✅ Escrow remains locked until bounty owner decides</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-xl">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-purple-600">3</span>
                    <div>
                      <h3 className="text-xl font-bold text-purple-700 mb-2">Accepting Proposal (Payment)</h3>
                      <p className="text-gray-700 mb-3">
                        When the bounty creator accepts a proposal, ZKontract calls the escrow's 
                        <code className="bg-white px-2 py-1 rounded mx-1 text-sm">release</code> function to pay the contributor.
                      </p>
                      <div className="bg-white/70 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                        <pre className="text-gray-800">{`async transition accept_proposal(
    caller: address,
    bounty_id: u64,
    proposal_id: u64,
    creator_address: address,
    payment_amount: u64,
    proposer_address: address
) -> Future {
    assert_eq(caller, creator_address); // Only creator can accept
    assert(payment_amount > 0u64);
    
    let composite_proposal_id: u64 = bounty_id * 1000000u64 + proposal_id;

    // Release escrow to proposer
    let release_future: Future = zk_escrow_v2.aleo/release(
        bounty_id,
        payment_amount,
        proposer_address  // Contributor receives payment
    );
    
    return finalize_accept_proposal(release_future, bounty_id, composite_proposal_id);
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="border-l-4 border-red-500 pl-6 py-4 bg-red-50 rounded-r-xl">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-red-600">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">Cancelling Bounty (Refund)</h3>
                    <p className="text-gray-700 mb-3">
                      If the bounty creator wants to cancel before accepting a proposal, they can retrieve their funds 
                      using the <code className="bg-white px-2 py-1 rounded mx-1 text-sm">cancel_bounty_escrow</code> function.
                    </p>
                    <div className="bg-white/70 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                      <pre className="text-gray-800">{`async transition cancel_bounty_escrow(
    caller: address,
    bounty_id: u64,
    payment_amount: u64
) -> Future {
    assert(bounty_id > 0u64);
    assert(payment_amount > 0u64);
    
    // Cancel escrow - return funds to the bounty creator
    let cancel_future: Future = zk_escrow_v2.aleo/cancel(
        bounty_id,
        payment_amount,
        caller  // Creator gets refund
    );
    
    return finalize_cancel_bounty_escrow(cancel_future, bounty_id, caller);
}`}</pre>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Architecture Diagram */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h2>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border-2 border-slate-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center">
                        <div className="font-bold text-blue-900">ZKontract Frontend</div>
                        <div className="text-xs text-blue-700 mt-1">User Interface</div>
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 text-center">
                        <div className="font-bold text-purple-900">zkontract_v2.aleo</div>
                        <div className="text-xs text-purple-700 mt-1">Main Contract</div>
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                        <div className="font-bold text-green-900">zk_escrow_v2.aleo</div>
                        <div className="text-xs text-green-700 mt-1">Escrow Protocol</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                    <strong>Data Flow:</strong> The ZKontract contract acts as an intermediary, managing bounty logic 
                    while delegating all payment handling to the escrow contract. This separation of concerns ensures 
                    security and reusability.
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of This Integration</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-green-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔒</span>
                    Security Through Separation
                  </h3>
                  <p className="text-sm text-gray-700">
                    By using a dedicated, audited escrow contract, ZKontract inherits battle-tested payment security 
                    without reimplementing complex logic.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-blue-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🧩</span>
                    Composability
                  </h3>
                  <p className="text-sm text-gray-700">
                    The modular design allows other projects to use zk_escrow_v2.aleo for their own use cases, 
                    creating a shared payment infrastructure.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-purple-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Gas Efficiency
                  </h3>
                  <p className="text-sm text-gray-700">
                    Reusing an existing contract reduces deployment costs and ensures optimized transaction fees 
                    for all escrow operations.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-orange-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔄</span>
                    Upgradability
                  </h3>
                  <p className="text-sm text-gray-700">
                    If the escrow contract receives updates or improvements, all integrated projects can benefit 
                    without changing their code.
                  </p>
                </div>
              </div>
            </section>

            {/* Code Examples */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Import Declaration</h2>
              <p className="text-gray-700 mb-4">
                The ZKontract contract imports zk_escrow_v2.aleo at the top of the file:
              </p>
              <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">{`import zk_escrow_v2.aleo;

program zkontract_v2.aleo {
    // Bounty mappings and logic...
    
    async transition post_bounty(
        caller: address,
        bounty_id: u64,
        creator_address: address,
        payment_amount: u64
    ) -> Future {
        // Create escrow for this bounty
        let escrow_future: Future = zk_escrow_v2.aleo/create_escrow(
            bounty_id,
            creator_address,
            payment_amount
        );
        
        return finalize_post_bounty(
            escrow_future,
            bounty_id,
            creator_address,
            payment_amount
        );
    }
}`}</pre>
              </div>
            </section>

            {/* Links */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More</h2>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-800">ZKontract Repository:</strong>{' '}
                  <a href="https://github.com/VenomLabsXyz/ZKontract" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    github.com/VenomLabsXyz/ZKontract
                  </a>
                </div>
                <div>
                  <strong className="text-gray-800">ZK Escrow v2 Repository:</strong>{' '}
                  <a href="https://github.com/VenomLabsXyz/ZKescrow" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    github.com/VenomLabsXyz/ZKescrow
                  </a>
                </div>
                <div>
                  <strong className="text-gray-800">Aleo Documentation:</strong>{' '}
                  <a href="https://developer.aleo.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    developer.aleo.org
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

ExamplesPage.getLayout = (page) => <Layout>{page}</Layout>;
export default ExamplesPage;

