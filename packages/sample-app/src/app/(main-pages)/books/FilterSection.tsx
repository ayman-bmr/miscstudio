import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FilterSectionProps {
  title: string;
  name: string;
  filters: any[];
  onFilterSelect: (filter: string, name: string) => void;
  getName: (filter: any) => string;
  isSelected: (id: string, type: string) => boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  filters,
  onFilterSelect,
  isSelected,
  isLoading,
  isError,
  errorMessage,
  name,
  getName,
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t(title)}
      </Typography>

      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
        {isError && <Typography>{errorMessage}</Typography>}
        {isLoading && <Typography>{t("loading")}</Typography>}
        {!isLoading &&
          !isError &&
          filters.map((filter: any) => (
            <Chip
              key={filter.id}
              label={getName(filter)}
              onClick={() => onFilterSelect(filter.id, name)}
              color={isSelected(filter.id, name) ? "primary" : "default"}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default FilterSection;
