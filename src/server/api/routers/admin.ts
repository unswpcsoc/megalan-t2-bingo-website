import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ClubNameSchema } from "~/components/types/clubs";

export const adminRouter = createTRPCRouter({
  addAdmin: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        adminId: z.string(),
        societyName: ClubNameSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      // find the user
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });
      // throw error if user does not exist
      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      // update the user to admin type if they aren't already
      if (user.type === "PARTICIPANT") {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            type: "ADMIN",
          },
        });
      }

      // add the user to the society mentioned in input
      await ctx.prisma.society.update({
        where: {
          name: input.societyName,
        },
        data: {
          admins: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
      return { status: true };
    }),
  
  // gets a list of all admins from a club
  getAllAdminsOfClub: publicProcedure
    .input(z.object({ societyName: ClubNameSchema }))
    .query(async ({ input, ctx }) => {
      const society = await ctx.prisma.society.findFirst({
        where: {
          name: input.societyName,
        },
        include: {
          admins: true,
        },
      });

      if (!society)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Society not found",
        });

      const cleanData: { name: string; id: string }[] = [];
      society.admins.forEach((a) => {
        cleanData.push({ name: a.name, id: a.id });
      });
      return {admins: cleanData}
    }),
});
