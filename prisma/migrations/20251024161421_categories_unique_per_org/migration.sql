/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "category_organizationId_name_key" ON "public"."category"("organizationId", "name");
