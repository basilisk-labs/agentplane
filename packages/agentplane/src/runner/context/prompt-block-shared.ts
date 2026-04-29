import { readFile } from "node:fs/promises";

import {
  resolveBehavior,
  stripBehaviorValue,
  type BehaviorCandidate,
  type ResolvedBehavior,
} from "../../runtime/behavior/index.js";
import type { RunnerPromptBlock, RunnerPromptRole } from "../types.js";
import { renderMarkdownPromptTemplate } from "../../agents/agents-template.js";
import { resolveAgentplaneAssetUrl } from "../../shared/package-paths.js";

export const FRAMEWORK_RUNNER_PROMPT_URL = resolveAgentplaneAssetUrl("RUNNER.md");

let frameworkRunnerPromptCache: Promise<RunnerPromptBlock> | null = null;

export const BASE_PROMPT_PRIORITIES = {
  framework_runner: 100,
  policy_gateway: 200,
  execution_profile: 250,
  owner_profile: 300,
  recipe_execution_context: 400,
  recipe_agent_profile: 500,
  recipe_skill_context: 600,
  recipe_tools_context: 700,
} as const;

export const OVERLAY_PROMPT_PRIORITIES = {
  planning: 410,
  execution: 420,
  coding: 430,
  debugging: 440,
  review: 450,
  verification: 460,
  docs: 470,
  finish: 480,
} as const;

export function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

export function normalizeOwnerId(ownerIdRaw: string): string {
  const trimmed = ownerIdRaw.trim();
  if (!trimmed) throw new Error("Runner base prompt collection requires a non-empty owner id.");
  return trimmed.toUpperCase();
}

export function normalizeText(text: string): string {
  return ensureTrailingNewline(text.trimEnd());
}

export function validateJsonPrompt(source: string, text: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new Error(`Invalid prompt JSON: ${source} (malformed JSON)`);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid prompt JSON: ${source} (expected object)`);
  }
  return normalizeText(text);
}

export function renderRecipePromptJson(
  value: Record<string, unknown> | Record<string, unknown>[],
): string {
  return normalizeText(JSON.stringify(value, null, 2));
}

export function toPromptSource(gitRoot: string, absPath: string): string {
  return absPath.replace(`${gitRoot}/`, "").replaceAll("\\", "/");
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function readOptionalStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

export type PromptSourcePayload = {
  source: string;
  title: string;
  content: string;
};

export type PromptSourceTraceMetadata = {
  title: string;
};

export type ResolvedPromptSource = ResolvedBehavior<PromptSourcePayload, PromptSourceTraceMetadata>;

export function promptCandidate(opts: {
  layer: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>["layer"];
  source: string;
  value: PromptSourcePayload;
  order?: number;
}): BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata> {
  return {
    layer: opts.layer,
    source: opts.source,
    value: opts.value,
    order: opts.order,
    metadata: {
      title: opts.value.title,
    },
  };
}

export function promptBlockFromResolved(opts: {
  id: string;
  role: RunnerPromptRole;
  priority: number;
  resolved: ResolvedPromptSource;
}): RunnerPromptBlock {
  return {
    id: opts.id,
    role: opts.role,
    title: opts.resolved.value.title,
    source: opts.resolved.value.source,
    priority: opts.priority,
    content: opts.resolved.value.content,
    resolution: stripBehaviorValue(opts.resolved),
  };
}

async function readFrameworkRunnerPrompt(): Promise<RunnerPromptBlock> {
  const resolved = resolveBehavior({
    key: "runner.framework_prompt",
    candidates: [
      promptCandidate({
        layer: "builtin",
        source: "bundled:runner-prompt:RUNNER.md",
        value: {
          source: "bundled:runner-prompt:RUNNER.md",
          title: "Framework Runner Prompt",
          content: renderMarkdownPromptTemplate(
            await readFile(FRAMEWORK_RUNNER_PROMPT_URL, "utf8"),
            {
              source_ref: "packages/agentplane/assets/RUNNER.md",
              fallback_id: "runner.bundle.file.framework_runner",
            },
          ).contents,
        },
      }),
    ],
  });

  return promptBlockFromResolved({
    id: "base.framework_runner",
    role: "system",
    priority: BASE_PROMPT_PRIORITIES.framework_runner,
    resolved,
  });
}

export async function loadFrameworkRunnerPrompt(): Promise<RunnerPromptBlock> {
  frameworkRunnerPromptCache ??= readFrameworkRunnerPrompt();
  return frameworkRunnerPromptCache;
}
