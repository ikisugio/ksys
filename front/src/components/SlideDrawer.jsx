import React, { useState } from "react";
import { Paper, Button } from "@mui/material";

const SlideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={toggleDrawer}>
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </Button>

      <Paper
        style={{
          width: "250px",
          height: "100%",
          position: "fixed",
          right: isOpen ? 0 : "-250px", // Drawerの開閉に応じて位置を変更
          transition: "right 0.5s", // スムーズな移動のためのトランジション
          zIndex: 1000,
          padding: "20px",
        }}
      >
        <p>Drawer Content Here</p>
      </Paper>
    </div>
  );
};

export default SlideDrawer;
