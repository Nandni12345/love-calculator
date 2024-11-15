import React, { useState } from 'react';
import './App.css';

// Love values mapping as per the original logic
const loveValues = {
  'a': 1, 'A': 2, 'b': 3, 'B': 4, 'c': 5, 'C': 6, 'd': 7, 'D': 9, 'e': 10, 'E': 11, 'f': 12, 'F': 13,
  'g': 14, 'G': 15, 'h': 16, 'H': 17, 'i': 18, 'I': 19, 'j': 20, 'J': 21, 'k': 22, 'K': 23, 'l': 24,
  'L': 25, 'm': 26, 'M': 27, 'n': 28, 'N': 29, 'o': 30, 'O': 31, 'p': 32, 'P': 33, 'q': 34, 'Q': 35,
  'r': 36, 'R': 37, 's': 38, 'S': 39, 't': 40, 'T': 41, 'u': 42, 'U': 43, 'v': 44, 'V': 45, 'w': 46,
  'W': 47, 'x': 48, 'X': 49, 'y': 50, 'Y': 51, 'z': 52, 'Z': 53, '1': 54, '2': 55, '3': 56, '4': 57,
  '5': 58, '6': 59, '7': 60, '8': 61, '9': 62, '0': 63, ' ': 64
};

// Love calculation logic
const calculateLoveChance = (val1, val2) => {
  let num = 0;
  let index = 1;

  // Calculate the love score for the first name
  for (let char of val1) {
    if (loveValues[char]) {
      num += loveValues[char] * index;
    }
    index++;
  }

  // Calculate the love score for the second name
  index = 1;
  for (let char of val2) {
    if (loveValues[char]) {
      num -= loveValues[char] * index;
    }
    index++;
  }

  // Calculate the final love chance (mod 101 to get a value between 0 and 100)
  return num % 101;
};

const App = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [loveChance, setLoveChance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    // Validate input fields
    if (!name1 || !name2) {
      setErrorMessage('Both names are required!');
      return;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(name1) || !/^[a-zA-Z0-9 ]+$/.test(name2)) {
      setErrorMessage('Only letters, numbers, and spaces are allowed!');
      return;
    }

    // Calculate love chance and reset error message
    setErrorMessage('');
    const chance = calculateLoveChance(name1, name2);
    setLoveChance(chance);
  };

  return (
    <div className="app-container">
      <h1>Love Calculator</h1>
      
      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter first name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        <button onClick={handleCalculate}>Calculate Love</button>
      </div>

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Result Section */}
      {loveChance !== null && (
        <div className="result">
          <h2>Your chance of love is: {loveChance}%</h2>
        </div>
      )}
    </div>
  );
};

export default App;
