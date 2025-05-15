const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Path to the JSON file where scores will be saved
const SCORES_FILE = './scores.json';

// Endpoint to get the leaderboard
app.get('/leaderboard', (req, res) => {
  fs.readFile(SCORES_FILE, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read scores.' });
    } else {
      const scores = JSON.parse(data);
      res.json(scores);
    }
  });
});

// Endpoint to update the leaderboard
app.post('/leaderboard', (req, res) => {
  const { playerName, score } = req.body;
  if (!playerName || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid player name or score.' });
  }

  // Read existing scores
  fs.readFile(SCORES_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read scores.' });
    }

    let scores = JSON.parse(data);

    // Add the new score and sort the leaderboard
    scores.push({ playerName, score });
    scores = scores.sort((a, b) => b.score - a.score).slice(0, 10); // Keep top 10 scores

    // Save updated scores
    fs.writeFile(SCORES_FILE, JSON.stringify(scores, null, 2), (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save scores.' });
      } else {
        res.json({ message: 'Score added successfully!', scores });
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});