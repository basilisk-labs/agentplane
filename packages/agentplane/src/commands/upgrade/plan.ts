import { readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, getPathKind } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

import {
  INCIDENTS_POLICY_PATH,
  isAllowedUpgradePath,
  isDeniedUpgradePath,
  mergeIncidentsPolicy,
  textChangedForType,
  toUpgradeBaselineKey,
} from "./policy.js";
import type { FrameworkManifest, UpgradeReviewRecord } from "./types.js";

export type ManagedUpgradePlan = {
  additions: string[];
  updates: string[];
  skipped: string[];
  merged: string[];
  fileContents: Map<string, Buffer>;
  reviewRecords: UpgradeReviewRecord[];
  incidentsAppendedCount: number;
};

async function readUpgradeBaseline(opts: {
  baselineDirNew: string;
  baselineDirLegacy: string;
  baselineKey: string;
}): Promise<string | null> {
  try {
    return await readFile(path.join(opts.baselineDirNew, opts.baselineKey), "utf8");
  } catch {
    try {
      return await readFile(path.join(opts.baselineDirLegacy, opts.baselineKey), "utf8");
    } catch {
      return null;
    }
  }
}

async function resolvePolicyGatewayRel(gitRoot: string): Promise<"AGENTS.md" | "CLAUDE.md"> {
  if (await fileExists(path.join(gitRoot, "AGENTS.md"))) return "AGENTS.md";
  if (await fileExists(path.join(gitRoot, "CLAUDE.md"))) return "CLAUDE.md";
  return "AGENTS.md";
}

export async function planManagedUpgrade(opts: {
  gitRoot: string;
  manifest: FrameworkManifest;
  bundleRoot: string;
  baselineDirNew: string;
  baselineDirLegacy: string;
}): Promise<ManagedUpgradePlan> {
  const additions: string[] = [];
  const updates: string[] = [];
  const skipped: string[] = [];
  const merged: string[] = [];
  const fileContents = new Map<string, Buffer>();
  const missingRequired: string[] = [];
  const reviewRecords: UpgradeReviewRecord[] = [];
  let incidentsAppendedCount = 0;

  const policyGatewayRel = await resolvePolicyGatewayRel(opts.gitRoot);
  const remapManagedGatewayRel = (rel: string): string => {
    if (rel === "AGENTS.md" && policyGatewayRel === "CLAUDE.md") return "CLAUDE.md";
    return rel;
  };

  for (const entry of opts.manifest.files) {
    const relRaw = entry.path.replaceAll("\\", "/").trim();
    if (!relRaw || relRaw.startsWith("..") || path.isAbsolute(relRaw)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Invalid manifest path: ${entry.path}`,
      });
    }
    if (isDeniedUpgradePath(relRaw)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Manifest includes a denied path: ${relRaw}`,
      });
    }
    if (!isAllowedUpgradePath(relRaw)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Manifest path not allowed: ${relRaw}`,
      });
    }

    const rel = remapManagedGatewayRel(relRaw);
    const destPath = path.join(opts.gitRoot, rel);
    const kind = await getPathKind(destPath);
    if (kind === "dir") {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: `Upgrade target is a directory: ${rel}`,
      });
    }

    const sourceRelRaw = (entry.source_path ?? entry.path).replaceAll("\\", "/").trim();
    const mappedSourceRel =
      rel === "CLAUDE.md" && sourceRelRaw === "AGENTS.md" ? "CLAUDE.md" : sourceRelRaw;
    const sourceCandidates = [...new Set([mappedSourceRel, sourceRelRaw])];
    let incomingData: Buffer | null = null;
    for (const candidate of sourceCandidates) {
      try {
        incomingData = await readFile(path.join(opts.bundleRoot, candidate));
        break;
      } catch {
        // try next candidate
      }
    }
    if (!incomingData) {
      if (entry.required) missingRequired.push(rel);
      continue;
    }

    let existingBuf: Buffer | null = null;
    if (kind !== null) {
      existingBuf = await readFile(destPath);
    }

    const incomingTextOriginal = incomingData.toString("utf8");
    const currentTextForReview = existingBuf ? existingBuf.toString("utf8") : null;
    const baselineKey = toUpgradeBaselineKey(rel);
    const baselineText = baselineKey
      ? await readUpgradeBaseline({
          baselineDirNew: opts.baselineDirNew,
          baselineDirLegacy: opts.baselineDirLegacy,
          baselineKey,
        })
      : null;
    const hasBaseline = baselineText !== null;
    const changedCurrentVsBaseline =
      hasBaseline && currentTextForReview !== null
        ? textChangedForType({
            type: entry.type,
            aText: currentTextForReview,
            bText: baselineText,
          })
        : null;
    const changedIncomingVsBaseline = hasBaseline
      ? textChangedForType({
          type: entry.type,
          aText: incomingTextOriginal,
          bText: baselineText,
        })
      : null;
    const currentAndIncomingEqual =
      currentTextForReview === null
        ? false
        : textChangedForType({
            type: entry.type,
            aText: currentTextForReview,
            bText: incomingTextOriginal,
          }) === false;

    if (currentTextForReview !== null && currentAndIncomingEqual) {
      skipped.push(rel);
      reviewRecords.push({
        relPath: rel,
        mergeStrategy: entry.merge_strategy,
        hasBaseline,
        changedCurrentVsBaseline,
        changedIncomingVsBaseline,
        currentDiffersFromIncoming: false,
        mergeApplied: false,
        mergePath: "none",
      });
      continue;
    }

    if (currentTextForReview !== null && changedCurrentVsBaseline === false) {
      updates.push(rel);
      fileContents.set(rel, incomingData);
      reviewRecords.push({
        relPath: rel,
        mergeStrategy: entry.merge_strategy,
        hasBaseline,
        changedCurrentVsBaseline,
        changedIncomingVsBaseline,
        currentDiffersFromIncoming: true,
        mergeApplied: false,
        mergePath: "none",
      });
      continue;
    }

    let mergeApplied = false;
    let mergePath: UpgradeReviewRecord["mergePath"] = "none";
    let nextData = incomingData;

    if (existingBuf && rel === INCIDENTS_POLICY_PATH) {
      const mergedIncidents = mergeIncidentsPolicy({
        incomingText: incomingData.toString("utf8"),
        currentText: existingBuf.toString("utf8"),
        baselineText,
      });
      nextData = Buffer.from(mergedIncidents.nextText, "utf8");
      if (mergedIncidents.appended) {
        merged.push(rel);
        mergeApplied = true;
        mergePath = "incidentsAppend";
        incidentsAppendedCount += mergedIncidents.appendedCount;
      }
    }

    const currentDiffersFromIncoming =
      currentTextForReview === null
        ? false
        : textChangedForType({
            type: entry.type,
            aText: currentTextForReview,
            bText: incomingTextOriginal,
          });

    reviewRecords.push({
      relPath: rel,
      mergeStrategy: entry.merge_strategy,
      hasBaseline,
      changedCurrentVsBaseline,
      changedIncomingVsBaseline,
      currentDiffersFromIncoming,
      mergeApplied,
      mergePath,
    });

    fileContents.set(rel, nextData);
    if (kind === null) additions.push(rel);
    else if (existingBuf && Buffer.compare(existingBuf, nextData) === 0) skipped.push(rel);
    else updates.push(rel);
  }

  if (missingRequired.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Upgrade bundle is missing required managed files: ${missingRequired.join(", ")}`,
    });
  }

  return {
    additions,
    updates,
    skipped,
    merged,
    fileContents,
    reviewRecords,
    incidentsAppendedCount,
  };
}
