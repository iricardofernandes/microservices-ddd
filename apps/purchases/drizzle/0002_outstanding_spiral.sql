CREATE TYPE "public"."purchase_status" AS ENUM('PENDING', 'APPROVED', 'FAILED');--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"productId" text NOT NULL,
	"status" "purchase_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
