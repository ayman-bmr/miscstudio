/*
  Warnings:

  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Game` table. All the data in the column will be lost.
  - Added the required column `description_ar` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_en` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_ar` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "description",
DROP COLUMN "language",
DROP COLUMN "title",
ADD COLUMN     "description_ar" TEXT NOT NULL,
ADD COLUMN     "description_en" TEXT NOT NULL,
ADD COLUMN     "title_ar" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");
