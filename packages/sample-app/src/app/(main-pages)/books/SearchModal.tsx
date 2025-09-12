"use client";
import React from "react";
import { Box, Stack, Button } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FilterSection from "./FilterSection";
import { useFilterData } from "../../../utils/useFilterData";

interface SearchModalProps {
  open: boolean;
  filters: any;
  onClose: () => void;
  onFilterSelect: (filter: string, name: string) => void;
}
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8, // Positioned at the top of the drawer content
  left: "calc(50% - 15px)",
}));


const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  onFilterSelect,
  filters,
}) => {
  const { t } = useTranslation();
  const filtersData = useFilterData();

  return (
    <SwipeableDrawer
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      anchor="bottom"
      swipeAreaWidth={20} // Adjusts the sensitive swipeable edge width
      PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
    >
      <Puller />
      <Box sx={{ flex: 1, overflow: "auto", py: 1, px: 2 }}>
        {filtersData.map(({ data: dataQuery, title, name, getName }, index) => (
          <FilterSection
            key={index}
            title={title.toLowerCase()}
            name={name}
            filters={dataQuery.data || []}
            onFilterSelect={onFilterSelect}
            isLoading={dataQuery.isPending}
            isError={dataQuery.isError}
            errorMessage={dataQuery.error?.message}
            getName={getName}
            isSelected={(id: string, type: string) =>
              filters[type]?.includes(id)
            }
          />
        ))}
      </Box>
      <Stack sx={{ alignItems: "center", py: 4 }}>
        <Button variant="contained" sx={{ width: "80%" }} onClick={onClose}>
          {t("close_button_text")}
        </Button>
      </Stack>
    </SwipeableDrawer>
  );
};

export default SearchModal;
