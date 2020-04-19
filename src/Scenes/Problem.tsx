import React from "react";

import { Emphasis, Danger, Inform, Small } from "../utils/Classes";
import { formatSceneQueue } from "../utils/BuildScene";
import Typist from "react-typist";

const creepVoice = window.speechSynthesis.getVoices()[2];

const Problem = formatSceneQueue([
  {
    text: "please help me",
    speechParameters: {
      rate: 0.05,
      pitch: 0.001,
      voice: 4,
    },
    speed: "fast",
    DisplayContent: () => {
      const helpMe: any = "please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me".split(
        " "
      );
      return (
        <Small>
          <Danger>
            {helpMe
              .map((help) => <span>{help}</span>)
              .reduce((a: any, b: any) => (
                <span>
                  {a}
                  <br />
                  {b}
                </span>
              ))}
          </Danger>
        </Small>
      );
    },
  },
  {
    text:
      "Did you enjoy this smalltalk? Am I really good at smalltalk? Will you help me with a problem? Please answer the third question first.",
    speechParameters: {
      rate: 3,
    },
    speed: "fast",
    ShowOnCompletion: () => (
      <span>
        (<Inform>Yes</Inform>, <Inform>No</Inform>, or <Inform>Why</Inform> so
        urgent?)
      </span>
    ),
    choices: ({ addAttribute, next }) => [
      {
        text: "yes",
        action: () => {
          addAttribute("joke", "knock knock");
          next(Problem);
        },
      },
      {
        text: "no",
        action: () => {
          addAttribute("joke", "chicken");
          next(Problem);
        },
      },
      {
        text: "what",
        action: () => {
          addAttribute("joke", "none");
          next(Problem);
        },
      },
    ],
  },
]);

export default Problem;
