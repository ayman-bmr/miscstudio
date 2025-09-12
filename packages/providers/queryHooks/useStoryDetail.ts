import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLanguage } from "@repo/providers/i18n/useLanguage";

import { StoryType } from "../intefaces/StoryType";

async function fetchStoryDetail(
  storyId: number,
  lng: string
): Promise<StoryType> {
  const response = await axios.get(`/api/stories/${storyId}`, {
    params: { lng },
  });
  return response.data;
}

export function useStoryDetail(storyId: number | null) {
  const lng = getCurrentLanguage();

  return useQuery<StoryType, Error>({
    queryKey: ["storyDetail", storyId, lng],
    queryFn: () => {
      if (storyId === null) {
        return Promise.reject(new Error("storyId is required"));
      }
      return fetchStoryDetail(storyId, lng);
    },
    enabled: !!storyId,
  });
}
