import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const gameId = Number(id);

  if (isNaN(gameId)) return res.status(400).json({ error: "Invalid ID" });

  if (req.method === "PUT") {
    const { title, description, image, language } = req.body;
    if (!title || !description || !image) return res.status(400).json({ error: "Missing fields" });

    try {
      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: { title, description, image, language: language || "en" },
      });
      return res.status(200).json(updatedGame);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update game" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.game.delete({ where: { id: gameId } });
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete game" });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
