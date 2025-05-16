const loginBtn = document.getElementById('loginBtn');
const loginSection = document.getElementById('loginSection');
const userStats = document.getElementById('userStats');
const displayUsername = document.getElementById('displayUsername');
const xpBar = document.getElementById('xpBar');
const xpText = document.getElementById('xpText');
const levelText = document.getElementById('level');
const loginStatus = document.getElementById('loginStatus');
const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');
const submitBtn = document.querySelector('#loginSection button'); // The submit button inside loginSection
const loadingSpinner = document.getElementById('loading');

let xpData = {};
let xpDataLoaded = false;  // Track if data loaded

// Initially disable submit button until data loads
submitBtn.disabled = true;

// Show spinner
function showLoading() {
  loadingSpinner.classList.remove('hidden');
}

// Hide spinner
function hideLoading() {
  loadingSpinner.classList.add('hidden');
}

// Toggle login section on button click
loginBtn.addEventListener('click', () => {
  loginSection.classList.toggle('hidden');
  userStats.classList.add('hidden');
  loginStatus.textContent = '';
});

// Fetch XP data from JSON file on page load
async function fetchXPData() {
  try {
    showLoading();
    const response = await fetch('xp_level.json');
    if (!response.ok) throw new Error('Failed to load XP data');
    xpData = await response.json();
    xpDataLoaded = true;
    submitBtn.disabled = false; // Enable login submit once data is ready
  } catch (error) {
    console.error(error);
    loginStatus.textContent = 'Error loading user data. Try refreshing.';
  } finally {
    hideLoading();
  }
}

// Login Handler with loading animation
async function handleLogin() {
  if (!xpDataLoaded) {
    loginStatus.textContent = 'User data still loading. Please wait...';
    return;
  }

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value; // You can validate later

  if (!username || !password) {
    loginStatus.textContent = 'Please enter username and password.';
    return;
  }

  // Show spinner while "processing" login
  showLoading();

  // Simulate server processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Case-insensitive user check
  const foundUserKey = Object.keys(xpData).find(
    key => key.toLowerCase() === username.toLowerCase()
  );

  if (!foundUserKey) {
    loginStatus.textContent = 'User not found.';
    hideLoading();
    return;
  }

  // Login success (mock)
  loginStatus.textContent = '';
  loginSection.classList.add('hidden');
  userStats.classList.remove('hidden');

  displayUsername.textContent = foundUserKey; // Display original casing

  updateXPBar(foundUserKey);

  hideLoading();
}

// Update XP bar width and text
function updateXPBar(username) {
  const user = xpData[username];
  if (!user) return;

  const xp = user.xp;
  const level = user.level;

  // Assuming level up every 1000 XP * level number
  const maxXPForLevel = level * 1000;
  const percent = Math.min(100, (xp / maxXPForLevel) * 100);

  xpBar.style.width = `${percent}%`;
  xpText.textContent = `${xp} / ${maxXPForLevel} XP`;
  levelText.textContent = level;
}

// Dark/Light Mode Toggle
modeToggle.addEventListener('change', () => {
  if (modeToggle.checked) {
    document.body.classList.add('light-mode');
    modeLabel.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('light-mode');
    modeLabel.textContent = 'Dark Mode';
  }
});

// Attach handleLogin to submit button click
submitBtn.addEventListener('click', handleLogin);

// Initial Load
fetchXPData();