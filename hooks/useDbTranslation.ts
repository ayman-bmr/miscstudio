import { useEffect, useState } from "react";

export function useDbTranslation(language: string | null) {
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!language) return;

    setLoading(true);

    fetch(`/api/translations/${language}`)
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching translations:", err);
        setLoading(false);
      });
  }, [language]);


  const t = (key: string) => (loading ? "..." : translations[key] || key);

  return { t, loading };
}
