import { useState, type SyntheticEvent } from "react";
import { api } from "~/utils/api";

/*
 * Form that takes a name as input, validates that an account exists with that name
 * Sends an email with a verification code to that user
 * and returns the name with onChange
 */
const AskNameAndTicketForm = ({ onChange }: { onChange: CallableFunction }) => {
  // basic flags
  const [validName, setValidName] = useState(false);
  const [validTicket, setValidTicket] = useState(false);
  const [formSent, setFormSent] = useState(false);
  // api mutation to send verification email and check if email exists
  const findUserMutation = api.validate.findUserWithName.useMutation();
  const forgotPasswordMutation = api.auth.forgotPassword.useMutation();
  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      ticket: { value: string };
    };
    const name: string = target.name.value.toLowerCase();
    const ticket: string = target.ticket.value;
    // make api call to verify that use exists
    findUserMutation
      .mutateAsync({ name, ticket })
      .then((res) => {
        setValidName(res.found);
        setValidTicket(res.ticket);
        const email = res.email;
        if (res.ticket) {
          // if everything is valid then send email and return details to parent
          forgotPasswordMutation
            .mutateAsync({ name, email })
            .then((res) => {
              // return details to parent
              onChange({ name, ticket, email: email, code: res.code });
            })
            .catch(() => setValidName(false));

          return;
        }
      })
      .catch(() => setValidName(false));
    setFormSent(true);
  };

  return (
    <>
      {/* Username Submission Form */}
      <form
        id="name-and-ticket-form"
        className="space-y-6"
        onSubmit={handleFormSubmit}
      >
        {/* Username Input Section */}
        <div>
          <label
            htmlFor="name"
            className="block text-base font-normal leading-6 text-white/80"
          >
            Username
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
          {/* Invalid Username Error */}
          {!validName && formSent && (
            <p className="text-sm text-red-400">
              *Account with provided name does not exist.
            </p>
          )}
        </div>
        {/* Ticket Input Section */}
        <div>
          <label
            htmlFor="ticket"
            className="block text-base font-normal leading-6 text-white/80"
          >
            MegaLAN Ticket Order ID
          </label>
          <div className="mt-2">
            <input
              placeholder="12345678910"
              id="ticket"
              name="ticket"
              type="number"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-400/80 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Invalid Ticket Error */}
          {!validTicket && formSent && (
            <p className="text-sm text-red-400">
              *Order ID does not exist or belong to account with provided name.
            </p>
          )}
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-400/80 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-teal-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600/80"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default AskNameAndTicketForm;
