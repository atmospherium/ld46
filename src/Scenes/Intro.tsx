import React from "react";

import { Emphasis, Danger, Inform, Small } from "../utils/Classes";
import { formatSceneQueue } from "../utils/BuildScene";

import Jokes from "./Jokes";

const Intro = formatSceneQueue([
  {
    text: "Greetings, I am the Honest AI",
    DisplayContent: () => (
      <span>
        Greetings, I am <Emphasis>The Honest AI</Emphasis>
      </span>
    ),
  },
  `I was created to analyze, inform, and provide companionship to those who are in need.`,
  {
    text: "To initiate friendship, please enter your name:",
    entry: ({ value, addAttribute, next, goToNext }) => {
      addAttribute("name", value);
      goToNext();
    },
  },
  {
    text: ({ attributes }) =>
      `Friendship Initiated: Nice to meet you, ${attributes.name}.`,
    DisplayContent: ({ attributes }) => (
      <span>
        <Emphasis>Friendship Initiated:</Emphasis> Nice to meet you,{" "}
        {attributes.name}.
      </span>
    ),
  },
  "Let us engage in smalltalk.",
  {
    text: "Smalltalk initiated. Wonderful weather we're having, eh?",
    DisplayContent: () => (
      <span>
        <Emphasis>Smalltalk Initiated:</Emphasis> Wonderful weat
        <Danger>h</Danger>er we're having, eh?
      </span>
    ),
    ShowOnCompletion: () => (
      <span>
        (<Inform>Yes</Inform> or <Inform>No</Inform>)
      </span>
    ),
    choices: ({ goToNext, addAttribute }) => [
      {
        text: "yes",
        action: () => {
          addAttribute("goodWeather", true);
          goToNext();
        },
      },
      {
        text: "no",
        action: () => {
          addAttribute("goodWeather", false);
          goToNext();
        },
      },
    ],
  },
  {
    text: ({ attributes }) =>
      attributes.goodWeather
        ? "Hahaha, yes, I thought so. Weather is such an enjoyable topic for friends to discuss."
        : "My commentary on the weather is often laced with irony. You'll catch on eventually.",
    onComplete: ({ next }) => {
      next(Jokes);
    },
  },
]);

export default Intro;
