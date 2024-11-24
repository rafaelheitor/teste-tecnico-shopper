-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "review" JSONB NOT NULL,
    "tax" INTEGER NOT NULL,
    "minimun_distance" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_id_key" ON "driver"("id");
