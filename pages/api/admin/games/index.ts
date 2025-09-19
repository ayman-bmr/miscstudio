import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const lang = req.query.lang?.toString() || "en";
    try {
      const games = await prisma.game.findMany({
        orderBy: { createdAt: "desc" },
      });

      const mappedGames = games.map(g => ({
        id: g.id,
        title: lang === "ar" ? g.title_ar : g.title_en,
        description: lang === "ar" ? g.description_ar : g.description_en,
        image: g.image,
        link: g.link,
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
      }));

      res.status(200).json(mappedGames);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  } else if (req.method === "POST") {
    const { title_en, description_en, title_ar, description_ar, image, link } = req.body;
    if (!title_en || !description_en || !title_ar || !description_ar || !image)
      return res.status(400).json({ error: "Missing fields" });

    try {
      const game = await prisma.game.create({
        data: { title_en, description_en, title_ar, description_ar, image, link },
      });
      res.status(201).json(game);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create game" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
