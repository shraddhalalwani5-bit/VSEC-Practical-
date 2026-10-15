import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <h1>Live Text Display</h1>

      <input
        type="text"
        placeholder="Enter something"
        onChange={handleChange}
      />

      <h2>{text}</h2>
    </div>
  );
}

export default App;