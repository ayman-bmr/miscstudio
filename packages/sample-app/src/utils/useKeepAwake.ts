import { useEffect } from "react";
import { KeepAwake } from "@capacitor-community/keep-awake";

const keepAwake = async () => {
  await KeepAwake.keepAwake();
};

const allowSleep = async () => {
  await KeepAwake.allowSleep();
};

const isSupported = async () => {
  const result = await KeepAwake.isSupported();
  return result.isSupported;
};

export function useKeepAwake() {
  useEffect(() => {
    const setAwake = async () => {
      if (await isSupported()) {
        try {
          keepAwake();
        } catch (error) {
          throw new Error("Failed to set screen orientation");
        }
      }
    };
    setAwake();

    const removeAwake = async () => {
      if (await isSupported()) {
        allowSleep();
      }
    };
    return () => {
      removeAwake();
    };
  }, []);
}
