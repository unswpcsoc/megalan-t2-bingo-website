import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { SendForgotPasswordEmail } from "./EmailSenderV2";

export const authenticationRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // find user with matching name
      const user = await ctx.prisma.user.findUnique({
        where: { name: input.name.toLowerCase() },
      });

      // no user found early return with nothing
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      // user found but password is wrong
      if (user?.password !== input.password)
        return {
          found: true,
          passwordMatch: false,
          id: null,
        };

      // return true and user id if success
      return {
        found: true,
        passwordMatch: true,
        id: user.id,
      };
    }),

  signup: publicProcedure
    .input(
      z.object({
        name: z.string().max(20),
        email: z.string().email(),
        ticketID: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // create a new user since validation of user has already been done
      await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          ticketID: input.ticketID,
        },
      });
      return { status: true, message: "User created" };
    }),

  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { name: input.name },
      });
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      const res = await SendForgotPasswordEmail(user.email, user.name);
      return { status: true, code: res.code };
    }),

  changePassword: publicProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { name: input.name },
        data: { password: input.password },
      });
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      return { status: true, message: "Password changed" };
    }),

  session: protectedProcedure.query(() => {
    return { status: true, message: "Session created" };
  }),
});
