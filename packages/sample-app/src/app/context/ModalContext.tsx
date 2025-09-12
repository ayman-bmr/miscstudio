import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useRouter } from "next/navigation";

interface StoryData {
  id: number | null;
  title: string;
  description?: string | null;
  coverImgUrl: string | null;
}

interface ModalContextProps {
  isOpen: boolean;
  openModal: (storyData: StoryData) => void;
  closeModal: () => void;
  storyData: StoryData | null;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storyData, setStoryData] = useState<StoryData | null>(null);

  const openModal = useCallback((data: StoryData) => {
    setStoryData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setStoryData(null);
  }, []);

  const { back } = useRouter();

  useEffect(() => {
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (isOpen) {
        closeModal();
      } else if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        back();
      }
    });
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [back, isOpen, closeModal]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
      storyData,
    }),
    [isOpen, storyData, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
