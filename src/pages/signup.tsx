import { useState } from "react";
import Layout from "./_layout";
import atlantis from "public/images/atlantis1.jpg";
import Image from "next/image";
import { hash } from "~/components/functions/hash";
import PasswordCreationForm from "~/components/forms/PasswordCreationForm";
import NameAndEmailForm from "~/components/forms/NameAndEmailForm";
import { api } from "~/utils/api";
import VerificationCodeForm from "~/components/forms/VerificationCodeForm";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  // store current user details in state
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  // flags for displaying forms
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [showVerifyCodeForm, setShowVerifyCodeForm] = useState(false);
  const [currentVerificationCode, setCurrentVerificationCode] = useState("");
  // api mutation for sign up and for sending verification code to email
  const signUpMutation = api.auth.signup.useMutation();
  const verifyMutation = api.validate.sendVerificationCode.useMutation();
  const showCorrectForm = () => {
    if (!hasValidEmail) {
      return (
        <NameAndEmailForm
          onChange={(value: { email: string; name: string }) => {
            setCurrentEmail(value.email);
            setCurrentName(value.name);
            setHasValidEmail(true);
          }}
        />
      );
    } else if (hasValidEmail && !showVerifyCodeForm) {
      return (
        <PasswordCreationForm
          onChange={(value) => {
            setCurrentPassword(value);
            doVerification();
          }}
        />
      );
    } else {
      return (
        <VerificationCodeForm
          code={currentVerificationCode}
          onChange={async (res: { verified: boolean }) => {
            if (res.verified) await createUser();
            if (!res.verified) doVerification();
          }}
        />
      );
    }
  };

  // sign up user which creates a new user account
  const createUser = async () => {
    signUpMutation
      .mutateAsync({
        email: currentEmail,
        password: currentPassword,
        name: currentName,
      })
      .then((res) => {
        if (res.status) console.log(res.message); // redirect to login page
      })
      .catch(() => {
        console.log("Experienced error while signing up");
      });
    // redirect to user home page
    await router.push("/bingo");
  };

  const doVerification = () => {
    // send verification code to email and display verification form
    setShowVerifyCodeForm(true);
    verifyMutation
      .mutateAsync({
        name: currentName,
        email: currentEmail,
      })
      .then((res) => {
        setCurrentVerificationCode(res.code);
      })
      .catch(() => {
        console.log("Experienced Error while sending verification code");
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
          {/* Display Email or Password or Verification Form Based on Sign up progress */}
          {showCorrectForm()}
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;
