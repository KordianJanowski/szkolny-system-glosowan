import React, { useEffect, useState } from 'react';
import { user } from '../utils/constans/user';
import { LinkCard, SearchInput } from '../features';
import { faBitcoinSign, faCircleNotch, faInfo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { isUserAdmin } from '../utils/helpers/permissions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VotingsService } from '../utils/api';
import { Voting } from '../utils/types/votings';
import { VotingCard } from '../features/components';
import { VotingSystemContract } from '../smart_contract/services';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const Home: React.FC = () => {
  const [votings, setVotings] = useState<Voting[]>([])
  const [blockchainVotings, setBlockchainVoting] = useState<Voting[]>([])
  const [allVotings, setAllVotings] = useState<Voting[]>([])
  const [allBlockchainVotings, setAllBlockchainVoting] = useState<Voting[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getVotings = async () => {
    const votings =  await VotingsService.findAll()

    if(!votings) return
    setVotings(votings)
    setAllVotings(votings)
    setLoading(false)

    const blockchainVotings =  (await VotingSystemContract.getVotings()).map(voting => {
      return {
        id: Number(voting[0]),
        created_at: String(new Date()),
        title: voting[2],
        content: voting[3],
        options: voting[1],
        expiration_time: Number(voting[4])
      } as Voting
    })
    setBlockchainVoting(blockchainVotings)
    setAllBlockchainVoting(blockchainVotings)
  }

  useEffect(() => {
    setVotings(allVotings)
  }, [allVotings]);

  useEffect(() => {
    getVotings()
  }, []);

  return (
    <div>
      <div className='pb-10 bg-white border-b pt-7'>
        <div className='w-3/5 mx-auto'>
          <h1 className='text-3xl font-semibold text-center'>
            Witaj, {user?.name}!
            { isUserAdmin() && <span className='ml-2 font-light'>(Administrator)</span> }
          </h1>
          <div className='flex items-center justify-center mt-10'>
            { isUserAdmin() && <LinkCard text='Dodaj głosowanie' linkAddress='/create-voting' icon={faPlus} /> }
            { isUserAdmin() && <LinkCard text='Dodaj głosowanie blockchain' linkAddress='/create-voting-blockchain' icon={faBitcoinSign} /> }
            <LinkCard text='Informacje' linkAddress='/informations' icon={faInfo} />
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <div className="flex justify-center mt-4 text-xl">
            <Tab selectedClassName="bg-red-500 text-white outline-none rounded-lg" className="p-2 px-3">
              Głosowania
            </Tab>
            <Tab selectedClassName="bg-red-500 text-white outline-none rounded-lg" className="p-2 px-3">
              Głosowania z użyciem blockchain
            </Tab>
          </div>
        </TabList>

        <TabPanel>
          <div className='w-2/5 py-10 mx-auto'>
            <h1 className='mb-3 text-3xl font-semibold'>Aktualne głosowania</h1>
            <SearchInput allVotings={allVotings} setVotings={setVotings}/>
            <div>
              {
                loading ?
                  <div className='flex flex-row items-center mt-2 text-xl font-semibold'>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                    <p className='ml-2'>Ładowanie</p>
                  </div>
                :
                  votings.length > 0 ?
                    <div>
                      <section className="text-gray-600 body-font">
                        <div className="container py-12 mx-auto">
                          <div className="px-5 -my-8 bg-white border divide-y-2 divide-gray-100 rounded-lg">
                            { votings.map(voting => {
                              return (
                                <VotingCard
                                  key={voting.id}
                                  voting={voting}
                                  setAllVotings={setAllVotings}
                                  type='default'
                                />
                              )
                            })}
                          </div>
                        </div>
                      </section>
                    </div>
                  :
                    <p className='mt-2 text-xl font-semibold text-red-500'>Brak dostępnych głosowań</p>
              }
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='w-2/5 py-10 mx-auto'>
            <h1 className='mb-3 text-3xl font-semibold'>Aktualne głosowania z użyciem blockchain</h1>
            <SearchInput allVotings={allBlockchainVotings} setVotings={setBlockchainVoting}/>
            <div>
              {
                loading ?
                  <div className='flex flex-row items-center mt-2 text-xl font-semibold'>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                    <p className='ml-2'>Ładowanie</p>
                  </div>
                :
                  blockchainVotings.length > 0 ?
                    <div>
                      <section className="text-gray-600 body-font">
                        <div className="container py-12 mx-auto">
                          <div className="px-5 -my-8 bg-white border divide-y-2 divide-gray-100 rounded-lg">
                            { blockchainVotings.map(voting => {
                              return (
                                <VotingCard
                                  key={voting.id}
                                  voting={voting}
                                  setAllVotings={setAllBlockchainVoting}
                                  type='blockchain'
                                />
                              )
                            })}
                          </div>
                        </div>
                      </section>
                    </div>
                  :
                    <p className='mt-2 text-xl font-semibold text-red-500'>Brak dostępnych głosowań</p>
              }
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Home;