import authHelpers from "@repo/providers/helpers/authHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const usePostGuest = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/guest");
      return data;
    },
    onSuccess: ({ user }) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.username,
          password: user.password,
        })
      );
      if (onSuccess)
        onSuccess({ username: user.username, password: user.password });
    },
    onError: (error) => {
      console.error("Failed to create guest user:", error);
    },
  });
};

export const useDeleteGuest = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete("/api/guest");
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("user");
      authHelpers.clearAuth();
      push("/welcome");
    },
    onError: (error) => {
      console.error("Failed to delete guest user:", error);
    },
  });
};
