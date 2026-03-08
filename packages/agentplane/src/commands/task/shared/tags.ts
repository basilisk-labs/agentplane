import { readdir } from "node:fs/promises";
import path from "node:path";

import type { AgentplaneConfig } from "@agentplaneorg/core";

import { fileExists } from "../../../cli/fs-utils.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { invalidValueMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { isRecord } from "../../../shared/guards.js";
import type { CommandContext } from "../../shared/task-backend.js";

async function listAgentIdsMemo(ctx: CommandContext): Promise<string[]> {
  ctx.memo.agentIds ??= (async () => {
    const agentsDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.agents_dir);
    if (!(await fileExists(agentsDir))) return [];

    const entries = await readdir(agentsDir);
    return entries
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.slice(0, -".json".length))
      .map((id) => id.trim())
      .filter((id) => id.length > 0);
  })();
  return await ctx.memo.agentIds;
}

export function normalizeDependsOnInput(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "[]") return [];
  return [trimmed];
}

const ALLOWED_TASK_STATUSES = new Set(["TODO", "DOING", "DONE", "BLOCKED"]);

export function normalizeTaskStatus(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (!ALLOWED_TASK_STATUSES.has(normalized)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage(
        "status",
        value,
        `one of ${[...ALLOWED_TASK_STATUSES].join(", ")}`,
      ),
    });
  }
  return normalized;
}

export function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim());
}

export function requiresVerify(tags: string[], requiredTags: string[]): boolean {
  const required = new Set(requiredTags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  if (required.size === 0) return false;
  return tags.some((tag) => required.has(tag.trim().toLowerCase()));
}

export type PrimaryTagResolution = {
  primary: string;
  matched: string[];
  usedFallback: boolean;
};

export type TaskTagPolicy = {
  primaryAllowlist: string[];
  strictPrimary: boolean;
  fallbackPrimary: string;
  lockPrimaryOnUpdate: boolean;
};

type RawVerifyPolicy = {
  require_steps_for_primary?: unknown;
  require_verification_for_primary?: unknown;
  require_steps_for_tags?: unknown;
  required_tags?: unknown;
};

type RawTaskTags = {
  primary_allowlist?: unknown;
  strict_primary?: unknown;
  fallback_primary?: unknown;
  lock_primary_on_update?: unknown;
};

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function readString(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function configFromInput(input: CommandContext | AgentplaneConfig): AgentplaneConfig {
  return "config" in input ? input.config : input;
}

export function readTaskTagPolicy(input: CommandContext | AgentplaneConfig): TaskTagPolicy {
  const config = configFromInput(input);
  const tasks: Record<string, unknown> = isRecord(config.tasks) ? config.tasks : {};
  const rawTagsCandidate = tasks.tags;
  const rawTags: RawTaskTags = isRecord(rawTagsCandidate) ? (rawTagsCandidate as RawTaskTags) : {};
  const fallbackAllowlist = ["code", "data", "research", "docs", "ops", "product", "meta"];
  const normalizedAllowlist = dedupeStrings(
    readStringArray(rawTags.primary_allowlist)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );

  return {
    primaryAllowlist: normalizedAllowlist.length > 0 ? normalizedAllowlist : fallbackAllowlist,
    strictPrimary: readBoolean(rawTags.strict_primary, false),
    fallbackPrimary: readString(rawTags.fallback_primary, "meta").toLowerCase(),
    lockPrimaryOnUpdate: readBoolean(rawTags.lock_primary_on_update, true),
  };
}

function readVerifyPrimaryPolicy(config: AgentplaneConfig): {
  requireStepsForPrimary: Set<string>;
  requireVerificationForPrimary: Set<string>;
} {
  const tasks: Record<string, unknown> = isRecord(config.tasks) ? config.tasks : {};
  const rawVerifyCandidate = tasks.verify;
  const rawVerify: RawVerifyPolicy = isRecord(rawVerifyCandidate)
    ? (rawVerifyCandidate as RawVerifyPolicy)
    : {};

  const explicitSteps = dedupeStrings(
    readStringArray(rawVerify.require_steps_for_primary)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const legacySteps = dedupeStrings(
    readStringArray(rawVerify.require_steps_for_tags ?? rawVerify.required_tags)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const requireStepsForPrimary = new Set(explicitSteps.length > 0 ? explicitSteps : legacySteps);

  const explicitVerification = dedupeStrings(
    readStringArray(rawVerify.require_verification_for_primary)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const requireVerificationForPrimary = new Set(
    explicitVerification.length > 0 ? explicitVerification : [...requireStepsForPrimary.values()],
  );

  return { requireStepsForPrimary, requireVerificationForPrimary };
}

export function resolvePrimaryTagFromConfig(
  tags: string[],
  config: AgentplaneConfig,
): PrimaryTagResolution {
  const policy = readTaskTagPolicy(config);
  const allowlist = policy.primaryAllowlist;
  if (allowlist.length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "tasks.tags.primary_allowlist must contain at least one tag.",
    });
  }

  const normalizedTags = dedupeStrings(tags.map((t) => t.trim().toLowerCase()).filter(Boolean));
  const matched = normalizedTags.filter((tag) => allowlist.includes(tag));
  if (matched.length > 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        `Task must include exactly one primary tag from allowlist (${allowlist.join(", ")}); ` +
        `found multiple: ${matched.join(", ")}`,
    });
  }
  if (matched.length === 1) {
    return { primary: matched[0], matched, usedFallback: false };
  }

  if (policy.strictPrimary) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        `Task must include exactly one primary tag from allowlist (${allowlist.join(", ")}); ` +
        "none found and strict_primary=true",
    });
  }

  const fallback = policy.fallbackPrimary;
  if (!fallback || !allowlist.includes(fallback)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `tasks.tags.fallback_primary=${JSON.stringify(policy.fallbackPrimary)} ` +
        `must be present in tasks.tags.primary_allowlist (${allowlist.join(", ")}).`,
    });
  }
  return { primary: fallback, matched, usedFallback: true };
}

export function requiresVerifyStepsByPrimary(tags: string[], config: AgentplaneConfig): boolean {
  const primary = resolvePrimaryTagFromConfig(tags, config).primary;
  return readVerifyPrimaryPolicy(config).requireStepsForPrimary.has(primary);
}

export function requiresVerificationByPrimary(tags: string[], config: AgentplaneConfig): boolean {
  const primary = resolvePrimaryTagFromConfig(tags, config).primary;
  return readVerifyPrimaryPolicy(config).requireVerificationForPrimary.has(primary);
}

export function resolvePrimaryTag(tags: string[], ctx: CommandContext): PrimaryTagResolution {
  return resolvePrimaryTagFromConfig(tags, ctx.config);
}

export async function warnIfUnknownOwner(ctx: CommandContext, owner: string): Promise<void> {
  const trimmed = owner.trim();
  if (!trimmed) return;

  const ids = await listAgentIdsMemo(ctx);
  if (ids.length === 0) return;
  if (ids.includes(trimmed)) return;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `unknown task owner id: ${trimmed} (not found under ${ctx.config.paths.agents_dir}; ` +
      `pick an existing agent id or create ${ctx.config.paths.agents_dir}/${trimmed}.json)`,
  });
}
