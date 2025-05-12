/*
  Warnings:

  - You are about to drop the column `productQuality` on the `Card` table. All the data in the column will be lost.
  - Added the required column `productQuantity` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "productQuality",
ADD COLUMN     "productQuantity" INTEGER NOT NULL;
