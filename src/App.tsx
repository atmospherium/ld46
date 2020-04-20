import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import useScrollToBottom from "./utils/useScrollToBottom";

import { Intro, Jokes, Problem } from "./Scenes";
import { useMount, useTitle } from "react-use";

window.onkeydown = function (e) {
  if (e.keyCode === 8 && e.target === document.body) e.preventDefault();
};

function App() {
  useTitle("THE HONEST AI");
  const [voices, setVoices] = useState<any[]>([]);
  useMount(() => {
    setTimeout(() => {
      setVoices(window.speechSynthesis.getVoices());
    }, 1000);
  });

  const [attributes, setAttributes] = useState<any>({});
  const [consoleArray, setConsoleArray] = useState([Intro]);

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
    <div className={`App ${attributes.replaced && "reverse"}`}>
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
