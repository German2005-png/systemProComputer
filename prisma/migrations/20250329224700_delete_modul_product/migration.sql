/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `products` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CardProducts" DROP CONSTRAINT "_CardProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardProducts" DROP CONSTRAINT "_CardProducts_B_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "products" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "_CardProducts";
