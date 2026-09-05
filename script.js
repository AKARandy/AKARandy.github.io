// Live GitHub stats for the hero pills. Public API, no token.
const USER = "AKARandy";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

async function loadStats() {
  try {
    const res = await fetch("https://api.github.com/users/" + USER);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    setText("stat-repos", data.public_repos + " public repos");
    setText("stat-followers", data.followers + " followers");
  } catch (err) {
    setText("stat-repos", "github.com/" + USER);
    setText("stat-followers", "github.com/" + USER);
  }
}

loadStats();
