import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Network } from "@capacitor/network";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // For native platforms using Capacitor
      const checkStatus = async () => {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
      };
      checkStatus();

      Network.addListener("networkStatusChange", (status: any) => {
        setIsOnline(status.connected);
      });
      
      return () => {
        Network.removeAllListeners();
      };
    } else {
      // Fallback for web environments

      const abortController = new AbortController();

      window.addEventListener("online", () => setIsOnline(true), {
        signal: abortController.signal,
      });
      window.addEventListener("offline", () => setIsOnline(false), {
        signal: abortController.signal,
      });

      return () => {
        abortController.abort();
      };
    }
  }, []);

  return isOnline;
}
