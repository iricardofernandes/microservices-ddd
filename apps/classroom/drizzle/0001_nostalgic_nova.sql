CREATE TABLE "students" (
	"id" text PRIMARY KEY NOT NULL,
	"auth_user_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "students_auth_user_id_unique" UNIQUE("auth_user_id")
);
