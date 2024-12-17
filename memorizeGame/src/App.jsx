


import React, { useState, useEffect } from "react";
import './App.css'

const COLORS = ["green", "red", "yellow", "blue"];

function App() {
  const [sequence, setSequence] = useState([]); // The full sequence of colors
  const [userSequence, setUserSequence] = useState([]); // The user clicks sequence
  const [isPlaying, setIsPlaying] = useState(false); // To disable clicks during glow
  const [level, setLevel] = useState(0); // Current game level
  const [gameOver, setGameOver] = useState(false); // If the game is over
  const [started, setStarted] = useState(false); // To track if the game started

  // Function to start or restart the game
  const startGame = () => {
    setSequence([]); // Reset the sequence
    setUserSequence([]); // Reset user clicks
    setGameOver(false); // Clear game over status
    setLevel(1); // Start from level 1
    setStarted(true); // Mark as started
    addNewColor(); // Start with the first color
  };

  // Add a random new color to the sequence
  const addNewColor = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence((prev) => [...prev, randomColor]); // Add color to the sequence
    setUserSequence([]); // Reset user sequence for the new level
    setIsPlaying(true); // Disable clicks during glow
  };

  // Glow only the latest color in the sequence
  useEffect(() => {
    if (sequence.length > 0) {
      const lastColor = sequence[sequence.length - 1]; // Only the new color glows
      const element = document.getElementById(lastColor);
      setTimeout(() => {
        element.classList.add("active");
        setTimeout(() => {
          element.classList.remove("active");
          setIsPlaying(false); // Enable user clicks after glow
        }, 600); // Glow duration
      }, 500); // Start delay
    }
  }, [sequence]);

  // Handle user clicks on color buttons
  const handleColorClick = (color) => {
    if (isPlaying || gameOver) return; // Prevent clicks during glow or if game over

    const newUserSequence = [...userSequence, color]; // Add clicked color to user sequence
    setUserSequence(newUserSequence);

    // Check if the current user input matches the sequence so far
    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setGameOver(true); // Game over if incorrect
      return;
    }

    // If user has completed the full sequence correctly
    if (newUserSequence.length === sequence.length) {
      setTimeout(() => {
        setLevel((prev) => prev + 1); // Increase the level
        addNewColor(); // Add a new random color to the sequence
      }, 1000);
    }
  };

  return (
    <div className="App">
      <h1>
        {gameOver
          ? "Game Over! Click Restart"
          : !started
            ? "Click Start to Play"
            : `Level ${level}`}
      </h1>
      <div className="buttons">
        {COLORS.map((color) => (
          <div
            key={color}
            id={color}
            className={`button ${color}`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      {!started || gameOver ? (
        <button onClick={startGame}>{gameOver ? "Restart" : "Start Game"}</button>
      ) : null}
    </div>
  );
}

export default App;
