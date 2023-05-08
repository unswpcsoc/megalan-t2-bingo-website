import { useState } from "react";
import Layout from "./_layout";
import atlantis from "~/../public/atlantis1.jpg";
import Image from "next/image";
import { NameEmailForm } from "~/components/NameEmailForm";
import { PasswordForm } from "~/components/PasswordForm";
import { hash } from "./api/auth/[hash]";
import { api } from "~/utils/api";

const SignUp = () => {
  // has email input
  // checks if account already exists with email
  // enter password input
  // re-enter password input
  // submit form data
  // hash details
  // send thru api
  // send user a validation link in gmail
  // check if validation link clicked
  // re-direct to login page

  // stores current user details
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  // sign up user api
  const { mutate: signUp } = api.user.createUser.useMutation();

  // submits form to create new user account and sends validation email
  const handleUserDetailsSubmit = () => {
    // send validate
    // send the hashed login details to api
    const hashedPassword = hash(currentPassword);
    console.log(currentName);
    console.log(currentEmail);
    console.log(currentPassword);
    signUp({
      name: currentName,
      email: currentEmail,
      password: hashedPassword,
    });
  };

  return (
    <>
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
          {/* Display Email or Password Form Based on Progress */}
          {!hasValidEmail ? (
            <NameEmailForm
              onChange={(value: { email: string; name: string }) => {
                setCurrentEmail(value.email);
                setCurrentName(value.name);
                setHasValidEmail(true);
              }}
            />
          ) : (
            <PasswordForm
              onChange={(value) => {
                setCurrentPassword(value);
                handleUserDetailsSubmit();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default SignUp;
