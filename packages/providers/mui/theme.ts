// i18n/mui/theme.ts
import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const getTheme = ({
  isRTL,
  mode,
}: {
  isRTL: boolean;
  mode: "light" | "dark";
}) =>
  createTheme({
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      mode,
      primary: {
        main: "#25CED1",
        light: "#51E6E9",
        dark: "#1A9CA1",
      },
      secondary: {
        main: "#FF8A5B",
        light: "#FFB58B",
        dark: "#D66A3B",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#fafafa",
        paper: mode === "dark" ? "#1E1E1E" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.87)",
        secondary:
          mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
      },
      grey: {
        50: mode === "dark" ? "#121212" : "#fafafa",
        100: mode === "dark" ? "#1E1E1E" : "#f5f5f5",
        200: mode === "dark" ? "#2E2E2E" : "#eeeeee",
        300: mode === "dark" ? "#424242" : "#e0e0e0",
        400: mode === "dark" ? "#616161" : "#bdbdbd",
        500: mode === "dark" ? "#757575" : "#9e9e9e",
        600: mode === "dark" ? "#9e9e9e" : "#757575",
        700: mode === "dark" ? "#bdbdbd" : "#616161",
        800: mode === "dark" ? "#e0e0e0" : "#424242",
        900: mode === "dark" ? "#eeeeee" : "#2E2E2E",
        A100: mode === "dark" ? "#f5f5f5" : "#d5d5d5",
        A200: mode === "dark" ? "#eeeeee" : "#aaaaaa",
        A400: mode === "dark" ? "#bdbdbd" : "#303030",
        A700: mode === "dark" ? "#616161" : "#616161",
      },
      glassyHeader: {
        background:
          mode === "dark"
            ? "rgba(30, 30, 30, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        border:
          mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
        gradient:
          mode === "dark"
            ? "linear-gradient(180deg, rgba(30, 30, 30, 0.2) 0%, rgba(30, 30, 30, 0) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      },
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
    },
    components: {
      // ✅ Removed the Typography color override so color prop works
      MuiTypography: {},
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.MuiButton-containedPrimary": {
              fontWeight: 600,
              background: "linear-gradient(45deg, #25CED1 20%, #51E6E9 100%)",
              color: mode === "dark" ? "#121212" : "#ffffff",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1E1E1E" : "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1E1E1E" : "#ffffff",
            color: mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.87)",
          },
        },
      },
    },
  });

// Add type declaration for the custom palette options
declare module "@mui/material/styles" {
  interface Palette {
    glassyHeader: {
      background: string;
      border: string;
      gradient: string;
    };
  }
  interface PaletteOptions {
    glassyHeader: {
      background: string;
      border: string;
      gradient: string;
    };
  }
}

export default getTheme;
