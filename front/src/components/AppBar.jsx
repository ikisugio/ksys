import { StyledAppBar, StyledTypography } from "@/styles/component-styleds";
import { Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const AppBar = ({ toggleMenu }) => {
  return (
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
  );
};

export default AppBar;
