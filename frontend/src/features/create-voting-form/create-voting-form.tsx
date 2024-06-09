import React from 'react';
import useCreateVotingForm from './use-create-voting-form';
import { useForm, Controller } from 'react-hook-form';
import { CreateVotingInputs, getVotingFormSchema } from './create-voting-form.config';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Switch from "@mui/material/Switch";

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
    control,
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
        <input {...register("expiration_time")} min={new Date().toJSON().slice(0, 10)} type="date" placeholder="John Doe" className="block mt-1 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 text-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40" />
        {errors.expiration_time && <p className='text-red-500'>{errors.expiration_time.message}</p>}
      </div>
      <div className='mt-3'>
        <label className="block text-gray-500">Wyświetlanie wykresu przed zakończeniem głosowania</label>
        <div className='scale-125 w-14'>
          <Controller
            name="is_visible_before_voting_end"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch color='default' size='medium' checked={value} onChange={onChange} />
            )}
          />
        </div>
        {errors.is_visible_before_voting_end && <p className='text-red-500'>{errors.is_visible_before_voting_end.message}</p>}
      </div>
      <button disabled={loading} onClick={handleSubmit(createVoting)} className='block w-full mt-5 bg-red-500 border border-gray-200 rounded-lg px-5 py-2.5 text-white font-semibold hover:bg-red-600 hover:cursor-pointer transform duration-150'>
        {`${loading ? "Ładowanie..." : "Utwórz głosowanie"}`}
      </button>
    </form>
  )
}

export default CreateVotingForm;