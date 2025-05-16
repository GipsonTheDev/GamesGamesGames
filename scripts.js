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
const loadingSpinner = document.getElementById('loadingSpinner');

let xpData = {};
let xpDataLoaded = false;  // Track if data loaded

// Initially disable submit button until data loads
submitBtn.disabled = true;

// Toggle login section on button click
loginBtn.addEventListener('click', () => {
  loginSection.classList.toggle('hidden');
  userStats.classList.add('hidden');
  loginStatus.textContent = '';
});

// Fetch XP data from JSON file on page load
async function fetchXPData() {
  try {
    const response = await fetch('xp_level.json');
    if (!response.ok) throw new Error('Failed to load XP data');
    xpData = await response.json();
    xpDataLoaded = true;
    submitBtn.disabled = false; // Enable login submit once data is ready
  } catch (error) {
    console.error(error);
    loginStatus.textContent = 'Error loading user data. Try refreshing.';
  }
}

// Show or hide loading spinner
function setLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
    submitBtn.disabled = true;
    loginStatus.textContent = '';
  } else {
    loadingSpinner.classList.add('hidden');
    submitBtn.disabled = false;
  }
}

// Login Handler
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

  // Show loading spinner and simulate processing delay
  setLoading(true);

  // Simulate delay of 2 seconds for login processing
  setTimeout(() => {
    // For case-insensitive match, normalize keys and username:
    const foundUserKey = Object.keys(xpData).find(
      key => key.toLowerCase() === username.toLowerCase()
    );

    if (!foundUserKey) {
      loginStatus.textContent = 'User not found.';
      setLoading(false);
      return;
    }

    // Login success (mock)
    loginStatus.textContent = '';
    loginSection.classList.add('hidden');
    userStats.classList.remove('hidden');

    displayUsername.textContent = foundUserKey; // Display actual username with original casing

    updateXPBar(foundUserKey);

    setLoading(false);
  }, 2000);
}

// Update XP bar width and text
function updateXPBar(username) {
  const user = xpData[username];
  if (!user) return;

  const xp = user.xp;
  const level = user.level;

  // For demo: Assuming level up every 1000 XP * level number
  const maxXPForLevel = level * 1000;
  const percent = Math.min(100, (xp / maxXPForLevel) * 100);

  xpBar.style.width = `${percent}%`;
  xpText.textContent = `${xp} / ${maxXPForLevel} XP`;
  levelText.textContent = level;
}

// Dark/Light Mode Toggle
// Assuming you have a modeToggle element with id='modeToggle' and a modeLabel with id='modeLabel' in your HTML
// Note: These were not in the HTML you provided earlier, but the JS references them.
// If these elements don't exist, this part of the code might cause errors.
if (modeToggle && modeLabel) {
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            document.body.classList.add('light-mode');
            modeLabel.textContent = 'Light Mode';
        } else {
            document.body.classList.remove('light-mode');
            modeLabel.textContent = 'Dark Mode';
        }
    });
}


// Submit button triggers login handler
submitBtn.addEventListener('click', handleLogin);

// Initial Load
fetchXPData();


// --- New code for Games List Feature ---

// List of your HTML game files
const gameFiles = [
    "Bomberman.html",
    "Breakout.html",
    "Doodle Jump.html",
    "Evilglitch.html",
    "Flappy Bird!.html", // Note the exclamation mark
    "Frogger.html",
    "Geometry Dash v1.html", // Note the "v1"
    "Konekt.html",
    "RetroHaunt.html",
    "Fnaf.html",
    "Paper Minecraft v11.html",
    "Racer.html",
    "DuckLife1.html",
    "Square.html",
    "Raytraced Minecraft (3D).html",
    "chroma.html",
    "chromedino.html",
    "eaglercraft_1.5.2.html", // Note the version number
    "missile Command.html"
    "echoAI.html"
];

const gamesNavLink = document.getElementById('gamesNavLink');
const gamesListSection = document.getElementById('gamesListSection');
const gamesListContainer = document.getElementById('gamesListContainer');

// Function to populate the games list
function populateGamesList() {
    // Clear any existing content
    gamesListContainer.innerHTML = '';

    // Create and add links for each game
    gameFiles.forEach(gameFile => {
        // Create a display name (remove .html, !, v1, etc.)
        let gameName = gameFile
            .replace('.html', '')
            .replace('!', '')
            .replace('v1', '')
            .replace('_1.5.2', '')
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters (e.g., "DoodleJump" -> "Doodle Jump")
            .trim();

        // Capitalize the first letter of each word
        gameName = gameName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


        const anchor = document.createElement('a');
        anchor.href = gameFile; // The link points directly to the HTML file
        anchor.textContent = gameName;
        // Optional: open game in a new tab
        // anchor.target = "_blank";

        gamesListContainer.appendChild(anchor);
    });
}

// Add event listener to the "Games" navigation link
// Check if the elements exist before adding event listeners
if (gamesNavLink && gamesListSection && gamesListContainer) {
    gamesNavLink.addEventListener('click', (event) => {
        // Prevent the default link behavior (which is to go to #)
        event.preventDefault();

        // Toggle the visibility of the games list section
        gamesListSection.classList.toggle('hidden');

        // If the section is now visible, populate the list
        if (!gamesListSection.classList.contains('hidden')) {
            populateGamesList();
        } else {
            // If hiding, clear the list content
            gamesListContainer.innerHTML = '';
        }

        // Optional: Hide other sections when games list is shown
        // You might want to hide other main content sections here
        // This requires adding classes/ids to other main sections if they don't have them.
        // Example (uncomment and adapt if needed):
        /*
        document.getElementById('welcomeCard').classList.add('hidden');
        document.querySelector('.quick-actions').classList.add('hidden');
        document.querySelector('.notifications').classList.add('hidden');
        document.getElementById('loginSection').classList.add('hidden'); // Assuming you want to hide login/stats
        document.getElementById('userStats').classList.add('hidden');   // when games are shown
        document.querySelector('.controls').classList.add('hidden');
        */

        // Optional: Show other sections when games list is hidden
        // Example (uncomment and adapt if needed):
        /*
        if (gamesListSection.classList.contains('hidden')) {
             document.getElementById('welcomeCard').classList.remove('hidden');
             document.querySelector('.quick-actions').classList.remove('hidden');
             document.querySelector('.notifications').classList.remove('hidden');
             // Decide if login/stats/controls should reappear
             // document.getElementById('loginSection').classList.remove('hidden');
             // document.getElementById('userStats').classList.remove('hidden');
             // document.querySelector('.controls').classList.remove('hidden');
        }
        */
    });
} else {
    console.error("Could not find one or more elements for the games list feature (gamesNavLink, gamesListSection, or gamesListContainer).");
}


// --- End of New code ---
