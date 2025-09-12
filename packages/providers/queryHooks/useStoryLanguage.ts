import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStoryLanguage = () => {
  return useQuery({
    queryKey: ["storyLanguage"],
    queryFn: async () => {
      return (await axios.get("/api/language")).data;
    },
  });
};
