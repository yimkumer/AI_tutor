import React, { useEffect, useState } from "react";
import Navigation from "./navbar";
import { ReactComponent as YourSvg } from "../assets/chatgpt.svg";
import MicIcon from "../assets/mic.png";
import SubmitIcon from "../assets/submit.png";
import annyang from "annyang";

function ChatPage() {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (annyang) {
      const commands = {
        "*speech": function (speech) {
          console.log("Recognized speech: ", speech);
        },
      };
      annyang.addCommands(commands);
      annyang.addCallback("result", function (phrases) {
        console.log("User: ", phrases[0]);
        setInputValue(phrases[0]);
      });
    }
  }, []);

  const handleMicClick = () => {
    if (annyang) {
      if (isListening) {
        annyang.abort();
        console.log("Stopped recording");
      } else {
        annyang.start();
        console.log("Started recording");
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="chatpage-content">
        <YourSvg />
        <h1>How can i assist you today ? </h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message here or use the mic..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" title="Submit prompt">
              <img src={SubmitIcon} alt="Submit" />
            </button>
            <button title="Use microphone " onClick={handleMicClick}>
              <img src={MicIcon} alt="Mic" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
