/*
  Warnings:

  - You are about to drop the column `authProvider` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isMobileVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `user` table. All the data in the column will be lost.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_googleId_key` ON `user`;

-- DropIndex
DROP INDEX `User_mobile_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `authProvider`,
    DROP COLUMN `avatar`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `googleId`,
    DROP COLUMN `isEmailVerified`,
    DROP COLUMN `isMobileVerified`,
    DROP COLUMN `mobile`,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
