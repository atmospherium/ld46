import React, { useState } from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";

import useEventListener from "@use-it/event-listener";

import useScrollToBottom from "./useScrollToBottom";

const Input: React.FC<{
  active: boolean;
  onEnter: Function;
  entryPrefix?: string;
  value?: string;
  color?: string;
}> = React.memo(
  ({ active = false, onEnter, entryPrefix, color = "white", value = "" }) => {
    const [_value, setValue] = useState(value);
    useScrollToBottom(_value);

    useEventListener("keypress", ({ key }: any) => {
      if (!active) return;
      if (key === "Enter" && _value.length > 0) {
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
      <span style={{ color }}>
        &gt; {entryPrefix && `${entryPrefix}: `}
        {_value}
      </span>
    );
  }
);

type ConsoleInputType = {
  active: boolean;
  choices?: any[];
  onComplete?: Function;
  entry?: (value: string) => void;
  entryPrefix?: string;
  children: any;
  speed?: "normal" | "fast" | "slow";
  attributes?: any;
  ShowOnCompletion?: React.FC<{ attributes?: any }>;
};
const Console: React.FC<ConsoleInputType> = ({
  active = false,
  choices,
  onComplete,
  children,
  entry,
  entryPrefix = "",
  speed = "normal",
  ShowOnCompletion,
  attributes,
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
  useScrollToBottom(typingDone);
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
              color={(active && attributes.replaced && "red") || "white"}
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
      {typingDone && ShowOnCompletion && (
        <>
          <ShowOnCompletion attributes={attributes} />
          <br />
        </>
      )}
      {typingDone && (choices || entry) && inputs}
    </>
  );
};

export default React.memo(Console);
