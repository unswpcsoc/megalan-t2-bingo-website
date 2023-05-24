import { useState, type SyntheticEvent } from "react";
import { api } from "~/utils/api";

/*
 * Form that takes an email as input and returns the email address with onChange
 */
const AskNameForm = ({
  onChange,
}: {
  name: string;
  onChange: FunctionStringCallback;
}) => {
  const [validName, setValidName] = useState(false);
  const [formSent, setFormSent] = useState(false);
  // api mutation to send verification email and check if email exists
  const findUserMutation = api.validate.findUserWithName.useMutation();
  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };
    const name: string = target.name.value.toLowerCase();
    // make api call to verify and send code to email
    findUserMutation
      .mutateAsync({ name })
      .then((res) => {
        if (res.found) setValidName(true);
        onChange(name);
        return;
      })
      .catch(() => setValidName(false));
    setFormSent(true);
  };
  return (
    <>
      {/* Username Submission Form */}
      <form id="email-form" className="space-y-6" onSubmit={handleFormSubmit}>
        {/* Username Input Section */}
        <div>
          <label
            htmlFor="name"
            className="block text-base font-normal leading-6 text-white/80"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              placeholder="username"
              id="name"
              name="text"
              type="text"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Invalid Username Error */}
          {!validName && formSent && (
            <p className="text-sm text-red-400">
              *Account with provided name does not exist.
            </p>
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

export default AskNameForm;
