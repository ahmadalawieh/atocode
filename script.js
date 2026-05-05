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
  const pulse = Math.sin(tick * 1.2) * 0.5 + 0.5;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#101216";
  context.fillRect(0, 0, width, height);

  drawGrid(width, height, tick);
  drawStudioRings(width, height, pulse, tick);
  drawInterfaceCards(width, height, tick);

  requestAnimationFrame(drawSystem);
}

function drawGrid(width, height, tick) {
  const offset = (tick * 10) % 58;

  context.strokeStyle = "rgba(247,247,242,0.055)";
  context.lineWidth = 1;

  for (let x = -58 + offset; x < width + 58; x += 58) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = -58 + offset; y < height + 58; y += 58) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawStudioRings(width, height, pulse, tick) {
  const centerX = width * 0.5;
  const centerY = height * 0.48;
  const maxRadius = Math.min(width, height) * 0.36;

  for (let index = 0; index < 5; index += 1) {
    const radius = maxRadius - index * 38 + Math.sin(tick + index) * 5;
    context.strokeStyle = index === 0 ? "rgba(216,255,99,0.42)" : "rgba(247,247,242,0.12)";
    context.lineWidth = index === 0 ? 2.5 : 1;
    context.beginPath();
    context.ellipse(centerX, centerY, radius * 1.22, radius * 0.72, -0.38 + tick * 0.02, 0, Math.PI * 2);
    context.stroke();
  }

  const glow = context.createRadialGradient(centerX, centerY, 20, centerX, centerY, maxRadius * 1.6);
  glow.addColorStop(0, `rgba(216,255,99,${0.16 + pulse * 0.06})`);
  glow.addColorStop(0.5, "rgba(155,231,255,0.08)");
  glow.addColorStop(1, "rgba(8,9,11,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawInterfaceCards(width, height, tick) {
  const cards = [
    { x: width * 0.19, y: height * 0.26, w: width * 0.38, h: 92, label: "Strategy", accent: "#d8ff63" },
    { x: width * 0.37, y: height * 0.43, w: width * 0.32, h: 104, label: "Build", accent: "#9be7ff" },
    { x: width * 0.18, y: height * 0.63, w: width * 0.34, h: 88, label: "Care", accent: "#ff8068" },
  ];

  cards.forEach((card, index) => {
    const lift = Math.sin(tick * 1.1 + index) * 6;
    context.fillStyle = "rgba(247,247,242,0.94)";
    context.strokeStyle = "rgba(247,247,242,0.35)";
    context.lineWidth = 1;
    roundRect(context, card.x, card.y + lift, card.w, card.h, 20);
    context.fill();
    context.stroke();

    context.fillStyle = card.accent;
    roundRect(context, card.x + 18, card.y + lift + 18, 52, 30, 15);
    context.fill();

    context.fillStyle = "#08090b";
    context.font = "900 16px system-ui, sans-serif";
    context.fillText(card.label, card.x + 84, card.y + lift + 39);

    context.fillStyle = "rgba(8,9,11,0.18)";
    roundRect(context, card.x + 84, card.y + lift + 58, card.w - 120, 7, 4);
    context.fill();

    context.fillStyle = "rgba(8,9,11,0.1)";
    roundRect(context, card.x + 84, card.y + lift + 74, card.w - 170, 7, 4);
    context.fill();
  });
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
