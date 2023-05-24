/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SendVerificationEmail } from "./verificationEmail";
import { env } from "process";
import { TRPCError } from "@trpc/server";

export const validateRouter = createTRPCRouter({
  isUserUnique: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        ticketID: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let uniqueName = false;
      let validTicket = false;
      // env variables required to make the eventbrite api call
      const eventID: string | undefined = process.env.EVENTBRITE_EVENT_ID;
      const oAuthToken: string | undefined =
        process.env.EVENTBRITE_PERSONAL_OAUTH_TOKEN;
      if (!(eventID && oAuthToken))
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Missing Environment Variables",
        });
      // find user with provided name, and set name flag to unique or not
      const user = await ctx.prisma.user.findFirst({
        where: { name: input.name },
      });
      !user ? (uniqueName = true) : (uniqueName = false);

      // check if ticket exists on Eventbrite, checks with order_id provided in ticket
      axios.defaults.headers.common["Authorization"] = `Bearer ${oAuthToken}`;
      await axios
        .get(`https://www.eventbriteapi.com/v3/orders/${input.ticketID}/`)
        .then((res) => {
          res.status === 200 ? (validTicket = true) : (validTicket = false);
        })
        .catch(() => (validTicket = false));
      return { uniqueName, validTicket };
    }),

  findUserWithName: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { name: input.name },
      });
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      return { found: true };
    }),

  sendVerificationCode: publicProcedure
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(({ input }): { status: boolean; code: string } => {
      const res = SendVerificationEmail(input.email, input.name);
      return { status: res.status, code: res.code };
    }),
});
