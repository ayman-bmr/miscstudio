"use client";

import { useEffect, useState } from "react";
//import { useLanguage } from "../../../packages/providers/i18n/useLanguage";
import { useLanguage } from "../packages/providers/i18n/useLanguage";
export type HeroData = Record<string, string>;

export function useDbHero(language: string | null) {
  const [heroData, setHeroData] = useState<HeroData>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     setMounted(true);
  }, []);

  useEffect(() => {
    if (!language || !mounted) return;

    setLoading(true);
    fetch(`/api/hero/${language}`)
      .then((res) => res.json())
      .then((data: HeroData) => {
        setHeroData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hero content:", err);
        setLoading(false);
      });
  }, [language, mounted]);

  const h = (key: string) => heroData[key] || "...";

  return { h, loading, mounted };
}
