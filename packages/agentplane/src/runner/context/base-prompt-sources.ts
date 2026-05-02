import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

import { loadAgentTemplates, loadPolicyGatewayTemplate } from "../../agents/agents-template.js";
import { fileExists } from "../../cli/fs-utils.js";
import { resolveBehavior, type BehaviorCandidate } from "../../runtime/behavior/index.js";
import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import {
  resolvePolicyGatewayForRepo,
  type PolicyGatewayFlavor,
} from "../../shared/policy-gateway.js";
import type { RunnerPromptBlock } from "../types.js";
import {
  BASE_PROMPT_PRIORITIES,
  normalizeText,
  promptBlockFromResolved,
  promptCandidate,
  toPromptSource,
  type PromptSourcePayload,
  type PromptSourceTraceMetadata,
  type ResolvedPromptSource,
  validateJsonPrompt,
} from "./prompt-block-shared.js";

type CachedDirEntries = {
  mtimeMs: number;
  size: number;
  entries: string[];
};

type CachedTextFile = {
  mtimeMs: number;
  size: number;
  text: string;
};

const dirEntriesCache = new Map<string, CachedDirEntries>();
const textFileCache = new Map<string, CachedTextFile>();

async function readDirEntriesCached(dirPath: string): Promise<string[]> {
  const stats = await stat(dirPath);
  const cached = dirEntriesCache.get(dirPath);
  if (cached?.mtimeMs === stats.mtimeMs && cached.size === stats.size) {
    return cached.entries;
  }

  const entries = await readdir(dirPath);
  dirEntriesCache.set(dirPath, { mtimeMs: stats.mtimeMs, size: stats.size, entries });
  return entries;
}

async function readTextFileCached(absPath: string): Promise<string> {
  const stats = await stat(absPath);
  const cached = textFileCache.get(absPath);
  if (cached?.mtimeMs === stats.mtimeMs && cached.size === stats.size) {
    return cached.text;
  }

  const text = await readFile(absPath, "utf8");
  textFileCache.set(absPath, { mtimeMs: stats.mtimeMs, size: stats.size, text });
  return text;
}

