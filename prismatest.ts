import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const translations = await prisma.translation.findMany({
      take: 5, // just get 5 entries for testing
    });
    console.log("Translations from DB:", translations);
  } catch (err) {
    console.error("Error fetching translations:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
