import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(120, 100, 255, 0.7)",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.1s",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(120, 100, 255, 0.2)",
          },
        },
      },
    },
  },
});
