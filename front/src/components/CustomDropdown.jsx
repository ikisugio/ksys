import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, onSelect, isOpen }) => {
  return (
    <div>
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
          width: "100%", // 必要に応じて調整
          maxHeight: "200px", // 適宜調整
          overflowY: "auto"
        }}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => onSelect(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "lightgray",
                }
              }}
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
