import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import useScrollToBottom from "./utils/useScrollToBottom";

import { Intro, Jokes, Problem } from "./Scenes";
import { useMount } from "react-use";

function App() {
  const [voices, setVoices] = useState<any[]>([]);
  useMount(() => {
    setTimeout(() => {
      setVoices(window.speechSynthesis.getVoices());
    }, 1000);
  });

  const [attributes, setAttributes] = useState({});
  const [consoleArray, setConsoleArray] = useState([Problem]);

  const addAttribute = (attributeName, attributeValue) => {
    setAttributes(
      Object.assign({}, attributes, { [attributeName]: attributeValue })
    );
  };
  const addScene = useCallback(
    (scene) => {
      setConsoleArray([...consoleArray, scene]);
    },
    [consoleArray]
  );
  useScrollToBottom(consoleArray);

  return (
    <div className="App">
      <div className="Console">
        {(voices.length > 0 &&
          consoleArray.map((Component, index) => (
            <Component
              key={index}
              active={index === consoleArray.length - 1}
              attributes={attributes}
              addAttribute={addAttribute}
              voices={voices}
              next={addScene}
            />
          ))) ||
          "LOADING..."}
      </div>
    </div>
  );
}

export default App;
