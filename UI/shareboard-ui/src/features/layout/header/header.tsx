import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setTheme,
} from "../../../common/app/redux/app-settings-slice";
import { useTheme } from "../../../common/app/theme";
import { LanguageConstants, ThemeConstants } from "../../../common/constants";
import { RootState } from "../../../common/app/redux/store";
import { Dropdown } from "../../../common/components/dropdown";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguage = useSelector(
    (state: RootState) => state.appSettings.language
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
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
      className={`h-24 px-6 shadow-sm border-b transition-colors duration-200 ${theme.surface} ${theme.border}`}
    >
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className={`text-xl font-bold ${theme.text}`}>ShareBoard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Dropdown
            value={currentLanguage}
            onChange={handleLanguageChange}
            options={languageDropdownOptions}
          />
          <Dropdown
            value={currentTheme}
            onChange={handleThemeChange}
            options={themeDropdownOptions}
          />
          <div className="flex items-center">
            {isAuthenticated ? (
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
            ) : (
              <>
                <button
                  className={`p-2 hover:opacity-75 transition-opacity ${theme.primary}`}
                  onClick={() => navigate("/login")}
                >
                  {t("header.login-button")}
                </button>
                <button
                  className={`p-2 hover:opacity-75 transition-opacity ${theme.secondary}`}
                  onClick={() => navigate("/register")}
                >
                  {t("header.register-button")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