async function resolveRepoAgentProfilePath(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<string | null> {
  const agentsDir = path.join(opts.git_root, opts.agents_dir);
  if (!(await fileExists(agentsDir))) return null;

  const entries = await readDirEntriesCached(agentsDir);
  const wanted = `${opts.owner_id}.json`.toLowerCase();
  const match = entries.find((entry) => entry.endsWith(".json") && entry.toLowerCase() === wanted);
  if (!match) return null;
  return path.join(agentsDir, match);
}

export async function resolveOwnerProfilePromptSource(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<ResolvedPromptSource> {
  const candidates: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>[] = [];
  const repoProfilePath = await resolveRepoAgentProfilePath(opts);
  if (repoProfilePath) {
    const source = toPromptSource(opts.git_root, repoProfilePath);
    candidates.push(
      promptCandidate({
        layer: "user",
        source,
        value: {
          source,
          title: `Owner Agent Profile (${opts.owner_id})`,
          content: validateJsonPrompt(source, await readTextFileCached(repoProfilePath)),
        },
      }),
    );
  }

  const bundledFileName = `${opts.owner_id}.json`;
  const bundledTemplates = await loadAgentTemplates();
  const bundled = bundledTemplates.find(
    (entry) => entry.fileName.toLowerCase() === bundledFileName.toLowerCase(),
  );
  if (!bundled) {
    throw new Error(`Bundled agent profile not found: ${bundledFileName}`);
  }

  candidates.push(
    promptCandidate({
      layer: "builtin",
      source: `bundled:agent-profile:${bundled.fileName}`,
      value: {
        source: `bundled:agent-profile:${bundled.fileName}`,
        title: `Owner Agent Profile (${opts.owner_id})`,
        content: validateJsonPrompt(`bundled:agent-profile:${bundled.fileName}`, bundled.contents),
      },
      order: 10,
    }),
  );

  return resolveBehavior({
    key: `runner.owner_profile:${opts.owner_id}`,
    candidates,
  });
}

export async function loadOwnerProfilePrompt(opts: {
  git_root: string;
  agents_dir: string;
  owner_id: string;
}): Promise<RunnerPromptBlock> {
  const resolved = await resolveOwnerProfilePromptSource(opts);
  return promptBlockFromResolved({
    id: "base.owner_profile",
    role: "profile",
    priority: BASE_PROMPT_PRIORITIES.owner_profile,
    resolved,
  });
}

export async function resolvePolicyGatewayPromptSource(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
  harness?: ResolvedHarnessContract;
}): Promise<ResolvedPromptSource> {
  const gateway =
    opts.harness?.repo.policy_gateway ??
    (await resolvePolicyGatewayForRepo({
      gitRoot: opts.git_root,
      fallbackFlavor: opts.fallback_flavor,
    }));
  const candidates: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>[] = [];

  if (await fileExists(gateway.absPath)) {
    const source = path.relative(opts.git_root, gateway.absPath).replaceAll("\\", "/");
    candidates.push(
      promptCandidate({
        layer: "harness",
        source,
        value: {
          source,
          title: `Repository Policy Gateway (${gateway.fileName})`,
          content: normalizeText(await readTextFileCached(gateway.absPath)),
        },
      }),
    );
  }

  candidates.push(
    promptCandidate({
      layer: "builtin",
      source: `bundled:policy-gateway:${gateway.fileName}`,
      value: {
        source: `bundled:policy-gateway:${gateway.fileName}`,
        title: `Bundled Policy Gateway Fallback (${gateway.fileName})`,
        content: await loadPolicyGatewayTemplate(gateway.flavor),
      },
      order: 10,
    }),
  );

  return resolveBehavior({
    key: `runner.policy_gateway:${gateway.fileName}`,
    candidates,
  });
}

export async function loadPolicyGatewayPrompt(opts: {
  git_root: string;
  fallback_flavor: PolicyGatewayFlavor;
  harness?: ResolvedHarnessContract;
}): Promise<RunnerPromptBlock> {
  const resolved = await resolvePolicyGatewayPromptSource(opts);
  return promptBlockFromResolved({
    id: "base.policy_gateway",
    role: "policy",
    priority: BASE_PROMPT_PRIORITIES.policy_gateway,
    resolved,
  });
}

export async function loadUserInstructionsPrompt(opts: {
  git_root: string;
}): Promise<RunnerPromptBlock | null> {
  const absPath = path.join(opts.git_root, ".agentplane", "user-instructions.md");
  if (!(await fileExists(absPath))) return null;
  const content = normalizeText(await readTextFileCached(absPath));
  if (!content.trim()) return null;
  return {
    id: "gateway.user.instructions",
    role: "policy",
    title: "User Instructions",
    source: ".agentplane/user-instructions.md",
    priority: BASE_PROMPT_PRIORITIES.user_instructions,
    content,
  };
}

function renderExecutionProfilePromptContent(runtime: ResolvedExecutionProfileRuntime): string {
  return JSON.stringify(
    {
      profile: runtime.profile,
      reasoning_effort: runtime.reasoning_effort,
      text_verbosity: runtime.text_verbosity,
      budget: runtime.budget,
      approvals: runtime.approvals,
      stop_conditions: runtime.stop_conditions,
      handoff_conditions: runtime.handoff_conditions,
      unsafe_actions_requiring_explicit_user_ok: runtime.unsafe_actions_requiring_explicit_user_ok,
      runner: runtime.runner,
    },
    null,
    2,
  );
}

export function loadExecutionProfilePrompt(opts: {
  execution_profile?: ResolvedExecutionProfileRuntime;
}): RunnerPromptBlock | null {
  if (!opts.execution_profile) return null;
  const source = `runtime:execution-profile:${opts.execution_profile.profile}`;
  const resolved = resolveBehavior({
    key: "runner.execution_profile",
    candidates: [
      promptCandidate({
        layer: "harness",
        source,
        value: {
          source,
          title: `Execution Profile Runtime (${opts.execution_profile.profile})`,
          content: normalizeText(renderExecutionProfilePromptContent(opts.execution_profile)),
        },
      }),
    ],
  });

  return promptBlockFromResolved({
    id: "base.execution_profile",
    role: "policy",
    priority: BASE_PROMPT_PRIORITIES.execution_profile,
    resolved,
  });
}

export { loadFrameworkRunnerPrompt } from "./prompt-block-shared.js";
