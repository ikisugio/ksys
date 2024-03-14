export const MainContent = ({ children, menuOpen }) => {
  const mainContentClass = `transition-transform duration-300 ease-out overflow-auto ${
    menuOpen ? `translate-x-[${DRAWER_WIDTH}px]` : "translate-x-0"
  }`;
  return <div className={mainContentClass}>{children}</div>;
};

export default MainContent;
