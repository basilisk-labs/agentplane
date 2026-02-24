import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const WIDTH = 1600;
const HEIGHT = 900;
const OUT = path.join(process.cwd(), "website/static/img/blog/roadmap-kandinsky-agentplane.svg");

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1_664_525 + 1_013_904_223) >>> 0;
    return s / 4_294_967_295;
  };
}

const rnd = seeded(20_260_224);
const pick = (a, b) => a + (b - a) * rnd();
const ir = (a, b) => Math.round(pick(a, b));

function line(x1, y1, x2, y2, w = 1.5, o = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="${w}" opacity="${o}" />`;
}

function circle(cx, cy, r, fill = "none", w = 2, o = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#000" stroke-width="${w}" opacity="${o}" />`;
}

function rect(x, y, w, h, fill = "none", sw = 2, o = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#000" stroke-width="${sw}" opacity="${o}" />`;
}

function poly(points, fill = "none", sw = 2, o = 1) {
  return `<polygon points="${points}" fill="${fill}" stroke="#000" stroke-width="${sw}" opacity="${o}" />`;
}

const grid = [];
for (let x = 0; x <= WIDTH; x += 80) grid.push(line(x, 0, x, HEIGHT, 1, 0.08));
for (let y = 0; y <= HEIGHT; y += 80) grid.push(line(0, y, WIDTH, y, 1, 0.08));

const kandinsky = [];
for (let i = 0; i < 14; i += 1) {
  const cx = ir(70, WIDTH - 70);
  const cy = ir(70, HEIGHT - 70);
  const r = ir(18, 110);
  kandinsky.push(
    circle(cx, cy, r, i % 4 === 0 ? "#000" : "none", ir(1, 4), pick(0.16, 0.9).toFixed(2)),
  );
}
for (let i = 0; i < 22; i += 1) {
  kandinsky.push(
    line(
      ir(0, WIDTH),
      ir(0, HEIGHT),
      ir(0, WIDTH),
      ir(0, HEIGHT),
      pick(1, 4).toFixed(2),
      pick(0.15, 0.75).toFixed(2),
    ),
  );
}
for (let i = 0; i < 11; i += 1) {
  const x = ir(60, WIDTH - 240);
  const y = ir(60, HEIGHT - 220);
  const p = `${x},${y} ${x + ir(90, 200)},${y + ir(10, 40)} ${x + ir(20, 60)},${y + ir(80, 180)}`;
  kandinsky.push(poly(p, i % 5 === 0 ? "#000" : "none", ir(1, 3), pick(0.18, 0.82).toFixed(2)));
}

const agentplane = [rect(80, 68, WIDTH - 160, HEIGHT - 136, "none", 2, 0.5)];

const steps = ["PLAN", "SYNC", "APPROVE", "EXECUTE", "VERIFY", "EXPORT"];
let x = 150;
for (const step of steps) {
  agentplane.push(
    `<text x="${x}" y="130" font-family="monospace" font-size="24" letter-spacing="2" fill="#000" opacity="0.82">${step}</text>`,
  );
  if (step !== steps.at(-1)) {
    agentplane.push(
      line(x + 110, 120, x + 175, 120, 2, 0.6),
      poly(`${x + 175},120 ${x + 165},114 ${x + 165},126`, "#000", 0, 0.6),
    );
  }
  x += 195;
}

agentplane.push(
  '<text x="130" y="810" font-family="monospace" font-size="20" fill="#000" opacity="0.72">agentplane task new --title &quot;Roadmap&quot; --owner CODER --tag docs</text>',
  '<text x="130" y="842" font-family="monospace" font-size="20" fill="#000" opacity="0.72">agentplane finish 202602241116-9HNMC7 --author CODER --body &quot;Verified: ...&quot;</text>',
);

const rings = [
  [1260, 280, 150],
  [1248, 280, 104],
  [1236, 280, 62],
];
for (const [cx, cy, r] of rings) agentplane.push(circle(cx, cy, r, "none", 2, 0.65));
agentplane.push(circle(1260, 280, 7, "#000", 0, 0.9));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#fff" />
  ${grid.join("\n  ")}
  ${kandinsky.join("\n  ")}
  ${agentplane.join("\n  ")}
</svg>
`;

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, svg, "utf8");
console.log(OUT);
