CREATE TABLE "users" (
	"id" serial PRIMARY KEY UNIQUE NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" int NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"visit_count" int NOT NULL DEFAULT '0',
	"created_at" DATE NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"url_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "url" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL DEFAULT '0',
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"visit_count" int NOT NULL DEFAULT '0',
	"created_at" DATE NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "url_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("url_id") REFERENCES "url"("id");

ALTER TABLE "url" ADD CONSTRAINT "url_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");