CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"auth_user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "customers_auth_user_id_unique" UNIQUE("auth_user_id")
);
