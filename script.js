const canvas = document.querySelector("#systemCanvas");
const context = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas || !context) return;

  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function drawSystem(time = 0) {
  if (!canvas || !context) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const tick = time / 1000;
  const pulse = Math.sin(tick * 1.8) * 0.5 + 0.5;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#070a0f";
  context.fillRect(0, 0, width, height);

  drawGrid(width, height, tick);
  drawConnections(width, height, pulse, tick);
  drawNodes(width, height, tick);

  requestAnimationFrame(drawSystem);
}

function drawGrid(width, height, tick) {
  const offset = (tick * 18) % 42;

  context.strokeStyle = "rgba(255,255,255,0.065)";
  context.lineWidth = 1;

  for (let x = -42 + offset; x < width + 42; x += 42) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = -42 + offset; y < height + 42; y += 42) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawConnections(width, height, pulse, tick) {
  const points = getPoints(width, height, tick);

  context.lineCap = "round";
  context.lineWidth = 2;

  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    const gradient = context.createLinearGradient(point.x, point.y, next.x, next.y);
    gradient.addColorStop(0, `rgba(36, 211, 238, ${0.18 + pulse * 0.18})`);
    gradient.addColorStop(1, `rgba(85, 242, 178, ${0.1 + pulse * 0.16})`);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(next.x, next.y);
    context.stroke();
  });
}

function drawNodes(width, height, tick) {
  const points = getPoints(width, height, tick);
  const labels = ["UI", "DEV", "HOST", "CARE", "SEO"];

  points.forEach((point, index) => {
    const size = index === 1 ? 118 : 92;
    const x = point.x - size / 2;
    const y = point.y - 34;

    context.fillStyle = "rgba(12, 18, 29, 0.86)";
    context.strokeStyle = index === 1 ? "rgba(36, 211, 238, 0.72)" : "rgba(255,255,255,0.18)";
    context.lineWidth = 1;
    roundRect(context, x, y, size, 68, 8);
    context.fill();
    context.stroke();

    context.fillStyle = index === 1 ? "#24d3ee" : "#55f2b2";
    context.font = "800 13px system-ui, sans-serif";
    context.fillText(labels[index], x + 16, y + 27);

    context.fillStyle = "rgba(245,248,255,0.18)";
    roundRect(context, x + 16, y + 40, size - 32, 5, 3);
    context.fill();

    context.fillStyle = "rgba(245,248,255,0.1)";
    roundRect(context, x + 16, y + 51, size - 54, 5, 3);
    context.fill();
  });
}

function getPoints(width, height, tick) {
  return [
    { x: width * 0.24 + Math.sin(tick) * 8, y: height * 0.26 },
    { x: width * 0.58, y: height * 0.32 + Math.cos(tick * 0.8) * 10 },
    { x: width * 0.76 + Math.sin(tick * 0.7) * 8, y: height * 0.56 },
    { x: width * 0.42, y: height * 0.72 + Math.cos(tick * 0.9) * 8 },
    { x: width * 0.2, y: height * 0.55 + Math.sin(tick * 0.6) * 9 },
  ];
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
requestAnimationFrame(drawSystem);

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const service = formData.get("service")?.toString().trim();
  const budget = formData.get("budget")?.toString().trim() || "Not sure yet";
  const timeline = formData.get("timeline")?.toString().trim() || "Flexible";
  const message = formData.get("message")?.toString().trim();

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  const subject = `ATOCODE project inquiry from ${name}`;
  const mailto = `mailto:ahmad.alawieh77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (formNote) {
    formNote.textContent = "Opening your email app with the inquiry prepared.";
  }

  window.location.href = mailto;
});
