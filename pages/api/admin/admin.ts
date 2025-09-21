import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import {prisma} from "../../../lib/prisma"; // Adjust to your prisma client path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await prisma.admin.create({
        data: { email, password: hashedPassword, name },
      });
      res.status(201).json(admin);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create admin" });
    }
  } else if (req.method === "GET") {
    try {
      const admins = await prisma.admin.findMany({ orderBy: { createdAt: "desc" } });
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
