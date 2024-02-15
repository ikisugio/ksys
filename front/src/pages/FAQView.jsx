import { useEffect } from "react";

export default function App() {
  const handleSelect = (e) => {
    console.log(e.currentTarget.value);
  };
  return (
    <div>
      <div>hoge</div>
      <select name="hoge" id="aiueo" onChange={handleSelect}>
        <option value="option1">label1</option>
        <option value="option2">label2</option>
        <option value="option3">label3</option>
      </select>
    </div>
  );
}
