import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;

  if (!lang || Array.isArray(lang)) {
    return res.status(400).json({ error: "Language is required" });
  }

  try {
    let games = await prisma.game.findMany({
      where: { language: lang },
      orderBy: { createdAt: "desc" },
    });

    // fallback to English if no games in requested language
    if (games.length === 0 && lang !== "en") {
      games = await prisma.game.findMany({
        where: { language: "en" },
        orderBy: { createdAt: "desc" },
      });
    }

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
}
