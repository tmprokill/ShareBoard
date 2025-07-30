import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import uk from "./locales/uk/translation.json";
import { AppSettingDefaultConstants } from "../common/constants";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    lng: localStorage.getItem("i18nextLng") || AppSettingDefaultConstants.DEFAULT_LANGUAGE, 
    fallbackLng: AppSettingDefaultConstants.FALLBACK_LANGUAGE,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
