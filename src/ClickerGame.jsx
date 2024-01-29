import React, { useState, useEffect } from 'react';
import './ClickerGame.css';

const ClickerGame = () => {
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    try {
      const inputSeconds = parseInt(seconds, 10);
      if (!isNaN(inputSeconds)) {
        setTimeLeft(inputSeconds * 1000);
        setClickCount(0);
        setIsGameStarted(true);
      }
    } catch (error) {
      console.error('Invalid');
    }
  };

  useEffect(() => {
    let timer;

    if (isGameStarted && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsGameStarted(false);
    }

    return () => clearInterval(timer);
  }, [isGameStarted, timeLeft]);

  const handleButtonClick = () => {
    if (isGameStarted && timeLeft > 0) {
      setClickCount((prevClickCount) => prevClickCount + 1);
    }
  };

  const formatTime = (time) => {
    if (time === 0) {
      return '0.000';
    }

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    const formattedMinutes = minutes > 0 ? `${minutes}:` : '';
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}${formattedSeconds}.${milliseconds}`;
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        className="input"
      />
      <button onClick={startGame}className="button">
        Start
      </button>
      <p className="clickCount">Clicks: {clickCount}</p>
      {isGameStarted && (
        <div>
          <p className="timer">Time: {formatTime(timeLeft)}</p>
        </div>
      )}
      {isGameStarted && timeLeft > 0 && (
        <button onClick={handleButtonClick} disabled={!isGameStarted} className="button">
          Click
        </button>
      )}
    </div>
  );
};

export default ClickerGame;
