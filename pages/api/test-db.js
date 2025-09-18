import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ success: true, message: 'Database connected!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
