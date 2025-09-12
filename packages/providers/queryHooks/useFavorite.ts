import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (story_id: number) => {
      const { data } = await axios.post("/api/favorite", { story_id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userBooks"],
        exact: false,
      });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (story_id: number) => {
      const { data } = await axios.delete("/api/favorite", {
        data: { story_id },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userBooks"],
        exact: false,
      });
    },
  });
};
