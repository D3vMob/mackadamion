import { artists, media, artistSchema, fullArtistSchema, events } from "~/server/db/schema";

import { eq, sql } from "drizzle-orm";
import { publicProcedure, protectedProcedure } from "../trpc";

import { createTRPCRouter } from "../trpc";
import { z } from "zod";

export const artistRouter = createTRPCRouter({
  getAllArtists: publicProcedure.query(async ({ ctx }) => {
    const artists = await ctx.db.query.artists.findMany({
      orderBy: (artists, { desc }) => [desc(artists.updatedAt)],
    });
    return artists;
  }),
  getArtist: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const artist = await ctx.db.query.artists.findFirst({
        where: eq(artists.id, input.id),
      });

      if (!artist) return null;

      const artistMedia = await ctx.db.query.media.findMany({
        where: sql`${input.id}::text = ANY(${media.tags})`,
      });

      const artistEvents = await ctx.db.query.events.findMany({
        where: sql`${input.id}::text = ANY(${events.tags})`,
      });

      return {
        ...artist,
        media: artistMedia,
        events: artistEvents,
      };
    }),

  createArtist: protectedProcedure
    .input(artistSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(artists).values({
        ...input,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
      });
    }),

  updateArtist: protectedProcedure
    .input(artistSchema.extend({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.update(artists)
        .set({
          ...data,
          updatedBy: ctx.session.userId
        })
        .where(eq(artists.id, id));
    }),

  deleteArtist: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(artists)
        .where(eq(artists.id, input.id));
    }),
});
