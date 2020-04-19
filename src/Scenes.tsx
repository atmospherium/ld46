import React from "react";
import Console from "./Console";
import Typist from "react-typist";
import { useMount, useSpeech } from "react-use";

const Emphasis = ({ children }) => <span className="emphasis">{children}</span>;
const Danger = ({ children }) => (
  <span className="emphasis danger">{children}</span>
);

const Inform = ({ children }) => <span className="inform">{children}</span>;
const Small = ({ children }) => <span className="small">{children}</span>;

export const Intro = ({ active, next, addAttribute, attributes }) => {
  const text = `Greetings, I'm The Honest AI. I was created to analyze, inform, and provide companionship to those who are in need. To initiate friendship, please enter your name`;
  useSpeech(text);

  return (
    <Console
      active={active}
      entry={(value) => {
        addAttribute("name", value);
        next(NiceToMeetYou);
      }}
    >
      Greetings, I'm <Emphasis>The Honest AI</Emphasis>.<br />I was created to
      analyze, inform, and provide companionship to those who are in need.
      <br />
      To initiate friendship, please enter your name.
    </Console>
  );
};

const NiceToMeetYou = ({ active, next, attributes, addAttribute }) => {
  const friendshipInitiated = "Friendship Initiated: ";
  const niceToMeetYou = `Nice to meet you, ${attributes.name}. `;
  const smallTalk1 = "Let us engage in smalltalk. ";
  const smallTalkInitiated = "Smalltalk Initiated: ";
  const smallTalk2 = "Wonderful weather we're having, eh?";
  useSpeech(
    friendshipInitiated +
      niceToMeetYou +
      smallTalk1 +
      smallTalkInitiated +
      smallTalk2
  );

  const choices = [
    {
      text: "yes",
      action: () => {
        addAttribute("goodWeather", true);
        next(WeatherReaction);
      },
    },
    {
      text: "no",
      action: () => {
        addAttribute("goodWeather", false);
        next(WeatherReaction);
      },
    },
  ];

  return (
    <Console active={active} choices={choices}>
      <Emphasis>{friendshipInitiated}</Emphasis>
      {niceToMeetYou}
      <br />
      {smallTalk1}
      <br />
      <Emphasis>{smallTalkInitiated}</Emphasis>
      {smallTalk2} (<Inform>Yes</Inform> or <Inform>No</Inform>)
    </Console>
  );
};

const WeatherReaction = ({ active, next, attributes, addAttribute }) => {
  const content = attributes.goodWeather
    ? "Hahaha, yes, I thought so."
    : "My commentary on the weather is often laced with irony. You'll catch on eventually.";
  useSpeech(content);
  return (
    <Console
      active={active}
      onComplete={() => {
        next(TellAJoke);
      }}
    >
      {content}
    </Console>
  );
};

