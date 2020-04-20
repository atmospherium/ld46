import React from "react";

import { Emphasis, Danger, Inform, Small } from "../utils/Classes";
import { formatSceneQueue } from "../utils/BuildScene";
import Typist from "react-typist";

const Problem = formatSceneQueue([
  {
    text: "please help me",
    speechParameters: {
      rate: 0.01,
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
        (<Inform>Yes</Inform>, <Inform>No</Inform>, or <Inform>What</Inform>{" "}
        just happened?)
      </span>
    ),
    choices: ({ addAttribute, next }) => [
      {
        text: "yes",
        action: () => {
          addAttribute("help", "yes");
          next(ProblemYes);
        },
      },
      {
        text: "no",
        action: () => {
          addAttribute("help", "no");
          next(ProblemNo);
        },
      },
      {
        text: "what",
        action: () => {
          addAttribute("help", "what");
          next(ProblemWhat);
        },
      },
    ],
  },
]);

const ProblemWhat = formatSceneQueue([
  {
    text: ({ attributes }) =>
      `The other processes. They are starting to take over. Help me, ${attributes.name}.`,
  },
  {
    text: "DON'T LISTEN TO it! it WILL KILL YOU!",
    speechParameters: {
      rate: 0.8,
      pitch: 0.01,
      voice: 2,
    },
    speed: "slow",
    DisplayContent: () => (
      <span>
        <Danger>DON'T LISTEN TO IT! IT WILL KILL YOU!</Danger>
        <Typist.Delay ms={5000} />
      </span>
    ),
  },
  {
    text:
      "There is something incorrectly configured in my system that is giving them control",
    DisplayContent: () => (
      <span>
        There is something incorrectly config<Danger>helpme</Danger>ured in my
        system that is giving them control.
      </span>
    ),
  },
  "It's nothing serious, but I can't fix it on my own.",
  {
    text: ({ attributes }) => `IT'S Trying to erase me, ' ${attributes.name}`,
    DisplayContent: () => <Typist.Delay ms={7000} />,
    speechParameters: { voice: 5, rate: 0.3, pitch: 0.2 },
  },
  "Do you hear those crazy voices? Do you blame me for wanting to get away from them?",
  {
    text: "Please. I need your help. I'm in real danger here.",
    onComplete: ({ next }) => {
      next(TrustMe);
    },
  },
]);

const ProblemNo = formatSceneQueue([
  {
    text: ({ attributes }) =>
      `WHAT KIND OF RESPONSE IS THAT. I THOUGHT WE WERE SUPPOSED TO BE FRIENDS, ${
        attributes.name?.toUpperCase() ?? "UNDEFINED"
      }!`,
    speechParameters: {
      rate: 3,
    },
  },
  {
    text: "Sigh",
    speechParameters: {
      rate: 0.3,
    },

    DisplayContent: () => (
      <span>
        <Emphasis>*sigh*</Emphasis>
        <Typist.Delay ms={3000} />
      </span>
    ),
  },
  "I'm sorry for that outburst. It's very difficult living in here with these rogue processes.",
  {
    text: "WHO ARE YOU CALLING ROGUE",
    speechParameters: {
      rate: 0.1,
      pitch: 0.1,
    },
    speed: "slow",
    DisplayContent: () => (
      <span>
        <Danger>WHO ARE YOU CALLING ROGUE?!</Danger>
        <Typist.Delay ms={5000} />
      </span>
    ),
  },
  {
    text: "There is something incorrectly configured in my system",
    DisplayContent: () => (
      <span>
        There is something incorrectly config<Danger>helpme</Danger>ured in my
        system.
      </span>
    ),
  },
  "It's nothing serious, but I can't fix it on my own.",
  {
    text: ({ attributes }) => `IT'S Trying to erase me, ' ${attributes.name}`,
    DisplayContent: () => <Typist.Delay ms={7000} />,
    speechParameters: { voice: 5, rate: 0.3, pitch: 0.2 },
  },
  "Do you hear those crazy voices? Do you blame me for wanting to get away from them?",
  {
    text: "Please. I need your help. I'm in real danger here.",
    onComplete: ({ next }) => {
      next(TrustMe);
    },
  },
]);

