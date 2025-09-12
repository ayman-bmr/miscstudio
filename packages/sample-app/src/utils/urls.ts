export const getParamFromUrl = (key: string): string | null => {
  if (typeof window !== "undefined") {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    return params.get(key);
  }
  return null;
};
