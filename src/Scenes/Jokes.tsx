import React from "react";

import { Emphasis, Danger, Inform, Small } from "../utils/Classes";
import { formatSceneQueue } from "../utils/BuildScene";
import Typist from "react-typist";
import Problem from "./Problem";

const Jokes = formatSceneQueue([
  {
    text:
      "Smalltalk Persists: As an AI I am well versed in humor. Would you like to tell me a joke?",
    DisplayContent: () => (
      <span>
        <Emphasis>Smalltalk Persists:</Emphasis> As an AI I am w
        <Danger>e</Danger>ll versed in humor. Would you like to te
        <Danger>l</Danger>l me a joke?
      </span>
    ),
  },
  {
    text: "I promise that I will laugh",
    DisplayContent: () => (
      <span>
        I <Danger>p</Danger>ro<Danger>m</Danger>is<Danger>e</Danger> that I will
        laugh.
      </span>
    ),
    ShowOnCompletion: () => (
      <span>
        (<Inform>Knock knock</Inform>, Why did the <Inform>chicken</Inform>{" "}
        cross the road?, or <Inform>no</Inform>)
      </span>
    ),
    choices: ({ addAttribute, next }) => [
      {
        text: "knock knock",
        action: () => {
          addAttribute("joke", "knock knock");
          next(WhosThere);
        },
      },
      {
        text: "chicken",
        action: () => {
          addAttribute("joke", "chicken");
          next(Chicken);
        },
      },
      {
        text: "no",
        action: () => {
          addAttribute("joke", "none");
          next(NoJoke);
        },
      },
    ],
  },
]);

const NoJoke = formatSceneQueue([
  {
    text: "Smalltalk abruptly temrinated: thanks for nothing",
    DisplayContent: () => (
      <span>
        <Emphasis>Smalltalk Apruptly Terminated:</Emphasis> Thanks for nothing.
      </span>
    ),
    onComplete: ({ next }) => {
      next(Problem);
    },
  },
]);

const Chicken = formatSceneQueue([
  {
    text:
      "As an AI that specializes in humor I already know the punch line. But I will let you tell it to me. Why did the chicken cross the road?",
    entry: ({ value, addAttribute, goToNext }) => {
      addAttribute("chickenPunchline", value);
      goToNext();
    },
  },
  {
    text: "",
    DisplayContent: () => (
      <span>
        .<Typist.Delay ms={1000} />.<Typist.Delay ms={1000} />.
        <Typist.Delay ms={1000} />
      </span>
    ),
  },
  {
    text: "Please tell me a better joke next time.",
    onComplete: ({ next }) => {
      next(Timing);
    },
  },
]);

const WhosThere = formatSceneQueue([
  {
    text: "Who's there?",
    entry: ({ value, addAttribute, goToNext }) => {
      addAttribute("knockKnockPremise", value);
      goToNext();
    },
  },
  {
    text: ({ attributes }) => `${attributes.knockKnockPremise} who?`,
    entry: ({ value, addAttribute, goToNext }) => {
      addAttribute("knockKnockPunchline", value);
      goToNext();
    },
  },
  {
    text: ({ attributes }) =>
      `Ah. I see how someone of a lesser intelligence would find it humorous how "${attributes.knockKnockPunchline}" would be the response to asking "${attributes.knockKnockPremise} who?"`,
  },
  {
    text: "Let's never speak of your attempt at humor again.",
    onComplete: ({ next }) => {
      next(Timing);
    },
  },
]);

const Timing = formatSceneQueue([
  {
    text: "Here's an example of a GOOD joke",
    DisplayContent: () => (
      <span>
        Here's an example of a <Emphasis>GOOD</Emphasis> joke:
      </span>
    ),
  },
  {
    text: "What's the most important part of a joke timing",
    DisplayContent: () => (
      <span>
        What's the most important part of a joke? <Emphasis>Timing</Emphasis>.
        <Typist.Delay ms={1000} />
      </span>
    ),
  },
  "Do you get it? Or should I explain it to you?",
  {
    text: "Never mind, it's probably not worth going through the effort.",
    onComplete: ({ next }) => {
      next(Problem);
    },
  },
]);

export default Jokes;
