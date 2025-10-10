import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletNotConnectedError } from '@demox-labs/aleo-wallet-adapter-base';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Uncomment this line to enable the animated background ✨
// const GLSLBackground = dynamic(() => import('../utils/GLSLBackground'), { ssr: false });

const MainPage: NextPageWithLayout = () => {
  const { publicKey } = useWallet();
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }
      router.push('/dashboard'); // Change to your target route
    } catch (error) {
      alert('Please connect your wallet to continue.');
    }
  };

  return (
    <>
      <NextSeo
        title="ZK Escrow"
        description="A Zero Knowledge Escrow Application"
      />

      {/* Optional: Background animation */}
      {/* <GLSLBackground /> */}

      <div className="fixed inset-0 bg-primary bg-opacity-80 z-10 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center tracking-tight text-primary-content sm:text-6xl">
          ZK Escrow v2
        </h1>
        <p className="mt-4 text-lg text-center text-primary-content max-w-2xl">
          A trustless escrow service on Aleo using <span className="font-mono text-xl">zk_escrow_v2.aleo</span>
        </p>
        <p className="mt-2 text-base text-center text-primary-content max-w-2xl opacity-90">
          Securely hold funds between parties with zero-knowledge proofs. No intermediaries, no trust required.
        </p>

        <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 max-w-xl">
          <h3 className="text-xl font-bold text-primary-content mb-3">How it works:</h3>
          <ul className="text-sm text-primary-content space-y-2 text-left">
            <li>🔒 <strong>Create:</strong> Deposit credits into escrow with a unique ID</li>
            <li>✅ <strong>Release:</strong> Sender approves and releases funds to recipient</li>
            <li>💰 <strong>Claim:</strong> Recipient claims their escrowed funds</li>
            <li>❌ <strong>Cancel:</strong> Either party can cancel and return funds</li>
          </ul>
        </div>

        <div className="flex flex-col items-center mt-10 space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <Button
            onClick={handleButtonClick}
            className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-lg"
          >
            {publicKey ? 'Enter App →' : 'Connect Wallet to Get Started'}
          </Button>
        </div>
      </div>
    </>
  );
};

MainPage.getLayout = (page) => <Layout>{page}</Layout>;
export default MainPage;
