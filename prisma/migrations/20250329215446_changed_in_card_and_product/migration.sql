/*
  Warnings:

  - You are about to drop the column `cardId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cardId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cardId";

-- CreateTable
CREATE TABLE "_CardProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CardProducts_B_index" ON "_CardProducts"("B");

-- AddForeignKey
ALTER TABLE "_CardProducts" ADD CONSTRAINT "_CardProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardProducts" ADD CONSTRAINT "_CardProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
