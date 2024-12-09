import z from "node_modules/zod/lib";
import { protectedProcedure, publicProcedure } from "../trpc";

import { createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import { media, mediaSchema } from "~/server/db/schema";

export const mediaRouter = createTRPCRouter({
  getAllMedia: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.media.findMany();
  }),
  getArtistMedia: publicProcedure
    .input(z.object({ artistId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.media.findMany({
        where: eq(media.createdBy, input.artistId.toString()),
      });
    }),
  createMedia: protectedProcedure
    .input(mediaSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(media).values({
        ...input,
        createdBy: ctx.session.userId,
        updatedBy: ctx.session.userId,
      });
    }),
  updateMedia: protectedProcedure
    .input(mediaSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.update(media).set({
        ...input,
        updatedBy: ctx.session.userId,
      });
    }),
  deleteMedia: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(media).where(eq(media.id, input.id));
    }),
});
