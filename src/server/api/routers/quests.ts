import { date, z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const QuestsRouter = createTRPCRouter({
  getUserQuests: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({where: {id: input.id}});
      if (!user) return { status: false, message: "User not found" };
      // user.id
      return {
        greeting: `Hello ${user.email}`,
      };
    }),

    /**
     * the id of the user who completed the task
     * the admin must be authed, 
     * the taks id
     */

    completeTask: adminProcedure
    .input(z.object({ id: z.string(), taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // add the task to the users completed list.
     await ctx.prisma.user.update({where: {id: input.id}, data: {completedTasks: {create: {
        authorisedBy: ctx.session.user.name,
        task: {connect : {id: input.taskId}},    
      }}}});
    })
    
});
