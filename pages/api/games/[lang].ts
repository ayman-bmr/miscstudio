import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;

  if (!lang || Array.isArray(lang)) {
    return res.status(400).json({ error: "Language is required" });
  }

  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Send both language fields
    const mappedGames = games.map((game) => ({
      id: game.id,
      title_en: game.title_en,
      title_ar: game.title_ar,
      description_en: game.description_en,
      description_ar: game.description_ar,
      image: game.image,
      link: game.link,
    }));

    res.status(200).json(mappedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
}
