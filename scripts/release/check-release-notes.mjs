import fs from "node:fs";
import path from "node:path";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const parseArgs = (argv) => {
  const { flags } = parseScriptArgs(argv, { valueFlags: ["tag", "min-bullets"] });
  const parsedMinBullets = flags["min-bullets"] ? Number(flags["min-bullets"]) : null;
  const minBulletsOverride =
    parsedMinBullets !== null && Number.isFinite(parsedMinBullets) && parsedMinBullets > 0
      ? Math.floor(parsedMinBullets)
      : null;
  return {
    tagArg: flags.tag ?? null,
    minBulletsOverride,
  };
};

const RELEASE_NOTE_TEMPLATE_PLACEHOLDERS = [
  "2-4 bullets with the main release outcomes in plain language.",
  "New features or capabilities.",
  "Behavior/UX improvements that users will notice.",
  "Bug fixes and regressions.",
  'Breaking changes, migration steps, or "none".',
  "Release checks completed (for example: release:prepublish, parity, publish gates).",
  "Cover all differences from the release plan (`changes.md`/`changes.json`).",
  "Use detailed, human-readable language, not raw commit log text.",
  "Keep concrete bullets with explicit outcomes.",
  "Keep at least one bullet per listed change from `changes.md`/`changes.json`.",
];

const REQUIRED_RELEASE_NOTE_SECTIONS = [
  "Summary",
  "Added",
  "Improved",
  "Fixed",
  "Upgrade Notes",
  "Verification",
];

function releaseNotesHeadingPresent(content, tag) {
  const headingPattern = new RegExp(
    String.raw`^#\s+Release\s+Notes\s*(?:[-:—]\s*)?${tag.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)}\s*$`,
    "iu",
  );
  return releaseNoteLinesOutsideCodeFences(content).some((line) => headingPattern.test(line));
}

function sectionHeadings(content) {
  return releaseNoteLinesOutsideCodeFences(content)
    .map((line) => /^##\s+(.+?)\s*$/u.exec(line)?.[1]?.trim() ?? null)
    .filter(Boolean);
}

function missingRequiredSections(content) {
  const headings = new Set(sectionHeadings(content).map((heading) => heading.toLowerCase()));
  return REQUIRED_RELEASE_NOTE_SECTIONS.filter((section) => !headings.has(section.toLowerCase()));
}

function duplicateSectionHeadings(content) {
  const seen = new Set();
  const duplicates = new Set();
  for (const heading of sectionHeadings(content)) {
    if (!heading) continue;
    const key = heading.toLowerCase();
    if (seen.has(key)) duplicates.add(heading);
    seen.add(key);
  }
  return [...duplicates].toSorted((a, b) => a.localeCompare(b));
}

function releaseNoteLinesOutsideCodeFences(content) {
  const lines = content.split(/\r?\n/u);
  let inFence = false;
  const visibleLines = [];
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) visibleLines.push(line);
  }
  return visibleLines;
}

function unreplacedTemplateBullet(content) {
  const placeholders = new Set(RELEASE_NOTE_TEMPLATE_PLACEHOLDERS);
  for (const line of releaseNoteLinesOutsideCodeFences(content)) {
    const match = /^\s*[-*]\s+(.+?)\s*$/u.exec(line);
    if (match?.[1] && placeholders.has(match[1])) return match[1];
  }
  return null;
}

const main = defineCheck({
  name: "check-release-notes",
  parseArgs,
  check({ options }) {
    const { tagArg, minBulletsOverride } = options;
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
      if (!releaseNotesHeadingPresent(content, tag)) {
        errors.push(
          `Release notes must include a top-level "Release Notes - ${tag}" heading in ${relPath}.`,
        );
      }
      const missingSections = missingRequiredSections(content);
      if (missingSections.length > 0) {
        errors.push(
          `Release notes must include required template sections in ${relPath}: ${missingSections.join(", ")}`,
        );
      }
      if (/^##\s+Writing Rules\s*$/mu.test(content)) {
        errors.push(`Release notes must not include template writing instructions in ${relPath}.`);
      }
      const templateBullet = unreplacedTemplateBullet(content);
      if (templateBullet) {
        errors.push(
          `Release notes must replace template placeholder bullet in ${relPath}: ${templateBullet}`,
        );
      }
      const duplicateHeadings = duplicateSectionHeadings(content);
      if (duplicateHeadings.length > 0) {
        errors.push(
          `Release notes must not include duplicate section headings in ${relPath}: ${duplicateHeadings.join(", ")}`,
        );
      }
      const minBullets = minBulletsOverride ?? REQUIRED_RELEASE_NOTE_SECTIONS.length;
      const bulletCount = content
        .split(/\r?\n/)
        .filter((line) => /^\s*[-*]\s+\S+/.test(line)).length;
      if (bulletCount < minBullets) {
        errors.push(
          `Release notes must include at least ${minBullets} bullet points in ${relPath}.`,
        );
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
  },
});

runScriptMain(main);
