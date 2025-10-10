import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base';
import { NETWORK, RPC_URL } from '@/config/network';

// Use the WalletAdapterNetwork enum for transactions
export const CURRENT_NETWORK: WalletAdapterNetwork = WalletAdapterNetwork.MainnetBeta;
export const CURRENT_RPC_URL = RPC_URL;

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export const PROGRAM_ID = 'zk_escrow_v2.aleo';
