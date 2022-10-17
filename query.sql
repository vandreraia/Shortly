CREATE TABLE "users" (
	"id" serial PRIMARY KEY UNIQUE NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"visit_count" int NOT NULL DEFAULT '0',
	"created_at" DATE NOT NULL DEFAULT 'NOW()'
);