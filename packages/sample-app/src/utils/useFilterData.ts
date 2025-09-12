import { useAgeFilters } from "@repo/providers/queryHooks/useAgeFilters";
import { useCategories } from "@repo/providers/queryHooks/useCategories";
import { useDurationFilters } from "@repo/providers/queryHooks/useDurationFilters";
import { useStoryLanguage } from "@repo/providers/queryHooks/useStoryLanguage";
import { getTranslateProperty } from ".";

export function useFilterData() {
  const categories = useCategories();
  const ageFilters = useAgeFilters();
  const languageFilters = useStoryLanguage();
  const durationFilters = useDurationFilters();

  return [
    {
      name: "categories",
      data: categories,
      title: "Category",
      getName: (filter: any) => getTranslateProperty(filter, "name"),
    },
    {
      name: "languages",
      data: languageFilters,
      title: "Language",
      getName: (filter: any) => filter.name,
    },
    {
      name: "ages",
      data: ageFilters,
      title: "Age",
      getName: (filter: any) => filter.range,
    },
    {
      name: "durations",
      data: durationFilters,
      title: "Duration",
      getName: (filter: any) => filter.range,
    },
  ];
}
