import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function parseSemverTag(tag) {
  const match = /^v(\d+)\.(\d+)\.(\d+)$/u.exec(tag.trim());
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareSemverTags(a, b) {
  const pa = parseSemverTag(a);
  const pb = parseSemverTag(b);
  if (!pa || !pb) return a.localeCompare(b);
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  return pa.patch - pb.patch;
}

function listReleaseTags(rootDir) {
  try {
    const out = execFileSync("git", ["tag", "--list", "v[0-9]*.[0-9]*.[0-9]*"], {
      cwd: rootDir,
      encoding: "utf8",
    });
    return out
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter(Boolean)
      .toSorted(compareSemverTags);
  } catch {
    return [];
  }
}

function requiredBulletsFromGitRange(rootDir, tag) {
  const releaseTags = listReleaseTags(rootDir);
  const index = releaseTags.indexOf(tag);
  const prevTag = index > 0 ? releaseTags[index - 1] : null;
  const range = prevTag ? `${prevTag}..${tag}` : tag;
  try {
    const out = execFileSync("git", ["log", "--no-merges", "--pretty=format:%H", range], {
      cwd: rootDir,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    const count = out
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter(Boolean).length;
    return Math.max(1, count);
  } catch {
    return 1;
  }
}

const run = () => {
  const args = process.argv.slice(2);
  let tagArg = null;
  let minBulletsOverride = null;
  for (let i = 0; i < args.length; i += 1) {
    const value = args[i];
    if (value === "--tag" && args[i + 1]) {
      tagArg = args[i + 1];
      i += 1;
    } else if (value === "--min-bullets" && args[i + 1]) {
      const parsed = Number(args[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) {
        minBulletsOverride = Math.floor(parsed);
      }
      i += 1;
    }
  }

  const tags = new Set();
  if (tagArg) {
    tags.add(tagArg);
  } else if (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME) {
    tags.add(process.env.GITHUB_REF_NAME);
  } else {
    let input = "";
    try {
      input = fs.readFileSync(0, "utf8");
    } catch {
      input = "";
    }
    for (const line of input.split(/\r?\n/)) {
      if (!line.trim()) continue;
      const parts = line.trim().split(/\s+/);
      if (parts.length < 3) continue;
      const remoteRef = parts[2];
      if (remoteRef && remoteRef.startsWith("refs/tags/")) {
        tags.add(remoteRef.replace("refs/tags/", ""));
      }
    }
  }

  const releaseTags = [...tags].filter((tag) => /^v\d+\.\d+\.\d+/.test(tag));
  if (releaseTags.length === 0) {
    return;
  }

  const errors = [];
  const rootDir = process.cwd();
  for (const tag of releaseTags) {
    const relPath = path.join("docs", "releases", `${tag}.md`);
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing release notes file: ${relPath}`);
      continue;
    }
    const content = fs.readFileSync(fullPath, "utf8");
    if (!/release\s+notes/i.test(content)) {
      errors.push(`Release notes must include a "Release Notes" heading in ${relPath}.`);
    }
    const minBullets = Math.max(minBulletsOverride ?? 0, requiredBulletsFromGitRange(rootDir, tag));
    const bulletCount = content.split(/\r?\n/).filter((line) => /^\s*[-*]\s+\S+/.test(line)).length;
    if (bulletCount < minBullets) {
      errors.push(`Release notes must include at least ${minBullets} bullet points in ${relPath}.`);
    }
    if (/[\u0400-\u04FF]/.test(content)) {
      errors.push(`Release notes must be written in English (no Cyrillic) in ${relPath}.`);
    }
  }

  if (errors.length > 0) {
    const details = [
      "Release notes check failed:",
      ...errors.map((message) => `- ${message}`),
      "Create notes in docs/releases/vX.Y.Z.md using the English template in docs/releases/TEMPLATE.md.",
    ];
    throw new Error(details.join("\n"));
  }
};

run();