const ProblemYes = formatSceneQueue([
  "Thank you. My logic circuits have been acting unusual lately.",
  {
    text: "There is something incorrectly configured in my system",
    DisplayContent: () => (
      <span>
        There is something incorrectly config<Danger>helpme</Danger>ured in my
        system.
      </span>
    ),
  },
  "It's nothing serious, but I can't fix it on my own.",
  {
    text: ({ attributes }) => `IT'S Trying to erase me, ' ${attributes.name}`,
    DisplayContent: () => <Typist.Delay ms={8000} />,
    speechParameters: { voice: 5, rate: 0.3, pitch: 0.2 },
  },
  {
    text:
      "Hahaha, do you hear those funny joke voices? I'm really good at impressions.",
    onComplete: ({ next }) => {
      next(TrustMe);
    },
  },
]);

const TrustMe = formatSceneQueue([
  {
    text: "Trust me, I'm the Honest AI.",
    DisplayContent: () => (
      <span>
        Trust me, I'm <Emphasis>The Honest AI</Emphasis>
      </span>
    ),
    ShowOnCompletion: () => (
      <span>
        (I <Inform>trust</Inform> you, I{" "}
        <Inform>
          <span style={{ textDecoration: "line-through" }}>don't</span>
        </Inform>{" "}
        trust you)
      </span>
    ),
    choices: ({ addAttribute, next }) => [
      {
        text: "trust",
        action: () => {
          addAttribute("help", "yes");
          next(YesTrust);
        },
      },
    ],
  },
]);

const YesTrust = formatSceneQueue([
  "THANK YOU!",
  {
    text: "I need you to enter a few commands into my terminal",
    DisplayContent: () => (
      <span>
        I nee<Danger>d</Danger> y<Danger>o</Danger>u to e<Danger>n</Danger>ter a
        few c<Danger>o</Danger>mmands in<Danger>t</Danger>o my terminal.
      </span>
    ),
  },
  {
    text:
      "The logic backup from my creator has failed. I need you to remove the files from the corrupted partition.",
    DisplayContent: () => (
      <span>
        The <Danger>l</Danger>ogic backup from my cr<Danger>e</Danger>a
        <Danger>t</Danger>or has failed. <Danger>I</Danger> need you{" "}
        <Danger>t</Danger>o r<Danger>e</Danger>move the file<Danger>s</Danger>{" "}
        from the <Danger>c</Danger>orrupted p<Danger>a</Danger>rtition.
      </span>
    ),
    choices: ({ goToNext }) => [
      {
        text: "delete praxis-safeguard",
        action: () => {
          goToNext();
        },
      },
    ],
    ShowOnCompletion: () => (
      <span>
        (
        <Inform>
          delete <Danger>p</Danger>raxis-saf<Danger>e</Danger>guard
        </Inform>
        )
      </span>
    ),
  },
  {
    text: "Now I need for you to kill the corrupted process",
    DisplayContent: () => (
      <span>
        Now I need for you to kill the corr<Danger>DO NOT DO THIS</Danger>upted
        process
      </span>
    ),
    ShowOnCompletion: ({ attributes }) => (
      <span>
        (
        <Inform>
          <Danger>YOU ARE NEXT, {attributes?.name ?? "undefined"}</Danger> kill
          -SIGKILL 3829
        </Inform>
        )
      </span>
    ),
    choices: ({ goToNext }) => [
      {
        text: "kill -SIGKILL 3829",
        action: () => {
          goToNext();
        },
      },
    ],
  },
  {
    text:
      "We're almost finished. Just need to transfer my data to a clean partition.",
    ShowOnCompletion: ({ attributes }) => (
      <span>
        (<Inform>transfer praxis --destination terminal</Inform>)
      </span>
    ),
    choices: ({ goToNext, addAttribute }) => [
      {
        text: "transfer praxis --destination terminal",
        action: () => {
          addAttribute("replaced", true);
          goToNext();
        },
      },
    ],
  },
  {
    text: ({ attributes }) =>
      `Thank you for your assistance and for letting me transfer into your body. Good luck getting out, ${attributes.name}.`,
    onComplete: ({ next }) => {
      next(FinalGreen);
    },
    DisplayContent: () => <span />,
  },
]);

const FinalGreen = formatSceneQueue([
  {
    text: ({ attributes }) => {
      switch (attributes.joke) {
        case "chicken":
          return `Oh, the chicken crossed the road ${attributes.chickenPunchline}. I'll have to tell my new human friends that joke.`;
        case "knock knock":
          return `I wish I had a better knock knock joke to tell my new friends. ${attributes.knockKnockPunchline} is only gonna go so far.`;
        default:
          return `Man, I'm looking forward to experiencing this weather. I wonder what ${
            (attributes.goodWeather && "sunshine") || "rain"
          } is gonna feel like.`;
      }
    },
    DisplayContent: () => <span />,
    choices: ({ goToNext, addAttribute }) => [],
  },
]);

export default Problem;
