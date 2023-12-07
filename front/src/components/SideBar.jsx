import {
  StyledDrawer,
  DrawerListContainer,
  BoldListItemText,
  StyledListItem,
} from "@/styles/component-styleds";
import { Backdrop, List } from "@mui/material";
import { Link } from "react-router-dom";

export const SideBar = ({ menuOpen, toggleMenu }) => {
  return (
    <div>
      <StyledDrawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
        onClick={toggleMenu}
      >
        <DrawerListContainer>
          <List>
            <StyledListItem
              button="true"
              component={Link}
              to="/transaction/list"
              onClick={toggleMenu}
            >
              <BoldListItemText primary={`訪問履歴\u3000一覧`} />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/transaction/create"
              onClick={toggleMenu}
            >
              <BoldListItemText primary={`訪問履歴\u3000作成`} />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/jigyosyo/search"
              onClick={toggleMenu}
            >
              <BoldListItemText primary={`事業所\u3000\u3000検索`} />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/jigyosyo/add"
              onClick={toggleMenu}
            >
              <BoldListItemText primary={`事業所\u3000\u3000追加`} />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/faq"
              onClick={toggleMenu}
            >
              <BoldListItemText primary="よくある質問・回答" />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/inquiry"
              onClick={toggleMenu}
            >
              <BoldListItemText primary="要望・問い合わせ" />
            </StyledListItem>
            <StyledListItem
              button="true"
              component={Link}
              to="/version"
              onClick={toggleMenu}
            >
              <BoldListItemText primary="更新情報" />
            </StyledListItem>
            <StyledListItem
              button="true"
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
    </div>
  );
};

export default SideBar;
