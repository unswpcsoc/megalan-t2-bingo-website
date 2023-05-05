import Image from "next/image";
import atlantis from "~/../public/atlantis1.jpg";
import Layout from "~/pages/_layout";

const Login = () => {
  // gets values from sign in form and submits them
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email: string = target.email.value;
    const password: string = target.password.value;
    console.log(email);
    console.log(password);
    // TODO:
    // Hash Details and Send to Login Api Route
    // Validate Details
    // Update user session data
  };

  return (
    <Layout>
      {/* Background Image and Fill Color */}
      <div className="absolute -z-50 h-full w-full bg-sky-800">
        <Image
          src={atlantis}
          alt="atlantis"
          className="relative -z-30 h-screen w-full bg-center object-cover opacity-60 "
        />
      </div>
      {/* Sign up Header Section */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 backdrop-blur-sm lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white/90">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Sign Up Form */}
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleFormSubmit}
          >
            {/* Username Input Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-white/80"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="example@gmail.com"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password Input Field */}
            <div>
              <div className="flex items-center justify-between drop-shadow-md">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-white/80"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-teal-400/80 hover:text-teal-200/80"
                  >
                    Forgot password?
                  </a>
                </div>
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
                  maxLength={20}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-400/80 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600/80"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* Sign Up Details */}
          <p className="mt-10 text-center text-base text-white/80">
            Not a member yet?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-teal-400/80 hover:text-teal-200/80"
            >
              Sign Up!
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
