import React, { useState } from 'react';
import { api } from '~/utils/api';

const SubmitButton = ({ taskId, taskPoints, userId, refresh }: 
  { taskId: string|undefined, taskPoints: number|undefined, userId: string, refresh: CallableFunction }) => {
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState('failed');

  const CompleteTaskMutation = api.quests.completeTask.useMutation();
  
  const handleComplete = async () => {
    if (taskId !== undefined && taskPoints !== undefined) {
     const result = await CompleteTaskMutation.mutateAsync({id: userId, taskId: taskId, taskPoints: taskPoints});
     return result.status;
    }
  }


  const submit = async () => {
    const status = await handleComplete();
    if (status !== undefined)
      setStatus(status);
    setIsSubmitted(true);
    setTimeout(() => {
      closeModal();
      refresh();
    }, 1000);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Submit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white w-4/5 p-6 rounded-lg shadow-md">
            {!isSubmitted ? <div>

            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to submit?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  submit().catch((error) => {console.log(error)});
                }}
              >
                Confirm
              </button>
            </div>
            </div>
            : <>
            <div className="mt-4 flex justify-end">
              {status}
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitButton;
