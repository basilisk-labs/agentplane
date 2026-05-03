import { access, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const repoRoot = process.cwd();
const gifPath = path.join(repoRoot, "docs/assets/agentplane-demo.gif");
const tapePath = path.join(repoRoot, "docs/assets/agentplane-demo.tape");
const castPath = path.join(repoRoot, "docs/assets/agentplane-demo.cast");

async function main() {
  await access(gifPath);
  await access(tapePath);
  await access(castPath);

  const gif = await stat(gifPath);
  if (gif.size > 3_000_000) {
    throw new Error(`docs/assets/agentplane-demo.gif is too large: ${gif.size} bytes`);
  }

  const hasVhs = spawnSync("vhs", ["--version"], { stdio: "ignore" }).status === 0;
  if (!hasVhs) {
    process.stdout.write("release demo OK (vhs unavailable; checked committed tape/cast/gif)\n");
    return;
  }

  const rendered = spawnSync("vhs", [tapePath], { cwd: repoRoot, stdio: "inherit" });
  if (rendered.status !== 0) {
    throw new Error("vhs demo render failed");
  }

  process.stdout.write("release demo OK\n");
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
