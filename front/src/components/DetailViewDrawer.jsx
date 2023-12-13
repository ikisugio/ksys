// DetailViewPaper.jsx
import React from "react";
import { Paper, Button, Slider } from "@mui/material";
import { BORDER_COLOR } from "@/constants/styles";

const DetailViewDrawer = ({
  isDrawerOpen,
  handleDrawerClose,
  drawerWidth,
  handleSliderChange,
  selectedRow,
}) => {
  return (
    <Paper
      elevation={0}
      style={{
        width: `${drawerWidth}%`,
        height: `90%`,
        position: "fixed",
        right: 0,
        bottom: 0,
        border: `1px solid ${BORDER_COLOR}`,
        transition: "transform 1.5s ease-in-out",
        transform: isDrawerOpen ? "translateX(0)" : `translateX(100%)`,
        backgroundColor: "white",
        zIndex: 1000,
      }}
    >
      <Button onClick={handleDrawerClose}>✖</Button>
      <Slider
        value={drawerWidth}
        onChange={handleSliderChange}
        min={20}
        max={80}
        style={{ width: "90%", margin: "0 auto" }}
      />
      <div style={{ padding: 20 }}>
        {selectedRow && JSON.stringify(selectedRow, null, 2)}
      </div>
    </Paper>
  );
};

export default DetailViewDrawer;
