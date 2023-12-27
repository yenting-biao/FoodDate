import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTable,
  uuid,
  varchar,
  timestamp,
  doublePrecision,
  integer,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    userId: uuid("userid").primaryKey().defaultRandom(),
    ntuEmail: varchar("ntuemail", { length: 63 }).notNull().unique(),
    username: varchar("username", { length: 80 }).notNull(),
    hashedPassword: varchar("hashedpassword", { length: 255 }).notNull(),
    avatarUrl: text("avatarurl"),
    coins: integer("coins").notNull().default(0),
    bio: text("bio"),
  },
  (table) => ({
    userIdIndex: index("userIdIndex").on(table.userId),
  })
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  reviewsTable: many(reviewsTable),
  tagOwnersTable: many(tagOwnersTable),
  dateParticipantsTable: many(dateParticipantsTable),
  privateMessagesTable: many(privateMessagesTable),
}));

export const restaurantsTable = pgTable(
  "restaurants",
  {
    placeId: varchar("placeid", { length: 300 }).primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
  },
  (table) => ({
    placeIdIndex: index("placeIdIndex").on(table.placeId),
  })
);

export const restaurantsRelations = relations(restaurantsTable, ({ many }) => ({
  openingHoursTable: many(openingHoursTable),
  restaurantTypesTable: many(restaurantTypesTable),
  reviewsTable: many(reviewsTable),
  taggedRestaurantsTable: many(taggedRestaurantsTable),
}));

export const openingHoursTable = pgTable(
  "openinghours",
  {
    displayId: uuid("displayid").primaryKey().defaultRandom(),
    placeId: varchar("placeid", { length: 300 }).references(
      () => restaurantsTable.placeId,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    ),
    day: varchar("day", { length: 100 }).notNull(),
    hours: varchar("hours", { length: 100 }).notNull(),
  },
  (table) => ({
    placeIdIndex: index("placeIdIndex").on(table.placeId),
  })
);

export const openingHoursRelations = relations(
  openingHoursTable,
  ({ one }) => ({
    restaurantsTable: one(restaurantsTable),
  })
);

export const restaurantTypesTable = pgTable(
  "restauranttypes",
  {
    placeId: varchar("placeid", { length: 300 }).references(
      () => restaurantsTable.placeId,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    ),
    type: varchar("type", { length: 100 }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.placeId, table.type] }),
    placeIdIndex: index("placeIdIndex").on(table.placeId),
    typeIndex: index("typeIndex").on(table.type),
  })
);

export const restaurantTypesRelations = relations(
  restaurantTypesTable,
  ({ one }) => ({
    restaurantsTable: one(restaurantsTable),
  })
);

export const reviewsTable = pgTable(
  "reviews",
  {
    reviewId: uuid("reviewid").primaryKey().defaultRandom(),
    placeId: varchar("placeid", { length: 300 })
      .notNull()
      .references(() => restaurantsTable.placeId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    reviewerId: uuid("reviewerid").references(() => usersTable.userId, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    stars: integer("stars").notNull(),
    content: text("content"),
    expense: integer("expense"),
    createdAt: timestamp("createdat")
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    placeIdAndCreatedAtIndex: index("placeIdAndCreatedAtIndex").on(
      table.placeId,
      table.createdAt
    ),
  })
);

export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
  restaurant: one(restaurantsTable, {
    fields: [reviewsTable.placeId],
    references: [restaurantsTable.placeId],
  }),
  reviewer: one(usersTable, {
    fields: [reviewsTable.reviewerId],
    references: [usersTable.userId],
  }),
}));

export const tagsTable = pgTable(
  "tags",
  {
    tagId: uuid("tagid").primaryKey().defaultRandom(),
    tagName: varchar("tagname", { length: 50 }).notNull(),
  },
  (table) => ({
    tagIdIndex: index("tagIdIndex").on(table.tagId),
  })
);

