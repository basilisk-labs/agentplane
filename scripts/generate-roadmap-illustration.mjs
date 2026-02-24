import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const WIDTH = 1600;
const HEIGHT = 900;
const OUT = path.join(process.cwd(), "website/static/img/blog/roadmap-kandinsky-agentplane.svg");

function line(x1, y1, x2, y2, w = 2, o = 0.8) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="${w}" opacity="${o}" />`;
}

function circle(cx, cy, r, fill = "none", w = 2, o = 0.8) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#000" stroke-width="${w}" opacity="${o}" />`;
}

function rect(x, y, w, h, fill = "none", sw = 2, o = 0.8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#000" stroke-width="${sw}" opacity="${o}" />`;
}

function poly(points, fill = "none", sw = 2, o = 0.8) {
  return `<polygon points="${points}" fill="${fill}" stroke="#000" stroke-width="${sw}" opacity="${o}" />`;
}

// 6 primary elements total (Kandinsky-inspired minimal composition)
const elements = [
  rect(110, 84, 1380, 732, "none", 2, 0.45),
  circle(430, 355, 190, "none", 3, 0.78),
  circle(430, 355, 12, "#000", 0, 0.9),
  line(270, 640, 1230, 205, 4, 0.65),
  poly("1040,480 1290,520 1120,700", "none", 3, 0.72),
  rect(960, 220, 420, 88, "#000", 0, 0.12),
];

const labels = [
  '<text x="170" y="140" font-family="monospace" font-size="24" letter-spacing="2" fill="#000" opacity="0.75">PLAN → VERIFY → EXPORT</text>',
  '<text x="170" y="785" font-family="monospace" font-size="20" fill="#000" opacity="0.7">agentplane roadmap: 0.1 → 0.5</text>',
];

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#fff" />
  ${elements.join("\n  ")}
  ${labels.join("\n  ")}
</svg>
`;

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, svg, "utf8");
console.log(OUT);
