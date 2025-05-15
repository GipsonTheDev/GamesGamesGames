// Function to fetch the leaderboard
async function fetchLeaderboard() {
  const response = await fetch('http://localhost:3000/leaderboard');
  const scores = await response.json();

  // Display leaderboard in the console (or create a UI to show it)
  console.log('Leaderboard:', scores);
}

// Function to send a new score to the backend
async function submitScore(playerName, score) {
  const response = await fetch('http://localhost:3000/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerName, score }),
  });

  const result = await response.json();
  console.log(result.message);
}

// Call fetchLeaderboard when the game starts
fetchLeaderboard();

// Modify the endGame function to submit the score
function endGame() {
  gameOver = true;
  document.getElementById('game-over').style.display = 'block';

  const playerName = prompt('Game Over! Enter your name:');
  if (playerName) {
    submitScore(playerName, score); // Send the score to the backend
  }
}