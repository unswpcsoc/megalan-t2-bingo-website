const PasswordCreationForm = ({
  onChange,
}: {
  onChange: FunctionStringCallback;
}) => {
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      password: { value: string };
    };
    const password: string = target.password.value;
    console.log(password);
    onChange(password);
    // hash the password here
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
              htmlFor="confirm-password"
              className="block text-base font-normal leading-6 text-white/80"
            >
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="confirm password"
              autoComplete="current-password"
              required
              minLength={10}
              maxLength={20}
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
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
