import { CategoryType } from "./CategoryType";

export interface StoryType {
  id: number;
  title: string;
  description: string | null;
  cover_img_url: string | null;
  categories: { category: CategoryType }[];
  total_pages: number | null;
  duration_range_id: number | null;
  age_range_id: number | null;
  audio_duration: number | null;
  language_id: number | null;
  current_position?: number | null;
  isFavorite?: boolean | null;
  chapters?: Array<{
    id: number | null;
    title: string;
    content: string | undefined;
    audio_url: string | null;
    story_url?: string;
  }>;
}
