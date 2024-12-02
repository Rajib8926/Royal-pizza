import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxxs: true;
    xxs: true;
    xxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xxxs: 0,
      xxs: 340,
      xs: 490,
      sm: 670,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2000,
    },
  },
  palette: {
    primary: {
      light: "#ffb411",
      main: "#ffb411",
      dark: "#ffb411",
      contrastText: "#fff",
    },

    secondary: {
      light: "#ffb411",
      main: "#ffb411",
      dark: "#ffb411",
      contrastText: "#000",
    },
    error: {
      main: "#ff1919",
    },
  },

  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": { paddingBottom: "12px" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { "&.Mui-disabled": { backgroundColor: "#ffff75" } },
      },
    },

    MuiTextField: {
      defaultProps: {
        color: "secondary",

        style: {
          borderColor: "#ffb411",
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFF9",
          borderRadius: "5px",

          "& fieldset": {
            color: "#ffe57D",
            border: `1px solid #FFE57D`,
          },
        },
      },
    },
  },
});

export default theme;
