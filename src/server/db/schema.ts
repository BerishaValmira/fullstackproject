// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, type ColumnBaseConfig, type ColumnDataType } from "drizzle-orm";
import {
  boolean,
  date,
  ExtraConfigColumn,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3app_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// )

export const entity1 = createTable("entity1",{
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  surname: varchar("surname", { length: 256 }),
  birthyear: varchar("birthyear"),
})

export const entity2 = createTable("entity2",{
  id: serial("id").primaryKey(),
  entity1Id: integer("interview_id").references(() => entity1.id),
  name: varchar("name", { length: 256 }),
  number: varchar("number", { length: 256 }),
  type: varchar("type", { length: 256 }),
})

export const contactSupport = createTable("contact_support", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  department: varchar("department", { length: 256 }),
});

export const users = createTable("user", {
  id: serial("id").primaryKey(),      
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  emailVerified: timestamp("email_verified"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  role: varchar("role", { length: 256 }).default("user"),
  isActive: boolean("is_active").default(true),
  isDeleted: boolean("is_deleted").default(false),
  lastLogin: timestamp("last_login"),
  lastLoginIp: varchar("last_login_ip", { length: 256 }),
} ); 


export const accounts = createTable("account", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  compoundId: varchar("compound_id", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 })
    .notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  accessToken: varchar("access_token", { length: 255 }),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  idToken: varchar("id_token", { length: 255 }),
  sessionState: varchar("session_state", { length: 255 }),
});

export const sessions = createTable("session", {
  id: serial("id").primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export type Entity1 = typeof entity1.$inferSelect
export type Entity2 = typeof entity2.$inferSelect
export type ContactSupport = typeof contactSupport.$inferSelect
export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect

export const insertEntity1Schema = createInsertSchema(entity1);
export const insertEntity2Schema = createInsertSchema(entity2);
export const insertContactSupportSchema = createInsertSchema(contactSupport);
export const insertUserSchema = createInsertSchema(users);
export const insertAccountSchema = createInsertSchema(accounts);
export const insertSessionSchema = createInsertSchema(sessions);
