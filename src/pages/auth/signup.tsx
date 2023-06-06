import { useState } from "react";
import Layout from "../_layout";
import PasswordCreationForm from "~/components/forms/PasswordCreationForm";
import { api } from "~/utils/api";
import VerificationCodeForm from "~/components/forms/VerificationCodeForm";
import { useRouter } from "next/router";
import { type NextPage } from "next/types";
import { signIn } from "next-auth/react";
import NameEmailAndTicketForm from "~/components/forms/NameEmailAndTicketForm";

/**
 * Standard user sign up Page
 */
const SignUp: NextPage = () => {
  const router = useRouter();
  // store current user details in state
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentTicketID, setCurrentTicketID] = useState("");
  // flags for displaying forms
  const [currentCode, setCurrentCode] = useState("");
  // api mutation for sign up and for sending verification code to email
  const signUpMutation = api.auth.signup.useMutation();
  const verifyMutation = api.validate.sendVerificationCode.useMutation();

  // STEPS:
  // 1. show ask for name, email and ticket form
  // 2. show ask for password form
  // 3. show ask for verification code
  // 4. redirect to quests page
  const [step, setStep] = useState(1);
  const showCorrectForm = () => {
    switch (step) {
      case 1:
        return (
          <NameEmailAndTicketForm
            onChange={(value: {
              email: string;
              name: string;
              ticketID: string;
            }) => {
              setCurrentEmail(value.email);
              setCurrentName(value.name.toLowerCase());
              setCurrentTicketID(value.ticketID);
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <PasswordCreationForm
            onChange={(value) => {
              setCurrentPassword(value);
              doVerification();
              setStep(3);
            }}
          />
        );
      case 3:
        return (
          <VerificationCodeForm
            code={currentCode}
            onChange={(res: boolean) => {
              if (res) createUser();
              setStep(4);
            }}
          />
        );
      default:
        return <></>;
    }
  };

  // sign up user which creates a new user account
  const createUser = () => {
    signUpMutation
      .mutateAsync({
        email: currentEmail,
        password: currentPassword,
        name: currentName,
        ticketID: currentTicketID,
      })
      .then(async (res) => {
        if (!res.status) return await router.push("/");
        // if success, sign in user and redirect page accordingly
        signIn("credentials", {
          name: currentName,
          password: currentPassword,
          redirect: false,
        })
          .then(async (res) => {
            // if success redirect to quests page
            if (res?.ok) return await router.push("/user/quests");
          })
          .catch(async () => {
            // if any error occurs, redirect to home page
            return await router.push("/");
          });
      })
      .catch(async () => {
        // if any error occurs, redirect to home page
        return await router.push("/");
      });
  };

  const doVerification = () => {
    // send verification code to email and display verification form
    verifyMutation
      .mutateAsync({
        name: currentName,
        email: currentEmail,
      })
      .then((res) => {
        setCurrentCode(res.code);
      })
      .catch(() => {
        console.log("Experienced Error while sending verification code");
      });
  };

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Create Account Header Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {step === 1 ? (
            <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
              Create a new account
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
              Creating a new account for @{currentName}
            </h2>
          )}
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
export default SignUp;
