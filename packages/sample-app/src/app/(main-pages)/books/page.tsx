/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, Suspense, useEffect } from "react";
import { Search } from "@mui/icons-material";
import {
  InputAdornment,
  Stack,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { Tune } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SearchModal from "./SearchModal";
import { useInfiniteStories } from "@repo/providers/queryHooks/useInfiniteStories";
import StoriesResult from "./StoriesResult";
import SelectedFiltersChips from "./SelectedFiltersChips";
import GreenBean from "../../components/GreenBean";
import { useCategories } from "@repo/providers/queryHooks/useCategories";
import BookSlider from "../../components/BookSlider";
import { getTranslateProperty } from "../../../utils";

const BooksPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksContent />
    </Suspense>
  );
};

interface Category {
  id: number;
  name: string;
}
interface FilterType {
  query?: string;
  categories?: Array<string | number>;
}

function parseSearchParams(
  searchParams: URLSearchParams
): Record<string, string[] | string> {
  const parsedFilters: Record<string, string[] | string> = {};
  searchParams.forEach((value, key) => {
    parsedFilters[key] = key === "query" ? value : value.split(",");
  });
  return parsedFilters;
}

const BooksContent = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterType>(
    parseSearchParams(searchParams)
  );
  const { replace } = useRouter();

  useEffect(() => {
    const validFilters: Record<string, string> = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined
      )
    );
    replace(`${pathname}?${new URLSearchParams(validFilters).toString()}`);
  }, [filters, replace, pathname]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isSearchEnabled,
  } = useInfiniteStories(filters);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = useDebouncedCallback((query) => {
    setFilters((prevState) => ({ ...prevState, query }));
  }, 300);

  const handleFilterSelectCallback = (filter: string, type: string) => {
    setFilters((prevState: any) => ({
      ...prevState,
      [type]: (prevState?.[type] || []).includes(filter)
        ? prevState[type].filter((i: string) => i != filter)
        : [...(prevState?.[type] || []), filter],
    }));
  };

  const handleFilterDeleteCallback = (filterToDelete: string, type: string) => {
    handleModalClose();
    setFilters((prevState: any) => ({
      ...prevState,
      [type]: prevState[type].filter((item: any) => item != filterToDelete),
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        ...(modalOpen ? { overflow: "hidden", height: "50vh" } : {}),
      }}
    >
      <GreenBean />
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          pt: 7,
          gap: 5,
        }}
      >
        <Stack sx={{ px: 2, width: "100%", gap: 1 }}>
          <TextField
            type="text"
            placeholder={t("search_textfiled_placeholder")}
            defaultValue={filters?.query}
            onChange={(e) => handleInputChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
            fullWidth
          />
          <Box sx={{ textAlign: "left" }}>
            <Button
              startIcon={<Tune />}
              onClick={() => setModalOpen(true)}
              sx={{ color: "text.primary" }}
            >
              {t("filter")}
            </Button>
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 0.5,
              width: "100%",
            }}
          >
            <SelectedFiltersChips
              handleFilterDelete={handleFilterDeleteCallback}
              filters={filters}
            />
          </Stack>
          <SearchModal
            open={modalOpen}
            onClose={handleModalClose}
            onFilterSelect={handleFilterSelectCallback}
            filters={filters}
          />
        </Stack>
        {isSearchEnabled ? (
          <StoriesResult
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            status={status}
            onFilterCategory={(catId) =>
              setFilters((prevState) => {
                const prevCat = prevState.categories?.filter(
                  (i) => i !== catId
                );
                return {
                  ...prevState,
                  categories: prevCat?.length ? [...prevCat, catId] : [catId],
                };
              })
            }
          />
        ) : isCategoriesLoading ? (
          <CircularProgress />
        ) : categoriesError ? (
          <Typography variant="h6">{t("Failed_to_load_categories")}</Typography>
        ) : (
          <Stack spacing={4} sx={{ width: "100%", mt: 2 }}>
            {categories.map((category: Category) => (
              <BookSlider
                key={category.id}
                categoryId={category.id}
                categoryName={getTranslateProperty(category, "name")}
                setCategories={(categories: Array<number>) => {
                  setFilters({ categories });
                }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default BooksPage;
