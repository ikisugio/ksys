import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import JigyosyoSearch from "./components/JigyosyoSearch";
import JigyosyoTransactionList from "./components/JigyosyoTransactionList";
import Login from "./components/Login";
import Edit from "./components/JigyosyoEdit";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Card,
  Backdrop,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";

const HEADER_HEIGHT = "66px";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(120, 100, 255, 0.7)",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.2s",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(120, 100, 255, 0.2)",
          },
        },
      },
    },
  },
});

const DrawerWidth = 220;

const MainContent = styled.div`
  transition: transform 0.3s ease, width 0.3s ease;
  width: ${(props) =>
    props.menuOpen
      ? `calc(100% - ${DrawerWidth}px)`
      : "100%"}; // menuOpenの状態に応じてメインの要素の幅を変更
  transform: ${(props) =>
    props.menuOpen
      ? `translateX(${DrawerWidth}px)`
      : "translateX(0)"}; // menuOpenの状態に応じてtranslateの値を変更
`;

const StyledAppBar = styled(AppBar)`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  box-shadow: 0.1px 0.1px 0.1px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 200, 0.1);
    border: 0.1px solid lightgray;
  }
  border: 1px solid lightgray;
`;

const StyledTypography = styled(Typography)`
  color: #555; // 文字色を灰色に設定
  margin-left: 20px;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem auto;
  height: 70vh;
  padding: 4rem 1rem;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: ${HEADER_HEIGHT};
    border-top: none !important;
    box-shadow: 0.1px 0.1px 0.5px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: ${DrawerWidth}px !important;
    // background-color: rgba(63, 81, 181, 0.05);
    background-color: rgba(63, 81, 181, 0);
    &:hover {
      border: 0.03px solid lightgray;
      box-shadow: 1px 1px 1px rgba(0, 0, 200, 0.1);
    }
  }
  .MuiBackdrop-root {
    display: none;
  }
`;

const GlobalScrollbarStyles = styled.div`
  // Chrome, Safari 対応
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(120, 100, 255, 0.1);
  }

  // Firefox 対応
  scrollbar-color: ${(props) => props.theme.palette.primary.main}
    rgba(120, 100, 255, 0.1);
  scrollbar-width: thin;
`;

const AppContainer = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${HEADER_HEIGHT};
`;

const DrawerListContainer = styled.div`
  width: ${DrawerWidth}px;
`;

const BoldListItemText = styled(ListItemText)`
  font-weight: bold !important;
`;

const StyledListItem = styled(ListItemButton)`
  transition: background-color 0.3s, border-radius 0.3s;

  &:hover {
    background-color: rgba(220, 220, 220, 0.6);
    border-radius: 15px;
  }

  .MuiListItemText-root {
    color: #555;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
  }

  margin-left: 15px;
  margin-right: 15px;
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAccountSwitch = () => {
    setLoggedIn(!loggedIn);
    setMenuOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalScrollbarStyles>
        <BrowserRouter>
          <div className="App">
            <StyledAppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="default"
                  aria-label="menu"
                  onClick={toggleMenu}
                >
                  <MenuIcon style={{ color: "#555" }} />
                </IconButton>
                <StyledTypography
                  variant="h6"
                  style={{ flexGrow: 1 }}
                  className="unselectable"
                >
                  事業所管理システム
                </StyledTypography>
              </Toolbar>
            </StyledAppBar>
            <StyledDrawer
              anchor="left"
              open={menuOpen}
              onClose={toggleMenu}
              onClick={toggleMenu}
            >
              <DrawerListContainer>
                <List>
                  <StyledListItem
                    button
                    component={Link}
                    to="/jigyosyo-transaction-list"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary={`訪問履歴\u3000一覧`} />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/jigyosyo-transaction-create"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary={`訪問履歴\u3000作成`} />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/jigyosyo-search"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary={`事業所\u3000\u3000検索`} />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/jigyosyo-create"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary={`事業所\u3000\u3000追加`} />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary="よくある質問・回答" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary="要望・問い合わせ" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary="更新情報" />
                  </StyledListItem>
                  <StyledListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <BoldListItemText primary="ユーザー切替" />
                  </StyledListItem>
                </List>
              </DrawerListContainer>
            </StyledDrawer>
            <Backdrop
              open={menuOpen}
              onClick={toggleMenu}
              style={{ backgroundColor: "transparent" }}
            />
            <MainContent menuOpen={menuOpen}>
              {" "}
              <AppContainer>
                <Routes>
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route
                    path="/jigyosyo-search"
                    element={<JigyosyoSearch />}
                  />{" "}
                  <Route
                    path="/jigyosyo-transaction-list"
                    element={<JigyosyoTransactionList />}
                  />{" "}
                  <Route
                    path="/login"
                    element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
                  />
                </Routes>
              </AppContainer>
            </MainContent>
          </div>
        </BrowserRouter>
      </GlobalScrollbarStyles>
    </ThemeProvider>
  );
}

export default App;
