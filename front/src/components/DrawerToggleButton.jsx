import { useState } from "react";
import SlideDrawer from "@/components/SlideDrawerV2";

const DrawerToggleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <SlideDrawer isOpen={isOpen}></SlideDrawer>
    </div>
  );
};

export default DrawerToggleButton;
