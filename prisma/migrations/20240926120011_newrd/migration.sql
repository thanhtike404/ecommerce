/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `paymentMethod_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_paymentMethodId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `paymentMethodId`,
    ADD COLUMN `paymentMethod_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Order_paymentMethodId_fkey` ON `Order`(`paymentMethod_id`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentMethod_id_fkey` FOREIGN KEY (`paymentMethod_id`) REFERENCES `PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
