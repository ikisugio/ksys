import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MyTimeline from "@/components/MyTimeline";
import DrawerCard from "@/components/DrawerCard";
import TimelineCard from "@/components/TimelineCard";

const DrawerButton = ({ isOpen, leftData, rightData, onClose }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  console.log("rightData:", rightData);

  const drawerStyle = {
    width: "85vw",
    height: "100%",
    top: 0,
    position: "fixed",
    right: isOpen ? 0 : "-1050px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    transition: "right 3s ease-in-out !important",
    padding: "10px",
    zIndex: 100,
    borderLeft: "1px solid rgba(0,0,0,0.2)",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    margin: 0,
  };

  const dataContainerStyle = {
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const toggleButtonStyle = {
    position: "absolute",
    left: "-30px",
    top: "50%",
    transform: "translateY(-50%)",
    height: "100%",
    width: "30px",
    backgroundColor: "transparent",
    color: isButtonHovered ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "24px",
    lineHeight: "40px",
    transition: "color 0.5s ease",
  };

  const columnStyle = {
    flex: 1,
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "10px",
  };

  const leftColumnOuterStyle = {
    ...columnStyle,
    flex: "0 1 40%",
    direction: "rtl", // 親要素を RTL に設定
  };

  const leftColumnInnerStyle = {
    direction: "ltr",
    width: "100%",
  };

  return (
    <div style={drawerStyle}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={leftColumnOuterStyle}>
          <div style={leftColumnInnerStyle}>
            {leftData.map(({ title, data }) => (
              <DrawerCard key={title} title={title} data={data} />
            ))}
          </div>
        </div>
        <div style={columnStyle}>
          <MyTimeline events={rightData} />
        </div>
      </div>
    </div>
  );
};

export default DrawerButton;
