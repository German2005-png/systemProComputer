/*
  Warnings:

  - You are about to drop the column `image` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "image",
DROP COLUMN "price",
DROP COLUMN "title";
