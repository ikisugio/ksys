import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SlideDrawerV2 = ({ isOpen, data, onClose }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const drawerStyle = {
    width: "1000px",
    height: "100%",
    position: "fixed",
    top: 60,
    right: isOpen ? 0 : "-1050px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    transition: "right 3s ease-in-out !important",
    padding: "20px",
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

  return (
    <div>
      <button onClick={onClose}>
        Close Drawer
      </button>

      <div style={drawerStyle}>
        <button
          style={toggleButtonStyle}
          onClick={onClose}
          onMouseOver={() => setIsButtonHovered(true)}
          onMouseOut={() => setIsButtonHovered(false)}
        >
          {isButtonHovered ? ">" : "|"}
        </button>

        {data && Object.keys(data).map((key) => (
          <Card key={key} style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {key}
              </Typography>
              <Typography variant="body1">
                {data[key]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SlideDrawerV2;