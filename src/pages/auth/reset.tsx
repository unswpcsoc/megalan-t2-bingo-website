import { type NextPage } from "next";
import Layout from "../_layout";
import PasswordCreationForm from "~/components/forms/PasswordCreationForm";
import { useState } from "react";
import VerificationCodeForm from "~/components/forms/VerificationCodeForm";
import { api } from "~/utils/api";
import Link from "next/link";
import AskNameAndTicketForm from "~/components/forms/AskNameAndTicketForm";
import { hideEmail } from "~/components/functions/hideEmail";

const Reset: NextPage = () => {
  // STEPS:
  // 1. show ask for name and megaLAN ticket order ID
  // 2. send email to user and show verification code form
  // 3. show password reset form
  // 4. redirect to login page
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // api mutation to change user password
  const changePasswordMutation = api.auth.changePassword.useMutation();

  const showCorrectForm = () => {
    switch (step) {
      case 1:
        return (
          <AskNameAndTicketForm
            onChange={(res: { name: string; code: string; email: string }) => {
              setName(res.name);
              setEmail(res.email);
              setCode(res.code);
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <VerificationCodeForm
            code={code}
            onChange={(res: boolean) => res && setStep(3)}
          />
        );
      case 3:
        return (
          <PasswordCreationForm
            onChange={(res) => {
              changePasswordMutation
                .mutateAsync({ name, password: res })
                .then(() => console.log("Changed Password"))
                .catch(() => console.log("Error while changing password"));
              setStep(4);
            }}
          />
        );
      default:
        return (
          <div className="flex justify-center">
            <Link
              href="/auth/login"
              className="w-fit rounded-full bg-white/10 px-10 py-3 text-2xl font-bold text-white no-underline transition hover:bg-white/20"
            >
              Login
            </Link>
          </div>
        );
    }
  };

  const showCorrectHeader = () => {
    switch (step) {
      case 1:
        return "Enter your Account Username";
      case 2:
        return `Enter the Verification code sent to ${hideEmail(email)}`;
      case 3:
        return "Enter new password";
      case 4:
        return "Successfully changed Password, Try Logging In";
      default:
        return "Re-directing to login page";
    }
  };

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Create Account Header Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
            {showCorrectHeader()}
          </h2>
        </div>
        {/* Sign Up Forms */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Display Email or Password or Verification Form Based on Sign up progress */}
          {showCorrectForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Reset;
