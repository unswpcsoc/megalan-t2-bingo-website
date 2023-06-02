import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { type CleanClubDataType, type ClubNamesType } from "../types/clubs";
import { getSocietyNameType } from "../functions/getSocietyNameType";
import { api } from "~/utils/api";

const CreateTaskForm = ({
  onChange,
  clubs,
}: {
  onChange: CallableFunction;
  clubs: CleanClubDataType[];
}) => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [validPoints, setValidPoints] = useState(false);

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      points: { value: number };
      society: { value: ClubNamesType };
    };
    if (!submit) onChange(false);
    if (!(target.points.value === 100 || target.points.value === 200))
      setValidPoints(false);
    if (
      !(
        target.name.value &&
        (target.points.value === 100 || target.points.value === 200)
      )
    ) {
      // display error for 5 seconds
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      onChange({
        name: target.name.value,
        points: target.points.value,
        society: target.society.value,
      });
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
      {/*  Society Selection Menu */}
      <div>
        <label
          htmlFor="society"
          className="block text-base font-normal leading-6 text-white/80"
        >
          Society
        </label>

        <div className=" mt-2">
          <select
            id="society"
            name="society"
            className="select_society w-full rounded-lg border border-lime-500 p-2"
          >
            {clubs.map((club: CleanClubDataType, index) => {
              return (
                <option key={index} value={club.name}>
                  {getSocietyNameType(club.name).name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {error && (
        <div className="flex flex-row space-x-2 rounded-lg border border-amber-500 bg-amber-900/40 px-4 py-4 text-amber-500">
          <ExclamationCircleIcon className="mt-[1px] h-6 w-6" />
          <div>
            <p className="text-lg">Please Enter All the Details</p>
            {!validPoints && (
              <p className="text-lg">Please use either 100 or 200 points</p>
            )}
          </div>
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
