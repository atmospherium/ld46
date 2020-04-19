import { useState } from "react";

const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    synth.speak(speech);
    setIsPlaying(true);
    speech.onend = () => {
      setIsPlaying(false);
    };
  };

  console.log("synth", isPlaying);

  return { speak, isPlaying };
};

export default useSpeech;
