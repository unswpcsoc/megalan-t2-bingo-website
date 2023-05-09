import Image from "next/image";
import atlantis from "public/images/atlantis1.jpg";
// import Layout from "~/pages/_layout";
import Link from "next/link";
import { hash } from "~/components/functions/hash";
import Layout from "./_layout";
import { api } from "~/utils/api";
import { useState } from "react";

const Login = () => {
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [formSent, setFormSent] = useState(false);
  // api mutation for login
  const loginMutation = api.auth.login.useMutation();
  // accepts user details from sign in form and logs in user
  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    // defines form inputs
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email: string = target.email.value;
    const password: string = hash(target.password.value);
    loginMutation
      .mutateAsync({ email, password })
      .then((res) => {
        if (!res.found) setValidEmail(false); // if invalid email
        if (!res.passwordMatch) setValidPassword(false); // if invalid password
        setFormSent(true);
        // TODO: redirect to home page
      })
      .catch((err) => {
        console.log(err);
        console.log("Experienced error while logging in");
        setFormSent(false);
      });
  };

  return (
    <Layout>
      {/* Background Image and Fill Color */}
      <div className="absolute -z-50 h-full w-full bg-sky-800">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={atlantis}
          alt="atlantis"
          className="relative -z-30 h-screen w-full bg-center object-cover opacity-60 "
        />
      </div>
      {/* Sign up Header Section */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 backdrop-blur-[2px] lg:px-8">
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
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Invalid Email Error */}
              {!validEmail && formSent && (
                <p className="text-sm font-normal text-red-400">
                  *Account with this email not found.
                </p>
              )}
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
                  maxLength={30}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Incorrect Password Error */}
              {!validPassword && formSent && (
                <p className="text-sm font-normal text-red-400">
                  *Wrong Password
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
          {/* Sign Up Details */}
          <p className="mt-10 text-center text-base text-white/80">
            Not a member yet?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-teal-400/80 hover:text-teal-200/80"
            >
              Sign Up!
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
