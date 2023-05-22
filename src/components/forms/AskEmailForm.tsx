import { useState, type SyntheticEvent } from "react";
import { api } from "~/utils/api";

/*
 * Form that takes an email as input and returns the email address with onChange
 */
const AskEmailForm = ({ onChange }: { onChange: FunctionStringCallback }) => {
  const [validEmail, setValidEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  // api mutation to send verification email and check if email exists
  const forgotPasswordMutation = api.auth.forgotPassword.useMutation();
  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    const email: string = target.email.value;
    // make api call to verify and send code to email
    forgotPasswordMutation
      .mutateAsync({ email })
      .then((res) => {
        setValidEmail(true);
        return onChange(res.code);
      })
      .catch(() => setValidEmail(false));
    setFormSent(true);
  };
  return (
    <>
      {/* Email Submission Form */}
      <form id="email-form" className="space-y-6" onSubmit={handleFormSubmit}>
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
            <p className="text-sm text-red-400">
              *Account with provided email does not exist.
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

export default AskEmailForm;
