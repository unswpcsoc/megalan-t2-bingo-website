import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

// authorization middleware

export const validationRouter = createTRPCRouter({
  checkIfUnique: publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      name: z.string().max(15),
    })
  )
  .mutation(async ({ input, ctx }) => {
    let found = false;
    const usersWithMatchingName = await ctx.prisma.user.findMany({
      where: { name: input.name }
    })
    const usersWithMatchingEmail = await ctx.prisma.user.findMany({
      where: { email: input.email } 
    })
    if (usersWithMatchingName.length > 0 || usersWithMatchingEmail.length > 0) {
      found = true;
    }
    return { 
      found: found, 
      email: usersWithMatchingEmail.length > 0, 
      name: usersWithMatchingName.length > 0 
    }
  })
})