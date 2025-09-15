import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { NETWORK, RPC_URL } from '@/config/network';

export const CURRENT_NETWORK = NETWORK;
export const CURRENT_RPC_URL = RPC_URL;

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

// src/types/index.ts
export type ProposalData = {
  bountyId: number;
  proposalId: number;
  proposerAddress: string;
  proposalText?: string;
  fileName?: string;
  fileUrl?: string;
  status?: string;
  rewardSent?: boolean;
};

export type BountyData = {
  id: number;
  title: string;
  reward: string;
  deadline: string;
  creatorAddress: string;
  proposals?: ProposalData[];
};

export const PROGRAM_ID = 'zk_escrow_v2.aleo';
