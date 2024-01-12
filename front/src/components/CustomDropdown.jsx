import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, onSelect, isOpen, setIsOpen }) => {
  const maxItemsToShow = 8;
  const itemHeight = 40;
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef}>
      {isOpen && options.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            backgroundColor: "#fff",
            boxShadow: "0",
            width: "100%",
            maxHeight: `${maxItemsToShow * itemHeight}px`,
            overflowY: options.length > maxItemsToShow ? "scroll" : "hidden",
            border: "1px solid lightgray",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHoveredItem(option.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  hoveredItem === option.id ? "lightgray" : "#fff",
              }}
            >
              {option.name} ({option.jigyosyo_code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
