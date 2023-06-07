import sgMail from "@sendgrid/mail";
import { randomUUID } from "crypto";

/**
 * Sends an email with a verification code to the user
 * @param emailId
 * @param name
 * @returns { status: boolean, code: string }
 */
export const SendVerificationEmail = async (
  emailId: string,
  name: string
): Promise<{ status: boolean; code: string }> => {
  const API_KEY = process.env.SENDGRID_API_KEY;
  if (!API_KEY) throw new Error("API Key Not Found");
  const verificationCode: string = randomUUID().toString();
  sgMail.setApiKey(API_KEY);
  let sendSuccess = false;
  const msg = {
    to: emailId, // Change to your recipient
    from: "megalanatlantis@gmail.com", // Change to your verified sender
    subject: "Megalan Atlantis Verification Code",
    text: `Hello ${name}, \n\nYour Verification Code for Megalan Atlantis Quests is:\n${verificationCode}`,
    html: `<strong>Hello ${name}, \n\nYour Verification Code for Megalan Atlantis Quests is:\n${verificationCode}</strong>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      sendSuccess = true;
    })
    .catch(() => {
      sendSuccess = false;
    });
  return { status: sendSuccess, code: verificationCode };
};

/**
 * Sends a verification code as part of the forgot password flow
 * @param emailId
 * @param name
 * @returns { status: boolean, code: string }
 */
export const SendForgotPasswordEmail = async (
  emailId: string,
  name: string
): Promise<{ status: boolean; code: string }> => {
  const API_KEY = process.env.SENDGRID_API_KEY;
  if (!API_KEY) throw new Error("API Key Not Found");
  const verificationCode: string = randomUUID().toString();
  sgMail.setApiKey(API_KEY);
  let sendSuccess = false;
  const msg = {
    to: emailId, // Change to your recipient
    from: "megalanatlantis@gmail.com", // Change to your verified sender
    subject: "Megalan Atlantis Forgot Password Verification Code",
    text: `Hello ${name}, \n\nYour Verification Code for resetting your Megalan Atlantis Quests account password is:\n${verificationCode}\n\nIf you did not request a reset of you password, you can ignore this email.`,
    html: "",
  };
  await sgMail
    .send(msg)
    .then(() => {
      sendSuccess = true;
    })
    .catch(() => {
      sendSuccess = false;
    });
  return { status: sendSuccess, code: verificationCode };
};
