import React from 'react';
import useCreateVotingForm from './use-create-voting-form';
import { useForm } from 'react-hook-form';
import { CreateVotingInputs, getVotingFormSchema } from './create-voting-form.config';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export interface CreateVotingFormProps {
  type: 'default' | 'blockchain'
}

const CreateVotingForm: React.FC<CreateVotingFormProps> = ({ type }) => {
  const { createVoting, loading, votingOptions, setVotingOptions } = useCreateVotingForm({ type })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateVotingInputs>({
    resolver: yupResolver(getVotingFormSchema(votingOptions))
  })

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-gray-500">Tytuł</label>
        <input {...register("title")} type="text" placeholder="Przykładowe głosowanie" className="block mt-1 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 text-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40" />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>
      <div className='mt-3'>
        <label className="block text-gray-500">Opis</label>
        <textarea {...register("content")} placeholder="Przykładowy opis" className="block mt-1 w-full text-lg placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"></textarea>
        {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
      </div>
      <div className='mt-3'>
        <label className="block text-gray-500">Dostępne opcje głosowania (dodaj opcję klawiszem Enter)</label>
        <input
          {...register("options")}
          type="text"
          placeholder="Przykładowa opcja"
          onKeyUp={async (e) => {
            if(e.key === "Enter") {
              await setVotingOptions(votingOptions => [...votingOptions, watch("options") as string])
              setValue("options", "")
            }
          }}
          className="block mt-1 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 text-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
        />
        {errors.options && <p className='text-red-500'>{errors.options.message}</p>}
        <div className='flex flex-row flex-wrap w-full'>
        {
          votingOptions.map((option, _index) => {
            return (
              <div key={_index} className='flex items-center justify-center px-2 mt-2 mr-2 bg-red-200 border-2 border-red-300 rounded-lg'>
                  <button
                   onMouseDown={() => {
                     const temp = [...votingOptions];
                     temp.splice(_index, 1);
                     setVotingOptions(temp);
                    }}
                    className='mr-2'
                    >
                    <FontAwesomeIcon size='sm' icon={faX} />
                  </button>
                  <span>{option}</span>
                </div>
            )
          })
        }
        </div>
      </div>
      <div className='mt-3'>
        <label className="block text-gray-500">Data zakończenia głosowania</label>
        <input {...register("expiration_time")} type="date" placeholder="John Doe" className="block mt-1 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 text-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40" />
        {errors.expiration_time && <p className='text-red-500'>{errors.expiration_time.message}</p>}
      </div>
      <div className='mt-3'>
        <label className="block text-gray-500">Wyświetlanie wykresu przed zakończeniem głosowania</label>
        <input type="checkbox" value="" className="sr-only peer" checked />
        <div className="relative w-[3.75rem] h-8 bg-gray-200 rounded-full mt-1 peer peer-focus:ring-4 peer-focus:ring-red-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-red-600"></div>
      </div>
      <button disabled={loading} onClick={handleSubmit(createVoting)} className='block w-full mt-5 bg-red-500 border border-gray-200 rounded-lg px-5 py-2.5 text-white font-semibold hover:bg-red-600 hover:cursor-pointer transform duration-150'>
        {`${loading ? "Ładowanie..." : "Utwórz głosowanie"}`}
      </button>
    </form>
  )
}

export default CreateVotingForm;