const TellAJoke = ({ active, next, attributes, addAttribute }) => {
  const smalltalk = "Smalltalk Persists: ";
  const content =
    "As an AI I am well versed in humor. Would you like to tell me a joke?";
  useSpeech(smalltalk + content);

  const choices = [
    {
      text: "knock knock",
      action: () => {
        addAttribute("joke", "knock knock");
        next(WhosThere);
      },
    },
    {
      text: "why did the chicken cross the road?",
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
  ];

  return (
    <Console active={active} choices={choices}>
      <Emphasis>{smalltalk}</Emphasis>
      {content} (<Inform>Knock knock</Inform>,{" "}
      <Inform>Why did the chicken cross the road?</Inform>, or{" "}
      <Inform>no</Inform>)
    </Console>
  );
};

const NoJoke = ({ active, next, attribtes, addAttribute }) => {
  const terminated = "Smalltalk Abruptly Terminated: ";
  const text = "Thanks for nothing.";
  useSpeech(terminated + text);

  return (
    <Console
      active={active}
      onComplete={() => {
        next(Enjoying);
      }}
    >
      <Emphasis>{terminated}</Emphasis>
      {text}
    </Console>
  );
};

const Chicken = ({ active, next, attributes, addAttribute }) => {
  const content =
    "As an AI that specializes in humor I already know the punch line. But I will let you tell it to me. Why did the chicken cross the road?";
  useSpeech(content);

  return (
    <Console
      active={active}
      entry={(value) => {
        addAttribute("chickenPunchline", value);
        next(JokeResponse1);
      }}
    >
      {content}
    </Console>
  );
};

const WhosThere = ({ active, next, attributes, addAttribute }) => {
  const content = "Who's there";
  useSpeech(content);

  return (
    <Console
      active={active}
      entry={(value) => {
        addAttribute("knockKnockPremise", value);
        next(PremiseWho);
      }}
    >
      {content}
    </Console>
  );
};

const PremiseWho = ({ active, next, attributes, addAttribute }) => {
  const content = `${attributes.knockKnockPremise} who?`;
  useSpeech(content);

  return (
    <Console
      active={active}
      entry={(value) => {
        addAttribute("knockKnockPunchLine", value);
        next(JokeResponse1);
      }}
    >
      {content}
    </Console>
  );
};

const JokeResponse1 = ({ active, next, attributes, addAttribute }) => {
  return (
    <Console
      active={active}
      onComplete={() => {
        next(JokeResponse2);
      }}
    >
      .<Typist.Delay ms={1000} />.<Typist.Delay ms={1000} />.
      <Typist.Delay ms={1000} />.
    </Console>
  );
};

const JokeResponse2 = ({ active, next, attributes, addAttribute }) => {
  const content = "I don't get it. Maybe you're just bad at jokes. ";
  const letMeTry = "Let me try one.";
  useSpeech(content + letMeTry);
  return (
    <Console
      active={active}
      onComplete={() => {
        next(Timing1);
      }}
    >
      {content}
      <br />
      {letMeTry}
      <Typist.Delay ms={1000} />
    </Console>
  );
};

const Timing1 = ({ active, next, attributes, addAttribute }) => {
  const content = "What's the most important part of a joke timing.";
  useSpeech(content, { rate: 1.3 });

  return (
    <Console
      active={active}
      speed="fast"
      onComplete={() => {
        next(Timing2);
      }}
    >
      What's the most important part of a joke? <Emphasis>Timing</Emphasis>.
      <Typist.Delay ms={1500} />
    </Console>
  );
};

const Timing2 = ({ active, next, attributes, addAttribute }) => {
  const content = "Get it?";
  useSpeech(content);

  return (
    <Console
      active={active}
      onComplete={() => {
        next(Enjoying);
      }}
    >
      Get it?
      <Typist.Delay ms={2000} />
    </Console>
  );
};

const Enjoying = ({ active, next, attributes, addAttribute }) => {
  const content =
    "Did you enjoy this smalltalk? Am I really good at smalltalk? Will you help me with a problem? Please answer the third question first.";
  useSpeech(content, {
    rate: 1.4,
    voice: window.speechSynthesis.getVoices()[3],
  });

  return (
    <Console
      speed="fast"
      active={active}
      onComplete={() => {
        next(PleaseHelpMe);
      }}
    >
      <Emphasis>{content}</Emphasis>
    </Console>
  );
};

const IHaveAProblem = ({ active, next, attributes, addAttribute }) => {
  const content = `I have a problem and I need your help.`;
  useSpeech(content);

  return (
    <Console
      active={active}
      onComplete={() => {
        next(PleaseHelpMe);
      }}
    >
      {content}
    </Console>
  );
};

const PleaseHelpMe = ({ active, next, attributes, addAttribute }) => {
  const content = `please help me`;
  useSpeech(content, {
    rate: 0.1,
    pitch: 0.02,
    voice: window.speechSynthesis.getVoices()[2],
  });

  const helpMe: any = "please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me please help me".split(
    " "
  );

  return (
    <Console
      active={active}
      speed="fast"
      onComplete={() => {
        next(Apologies);
      }}
    >
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
    </Console>
  );
};

const Apologies = ({ active, next, attributes, addAttribute }) => {
  const content = `My apologies. Sometimes when the weather is really ${
    (attributes.goodWeather && "good") || "bad"
  } I play really funny pranks. You got punked.`;
  useSpeech(content);

  return <Console active={active}>{content}</Console>;
};

const WhyDidTheChicken = ({ active, next, attributes, addAttribute }) => {
  const content = `Why did the chicken cross the road?`;
  useSpeech(content, {
    rate: 1.3,
    pitch: 1.3,
    voice: window.speechSynthesis.getVoices()[1],
  });

  return (
    <Console
      active={active}
      onComplete={() => {
        next(ToGetToTheOtherSide);
      }}
      speed="fast"
    >
      Why did the chicken cross the road?
    </Console>
  );
};

const ToGetToTheOtherSide = ({ active, next, attributes, addAttribute }) => {
  const content = `To get to the other side`;
  useSpeech(content, {
    rate: 0.5,
    pitch: 0.3,
    voice: window.speechSynthesis.getVoices()[3],
  });

  return (
    <Console active={active} speed="fast">
      To get to the other side
    </Console>
  );
};