export const tagsRelations = relations(tagsTable, ({ many }) => ({
  tagOwnersTable: many(tagOwnersTable),
  taggedRestaurantsTable: many(taggedRestaurantsTable),
}));

export const tagOwnersTable = pgTable(
  "tagowners",
  {
    tagId: uuid("tagid").references(() => tagsTable.tagId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    ownerId: uuid("ownerid").references(() => usersTable.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tagId, table.ownerId] }),
    ownerIdIndex: index("ownerIdIndex").on(table.ownerId),
  })
);

export const tagOwnersRelations = relations(tagOwnersTable, ({ one }) => ({
  tag: one(tagsTable, {
    fields: [tagOwnersTable.tagId],
    references: [tagsTable.tagId],
  }),
  owner: one(usersTable, {
    fields: [tagOwnersTable.ownerId],
    references: [usersTable.userId],
  }),
}));

export const taggedRestaurantsTable = pgTable(
  "taggedrestaurants",
  {
    tagId: uuid("tagid").references(() => tagsTable.tagId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    placeId: varchar("placeid", { length: 300 }).references(
      () => restaurantsTable.placeId,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    ),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tagId, table.placeId] }),
    tagIdIndex: index("tagIdIndex").on(table.tagId),
  })
);

export const taggedRestaurantsRelations = relations(
  taggedRestaurantsTable,
  ({ one }) => ({
    tag: one(tagsTable, {
      fields: [taggedRestaurantsTable.tagId],
      references: [tagsTable.tagId],
    }),
    restaurant: one(restaurantsTable, {
      fields: [taggedRestaurantsTable.placeId],
      references: [restaurantsTable.placeId],
    }),
  })
);

export const datesTable = pgTable(
  "dates",
  {
    dateId: uuid("dateid").primaryKey().defaultRandom(),
    occuredAt: timestamp("occuredat").notNull(),
  },
  (table) => ({
    dateIdAndOccuredAtIndex: index("dateIdAndOccuredAtIndex").on(
      table.dateId,
      table.occuredAt
    ),
  })
);

export const datesRelations = relations(datesTable, ({ many }) => ({
  dateParticipantsTable: many(dateParticipantsTable),
  privateMessagesTable: many(privateMessagesTable),
}));

export const dateParticipantsTable = pgTable(
  "dateparticipants",
  {
    displayId: uuid("displayid").primaryKey().defaultRandom(),
    dateId: uuid("dateid")
      .notNull()
      .references(() => datesTable.dateId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    participantId: uuid("participantid").references(() => usersTable.userId, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => ({
    dateIdIndex: index("dateIdIndex").on(table.dateId),
  })
);

export const dateParticipantsRelations = relations(
  dateParticipantsTable,
  ({ one }) => ({
    date: one(datesTable, {
      fields: [dateParticipantsTable.dateId],
      references: [datesTable.dateId],
    }),
    participant: one(usersTable, {
      fields: [dateParticipantsTable.participantId],
      references: [usersTable.userId],
    }),
  })
);

export const privateMessagesTable = pgTable(
  "privatemessages",
  {
    messageId: uuid("id").primaryKey().defaultRandom(),
    dateId: uuid("dateid")
      .notNull()
      .references(() => datesTable.dateId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    senderId: uuid("senderid").references(() => usersTable.userId, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    sentAt: timestamp("sentat").default(sql`now()`),
    content: text("content").notNull(),
  },
  (table) => ({
    dateIdAndSentAtIndex: index("dateIdAndSentAtIndex").on(
      table.dateId,
      table.sentAt
    ),
  })
);

export const privateMessagesRelations = relations(
  privateMessagesTable,
  ({ one }) => ({
    date: one(datesTable, {
      fields: [privateMessagesTable.dateId],
      references: [datesTable.dateId],
    }),
    sender: one(usersTable, {
      fields: [privateMessagesTable.senderId],
      references: [usersTable.userId],
    }),
  })
);
