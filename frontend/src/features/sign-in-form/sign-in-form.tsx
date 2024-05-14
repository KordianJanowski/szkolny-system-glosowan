import React from 'react';
import { useForm } from "react-hook-form"
import { SignInInputs, signInFormSchema } from './sign-in-form.config';
import useSignInForm from './use-sign-in-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const SignInForm: React.FC = () => {
  const { signIn, loading, isError, errorMsg } = useSignInForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(signInFormSchema)
  })

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="p-6">
          <div className="flex justify-center mx-auto">
            <div className='p-3 bg-red-500 rounded-full'>
              <FontAwesomeIcon className='text-white' size='2xl' icon={faCheckToSlot} />
            </div>
          </div>

          <h3 className="mt-3 text-2xl font-medium text-center text-gray-800">Logowanie</h3>

          <p className="mt-1 text-lg text-center text-gray-600">Zaloguj się kontem Librus</p>

          <form onSubmit={handleSubmit(signIn)}>
              <div className="w-full mt-4">
                <input {...register("login")} className="block w-full px-4 py-2 mt-2 text-lg text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-red-300" type="text" placeholder="Login" aria-label="Login" />
                {errors.login && <p className='text-red-500'>{errors.login.message}</p>}
              </div>

              <div className="w-full mt-4">
                <input {...register("password")} className="block w-full px-4 py-2 mt-2 text-lg text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-red-300" type="password" placeholder="Hasło" aria-label="Hasło" />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button type="submit" className="px-6 py-2 font-medium tracking-wide text-white transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                  {
                    loading ?
                      <div className='flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        <p className='ml-2 font-semibold'>Ładowanie</p>
                      </div>
                    :
                      "Zaloguj się"
                  }
                </button>
              </div>
              <p className='mt-2 font-semibold text-red-500'>{isError && errorMsg}</p>
          </form>
      </div>
   </div>
    // <form onSubmit={handleSubmit(signIn)} className='w-1/6'>
    //   <div className='my-5'>
    //     <div className='flex flex-col text-xl'>
    //       <label>Login</label>
    //       <input
    //         className='border border-black'
    //         type="text"
    //         {...register("login")}
    //       />
    //       {errors.login && <p className='text-lg text-red-500'>{errors.login.message}</p>}
    //     </div>
    //     <div className='flex flex-col text-xl'>
    //       <label>Hasło</label>
    //       <input
    //         className='border border-black'
    //         type="password"
    //         {...register("password")}
    //       />
    //       {errors.password && <p className='text-lg text-red-500'>{errors.password.message}</p>}
    //     </div>
    //   </div>
    //   <input
    //     type="submit"
    //     value="Zaloguj się"
    //     className='p-3 mt-3 duration-200 transform bg-red-400 border border-black rounded hover:cursor-pointer hover:bg-red-500'
    //   />
    //   <p className='mt-3 text-2xl'></p>
    // </form>
  )
}

export default SignInForm;