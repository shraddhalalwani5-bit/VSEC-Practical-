import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="container">
      <h1>Live Text Display</h1>

      <input
        type="text"
        placeholder="Enter something"
        value={text}
        onChange={handleChange}
      />

      <h2>{text}</h2>
    </div>
  );
}

export default App;