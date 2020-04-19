import React, { useState } from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";

import useEventListener from "@use-it/event-listener";

import useScrollToBottom from "./utils/useScrollToBottom";

const Input: React.FC<{
  active: boolean;
  onEnter: Function;
  entryPrefix?: string;
  value?: string;
}> = React.memo(({ active = false, onEnter, entryPrefix, value = "" }) => {
  const [_value, setValue] = useState(value);

  useEventListener("keypress", ({ key }: any) => {
    if (!active) return;
    if (key === "Enter") {
      onEnter(_value);
    } else if (key.length === 1) {
      setValue(_value + key);
    }
  });

  useEventListener("keydown", ({ key }: any) => {
    if (!active) return;
    if (key === "Backspace") {
      setValue(_value.substring(0, _value.length - 1));
    }
  });

  return (
    <span>
      &gt; {entryPrefix && `${entryPrefix}: `}
      {_value}
    </span>
  );
});

type ConsoleInputType = {
  active: boolean;
  choices?: any[];
  onComplete?: Function;
  entry?: (value: string) => void;
  entryPrefix?: string;
  children: any;
  speed?: "normal" | "fast" | "slow";
};
const Console: React.FC<ConsoleInputType> = ({
  active = false,
  choices,
  onComplete,
  children,
  entry,
  entryPrefix = "",
  speed = "normal",
}) => {
  const [lineCount, setLineCount] = useState(0);
  const [inputArray, setInputArray] = useState([Input]);
  const [inputValues, setInputValues] = useState<any[]>([]);
  const [typingDone, setTypingDone] = useState(false);
  const unknownInput = (
    <>
      <br />
      Unknown input, please try again...
      <br />
    </>
  );

  const handleOnTypingDone = () => {
    setTypingDone(true);
    onComplete?.();
  };

  const reset = () => {
    setInputArray([...inputArray, Input]);
  };

  const resolveAction = (value) => {
    const action = choices?.find(
      ({ text }) => text.toLowerCase() === value.toLowerCase()
    )?.action;
    setInputValues([...inputValues, value]);
    if (action) {
      action();
    } else if (entry) {
      entry(value);
    } else {
      reset();
    }
  };

  useScrollToBottom(inputArray);
  useScrollToBottom(lineCount);

  const inputs = (
    <span className="inputs">
      {inputArray
        .map((I, index) => {
          return (
            <I
              key={index}
              value={inputValues[index]}
              entryPrefix={entryPrefix}
              active={active && index === inputArray.length - 1}
              onEnter={resolveAction}
            />
          );
        })
        .reduce((a, b) => (
          <>
            {a}
            {unknownInput}
            {b}
          </>
        ))}
    </span>
  );
  return (
    <>
      <Typist
        cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
        avgTypingDelay={(speed === "fast" && 20) || 70}
        onLineTyped={() => {
          setLineCount(lineCount + 1);
        }}
        onTypingDone={handleOnTypingDone}
      >
        {children}
      </Typist>
      {typingDone && (choices || entry) && inputs}
    </>
  );
};

export default React.memo(Console);
