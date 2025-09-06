-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "auth_code" TEXT NOT NULL,
    "company_number" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
