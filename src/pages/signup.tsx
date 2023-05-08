import { useState } from "react";
import Layout from "./_layout";
import atlantis from "public/images/atlantis1.jpg";
import Image from "next/image";
import { hash } from "~/components/functions/hash";
import PasswordCreationForm from "~/components/forms/PasswordCreationForm";
import NameAndEmailForm from "~/components/forms/NameAndEmailForm";
import { api } from "~/utils/api";

const SignUp = () => {
  // store current user details in state
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  // api mutation for sign up
  const signUpMutation = api.auth.signup.useMutation();
  // submits form to create new user account and sends validation email
  const handleUserDetailsSubmit = () => {
    // hash password
    const hashedPassword = hash(currentPassword);
    // api request to create new user account
    signUpMutation
      .mutateAsync({
        email: currentEmail,
        password: hashedPassword,
        name: currentName,
      })
      .then((res) => {
        console.log(res.status);
        // TODO: if (res.status) send validation email with numbers
        // enter numbers to verify email
        // redirect to home page
      })
      .catch(() => {
        console.log("Experienced error while signing up");
      });
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 backdrop-blur-[2px] lg:px-8">
        {/* Create Account Header Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {!hasValidEmail ? (
            <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
              Create a new Account
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
              Creating a new Account for {currentName}
            </h2>
          )}
        </div>
        {/* Sign Up Forms */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Display Email or Password Form Based on Sign up progress */}
          {!hasValidEmail ? (
            <NameAndEmailForm
              onChange={(value: { email: string; name: string }) => {
                setCurrentEmail(value.email);
                setCurrentName(value.name);
                setHasValidEmail(true);
              }}
            />
          ) : (
            <PasswordCreationForm
              onChange={(value) => {
                setCurrentPassword(value);
                handleUserDetailsSubmit();
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;
