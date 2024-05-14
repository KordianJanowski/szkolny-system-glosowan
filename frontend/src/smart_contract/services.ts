import { ethers } from 'ethers';
import { VOTING_SYSTEM_ABI, ethereum, VOTING_SYSTEM_ADDRESS } from '.';
import { BVote, BVoting } from './types';

export const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const votingSystemContract = new ethers.Contract(
    VOTING_SYSTEM_ADDRESS,
    VOTING_SYSTEM_ABI,
    signer
  );

  return votingSystemContract as unknown as VotingSystemClass;
};


class VotingSystemClass {
  public async getVotings (): Promise<BVoting[]> {
    const contract = await createEthereumContract();
    return await contract.getVotings();
  }

  public async getVoting (voting_id: number): Promise<BVoting> {
    const contract = await createEthereumContract();
    return await contract.getVoting(voting_id);
  }

  public async addVoting (options: string[], title: string, content: string, expiration_time: number): Promise<void> {
    const contract = await createEthereumContract();
    await contract.addVoting(options, title, content, expiration_time);
  }

  public async getVotes (): Promise<BVote[]> {
    const contract = await createEthereumContract();
    return await contract.getVotes();
  }

  public async addVote (voting_id: number, option: number, hash: string): Promise<void> {
    const contract = await createEthereumContract();
    await contract.addVote(voting_id, option, import.meta.env.VITE_HASH);
  }

  public async getVoterVotingsIds (): Promise<BigInt[]> {
    const contract = await createEthereumContract();
    return await contract.getVoterVotingsIds();
  }

  public async setHash (hash: string): Promise<void> {
    const contract = await createEthereumContract();
    return await contract.setHash(hash);
  }
}

export const VotingSystemContract = new VotingSystemClass()