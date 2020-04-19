import React, { useMemo } from "react";
import { useSpeech, useAsync } from "react-use";
import Console from "./Console";
import { pickBy, identity } from "lodash";

export const Speech = ({ content, parameters, voices }) => {
  const { voice, ...rest } = parameters;
  useSpeech(
    content,
    Object.assign({}, rest, { voice: voices[voice] ?? undefined })
  );
  return <></>;
};

export const formatSceneQueue = (queue, index = 0) => {
  const queueItem = queue[index];
  if (typeof queueItem === "string") {
    return Scene(() => queueItem, {
      nextScene:
        (queue.length > index + 1 &&
          (() => formatSceneQueue(queue, index + 1))) ||
        undefined,
    });
  }
  const { text, ...item } = queue[index];
  return Scene(
    (typeof text === "function" && text) ||
      (() => {
        return text;
      }),
    {
      ...item,
      nextScene:
        (queue.length > index + 1 &&
          (() => formatSceneQueue(queue, index + 1))) ||
        undefined,
    }
  );
};

type SceneProps = {
  active: boolean;
  next: Function;
  addAttribute: Function;
  attributes: any;
  voices: any[];
};

type BuildSceneType = {
  (
    content: (attributes?: {}) => string,
    options?: {
      speechParameters?: any;
      DisplayContent?: React.FC<{ attributes?: any }>;
      ShowOnCompletion?: React.FC;
      entry?: Function;
      onComplete?: Function;
      nextScene?: Function;
      choices?: (props: any) => any[];
      speed?: string;
    }
  ): React.FC<SceneProps>;
};

const Scene: BuildSceneType = (content, options) => ({
  active,
  next,
  addAttribute,
  attributes,
  voices,
}) => {
  const speechContent = content({ attributes });
  const consoleContent =
    options?.DisplayContent?.({ attributes }) || speechContent;

  const consoleProps = pickBy(
    {
      ShowOnCompletion: options?.ShowOnCompletion ?? undefined,
      onComplete:
        (options?.onComplete &&
          (() => {
            options?.onComplete?.({ next, addAttribute, attributes });
          })) ||
        (options?.nextScene &&
          options?.entry === undefined &&
          options?.choices === undefined &&
          (() => {
            next(options?.nextScene?.());
          })) ||
        undefined,
      entry:
        (options?.entry &&
          ((value) => {
            options?.entry?.({
              value,
              next,
              addAttribute,
              attributes,
              goToNext: () => {
                next(options?.nextScene?.());
              },
            });
          })) ??
        undefined,
      choices:
        options?.choices?.({
          next,
          addAttribute,
          goToNext: () => {
            next(options?.nextScene?.());
          },
        }) ?? undefined,
    },
    identity
  );

  return (
    <>
      <Speech
        content={speechContent}
        parameters={options?.speechParameters}
        voices={voices}
      />
      <Console
        active={active}
        children={consoleContent}
        {...consoleProps}
        speed={options?.speed}
      />
    </>
  );
};

export default Scene;
