import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
import { prisma } from "../../lib/prisma"
import { compare } from "bcryptjs";
// import { signJwt } from "@/lib/jwt";
import { signJwt } from "../../lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });
  console.log("Email from request:", email);
  console.log("Password from request:", password);
  console.log("Password in DB:", admin?.password);

  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signJwt({ id: admin.id, email: admin.email });

  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);
  return res.status(200).json({ success: true });
}
