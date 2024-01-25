import React, { useState } from "react";

const ToggleButton = ({ label, value, selected, onChange }) => {
  const baseStyle =
    "w-24 mx-2 p-2 border-2 rounded-lg transition-all duration-300 font-bold";
  const borderColor = selected
    ? "border-transparent"
    : value === "advice"
    ? "border-green-700 border-opacity-50"
    : "border-red-700 border-opacity-50";
  const bgColor = selected
    ? value === "advice"
      ? "bg-green-700 bg-opacity-70"
      : "bg-red-700 bg-opacity-70"
    : "bg-white";
  const hoverEffect = "hover:bg-black-100";
  const textColor = selected ? "text-white" : "text-gray-500";

  return (
    <button
      className={`${baseStyle} ${borderColor} ${bgColor} ${textColor} ${hoverEffect}`}
      onClick={() => onChange(value)}
    >
      {label}
    </button>
  );
};

const InquiryForm = () => {
  const [t1Selected, setT1Selected] = useState([]);
  const [t2Selected, setT2Selected] = useState([]);

  const handleT1Change = (value) => {
    const newSelection = t1Selected.includes(value)
      ? t1Selected.filter((v) => v !== value)
      : [...t1Selected, value];
    setT1Selected(newSelection);
  };

  const handleT2Change = (value) => {
    const newSelection = t2Selected.includes(value)
      ? t2Selected.filter((v) => v !== value)
      : [...t2Selected, value];
    setT2Selected(newSelection);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="font-bold p-4 text-gray-500">t1:</div>
        <ToggleButton
          label="相談"
          value="advice"
          selected={t1Selected.includes("advice")}
          onChange={handleT1Change}
        />
        <ToggleButton
          label="援助"
          value="support"
          selected={t1Selected.includes("support")}
          onChange={handleT1Change}
        />
      </div>
      <div className="flex items-center">
        <div className="font-bold p-4 text-gray-500">t2:</div>
        <ToggleButton
          label="相談"
          value="advice"
          selected={t2Selected.includes("advice")}
          onChange={handleT2Change}
        />
        <ToggleButton
          label="援助"
          value="support"
          selected={t2Selected.includes("support")}
          onChange={handleT2Change}
        />
        <ToggleButton
          label="オプション3"
          value="aaa"
          selected={t2Selected.includes("aaa")}
          onChange={handleT2Change}
        />
        <ToggleButton
          label="オプション4"
          value="bbb"
          selected={t2Selected.includes("bbb")}
          onChange={handleT2Change}
        />
      </div>
    </div>
  );
};

export default InquiryForm;
