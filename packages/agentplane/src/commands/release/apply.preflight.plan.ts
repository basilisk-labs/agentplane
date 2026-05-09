import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { readJsonFile } from "../../shared/json-io.js";

import type { PlanChange, ReleaseVersionPlan } from "./apply.types.js";

export async function fileExists(p: string): Promise<boolean> {
  try {
    await readFile(p, "utf8");
    return true;
  } catch {
    return false;
  }
}

function assertNonEmptyString(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid ${label} (expected non-empty string).`,
    });
  }
  return value.trim();
}

export function parseVersionPlan(raw: unknown): ReleaseVersionPlan {
  if (!raw || typeof raw !== "object") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Invalid version.json (expected object).",
    });
  }
  const obj = raw as Record<string, unknown>;
  const bumpRaw = assertNonEmptyString(obj.bump, "bump");
  if (bumpRaw !== "patch" && bumpRaw !== "minor" && bumpRaw !== "major") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid bump in version.json: ${bumpRaw}`,
    });
  }
  const prevTagVal = obj.prevTag;
  const prevTag = prevTagVal === null ? null : typeof prevTagVal === "string" ? prevTagVal : null;
  const prevVersion = assertNonEmptyString(obj.prevVersion, "prevVersion");
  const nextTag = assertNonEmptyString(obj.nextTag, "nextTag");
  const nextVersion = assertNonEmptyString(obj.nextVersion, "nextVersion");
  return { prevTag, prevVersion, nextTag, nextVersion, bump: bumpRaw };
}

export async function findLatestPlanDir(gitRoot: string): Promise<string> {
  const base = path.join(gitRoot, ".agentplane", ".release", "plan");
  const runNames = await readdir(base);
  const runs = runNames
    .map((s) => s.trim())
    .filter(Boolean)
    .toSorted();
  const latest = runs.at(-1);
  if (!latest) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        "No release plan runs found under .agentplane/.release/plan/. Run `agentplane release plan` first.",
    });
  }
  return path.join(base, latest);
}

export async function loadReleasePlan(opts: { gitRoot: string; planOverride?: string }): Promise<{
  planDir: string;
  versionJsonPath: string;
  plan: ReleaseVersionPlan;
  changes: PlanChange[];
  minBullets: number;
}> {
  const planDir = opts.planOverride
    ? path.resolve(opts.gitRoot, opts.planOverride)
    : await findLatestPlanDir(opts.gitRoot);
  const versionJsonPath = path.join(planDir, "version.json");
  if (!(await fileExists(versionJsonPath))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Missing version.json in plan dir: ${path.relative(opts.gitRoot, versionJsonPath)}`,
    });
  }
  const plan = parseVersionPlan(await readJsonFile(versionJsonPath));
  const changesJsonPath = path.join(planDir, "changes.json");
  const changes = (await fileExists(changesJsonPath))
    ? await readJsonFile<PlanChange[]>(changesJsonPath)
    : [];
  return {
    planDir,
    versionJsonPath,
    plan,
    changes,
    minBullets: Math.max(1, Array.isArray(changes) ? changes.length : 0),
  };
}
