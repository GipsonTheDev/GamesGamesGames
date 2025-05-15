const users = {
  player1: "gamesrock"
};

function handleLogin() {
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const status = document.getElementById('loginStatus');

  if(users[usernameInput] && users[usernameInput] === passwordInput) {
    status.textContent = '';
    document.getElementById('loginSection').classList.add('hidden');

    document.getElementById('displayUsername').textContent = usernameInput;

    fetch('xp_level.json')
      .then(res => res.json())
      .then(data => {
        const userData = data[usernameInput];
        if(userData) {
          document.getElementById('xp').textContent = userData.xp;
          document.getElementById('level').textContent = userData.level;
        } else {
          document.getElementById('xp').textContent = 0;
          document.getElementById('level').textContent = 0;
        }
        document.getElementById('userStats').classList.remove('hidden');
      })
      .catch(() => {
        document.getElementById('xp').textContent = '?';
        document.getElementById('level').textContent = '?';
        document.getElementById('userStats').classList.remove('hidden');
      });
  } else {
    status.textContent = 'Invalid username or password';
  }
}

// Optional: Clear login status message on typing to avoid confusion
document.getElementById('username').addEventListener('input', () => {
  document.getElementById('loginStatus').textContent = '';
});
document.getElementById('password').addEventListener('input', () => {
  document.getElementById('loginStatus').textContent = '';
});