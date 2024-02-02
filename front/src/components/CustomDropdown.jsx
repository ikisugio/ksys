import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, onSelect, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef}>
      {isOpen && options.length > 0 && (
        <ul style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid lightgray",
          borderRadius: "4px",
          zIndex: 1000,
          width: "100%",
          maxHeight: "70vh",
          overflowY: "auto",
        }}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => onSelect(option.value)}
              className="hover:bg-gray-200 whitespace-pre-wrap py-0.5 border-b text-lg"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default CustomDropdown;
