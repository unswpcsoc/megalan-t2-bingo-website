import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const QuestsRouter = createTRPCRouter({
  getUserQuests: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
      if (!user) return { status: false, message: "User not found" };
      // user.id
      return {
        greeting: `Hello ${user.email}`,
      };
    }),

  getLeaderboardStats: publicProcedure.query(({ ctx }) => {
    ctx.prisma.user
      .findMany({
        orderBy: {
          totalPoints: "desc",
        },
        where: {
          type: "PARTICIPANT",
        },
      })
      .then((users) => {
        const cleanData: { name: string; points: number }[] = [];
        users.forEach((user) => {
          cleanData.push({ name: user.name, points: 10 });
        });
        if (users) return cleanData;
        return { data: [{ name: "Hehe", points: 100 }] };
      })
      .catch((err: TRPCError) => {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err.message.toString(),
        });
      });
  }),

  completeTask: adminProcedure
    .input(z.object({ id: z.string(), taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // add the task to the users completed list.
     await ctx.prisma.user.update({where: {id: input.id}, data: {completedTasks: {create: {
        authorisedBy: ctx.session.user.name,
        task: {connect : {id: input.taskId}},    
      }}}});
    }),

  getUsers: adminProcedure
  .input(z.object({name: z.string()}))
  .query(async ({ input, ctx }) => {
    const resultUsers = await ctx.prisma.user.findMany({
      where: {
        AND: [{type: "PARTICIPANT"}, {name: {search: input.name}}]
      } 
    });

    const cleanUsers = resultUsers.map((user) => {return {name: user.name, id: user.id}});
    console.log(cleanUsers);

    return cleanUsers;

    // .then((users) => {
    //   const cleanData: { name: string; id: string; points: number; }[] = [];
    //     users.forEach((user) => {
    //       cleanData.push({ name: user.name, id: user.id, points: user.totalPoints});
    //     });
    //     if (users) return cleanData;
    //   console.log(users);
    //   return 10;
    // }).catch((err: TRPCError) => {
    //   throw new TRPCError({
    //     code: "NOT_FOUND",
    //     message: err.message.toString(),
    //   });
    // });

  }),

});
