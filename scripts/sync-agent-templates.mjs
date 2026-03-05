import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

function usage() {
  console.log("Usage: node scripts/sync-agent-templates.mjs <check|sync>");
  throw new Error("Invalid usage");
}

function listJsonFileNames(dirPath) {
  if (!exists(dirPath)) return [];
  return readdirSync(dirPath)
    .filter((entry) => entry.endsWith(".json"))
    .toSorted((a, b) => a.localeCompare(b));
}

function listFilesRecursive(dirPath, relPrefix = "") {
  if (!exists(dirPath)) return [];
  const entries = readdirSync(dirPath).toSorted((a, b) => a.localeCompare(b));
  const out = [];
  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    const abs = path.join(dirPath, entry);
    const rel = relPrefix ? `${relPrefix}/${entry}` : entry;
    const st = statSync(abs);
    if (st.isDirectory()) {
      out.push(...listFilesRecursive(abs, rel));
      continue;
    }
    if (st.isFile()) out.push(rel);
  }
  return out;
}

function exists(filePath) {
  try {
    statSync(filePath);
    return true;
  } catch {
    return false;
  }
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

function compareRecursiveDirectories(canonicalDir, targetDir) {
  const canonicalFiles = listFilesRecursive(canonicalDir);
  const targetFiles = listFilesRecursive(targetDir);
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

function syncRecursiveDirectories(canonicalDir, targetDir, canonicalFiles) {
  for (const fileName of canonicalFiles) {
    const src = path.join(canonicalDir, fileName);
    const dst = path.join(targetDir, fileName);
    mkdirSync(path.dirname(dst), { recursive: true });
    copyFileSync(src, dst);
  }
}

function main() {
  const mode = process.argv[2];
  if (mode !== "check" && mode !== "sync") usage();

  const repoRoot = process.cwd();
  const canonicalAgentsDir = path.join(repoRoot, "packages", "agentplane", "assets", "agents");
  const targetAgentsDir = path.join(repoRoot, ".agentplane", "agents");
  const canonicalPolicyDir = path.join(repoRoot, "packages", "agentplane", "assets", "policy");
  const targetPolicyDir = path.join(repoRoot, ".agentplane", "policy");
  const agentDiff = compareDirectories(canonicalAgentsDir, targetAgentsDir);
  const policyDiff = compareRecursiveDirectories(canonicalPolicyDir, targetPolicyDir);

  if (mode === "check") {
    if (
      agentDiff.missingInTarget.length > 0 ||
      agentDiff.extraInTarget.length > 0 ||
      agentDiff.changed.length > 0 ||
      policyDiff.missingInTarget.length > 0 ||
      policyDiff.extraInTarget.length > 0 ||
      policyDiff.changed.length > 0
    ) {
      const lines = [
        "agent templates are out of sync.",
        `Canonical agents: ${path.relative(repoRoot, canonicalAgentsDir)}`,
        `Target agents:    ${path.relative(repoRoot, targetAgentsDir)}`,
        `Canonical policy: ${path.relative(repoRoot, canonicalPolicyDir)}`,
        `Target policy:    ${path.relative(repoRoot, targetPolicyDir)}`,
      ];
      if (agentDiff.missingInTarget.length > 0) {
        lines.push(`Agents missing in target: ${agentDiff.missingInTarget.join(", ")}`);
      }
      if (agentDiff.extraInTarget.length > 0) {
        lines.push(`Agents extra in target: ${agentDiff.extraInTarget.join(", ")}`);
      }
      if (agentDiff.changed.length > 0) {
        lines.push(`Agents changed: ${agentDiff.changed.join(", ")}`);
      }
      if (policyDiff.missingInTarget.length > 0) {
        lines.push(`Policy missing in target: ${policyDiff.missingInTarget.join(", ")}`);
      }
      if (policyDiff.extraInTarget.length > 0) {
        lines.push(`Policy extra in target: ${policyDiff.extraInTarget.join(", ")}`);
      }
      if (policyDiff.changed.length > 0) {
        lines.push(`Policy changed: ${policyDiff.changed.join(", ")}`);
      }
      lines.push("Run: bun run agents:sync");
      throw new Error(lines.join("\n"));
    }
    process.stdout.write("agents templates OK\n");
    return;
  }

  syncDirectories(canonicalAgentsDir, targetAgentsDir, agentDiff.canonicalFiles);
  syncRecursiveDirectories(canonicalPolicyDir, targetPolicyDir, policyDiff.canonicalFiles);
  process.stdout.write(
    `synced ${path.relative(repoRoot, canonicalAgentsDir)} -> ${path.relative(repoRoot, targetAgentsDir)}\n`,
  );
  process.stdout.write(
    `synced ${path.relative(repoRoot, canonicalPolicyDir)} -> ${path.relative(repoRoot, targetPolicyDir)}\n`,
  );
}

main();
