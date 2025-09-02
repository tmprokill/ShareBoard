import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setTheme,
} from "../../../common/app/redux/app-settings-slice";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../common/app/theme";
import { LanguageConstants, ThemeConstants } from "../../../common/constants";
import { ChangeEvent } from "react";
import { RootState } from "../../../common/app/redux/store";

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  label?: string;
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
}: DropdownProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentLanguage = useSelector(
    (state: RootState) => state.appSettings.language
  );
  const currentTheme = useSelector(
    (state: RootState) => state.appSettings.theme
  );

  const theme = useTheme();

  const handleLanguageChange = (language: string) =>
    dispatch(setLanguage(language));
  const handleThemeChange = (themeValue: string) =>
    dispatch(setTheme(themeValue));

  const languageDropdownOptions = [
    LanguageConstants.ENGLISH,
    LanguageConstants.UKRAINIAN,
  ];
  const themeDropdownOptions = [ThemeConstants.DARK, ThemeConstants.LIGHT];

  return (
    <header
      className={`h-16 px-6 shadow-sm border-b transition-colors duration-200 ${theme.surface} ${theme.border}`}
    >
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className={`text-xl font-bold ${theme.text}`}>
            {t ? t("app.title") : "Your App"}
          </h1>
        </div>

        {/* Settings */}
        <div className="flex items-center space-x-4">
          <Dropdown
            value={currentLanguage}
            onChange={handleLanguageChange}
            options={languageDropdownOptions}
            label={t ? t("settings.language") : "Language"}
          />

          <Dropdown
            value={currentTheme}
            onChange={handleThemeChange}
            options={themeDropdownOptions}
            label={t ? t("settings.theme") : "Theme"}
          />

          <div className="flex items-center">
            <button
              className={`p-2 rounded-full hover:opacity-75 transition-opacity ${theme.primary}`}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
