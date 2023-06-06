import Link from "next/link";
import { hash } from "~/components/functions/hash";
import Layout from "../_layout";
import { useState } from "react";
import { type NextPage } from "next/types";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

/**
 * Standard Login Page
 */
const Login: NextPage = () => {
  const [validName, setValidName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const router = useRouter();
  // accepts user details from sign in form and logs in user
  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // defines form inputs
    const target = event.target as typeof event.target & {
      name: { value: string };
      password: { value: string };
    };
    const name: string = target.name.value.toLowerCase();
    const password: string = hash(target.password.value);
    // sign in user with next-auth
    signIn("credentials", {
      name: name,
      password: password,
      redirect: false,
    })
      .then(async (res) => {
        res?.error === "user not found"
          ? setValidName(false)
          : setValidName(true);
        res?.error === "wrong password"
          ? setValidPassword(false)
          : setValidPassword(true);

        if (res?.ok) await router.push("/user/quests");
      })
      .catch((err) => {
        err === "user not found" ? setValidName(false) : setValidName(true);
        err === "wrong password"
          ? setValidPassword(false)
          : setValidPassword(true);
      });
    setFormSent(true);
  };

  return (
    <Layout>
      {/* Sign up Header Section */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white/90">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Sign Up Form */}
          <form className="space-y-6" action="#" onSubmit={handleFormSubmit}>
            {/* Username Input Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium leading-6 text-white/80"
              >
                Username
                <span className="float-right inline-block">
                  (case insensitive)
                </span>
              </label>
              <div className="mt-2">
                <input
                  placeholder="username"
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Invalid Email Error */}
              {!validName && formSent && (
                <p className="text-sm font-normal text-red-400">
                  *Account with this name not found.
                </p>
              )}
            </div>
            {/* Password Input Field */}
            <div>
              <div className="z-0 flex items-center justify-between drop-shadow-md">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-white/80"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/auth/reset"
                    className="font-semibold text-teal-400/80 hover:text-teal-200/80"
                  >
                    Forgot password?
                  </Link>
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
              href="/auth/signup"
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
