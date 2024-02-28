import AppRoutes from "@/routes/AppRoutes";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  MainContent,
  GlobalScrollbarStyles,
  AppContainer,
} from "@/styles/component-styleds";
import SideBar from "./components/SideBar";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "@/styles/theme";
import AppBar from "@/components/AppBar";
import { AuthProvider } from "@/hooks/AuthContext";
import "./App.css";

function App() {
  const [, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <GlobalScrollbarStyles>
          <BrowserRouter>
            <div className="App">
              <AppBar toggleMenu={toggleMenu}></AppBar>
              <SideBar menuOpen={menuOpen} toggleMenu={toggleMenu}></SideBar>
              <MainContent menuOpen={menuOpen}>
                <AppContainer>
                  <AppRoutes setLoggedIn={setLoggedIn}></AppRoutes>
                </AppContainer>
              </MainContent>
            </div>
          </BrowserRouter>
        </GlobalScrollbarStyles>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
