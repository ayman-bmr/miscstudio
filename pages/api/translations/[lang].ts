import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import { Translation } from "@/generated/prisma";
import { Translation } from "@/generated/prisma";

const prisma = new PrismaClient();

type TranslationData = Record<string, string>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslationData | { error: string }>
) {
  const { lang } = req.query;

  if (!lang || Array.isArray(lang)) {
    return res.status(400).json({ error: "Language is required" });
  }

  try {
    // Explicitly type the result as Translation[]
    const translations: Translation[] = await prisma.translation.findMany({
      where: { language: lang },
    });

    // Type the accumulator
    const data: TranslationData = translations.reduce((acc: TranslationData, t: Translation) => {
      acc[t.key] = t.value;
      return acc;
    }, {});

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch translations" });
  }
}
