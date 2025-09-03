import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export interface BaseTheme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  surface: string;
  error: string;
  errortext: string;
}

interface Dictionary<T> {
  [Key: string]: T;
}

export const themes: Dictionary<BaseTheme> = {
  light: {
    background: "bg-white",
    text: "text-black",
    primary: "bg-yellow-400",
    secondary: "text-gray-600",
    border: "border-gray-300",
    surface: "bg-gray-100",
    error: "bg-red-400",
    errortext: "text-red-600"
  },
  dark: {
    background: "bg-gray-900",
    text: "text-white",
    primary: "bg-yellow-600",
    secondary: "text-gray-400",
    border: "border-gray-700",
    surface: "bg-gray-800",
    error: "bg-red-400",
    errortext: "text-red-600"
  },
};

export const useTheme = () => {
  const themeName = useSelector((state: RootState) => state.appSettings.theme);
  return themes[themeName];
};
