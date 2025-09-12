import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDurationFilters = () => {
  return useQuery({
    queryKey: ["durationFilters"],
    queryFn: async () => {
      return (await axios.get("/api/duration-ranges")).data;
    },
  });
};
