import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useWelcomeUser } from "./useWelcomeUser";

// Custom hook to save the reading progress
export const useSaveProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      story_id,
      current_position,
    }: {
      story_id: number | null;
      current_position: number;
    }) => {
      const { data } = await axios.post("/api/progress", {
        story_id,
        current_position,
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

export const useDeleteProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (story_id: number) => {
      const { data } = await axios.delete("/api/progress", {
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

export const useProgress = (storyId: number | null) => {
  const { data: user } = useWelcomeUser();
  const userId = user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchProgress", storyId, userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");

      const response = await axios.get(`/api/progress`, {
        params: {
          story_id: storyId,
          user_id: userId,
        },
      });

      return response.data;
    },
    enabled: !!storyId && !!userId, // Ensure the query is only triggered if storyId and userId are available
  });

  return { data, isLoading, isError };
};
