import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { api } from "~/utils/api";

/**
 * Form that accepts user name and email and send to parent through onChange()
 */
const NameAndEmailForm = ({ onChange }: { onChange: CallableFunction }) => {
  // for displaying errors only after submitting form
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  // api to validate user detail's uniqueness mutation
  const isUserUniqueMutation = api.validate.isUserUnique.useMutation();
  // function to submit form only if details are valid
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
    };
    const email: string = target.email.value;
    const name: string = target.name.value;
    // checks if email and name are unique
    isUserUniqueMutation
      .mutateAsync({
        name: name,
        email: email,
      })
      .then((res) => {
        // TODO: Check If Email Is In Megalan Ticket DB
        setValidName(!res.name);
        setValidEmail(!res.email);
        // if no other users are found with same details send details to parent
        if (!res.found) onChange({ name: name, email: email });
        setFormSent(true);
      })
      .catch(() => {
        console.log("Experienced Error while validating email");
        setFormSent(false);
      });
  };
  return (
    <>
      {/* Email Submission Form */}
      <form id="email-form" className="space-y-6" onSubmit={handleFormSubmit}>
        {/* Information box */}
        <div className="flex flex-row space-x-2 rounded-lg border px-2 py-2">
          <InformationCircleIcon className="my-auto h-6 w-6 flex-shrink-0 text-white" />
          <h1 className="text-white/80">
            Please Use Details Used for your Megalan Ticket Here.
          </h1>
        </div>
        {/* Name Input Section */}
        <div>
          <label
            htmlFor="email"
            className="block text-base font-normal leading-6 text-white/80"
          >
            Name
            <span className="float-right inline text-sm">
              (max 20 characters)
            </span>
          </label>
          <div className="mt-2">
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              maxLength={20}
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Invalid Name Error */}
          {!validName && formSent && (
            <p className="text-sm font-normal text-red-400">
              *Name already taken, consider adding your initials.
            </p>
          )}
        </div>
        {/* Email Address Input Section */}
        <div>
          <label
            htmlFor="email"
            className="block text-base font-normal leading-6 text-white/80"
          >
            Email Address
          </label>
          <div className="mt-2">
            <input
              placeholder="example@gmail.com"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Invalid Email Error */}
          {!validEmail && formSent && (
            <p className="text-sm text-red-400">*Email Already In Use.</p>
          )}
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-400/80 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-teal-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600/80"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
};
export default NameAndEmailForm;
