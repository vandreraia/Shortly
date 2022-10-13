CREATE TABLE "users" (
	"id" serial PRIMARY KEY UNIQUE NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL
);

CREATE TABLE "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"visit_count" int NOT NULL DEFAULT '0'
);

CREATE TABLE "rank" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL,
	"url_id" int NOT NULL,
);

CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL,
	"token" TEXT NOT NULL,
);

ALTER TABLE "rank" ADD CONSTRAINT "rank_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "rank" ADD CONSTRAINT "rank_fk1" FOREIGN KEY ("url_id") REFERENCES "url"("id");

ALTER TABLE "session" ADD CONSTRAINT "session_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");