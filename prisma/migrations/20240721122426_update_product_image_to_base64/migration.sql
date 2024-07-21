/*
  Warnings:

  - You are about to drop the column `imagebase64` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageBase64` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagebase64",
ADD COLUMN     "imageBase64" TEXT NOT NULL;
