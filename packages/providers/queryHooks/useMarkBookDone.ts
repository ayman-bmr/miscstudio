import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MarkAsDoneVariables {
  userId: number;
  bookId: number;
}

export const useMarkBookDone = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MarkAsDoneVariables>({
    mutationFn: async ({ userId, bookId }) => {
      try {
        const response = await axios.put(
          "/api/mark-book-done",
          {
            user_id: userId,
            book_id: bookId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.error || "Failed to mark story as done"
          );
        }
        throw new Error("Failed to mark story as done");
      }
    },
  });
};
