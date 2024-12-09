// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mackadamion_${name}`);

export const artists = createTable(
  "artist",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    imageUrl: varchar("image_url", { length: 512 }),
    description: varchar("description", { length: 2048 }),
    socialLinks: varchar("social_links")
      .array()
      .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const countryCodeEnum = pgEnum("country_code", [
  "AF",
  "AL",
  "DZ",
  "AS",
  "AD",
  "AO",
  "AI",
  "AQ",
  "AG",
  "AR",
  "AM",
  "AW",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BM",
  "BT",
  "BO",
  "BA",
  "BW",
  "BV",
  "BR",
  "IO",
  "BN",
  "BG",
  "BF",
  "BI",
  "KH",
  "CM",
  "CA",
  "CV",
  "KY",
  "CF",
  "TD",
  "CL",
  "CN",
  "CX",
  "CC",
  "CO",
  "KM",
  "CG",
  "CD",
  "CK",
  "CR",
  "CI",
  "HR",
  "CU",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "ET",
  "FK",
  "FO",
  "FJ",
  "FI",
  "FR",
  "GF",
  "PF",
  "TF",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GI",
  "GR",
  "GL",
  "GD",
  "GP",
  "GU",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HM",
  "VA",
  "HN",
  "HK",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IL",
  "IT",
  "JM",
  "JP",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KP",
  "KR",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MO",
  "MK",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MT",
  "MH",
  "MQ",
  "MR",
  "MU",
  "YT",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "MS",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "NC",
  "NZ",
  "NI",
  "NE",
  "NG",
  "NU",
  "NF",
  "MP",
  "NO",
  "OM",
  "PK",
  "PW",
  "PS",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PN",
  "PL",
  "PT",
  "PR",
  "QA",
  "RE",
  "RO",
  "RU",
  "RW",
  "SH",
  "KN",
  "LC",
  "PM",
  "VC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "SC",
  "SL",
  "SG",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "GS",
  "ES",
  "LK",
  "SD",
  "SR",
  "SJ",
  "SZ",
  "SE",
  "CH",
  "SY",
  "TW",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TK",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "TC",
  "TV",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UM",
  "UY",
  "UZ",
  "VU",
  "VE",
  "VN",
  "VG",
  "VI",
  "WF",
  "EH",
  "YE",
  "ZM",
  "ZW",
]);

export const events = createTable(
  "event",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    imageUrl: varchar("image_url", { length: 512 }),
    description: varchar("description", { length: 2048 }),
    date: timestamp("date", { withTimezone: true }),
    venue: varchar("venue", { length: 256 }),
    city: varchar("city", { length: 256 }),
    countryCode: countryCodeEnum("country_code"),
    tags: text("tags")
      .array()
      .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);

export const teamMembers = createTable(
  "team_member",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    imageUrl: varchar("image_url", { length: 512 }),
    description: varchar("description", { length: 2048 }),
    socialLinks: varchar("social_links")
      .array()
      .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  },
);

export const media = createTable(
  "media",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    url: text("url").array().$type<string[]>().default([]),
    description: varchar("description", { length: 2048 }),
    tags: text("tags")
      .array()
      .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  },
  (example) => ({
    titleIndex: index("media_title_idx").on(example.title),
  }),
);

export const artistSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  socialLinks: z.array(z.string()).default([]),
});

export type ArtistInput = z.infer<typeof artistSchema>;

// Full artist type including system fields
export const fullArtistSchema = artistSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  createdBy: z.string().max(256),
  updatedBy: z.string().max(256),
});

export type Artist = z.infer<typeof fullArtistSchema>;

export const mediaSchema = z.object({
  title: z.string(),
  url: z.array(z.string()).default([]),
  description: z.string(),
  tags: z.array(z.string()).default([]),
});

export type MediaInput = z.infer<typeof mediaSchema>;

// Full media type including system fields
export const fullMediaSchema = mediaSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  createdBy: z.string().max(256),
  updatedBy: z.string().max(256),
});

export type MediaSchema = z.infer<typeof fullMediaSchema>;


export const eventSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  date: z.date(),
  venue: z.string(),
  city: z.string(),
  countryCode: z.enum(countryCodeEnum.enumValues),
  tags: z.array(z.string()).default([]),  
});

export type EventSchema = z.infer<typeof eventSchema>;

// Full event type including system fields
export const fullEventSchema = eventSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  createdBy: z.string().max(256),
  updatedBy: z.string().max(256),
});

export type Event = z.infer<typeof fullEventSchema>;

export const artistWithMediaSchema = fullArtistSchema.extend({
  media: z.array(fullMediaSchema),
});

export type ArtistWithMedia = z.infer<typeof artistWithMediaSchema>;

export const artistWithEventsSchema = fullArtistSchema.extend({
  events: z.array(fullEventSchema),
});

export type ArtistWithEvents = z.infer<typeof artistWithEventsSchema>;

export const teamMemberSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  socialLinks: z.array(z.string()).default([]),
});

export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;

// Full team member type including system fields
export const fullTeamMemberSchema = teamMemberSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  createdBy: z.string().max(256),
  updatedBy: z.string().max(256),
});
