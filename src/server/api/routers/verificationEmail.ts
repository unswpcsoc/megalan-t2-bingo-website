import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

export const SendVerificationEmail = (
  emailId: string,
  name: string,
): {status: boolean, code: string} => {
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationCode = randomUUID().toString();
  const body = `Hello ${name}, \n\nYour Verification Code for Megalan Atlantis Quests is:\n${verificationCode}`;
  const mailOptions = {
    from: "sender@gmail.com", // Sender address
    to: emailId, // List of recipients
    subject: "Megalan Atlantis Verification Code", // Subject line
    text: body, // Plain text body
  };

  let sendSuccess = false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error:", error);
    } else {
      console.log("info", info);
      sendSuccess = true;
    }
  });
  return { status: sendSuccess, code: verificationCode };
};

export const SendForgotPasswordEmail = (emailId: string, name: string): { status: boolean, code: string } => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationCode = randomUUID().toString();
  const body = `Hello ${name}, \n\nYour Verification Code for resetting your Megalan Atlantis Quests account password is:\n${verificationCode}\n\nIf you did not request a reset of you password, you can ignore this email.`;
  const mailOptions = {
    from: "sender@gmail.com", // Sender address
    to: emailId, // List of recipients
    subject: "Megalan Atlantis Forgot Password Verification Code", // Subject line
    text: body, // Plain text body
  };

  let sendSuccess = false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error:", error);
    } else {
      console.log("info", info);
      sendSuccess = true;
    }
  });
  return { status: sendSuccess, code: verificationCode };
}