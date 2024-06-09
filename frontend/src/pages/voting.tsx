import React, { useEffect, useState } from 'react';
import { Voting } from '../utils/types/votings';
import { VotingsService } from '../utils/api';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { VotingForm } from '../features';
import { Pie } from 'react-chartjs-2';
import { countAndSort, randomRGB } from '../utils/helpers';
import { user } from '../utils/constans/user';
import QRCode from "react-qr-code";

const VotingPage: React.FC = () => {
  const {id} = useParams();
  const [voting, setVoting] = useState<Voting>()
  const [chartData, setChartData] = useState<number[]>([])
  const [backgrounds, setBackgrounds] = useState<string[]>([])

  const getVoting = async () => {
    if(!id) return

    const voting = await VotingsService.findOne(id)

    if(!voting) return
    setVoting(voting)

    if(voting.votes) {
      const countedChartData = countAndSort(voting.votes.map((vote) => Number(vote[1])), voting.options.length-1)
      setChartData(countedChartData)

      const bgs = []
      for (let i = 0; i < voting.options.length; i++) {
        bgs.push(randomRGB())
      }
      setBackgrounds(bgs)
    }
  }

  useEffect(() => {
    getVoting()
  }, []);

  if(!voting) return

  return (
    <div className='py-10 bg-white'>
      <div className='w-11/12 px-8 py-10 mx-auto border rounded-lg shadow sm:px-12 sm:w-3/4 md:w-3/5 lg:w-1/2 2xl:w-2/5 bg-gray-50'>
        <div className='flex flex-col justify-between text-2xl text-gray-700 sm:flex-row'>
          <h2>Głosowanie nr. 0{voting.id}</h2>
          <h2 className='font-light'>{format(new Date(`${voting.created_at}`), "dd.MM.yyyy")}</h2>
        </div>
        <hr className='mt-2 mb-8' />
        <div>
          <h1 className='text-3xl font-bold text-left text-red-500 sm:text-4xl'>{voting.title}</h1>
          <p className='mt-5 text-2xl break-words'>{voting.content}</p>
          <p className='mt-5 text-xl'>
            Głosowanie trwa do:
            <span className='ml-2 font-semibold text-red-500'>{format(new Date(+voting.expiration_time), "dd.MM.yyyy")}</span>
          </p>
        </div>
        <hr className='mt-8 mb-8' />
        {
          new Date(+voting.expiration_time + 86400000) > new Date() ?
            voting.id && !user?.votingsIds.includes(voting.id) ?
              <VotingForm voting={voting} type='default' />
            :
              <p className='text-2xl font-bold text-red-500'>Oddałeś już głos w tym głosowaniu!</p>
          :
          <p className='text-2xl font-bold text-red-500'>Głosowanie zostało zakończone!</p>
        }
        <hr className='mt-8 mb-2' />
        <p className='text-lg text-gray-500'>W każdym głosowaniu można oddać głos tylko jeden raz</p>
      </div>
      <div className='flex justify-center mt-8'>
        <div className='flex flex-col items-center justify-center w-11/12 lg:flex-row sm:w-3/4 md:w-3/5 lg:w-1/2 2xl:w-2/5'>
          <div className='w-full p-5 mb-5 mr-0 lg:w-1/2 lg:mb-0 lg:mr-20'>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${window.location.href}`}
              viewBox={`0 0 256 256`}
            />
            <p className='mt-2 text-2xl font-bold text-center text-gray-900'>Udostępnij głosowanie kodem QR</p>
          </div>
          {
            voting.is_visible_before_voting_end ?
              <div className='w-full lg:w-1/2'>
                <Pie data={{
                  labels: [...voting.options],
                  datasets: [
                    {
                      label: 'Głosy',
                      data: chartData,
                      backgroundColor: backgrounds,
                      borderWidth: 1,
                    },
                  ],
                  }}
                />
              </div>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default VotingPage;