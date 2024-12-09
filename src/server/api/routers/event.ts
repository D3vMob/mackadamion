import { events, eventSchema } from "~/server/db/schema";
import { protectedProcedure, publicProcedure } from "../trpc";

import { createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import z from "node_modules/zod/lib";

export const eventRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.events.findMany();
  }),
  getArtistEvents: publicProcedure
    .input(z.object({ artistId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findMany({
        where: eq(events.createdBy, input.artistId.toString()),
      });
    }),
  getEventById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findFirst({
        where: eq(events.id, input.id),
      });
    }),

  createEvent: protectedProcedure
    .input(eventSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(events).values({
        ...input,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
      });
    }),

  updateEvent: protectedProcedure
    .input(eventSchema.extend({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db
        .update(events)
        .set({ ...data, updatedBy: ctx.session.userId })
        .where(eq(events.id, id));
    }),

  deleteEvent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(events).where(eq(events.id, input.id));
    }),
});
