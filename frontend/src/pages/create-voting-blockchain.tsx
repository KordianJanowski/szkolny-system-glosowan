import React from 'react';
import { CreateVotingForm } from '../features';
import { redirectWhenNotAdmin } from '../utils/helpers/redirect';
import { useAccountStore } from '../utils/zustand/account';
import { connectWallet } from '../smart_contract/connect';

const CreateVoting: React.FC = () => {
  const { account, setAccount } = useAccountStore();
  redirectWhenNotAdmin()

  return (
    <div className='w-2/5 py-10 mx-auto'>
      {account === '' ? (
        <div>
          <h1 className='mb-5 text-3xl font-semibold text-gray-700'>Aby utworzyć głosowanie z użyciem blockchain musisz mieć połączony portfel (za pomocą np: MetaMask)</h1>
          <button onClick={async () => {
            const account = await connectWallet()
            setAccount(account ?? '')
          }} className='px-8 py-2 text-lg font-medium text-white duration-100 bg-red-500 rounded-lg hover:bg-red-600'>
            Połącz portfel
          </button>
        </div>
      ): (
        <>
          <h1 className='mb-5 text-3xl font-semibold text-gray-700'>Utwórz głosowanie z użyciem blockchain</h1>
          <CreateVotingForm type='blockchain' />
        </>
      )}
    </div>
  )
}

export default CreateVoting;