import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MyTimeline from "@/components/MyTimeline";
import DrawerCard from "@/components/DrawerCard";
import TimelineCard from "@/components/TimelineCard";
import axiosInstance from "@/services/axios"

const DrawerButton = ({ isOpen, leftData, rightData, mainData, onClose }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  console.log("leftData:", leftData);
  console.log("rightData:", rightData);
  console.log("mainData: ", mainData);
  console.log("jigyosyoCode: ", mainData.jigyosyoCode);


  useEffect(() => {
    if (mainData && mainData.jigyosyoCode) {
      const fetchTransactions = async () => {
        try {
          const response = await axiosInstance.get(`search/jigyosyo-transaction/?_jigyosyo_code=${mainData.jigyosyoCode}`);
          setFetchedData(response.data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();
    }
  }, [mainData]);

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
    direction: "rtl",
  };

  const leftColumnInnerStyle = {
    direction: "ltr",
    width: "100%",
  };

  const addButtonStyle = {
    position: "absolute",
    right: "10px",
    bottom: "10px",
  };

  const handleAddClick = () => {
    if (leftData.length > 0) {
      const firstId = leftData[0].id;
      console.log("Selected ID:", firstId);
    }
  };

  const jigyosyoId = leftData[0].data;

  return (
    <div style={drawerStyle}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={leftColumnOuterStyle}>
          <div style={leftColumnInnerStyle}>
            {leftData.map(({ title, data }) => (
              <DrawerCard key={title} title={title} initialData={data} />
            ))}
          </div>
        </div>
        <div style={columnStyle}>
          <MyTimeline events={rightData} target={jigyosyoId} />
        </div>
      </div>
    </div>
  );
};

export default DrawerButton;
