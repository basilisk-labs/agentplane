import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadAgentTemplates, loadPolicyGatewayTemplate } from "../../agents/agents-template.js";
import { fileExists } from "../../cli/fs-utils.js";
import {
  resolvePolicyGatewayForRepo,
  type PolicyGatewayFlavor,
} from "../../shared/policy-gateway.js";
import type { RunnerPromptBlock } from "../types.js";

const BASE_PROMPT_PRIORITIES = {
  policy_gateway: 200,
  owner_profile: 300,
} as const;

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function normalizeOwnerId(ownerIdRaw: string): string {
  const trimmed = ownerIdRaw.trim();
  if (!trimmed) throw new Error("Runner base prompt collection requires a non-empty owner id.");
  return trimmed.toUpperCase();
}

function normalizeText(text: string): string {
  return ensureTrailingNewline(text.trimEnd());
}

function validateAgentProfileJson(source: string, text: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new Error(`Invalid agent profile JSON: ${source} (malformed JSON)`);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid agent profile JSON: ${source} (expected object)`);
  }
  return normalizeText(text);
}

async function resolveRepoAgentProfilePath(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<string | null> {
  const agentsDir = path.join(opts.git_root, opts.agents_dir);
  if (!(await fileExists(agentsDir))) return null;

  const entries = await readdir(agentsDir);
  const wanted = `${opts.owner_id}.json`.toLowerCase();
  const match = entries.find((entry) => entry.endsWith(".json") && entry.toLowerCase() === wanted);
  if (!match) return null;
  return path.join(agentsDir, match);
}

async function loadOwnerProfilePrompt(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<RunnerPromptBlock> {
  const repoProfilePath = await resolveRepoAgentProfilePath(opts);
  if (repoProfilePath) {
    const source = path.relative(opts.git_root, repoProfilePath).replaceAll("\\", "/");
    const content = validateAgentProfileJson(source, await readFile(repoProfilePath, "utf8"));
    return {
      id: "base.owner_profile",
      role: "profile",
      title: `Owner Agent Profile (${opts.owner_id})`,
      source,
      priority: BASE_PROMPT_PRIORITIES.owner_profile,
      content,
    };
  }

  const bundledFileName = `${opts.owner_id}.json`;
  const bundledTemplates = await loadAgentTemplates();
  const bundled = bundledTemplates.find(
    (entry) => entry.fileName.toLowerCase() === bundledFileName.toLowerCase(),
  );
  if (!bundled) {
    throw new Error(`Bundled agent profile not found: ${bundledFileName}`);
  }

  return {
    id: "base.owner_profile",
    role: "profile",
    title: `Owner Agent Profile (${opts.owner_id})`,
    source: `bundled:agent-profile:${bundled.fileName}`,
    priority: BASE_PROMPT_PRIORITIES.owner_profile,
    content: validateAgentProfileJson(
      `bundled:agent-profile:${bundled.fileName}`,
      bundled.contents,
    ),
  };
}

async function loadPolicyGatewayPrompt(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
}): Promise<RunnerPromptBlock> {
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: opts.git_root,
    fallbackFlavor: opts.fallback_flavor,
  });

  if (await fileExists(gateway.absPath)) {
    const source = path.relative(opts.git_root, gateway.absPath).replaceAll("\\", "/");
    return {
      id: "base.policy_gateway",
      role: "policy",
      title: `Repository Policy Gateway (${gateway.fileName})`,
      source,
      priority: BASE_PROMPT_PRIORITIES.policy_gateway,
      content: normalizeText(await readFile(gateway.absPath, "utf8")),
    };
  }

  return {
    id: "base.policy_gateway",
    role: "policy",
    title: `Bundled Policy Gateway Fallback (${gateway.fileName})`,
    source: `bundled:policy-gateway:${gateway.fileName}`,
    priority: BASE_PROMPT_PRIORITIES.policy_gateway,
    content: await loadPolicyGatewayTemplate(gateway.flavor),
  };
}

export async function collectRunnerBasePrompts(opts: {
  git_root: string;
  owner_id: string;
  agents_dir?: string;
  fallback_policy_gateway_flavor?: PolicyGatewayFlavor;
}): Promise<RunnerPromptBlock[]> {
  const owner_id = normalizeOwnerId(opts.owner_id);
  const trimmedAgentsDir = opts.agents_dir?.trim();
  const agents_dir =
    trimmedAgentsDir && trimmedAgentsDir.length > 0 ? trimmedAgentsDir : ".agentplane/agents";
  const fallback_flavor = opts.fallback_policy_gateway_flavor ?? "codex";

  const prompts = await Promise.all([
    loadPolicyGatewayPrompt({ git_root: opts.git_root, fallback_flavor }),
    loadOwnerProfilePrompt({ git_root: opts.git_root, agents_dir, owner_id }),
  ]);

  return prompts.toSorted((left, right) => left.priority - right.priority);
}
