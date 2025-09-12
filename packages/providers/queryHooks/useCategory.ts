"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLanguage } from "@repo/providers/i18n/useLanguage";


interface Book {
  id: number;
  title: string;
  cover_img_url: string | null;
  description: string | null;
}

interface Category {
  id: number;
  name: string;
  books: Book[];
}

async function fetchCategory(
  categoryId: number,
  lng: string
): Promise<Category> {
  try {
    const response = await axios.get("/api/category-preview", {
      params: { categoryId, lng },
    });

    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
}

export function useCategory(categoryId: number) {
  const lng = getCurrentLanguage();
  return useQuery({
    queryKey: ["category", categoryId, lng],
    queryFn: () => fetchCategory(categoryId, lng),
  });
}
