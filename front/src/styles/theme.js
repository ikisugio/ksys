import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(120, 100, 200, 0.7)",
      contrastText: "#fff",
    },
    success: {
      main: "rgba(50, 150, 80, 0.7)",
      contrastText: "#fff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(120, 100, 255, 0.2)",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          border: "1px solid lightgrey",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid rgba(120, 100, 255, 0.7)", // ホバー時に枠線を強調
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
