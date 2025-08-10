-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "currencyId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "currencyId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchangeRate" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE INDEX "Order_currencyId_idx" ON "Order"("currencyId");

-- CreateIndex
CREATE INDEX "Stock_currencyId_idx" ON "Stock"("currencyId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
