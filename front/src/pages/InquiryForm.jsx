import React, { useRef, useState } from "react";

function TextInputWithFocusButton() {
  const inputNameEl = useRef(null);
  const titleEl = useRef(null);
  const [title, setTitle] = useState("initial title");

  const onButtonClick = () => {
    console.log(inputEl.current.value);
    setTitle(inputEl.current.value);
    console.log("title el is ", titleEl.current.innerText);
    inputEl.current.focus();
  };

  const name = "";

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 ref={titleEl} style={{ textAlign: "center" }}>
          {name && title}
        </h1>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <label htmlFor="name">Name:</label>
          <input ref={inputNameEl} id="name" name="name"></input>
        </div>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email"></input>
        </div>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <label htmlFor="pass">Password:</label>
          <input id="pass" name="pass"></input>
        </div>
      </div>
    </>
  );
}

const InquireForm = TextInputWithFocusButton;
export default InquireForm;
