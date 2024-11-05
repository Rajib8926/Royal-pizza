import { createTheme } from "@mui/material";

// declare module "@mui/material/styles" {
//   interface Theme {
//     palette: {
//       button: {
//         main: string;
//       };
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     palette: {
//       button?: {
//         main?: string;
//       };
//     };
//   }
// }

const theme = createTheme({
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
  },

  components: {
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
