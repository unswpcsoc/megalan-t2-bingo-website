import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CreateTaskForm = ({ onChange }: { onChange: CallableFunction }) => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      points: { value: number };
    };
    if (!submit) onChange(false);

    if (!(target.name.value && target.points.value)) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      onChange({ name: target.name.value, points: target.points.value });
    }
  };

  return (
    <form
      id="task-form"
      className="space-y-6 rounded-xl border border-white bg-white/10 p-4 backdrop-blur-md"
      onSubmit={handleFormSubmit}
    >
      {/* Task Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-base font-normal leading-6 text-white/80"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            placeholder="Complete ..."
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* Task Points Input */}
      <div>
        <label
          htmlFor="points"
          className="block text-base font-normal leading-6 text-white/80"
        >
          Points
        </label>
        <div className="mt-2">
          <input
            placeholder="100 or 200"
            id="points"
            name="points"
            type="number"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {error && (
        <div className="flex flex-row space-x-2 rounded-lg border border-yellow-500 bg-yellow-900/40 px-4 py-4 text-yellow-500">
          <ExclamationCircleIcon className="mt-[1px] h-6 w-6" />
          <h1 className="text-lg">Please Enter All the Details</h1>
        </div>
      )}
      {/* Submit Button */}
      <div className="flex flex-row space-x-2">
        <button
          onClick={() => {
            setSubmit(false);
            handleFormSubmit;
          }}
          type="submit"
          className="flex w-full flex-col space-x-2 rounded-lg border border-red-500 bg-red-900/40 p-2  text-red-500"
        >
          <h1 className="w-full text-center">Cancel</h1>
        </button>
        <button
          onClick={() => {
            setSubmit(true);
            handleFormSubmit;
          }}
          className="flex w-full flex-col space-x-2 rounded-lg border border-green-500 bg-green-900/40 p-2  text-green-500"
        >
          <h1 className="w-full text-center">Create Task</h1>
        </button>
      </div>
    </form>
  );
};
export default CreateTaskForm;
