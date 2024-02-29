import React, { useState } from "react";

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
    } else {
      const availableSuggestions = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Elderberry",
      ];
      const filtered = availableSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        className="form-input w-full pl-4 pr-10 py-2 border-2 border-slate-500 hover:border-slate-600 rounded"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="検索..."
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-400 hover:bg-gray-500 text-white rounded-full p-0.5 flex items-end justify-center w-5 h-5"
        >
          <span className="text-lg leading-none">×</span>
        </button>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border-t-0 bg-white rounded border-slate-400 border-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-slate-500 hover:text-white rounded cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
