import React, { useState } from "react";

const SlideDrawerV2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const drawerStyle = {
    width: "250px",
    height: "100%",
    position: "fixed",
    top: 0,
    right: isOpen ? 0 : "-250px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    transition: "right 0.5s",
    padding: "20px",
    zIndex: 1000,
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </button>

      <div style={drawerStyle}>
        <p>Drawer Content Here</p>
      </div>
    </div>
  );
};

export default SlideDrawerV2;
