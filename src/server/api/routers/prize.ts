import { SocietyNameList, TaskTypeSchema } from "~/components/types/clubs";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

export const prizeRouter = createTRPCRouter({
  getPrizeWinner: adminProcedure
    .input(z.object({ category: TaskTypeSchema }))
    .query(async ({ input, ctx }) => {
      // generate a query for prisma for which category to search in
      let prismaTaskQuery = [];
      if (input.category === "COSPLAY") prismaTaskQuery = [{ type: "COSPLAY" }];
      if (input.category === "SOCIAL") prismaTaskQuery = [{ type: "SOCIAL" }];

      if (input.category === "SOCIETY") {
        SocietyNameList.forEach((s) => prismaTaskQuery.push({ type: s }));
      }

      // get all completed tasks and data about which task type and points
      const tasks = await ctx.prisma.completedTask.findMany({
        include: {
          task: {
            select: {
              points: true,
              type: true,
            },
          },
        },
      });

      // create a hashmap to store the (userID, points)
      const userPointHashMap = new Map<string, number>();
      let upperRange = 0;
      // iterate through all completed tasks and return a
      tasks.forEach((t) => {
        if (t.task.type === input.category) {
          // get the current points that the user has
          let points: number | undefined = userPointHashMap.get(t.userID);
          // if the user doesn't already have a key make the points 0
          if (!points) points = 0;
          // update the points for the user
          upperRange += t.task.points;
          userPointHashMap.set(t.userID, points + t.task.points);
        }
      });

      return { user: userPointHashMap, points: upperRange };
    }),
});
