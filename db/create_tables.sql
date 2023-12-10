CREATE TABLE "USERS" (
  "ntuEmail" varchar(63) UNIQUE NOT NULL,
  "username" varchar(80) PRIMARY KEY,
  "hashedPassword" varchar(255) NOT NULL
);

CREATE TABLE "RESTAURANTS" (
  "placeId" varchar(300) PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "address" varchar(100) NOT NULL,
  "latitude" double precision NOT NULL,
  "longitude" double precision NOT NULL
);

CREATE TABLE "RESTAURANT_TYPES" (
  "placeId" varchar(300),
  "type" varchar(20),
  PRIMARY KEY ("placeId", "type")
);

CREATE TABLE "REVIEWS" (
  "placeId" varchar(300),
  "reviewerUsername" varchar(80),
  "stars" int NOT NULL,
  "content" varchar(2000),
  "expenditure" int,
  "createdAt" timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY ("placeId", "reviewerUsername")
);

CREATE TABLE "TAGS" (
  "tagId" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "tagName" varchar(50)
);

CREATE TABLE "TAG_OWNERS" (
  "tagId" uuid,
  "ownerUsername" varchar(80),
  PRIMARY KEY ("tagId", "ownerUsername")
);

CREATE TABLE "TAGGED_RESTAURANTS" (
  "tagId" uuid,
  "placeId" varchar(300),
  PRIMARY KEY ("tagId", "placeId")
);

CREATE TABLE "DATES" (
  "dateId" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "occuredAt" timestamp NOT NULL
);

CREATE TABLE "DATE_PARTICIPANTS" (
  "dateId" uuid,
  "participantUsername" varchar(80),
  PRIMARY KEY ("dateId", "participantUsername")
);

CREATE TABLE "GLOBAL_MESSAGES" (
  "senderUsername" varchar(80),
  "sentAt" timestamp DEFAULT (now()),
  "content" varchar(1000) NOT NULL,
  PRIMARY KEY ("senderUsername", "sentAt")
);

CREATE TABLE "PRIVATE_MESSAGES" (
  "dateId" uuid,
  "senderUsername" varchar(80),
  "sentAt" timestamp DEFAULT (now()),
  "content" varchar(1000) NOT NULL,
  PRIMARY KEY ("dateId", "senderUsername", "sentAt")
);

ALTER TABLE "RESTAURANT_TYPES" ADD FOREIGN KEY ("placeId") REFERENCES "RESTAURANTS" ("placeId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "REVIEWS" ADD FOREIGN KEY ("placeId") REFERENCES "RESTAURANTS" ("placeId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "REVIEWS" ADD FOREIGN KEY ("reviewerUsername") REFERENCES "USERS" ("username") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "TAG_OWNERS" ADD FOREIGN KEY ("tagId") REFERENCES "TAGS" ("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TAG_OWNERS" ADD FOREIGN KEY ("ownerUsername") REFERENCES "USERS" ("username") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TAGGED_RESTAURANTS" ADD FOREIGN KEY ("tagId") REFERENCES "TAGS" ("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TAGGED_RESTAURANTS" ADD FOREIGN KEY ("placeId") REFERENCES "RESTAURANTS" ("placeId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "DATE_PARTICIPANTS" ADD FOREIGN KEY ("dateId") REFERENCES "DATES" ("dateId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "DATE_PARTICIPANTS" ADD FOREIGN KEY ("participantUsername") REFERENCES "USERS" ("username") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "GLOBAL_MESSAGES" ADD FOREIGN KEY ("senderUsername") REFERENCES "USERS" ("username") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PRIVATE_MESSAGES" ADD FOREIGN KEY ("dateId") REFERENCES "DATES" ("dateId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PRIVATE_MESSAGES" ADD FOREIGN KEY ("senderUsername") REFERENCES "USERS" ("username") ON DELETE SET NULL ON UPDATE CASCADE;
