-- CreateTable
CREATE TABLE "ride" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "driver" JSONB NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ride_id_key" ON "ride"("id");
