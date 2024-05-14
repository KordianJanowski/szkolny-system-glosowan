import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
  text: string
  subtext: string
  icon: IconDefinition
  isModalOpened: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  confirmAction: () => void
}

const ConfirmModal: React.FC<Props> = (props) => {
  const { text, subtext, icon, isModalOpened, setIsModalOpened, confirmAction } = props

  return (
    <>
      {
        isModalOpened &&
          <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center bg-gray-900 bg-opacity-75 sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className="flex items-center justify-center">
                          <FontAwesomeIcon icon={icon} size='xl' />
                        </div>

                        <div className="mt-2 text-center">
                            <h3 className="text-xl font-medium leading-6 text-gray-800" id="modal-title">{text}</h3>
                            <p className="mt-2 text-gray-500 text">{subtext}</p>
                        </div>
                    </div>

                    <div className="mt-5 sm:flex sm:items-center sm:justify-between">
                        <div className="flex flex-row items-center justify-center w-full">
                            <button onClick={() => setIsModalOpened(false)} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mr-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Anuluj
                            </button>
                            <button onClick={confirmAction} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40">
                                Potwierdź
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      }
    </>
  )
}

export default ConfirmModal;