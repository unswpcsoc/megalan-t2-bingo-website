import { TaskTypeSchema } from "~/components/types/clubs";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { prisma } from "~/server/db";
import { fisherYatesShuffle } from "~/server/functions/fisherYatesShuffle";

export const prizeRouter = createTRPCRouter({
  getWinner: adminProcedure
    .input(z.object({ category: TaskTypeSchema }))
    .query(async ({ input, ctx }) => {
      // this is a list of task ids and userids of completed tasks of
      // a particular tasktype
      const completedTasks = await ctx.prisma.completedTask.findMany({
        where: {
          task: {
            type: input.category,
          },
          user: {
            type: "PARTICIPANT",
          },
        },
        include: {
          task: {
            select: {
              points: true,
            },
          },
        },
      });

      const raffle: string[] = [];
      // return { completeTasks: completedTasks };
      completedTasks.forEach((cTask) => {
        raffle.push(cTask.userID);
        if (cTask.task.points == 200) raffle.push(cTask.userID);
      });

      const winnerList = fisherYatesShuffle(raffle);
      console.log(winnerList);

      if (winnerList.length === 0) return { user: null };

      // get  the winners name
      const name = await prisma.user.findFirstOrThrow({
        where: { id: winnerList[0] },
      });
      console.log(name);

      // returns the first 10 winners
      return { user: name };
    }),
});
