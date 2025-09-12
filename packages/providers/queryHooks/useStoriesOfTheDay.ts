import { getCurrentLanguage } from "@repo/providers/i18n/useLanguage";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStoriesOfTheDay = () => {
  const lng = getCurrentLanguage();
  return useQuery({
    queryKey: ["storiesOfTheDay", lng],
    queryFn: async () => {
      const response = await axios.get("/api/stories-day", { params: { lng } });
      return response.data.stories;
    },
  });
};
