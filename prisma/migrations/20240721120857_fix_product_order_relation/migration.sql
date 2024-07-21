/*
  Warnings:

  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `slotId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagebase64` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MERCHANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('PIECE', 'WEIGHT');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total",
ADD COLUMN     "slotId" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
ADD COLUMN     "imagebase64" TEXT NOT NULL,
ADD COLUMN     "unit" "Unit" NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "maxOrders" INTEGER NOT NULL,
    "availableOrders" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
