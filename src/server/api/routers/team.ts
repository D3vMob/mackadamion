import { eq } from "drizzle-orm";
import { teamMembers, teamMemberSchema } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const teamRouter = createTRPCRouter({
  getAllTeamMembers: publicProcedure.query(({ ctx }) => {
    const teamMembers = ctx.db.query.teamMembers.findMany({
      orderBy: (teamMembers, { desc }) => [desc(teamMembers.createdAt)],
    });
    return teamMembers;
  }),
  getTeamMember: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      const teamMember = ctx.db.query.teamMembers.findFirst({
        where: eq(teamMembers.id, input.id),
      });
      return teamMember;
    }),
  createTeamMember: protectedProcedure
    .input(teamMemberSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(teamMembers).values({
        ...input,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
      });
    }),
  updateTeamMember: protectedProcedure
    .input(teamMemberSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.update(teamMembers).set({
        ...input,
        updatedBy: ctx.session.userId,
      });
    }),
  deleteTeamMember: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(teamMembers).where(eq(teamMembers.id, input.id));
    }),
});
