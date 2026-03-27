import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

export function exists(filePath) {
  try {
    statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

export function readNormalized(filePath) {
  return `${readFileSync(filePath, "utf8").trimEnd()}\n`;
}

function listDirectoryEntries(dirPath, relPrefix = "", recursive = false, include) {
  if (!exists(dirPath)) return [];
  const entries = readdirSync(dirPath).toSorted((a, b) => a.localeCompare(b));
  const out = [];

  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    const abs = path.join(dirPath, entry);
    const rel = relPrefix ? `${relPrefix}/${entry}` : entry;
    const st = statSync(abs);

    if (st.isDirectory()) {
      if (recursive) {
        out.push(...listDirectoryEntries(abs, rel, recursive, include));
      }
      continue;
    }

    if (st.isFile() && include(rel)) {
      out.push(rel);
    }
  }

  return out;
}

export function listFilesRecursive(dirPath, include = () => true) {
  return listDirectoryEntries(dirPath, "", true, include);
}

export function compareDirectoryTrees(
  canonicalDir,
  targetDir,
  { recursive = false, include = () => true } = {},
) {
  const canonicalFiles = listDirectoryEntries(canonicalDir, "", recursive, include);
  const targetFiles = listDirectoryEntries(targetDir, "", recursive, include);
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

export function syncDirectoryTree(canonicalDir, targetDir, canonicalFiles) {
  for (const fileName of canonicalFiles) {
    const src = path.join(canonicalDir, fileName);
    const dst = path.join(targetDir, fileName);
    mkdirSync(path.dirname(dst), { recursive: true });
    copyFileSync(src, dst);
  }
}

export function normalizeJsonText(text) {
  return JSON.stringify(JSON.parse(text));
}

export function readNormalizedJsonIfExists(target) {
  try {
    return normalizeJsonText(readFileSync(target, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export function findDriftedRenderedArtifacts(artifacts) {
  return artifacts
    .map((artifact) => {
      const normalizedRendered = normalizeJsonText(artifact.rendered);
      const driftedTargets = artifact.targets.filter(
        (target) => readNormalizedJsonIfExists(target) !== normalizedRendered,
      );
      return { ...artifact, driftedTargets };
    })
    .filter((artifact) => artifact.driftedTargets.length > 0);
}

export function syncRenderedArtifacts(driftedArtifacts) {
  for (const artifact of driftedArtifacts) {
    for (const target of artifact.driftedTargets) {
      writeFileSync(target, artifact.rendered, "utf8");
    }
  }
}
