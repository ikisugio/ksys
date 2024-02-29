import { useState, useRef } from "react";

export default function TestPropagation() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl">title: {inputValue}</h1>
        <input
          className="border-2 border-slate-500 hover:border-blue-700 focus:border-green-500 rounded pl-4 pr-10 py-2"
          placeholder="search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
        />
      </div>
      <div className="flex justify-end p-3 gap-3">
        <button
          onClick={() => {
            console.log(inputValue);
          }}
          className="border-2 border-gray-400 hover:bg-slate-100 rounded w-16 bg-green-600 hover:bg-green-500 text-white"
        >
          click
        </button>
        <button
          className="w-16 border-2 border-gray-400 bg-red-600 hover:bg-red-500 text-white rounded"
          onClick={() => {
            setInputValue("");
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}
