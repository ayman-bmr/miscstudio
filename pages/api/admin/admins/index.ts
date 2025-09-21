import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const admins = await prisma.admin.findMany({
        select: { id: true, email: true, name: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(admins);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch admins" });
    }
  }

  if (req.method === "POST") {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.admin.create({
        data: { email, password: hashedPassword, name },
      });

      return res.status(201).json({
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        createdAt: newAdmin.createdAt,
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Failed to create admin" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
