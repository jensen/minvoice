/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "entries" ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ(3);

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_uindex" ON "clients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_code_uindex" ON "projects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_uindex" ON "projects"("name");
