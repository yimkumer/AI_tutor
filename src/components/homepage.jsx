import React, { useRef, useState, useEffect } from "react";
import Navigation from "./navbar";
import videoSource from "../assets/A1.mp4";
import micIcon from "../assets/mic.png";
import thumb from "../assets/thumby.png";
import Button from "react-bootstrap/Button";
import annyang from "annyang";

function HomePage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      console.log("Playing the video");
      if (videoRef.current.currentTime < 24) {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            console.log("Pausing the video at 24 seconds");
          }
        }, (24 - videoRef.current.currentTime) * 1000);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (annyang) {
      annyang.addCallback("result", function (phrases) {
        answer(phrases[0]);
      });
    }

    const answer = (choice) => {
      setShowPopup(true);
      if (choice === "Option B.") {
        setIsCorrect(true);
        console.log("Correct");
      } else if (["Option A.", "Option C.", "Option D."].includes(choice)) {
        setIsCorrect(false);
        console.log("Incorrect or Invalid answer");
      }
      if (videoRef.current) {
        annyang.abort();

        videoRef.current.play();
        setIsPlaying(true);

        videoRef.current.addEventListener(
          "ended",
          () => {
            setShowPopup(false);
          },
          { once: true }
        );
      }
    };

    const startTimer = () => {
      timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }, 24000);
    };

    videoRef.current.onplay = () => {
      startTimer();
    };

    videoRef.current.onended = () => {
      clearTimeout(timer);
      startTimer();
    };

    return () => clearTimeout(timer);
  }, []);

  const handleMicClick = () => {
    if (annyang) {
      annyang.start();
      console.log("Started recording");

      setIsListening(!isListening);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="homepage-content">
        {showPopup && (
          <div className="popup">
            <p>
              {isCorrect ? "Correct Answer " : "Incorrect or Invalid answer"}
            </p>
          </div>
        )}
        <video
          ref={videoRef}
          style={{ width: "45%", height: "auto" }}
          src={videoSource}
          poster={thumb}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handlePlayPause}
            variant="primary"
            className={`play-pause-button `}
          >
            Start
          </Button>
          <Button
            onClick={handleMicClick}
            variant="primary"
            className={`mic-button`}
          >
            Give Answer{" "}
            <img
              src={micIcon}
              alt="mic"
              style={{ width: "20px", height: "20px" }}
            />
          </Button>
        </div>
        <h1>
          Note : After the Options are listed press on the Mic button and answer
          either as " Option A ", " Option B ", " Option C " or " Option D "
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
