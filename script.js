// Galaxy star effect
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let mouse = { x: 0, y: 0 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
  });
}

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  stars.forEach(s => {
    const dx = s.x - mouse.x;
    const dy = s.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.stroke();
    }
  });
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}
animate();

// Game data
const games = [
  { name: "2048", file: "games/2048/index.html" },
  { name: "Snake", file: "games/snake/index.html" },
  { name: "Flappy Bird Clone", file: "games/flappy/index.html" },
  { name: "Tetris", file: "games/tetris/index.html" },
  { name: "Pong", file: "games/pong/index.html" },
  // placeholders
  ...Array.from({ length: 45 }, (_, i) => ({ name: `Game ${i+6}`, file: "games/placeholder.html" }))
];

// Build game cards
const container = document.getElementById("games-container");
games.forEach(g => {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `<h3>${g.name}</h3>`;
  card.onclick = () => loadGame(g);
  container.appendChild(card);
});

// Search
document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".game-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query) ? "block" : "none";
  });
});

// Game loader
function loadGame(game) {
  document.body.innerHTML = `
    <button onclick="window.location.reload()">⬅ Back</button>
    <h2>${game.name}</h2>
    <iframe src="${game.file}" allowfullscreen></iframe>
  `;
}
