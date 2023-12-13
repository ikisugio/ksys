import { useState } from "react";
import SlideDrawer from "@/components/SlideDrawerV2";

const DrawerToggleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Drawer2" : "Open Drawer3"}
      </button>
      <SlideDrawer isOpen={isOpen}>
        <p>Drawer Content Here</p>
      </SlideDrawer>
    </div>
  );
};

export default DrawerToggleButton;
