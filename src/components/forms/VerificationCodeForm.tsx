import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const VerificationCodeForm = ({
  code,
  onChange,
}: {
  code: string;
  onChange: CallableFunction;
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      code: { value: string };
    };
    const enteredCode: string = target.code.value;
    if (enteredCode !== code) setIsVerified(false);
    if (enteredCode === code) {
      onChange(true);
      return;
    }
    setFormSent(true);
  };

  return (
    <>
      {/* Verification Code Submission Form */}
      <form
        id="verification-form"
        className="space-y-6"
        onSubmit={handleFormSubmit}
      >
        {/* Information box */}
        <div className="flex flex-row space-x-2 rounded-lg border px-2 py-2">
          <InformationCircleIcon className="my-auto h-6 w-6 flex-shrink-0 text-white" />
          <h1 className="text-white/80">
            Please check your email Inbox and Spam for a verification code.
          </h1>
        </div>
        {/* Verification Code Input Section */}
        <div>
          <label
            htmlFor="code"
            className="block text-base font-normal leading-6 text-white/80"
          >
            Verification Code
          </label>
          <div className="mt-2">
            <input
              placeholder="Verification Code"
              id="code"
              name="code"
              type="text"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Invalid Name Error */}
          {!isVerified && formSent && (
            <p className="text-sm font-normal text-red-400">
              *Invalid Code Entered.
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

export default VerificationCodeForm;
