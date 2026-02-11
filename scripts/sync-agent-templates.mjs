import { copyFileSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

function usage() {
  console.log("Usage: node scripts/sync-agent-templates.mjs <check|sync>");
  throw new Error("Invalid usage");
}

function listJsonFileNames(dirPath) {
  return readdirSync(dirPath)
    .filter((entry) => entry.endsWith(".json"))
    .toSorted((a, b) => a.localeCompare(b));
}

function readNormalized(filePath) {
  return `${readFileSync(filePath, "utf8").trimEnd()}\n`;
}

function compareDirectories(canonicalDir, targetDir) {
  const canonicalFiles = listJsonFileNames(canonicalDir);
  const targetFiles = listJsonFileNames(targetDir);
  const missingInTarget = canonicalFiles.filter((name) => !targetFiles.includes(name));
  const extraInTarget = targetFiles.filter((name) => !canonicalFiles.includes(name));
  const changed = [];

  for (const fileName of canonicalFiles) {
    if (!targetFiles.includes(fileName)) continue;
    const canonicalText = readNormalized(path.join(canonicalDir, fileName));
    const targetText = readNormalized(path.join(targetDir, fileName));
    if (canonicalText !== targetText) changed.push(fileName);
  }

  return { canonicalFiles, missingInTarget, extraInTarget, changed };
}

function syncDirectories(canonicalDir, targetDir, canonicalFiles) {
  for (const fileName of canonicalFiles) {
    copyFileSync(path.join(canonicalDir, fileName), path.join(targetDir, fileName));
  }
}

function main() {
  const mode = process.argv[2];
  if (mode !== "check" && mode !== "sync") usage();

  const repoRoot = process.cwd();
  const canonicalDir = path.join(repoRoot, "packages", "agentplane", "assets", "agents");
  const targetDir = path.join(repoRoot, ".agentplane", "agents");
  const diff = compareDirectories(canonicalDir, targetDir);

  if (mode === "check") {
    if (
      diff.missingInTarget.length > 0 ||
      diff.extraInTarget.length > 0 ||
      diff.changed.length > 0
    ) {
      const lines = [
        "agent templates are out of sync.",
        `Canonical: ${path.relative(repoRoot, canonicalDir)}`,
        `Target:    ${path.relative(repoRoot, targetDir)}`,
      ];
      if (diff.missingInTarget.length > 0) {
        lines.push(`Missing in target: ${diff.missingInTarget.join(", ")}`);
      }
      if (diff.extraInTarget.length > 0) {
        lines.push(`Extra in target: ${diff.extraInTarget.join(", ")}`);
      }
      if (diff.changed.length > 0) {
        lines.push(`Changed: ${diff.changed.join(", ")}`);
      }
      lines.push("Run: bun run agents:sync");
      throw new Error(lines.join("\n"));
    }
    process.stdout.write("agents templates OK\n");
    return;
  }

  syncDirectories(canonicalDir, targetDir, diff.canonicalFiles);
  process.stdout.write(
    `synced ${path.relative(repoRoot, canonicalDir)} -> ${path.relative(repoRoot, targetDir)}\n`,
  );
}

main();
