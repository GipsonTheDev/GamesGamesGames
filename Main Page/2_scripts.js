// Hashed password for user "gamer123" = "gamer123" (SHA-256)
const users = {
  "gamer123": "8d969eef6ecad3c29a3a629280e686cff8ca100df9f6c9c7f82cfc3d65c3f4f2"
};

document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("loginSection").classList.toggle("hidden");
});

// Hashing function
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const hashed = await hashPassword(password);

  if (users[username] && users[username] === hashed) {
    document.getElementById("loginStatus").textContent = "Login successful!";
    document.getElementById("displayUsername").textContent = username;
    document.getElementById("userStats").classList.remove("hidden");
    loadXPData(username);
  } else {
    document.getElementById("loginStatus").textContent = "Incorrect login.";
  }
}

async function loadXPData(username) {
  try {
    const response = await fetch("xp_level.json");
    const data = await response.json();

    const userData = data[username];
    document.getElementById("xp").textContent = userData?.xp ?? 0;
    document.getElementById("level").textContent = userData?.level ?? 1;
  } catch (err) {
    console.error("Error loading XP data:", err);
  }
}