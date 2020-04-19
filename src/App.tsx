import React, { useState } from "react";
import "./App.css";
import useScrollToBottom from "./utils/useScrollToBottom";

import { Intro } from "./Scenes";

function App() {
  const [attributes, setAttributes] = useState({});
  const [consoleArray, setConsoleArray] = useState([Intro]);

  const addAttribute = (attributeName, attributeValue) => {
    setAttributes(
      Object.assign({}, attributes, { [attributeName]: attributeValue })
    );
  };
  const addScene = (scene) => {
    setConsoleArray([...consoleArray, scene]);
  };
  useScrollToBottom(consoleArray);

  return (
    <div className="App">
      <div className="Console">
        {consoleArray.map((C, index) => (
          <C
            key={index}
            active={index === consoleArray.length - 1}
            attributes={attributes}
            addAttribute={addAttribute}
            next={addScene}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
