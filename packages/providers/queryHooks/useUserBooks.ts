"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserBooksType } from "@repo/providers/intefaces/UserBooksType";

const getUserBooksGuest = (): UserBooksType | null => {
  if (typeof window !== "undefined") {
    const storedBooks = localStorage.getItem("USER_BOOKS");
    if (storedBooks) {
      try {
        return JSON.parse(storedBooks) as UserBooksType;
      } catch (error) {
        console.error("Failed to parse USER_BOOKS from localStorage:", error);
      }
    }
  }
  return null;
};

export const userBooksGuest = {
  data: getUserBooksGuest(),
  isLoading: false,
  isError: false,
  error: null,
};

async function fetchUserBooks(size?: number): Promise<UserBooksType> {
  const response = await axios.get("/api/user-books", {
    params: { size },
  });

  return response.data;
}

export function useUserBooks(size?: number) {
  return useQuery<UserBooksType, Error>({
    queryKey: ["userBooks", size],
    queryFn: () => fetchUserBooks(size),
  });
}
