import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { organization } from "../../auth/schema/auth.schema";

export const contact = pgTable(
  "contact",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("contact_tenantId_idx").on(table.tenantId)],
);

export type Contact = typeof contact.$inferSelect;
export type NewContact = typeof contact.$inferInsert;

export const contactRelations = relations(contact, ({ one }) => ({
  tenant: one(organization, {
    fields: [contact.tenantId],
    references: [organization.id],
  }),
}));
