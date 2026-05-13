import { existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const targetDir = process.argv[2] ?? "dist";

function pruneJs(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pruneJs(fullPath);
      continue;
    }
    if (
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".js.map") ||
      fullPath.endsWith(".d.ts.map")
    ) {
      rmSync(fullPath, { force: true });
    }
  }
}

pruneJs(targetDir);
