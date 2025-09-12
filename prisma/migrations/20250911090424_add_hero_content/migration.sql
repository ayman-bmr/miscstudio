-- CreateTable
CREATE TABLE "public"."HeroContent" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT,
    "url" TEXT,

    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroContent_key_language_key" ON "public"."HeroContent"("key", "language");
