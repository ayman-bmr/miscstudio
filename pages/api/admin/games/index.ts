import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const lang = req.query.lang?.toString() || "en"; // default English
    try {
      const games = await prisma.game.findMany({
        where: { language: lang },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  } else if (req.method === "POST") {
    const { title, description, image, language } = req.body;
    if (!title || !description || !image) return res.status(400).json({ error: "Missing fields" });

    try {
      const game = await prisma.game.create({
        data: { title, description, image, language: language || "en" },
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
