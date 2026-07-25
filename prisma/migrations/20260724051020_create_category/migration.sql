/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Category_deletedAt_idx` ON `category`;

-- DropIndex
DROP INDEX `Category_isActive_idx` ON `category`;

-- DropIndex
DROP INDEX `Category_sortOrder_idx` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `sortOrder`,
    ADD COLUMN `displayOrder` INTEGER NOT NULL DEFAULT 0;
