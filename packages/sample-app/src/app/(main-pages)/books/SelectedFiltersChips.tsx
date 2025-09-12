import React from "react";
import { Chip } from "@mui/material";
import { useFilterData } from "../../../utils/useFilterData";

interface FilterChipsProps {
  handleFilterDelete: (filter: string, type: string) => void;
  filters: any;
}

const SelectedFiltersChips: React.FC<FilterChipsProps> = ({
  handleFilterDelete,
  filters,
}) => {
  const filtersData = useFilterData();

  return filtersData
    .filter(({ name, data }) => !!filters[name] && data?.data?.length)
    .map(({ title, name, data }) =>
      (filters[name] || []).map((filter: any) => (
        <Chip
          key={filter}
          label={`${title} : ${
            data.data?.find(({ id }: { id: number }) => id === parseInt(filter))
              ?.name || ""
          }`}
          onDelete={() => handleFilterDelete(filter, name)}
          color="primary"
          variant="outlined"
        />
      ))
    );
};

export default SelectedFiltersChips;
