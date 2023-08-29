import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "white"
    ? {
        primary: "#3d4593", //
        secondary: "#9386b9", //
        dark: "#343434",
        white: "#d1d1e5",
        primaryDark: "#2c328c",
        secondaryDark: "#6768ac",
        blue: "#5d84c3",
        green: "#9bc5c9",
      }
    : {
        primary: "#3d4593", //
        secondary: "#9386b9", //
        dark: "#343434",
        white: "#d1d1e5",
        primaryDark: "#2c328c",
        secondaryDark: "#6768ac",
        blue: "#5d84c3",
        green: "#9bc5c9",
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
            background: {
              default: colors.dark,
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
            background: {
              default: colors.white,
            },
          }),
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Barlow Condensed", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [setMode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
