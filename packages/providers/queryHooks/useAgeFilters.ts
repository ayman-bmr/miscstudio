import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAgeFilters = () => {
  return useQuery({
    queryKey: ["ageFilters"],
    queryFn: async () => {
      return (await axios.get("/api/age-ranges")).data;
    },
  });
};
