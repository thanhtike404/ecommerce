-- AlterTable
ALTER TABLE `Order` ADD COLUMN `deliverySteps` JSON NULL,
    ADD COLUMN `sailDate` DATETIME(3) NULL;
