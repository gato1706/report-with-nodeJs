/*
  Warnings:

  - You are about to drop the column `qantity` on the `products` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "qantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
