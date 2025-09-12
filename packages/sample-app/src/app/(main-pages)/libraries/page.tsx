"use client";
import GreenBean from "../../components/GreenBean";
import ItemDisplay from "../../components/ItemDisplay";
import NoData from "../../components/NoData";
import { useDeleteFavorite } from "@repo/providers/queryHooks/useFavorite";
import { useDeleteProgress } from "@repo/providers/queryHooks/useProgress";
import { useUserBooks } from "@repo/providers/queryHooks/useUserBooks";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { StoryType } from "@repo/providers/intefaces/StoryType";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const LibrairyBloc = ({
  books,
  activeTab,
  index,
  onDelete,
}: {
  books: StoryType[];
  activeTab: number;
  index: number;
  onDelete: (n: number) => void;
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== index}
      id={`librairies-tabpanel-${index}`}
      aria-labelledby={`librairies-tab-${index}`}
    >
      {books.length > 0 ? (
        books.map((item: StoryType) => (
          <React.Fragment key={item.id}>
            <ItemDisplay story={item} showDelete onDelete={onDelete} />
          </React.Fragment>
        ))
      ) : (
        <NoData />
      )}
    </Box>
  );
};

const LibrariesPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const tabId = searchParams.get("tab")
    ? parseInt(searchParams.get("tab") as string, 10)
    : 0;

  const { data: books, isLoading, isError } = useUserBooks();
  const [activeTab, setActiveTab] = React.useState(tabId);
  const [openDialog, setOpenDialog] = React.useState(-1);
  const { mutate: deleteFavorite } = useDeleteFavorite();
  const { mutate: deleteProgress } = useDeleteProgress();

  const handleChange = (event: React.SyntheticEvent, newactiveTab: number) => {
    setActiveTab(newactiveTab);
  };

  if (isError) {
    return <Typography color="error">{t("error_loading_books")}</Typography>;
  }

  const { inProgressBooks = [], favoriteBooks = [] } = books || {};

  const a11yProps = (index: number) => {
    return {
      id: `librairies-tab-${index}`,
      "aria-controls": `librairies-tabpanel-${index}`,
    };
  };

  const onDelete = async () => {
    if (openDialog !== -1) {
      if (activeTab === 1) {
        deleteFavorite(openDialog);
      } else if (activeTab === 0) {
        deleteProgress(openDialog);
      }
      setOpenDialog(-1);
    }
  };

  return (
    <>
      <GreenBean />
      <Stack spacing={3} sx={{ px: 2, pb: 10, pt: 6 }}>
        <Typography variant="h4">{t("libraries_icon_label")}</Typography>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Librairie Tabs"
          centered
        >
          <Tab label={t("Continue_Reading")} {...a11yProps(0)} />
          <Tab label={t("favorites_icon_label")} {...a11yProps(1)} />
        </Tabs>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" width="100%" height={70} />
          ))
        ) : (
          <>
            <LibrairyBloc
              books={inProgressBooks}
              index={0}
              activeTab={activeTab}
              onDelete={(storyId) => {
                setOpenDialog(storyId);
              }}
            />
            <LibrairyBloc
              books={favoriteBooks}
              index={1}
              activeTab={activeTab}
              onDelete={(storyId) => {
                setOpenDialog(storyId);
              }}
            />
          </>
        )}
      </Stack>
      <Dialog
        open={openDialog !== -1}
        onClose={() => setOpenDialog(-1)}
        aria-labelledby="remove-dialog-confirmation"
        aria-describedby="remove-dialog-description"
      >
        <DialogTitle id="remove-dialog-confirmation">
          {t("removeDialogConfirmation")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="remove-dialog-description">
            {t("removeDialogDescription")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(-1)} color="inherit">
            {t("cancel")}
          </Button>
          <Button onClick={onDelete} color="error">
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LibrariesPage;
