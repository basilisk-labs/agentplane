import fs from "node:fs";
import path from "node:path";

const run = () => {
  const args = process.argv.slice(2);
  let tagArg = null;
  let minBullets = 1;
  for (let i = 0; i < args.length; i += 1) {
    const value = args[i];
    if (value === "--tag" && args[i + 1]) {
      tagArg = args[i + 1];
      i += 1;
    } else if (value === "--min-bullets" && args[i + 1]) {
      minBullets = Number(args[i + 1]) || minBullets;
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
