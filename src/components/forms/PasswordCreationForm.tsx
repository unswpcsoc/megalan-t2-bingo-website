import { useState } from "react";
import { hash } from "../functions/hash";

/**
 * Form that accepts and confirms a password and
 * sends hashed version of password to parent through onChange()
 */
const PasswordCreationForm = ({
  onChange,
}: {
  onChange: FunctionStringCallback;
}) => {
  const [matchingPassword, setMatchingPassword] = useState(true);
  // displays a warning if the password does not match only after form is submitted
  const [formSent, setFormSent] = useState(false);

  // submits the form and checks if passwords match
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      password: { value: string };
      passwordConfirmed: { value: string };
    };
    const password: string = target.password.value;
    const confirmedPassword: string = target.passwordConfirmed.value;
    // if passwords match, hash it and send through onChange() to parent
    if (password === confirmedPassword) {
      setMatchingPassword(true);
      return onChange(hash(password));
    } else {
      // if passwords do not match set flag to display error message
      setMatchingPassword(false);
    }
    setFormSent(true);
  };
  return (
    <>
      {/* Password Submission Form */}
      <form
        id="password-form"
        className="space-y-6"
        onSubmit={handleFormSubmit}
      >
        {/* Password Input Field */}
        <div>
          <div className="flex items-center justify-between drop-shadow-md">
            <label
              htmlFor="password"
              className="block text-base font-normal leading-6 text-white/80"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              minLength={10}
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* Confirm Password Input Field */}
        <div>
          <div className="flex items-center justify-between drop-shadow-md">
            <label
              htmlFor="passwordConfirmed"
              className="block text-base font-normal leading-6 text-white/80"
            >
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="passwordConfirmed"
              name="passwordConfirmed"
              type="password"
              placeholder="confirm password"
              autoComplete="current-password"
              required
              minLength={10}
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Password not Matching Error */}
          {!matchingPassword && formSent && (
            <p className="text-sm font-normal text-red-400">
              *Passwords do not match.
            </p>
          )}
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-400/80 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-teal-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600/80"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};
export default PasswordCreationForm;
