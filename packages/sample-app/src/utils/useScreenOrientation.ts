import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { ScreenOrientation } from "@capacitor/screen-orientation";

// you can call this hook from anywhere to fix the screen orientation in either portrait or landscape mode
export function UseScreenOrientation(orientation: "portrait" | "landscape") {
  useEffect(() => {
    const setOrientation = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          if (orientation === "landscape") {
            await ScreenOrientation.lock({ orientation: "landscape" });
          } else {
            await ScreenOrientation.lock({ orientation: "portrait" });
          }
        } catch (error) {
          throw new Error("Failed to set screen orientation");
        }
      }
    };
    setOrientation();

    return () => {
      if (Capacitor.isNativePlatform()) {
        ScreenOrientation.unlock();
      }
    };
  }, [orientation]);
}
