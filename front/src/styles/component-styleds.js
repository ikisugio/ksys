import styled from "@emotion/styled";
import {
  AppBar,
  Typography,
  Card,
  Drawer,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { HEADER_HEIGHT, DrawerWidth } from "@/constants/styles";

export const MainContent = styled.div`
  transition: transform 0.3s ease, width 0.3s ease;
  width: ${(props) =>
    props.menuOpen ? `calc(100% - ${DrawerWidth}px)` : "100%"};
  transform: ${(props) =>
    props.menuOpen ? `translateX(${DrawerWidth}px)` : "translateX(0)"};
`;

export const StyledAppBar = styled(AppBar)`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  box-shadow: 0.1px 0.1px 0.1px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 200, 0.1);
    border: 0.1px solid lightgray;
  }
  border: 1px solid lightgray;
`;

export const StyledTypography = styled(Typography)`
  color: #555;
  margin-left: 20px;
`;

export const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem auto;
  height: 70vh;
  padding: 4rem 1rem;
`;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: ${HEADER_HEIGHT};
    border-top: none !important;
    box-shadow: 0.1px 0.1px 0.5px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: ${DrawerWidth}px !important;
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

export const GlobalScrollbarStyles = styled.div`
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

  scrollbar-color: ${(props) => props.theme.palette.primary.main}
    rgba(120, 100, 255, 0.1);
  scrollbar-width: thin;
`;

export const AppContainer = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DrawerListContainer = styled.div`
  width: ${DrawerWidth}px;
`;

export const BoldListItemText = styled(ListItemText)`
  font-weight: bold !important;
`;

export const StyledListItem = styled(ListItemButton)`
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
