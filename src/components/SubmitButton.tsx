import React, { useState } from "react";
import { api } from "~/utils/api";

/**
 * submit button for the admin task completion screen
 */
const SubmitButton = ({
  taskId,
  taskPoints,
  userId,
  refresh,
}: {
  taskId: string | undefined;
  taskPoints: number | undefined;
  userId: string;
  refresh: CallableFunction;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("failed");

  const CompleteTaskMutation = api.quests.completeTask.useMutation();

  const handleComplete = async () => {
    if (taskId !== undefined && taskPoints !== undefined) {
      const result = await CompleteTaskMutation.mutateAsync({
        id: userId,
        taskId: taskId,
        taskPoints: taskPoints,
      });
      return result.status;
    }
  };

  const submit = async () => {
    const status = await handleComplete();
    if (status !== undefined) setStatus(status);
    setIsSubmitted(true);
    setTimeout(() => {
      closeModal();
      refresh();
    }, 100);
  };

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
        className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={openModal}
      >
        Submit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-4/5 rounded-lg bg-white p-6 shadow-md">
            {!isSubmitted ? (
              <div>
                <h2 className="mb-4 text-xl font-bold">Confirmation</h2>
                <p>Are you sure you want to submit?</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                    onClick={() => {
                      submit().catch((error) => {
                        console.log(error);
                      });
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 flex justify-end">{status}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitButton;
