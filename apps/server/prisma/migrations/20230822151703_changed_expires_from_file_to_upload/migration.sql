/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `File` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "expiresAt";

-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
