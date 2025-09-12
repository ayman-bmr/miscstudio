import i18n from "@repo/providers/i18n/i18n";

export const getTranslateProperty = (obj: any, property: string): string => {
  return obj[property + (i18n.language === "ar" ? "_ar" : "")];
};