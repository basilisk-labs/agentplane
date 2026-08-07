import { readdir } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { getPathKind } from "../../../fs-utils.js";

import type { InitTool } from "./model.js";

export type InitRepositoryDefaults = {
  workflow: WorkflowMode;
  tool: InitTool;
  facts: {
    gitRepository: boolean;
    remoteConfigured: boolean;
    ciSignals: string[];
    agentSurfaceSignals: string[];
  };
  decisionReasons: string[];
};

const CI_FILE_SIGNALS = [
  [".gitlab-ci.yml", "GitLab CI"],
  ["azure-pipelines.yml", "Azure Pipelines"],
  [".circleci/config.yml", "CircleCI"],
  ["Jenkinsfile", "Jenkins"],
] as const;

async function pathExists(filePath: string): Promise<boolean> {
  return (await getPathKind(filePath)) !== null;
}

async function detectGithubActions(targetRoot: string): Promise<string[]> {
  try {
    const entries = await readdir(path.join(targetRoot, ".github", "workflows"), {
      withFileTypes: true,
    });
    return entries.some((entry) => entry.isFile() && /\.(?:ya?ml)$/u.test(entry.name.toLowerCase()))
      ? ["GitHub Actions"]
      : [];
  } catch {
    return [];
  }
}

async function detectCiSignals(targetRoot: string): Promise<string[]> {
  const signals = await detectGithubActions(targetRoot);
  for (const [relativePath, label] of CI_FILE_SIGNALS) {
    if (await pathExists(path.join(targetRoot, relativePath))) signals.push(label);
  }
  return signals;
}

async function detectRemoteConfigured(
  targetRoot: string,
  gitRepository: boolean,
): Promise<boolean> {
  if (!gitRepository) return false;
  try {
    const { stdout } = await execFileAsync("git", ["remote"], {
      cwd: targetRoot,
      env: gitEnv(),
    });
    return stdout
      .split("\n")
      .map((value) => value.trim())
      .some(Boolean);
  } catch {
    return false;
  }
}

async function detectAgentSurfaceSignals(targetRoot: string): Promise<string[]> {
  const candidates = [
    ["CLAUDE.md", "Claude Code"],
    [".cursor", "Cursor"],
    [".windsurf", "Windsurf"],
    ["AGENTS.md", "Codex"],
  ] as const;
  const signals: string[] = [];
  for (const [relativePath, label] of candidates) {
    if (await pathExists(path.join(targetRoot, relativePath))) signals.push(label);
  }
  return signals;
}

function suggestedTool(signals: string[]): InitTool {
  const unique = [...new Set(signals)];
  if (unique.length > 1) return "multiple";
  if (unique[0] === "Claude Code") return "claude";
  if (unique[0] === "Cursor") return "cursor";
  if (unique[0] === "Windsurf") return "windsurf";
  return "codex";
}

export async function detectInitRepositoryDefaults(
  targetRoot: string,
): Promise<InitRepositoryDefaults> {
  const gitRepository = (await getPathKind(path.join(targetRoot, ".git"))) !== null;
  const [ciSignals, agentSurfaceSignals, remoteConfigured] = await Promise.all([
    detectCiSignals(targetRoot),
    detectAgentSurfaceSignals(targetRoot),
    detectRemoteConfigured(targetRoot, gitRepository),
  ]);
  const isolationSignals = [
    ...(remoteConfigured ? ["a configured Git remote"] : []),
    ...ciSignals.map((signal) => `${signal} CI`),
  ];
  const workflow: WorkflowMode = isolationSignals.length > 0 ? "branch_pr" : "direct";
  const tool = suggestedTool(agentSurfaceSignals);
  const workflowReason =
    isolationSignals.length > 0
      ? `Repository facts: detected ${isolationSignals.join(" and ")}; branch_pr is the safe default for isolated review.`
      : "Repository facts: no Git remote or CI configuration was detected; direct is the safe first-run fallback.";
  const toolReason =
    agentSurfaceSignals.length > 0
      ? `Repository facts: detected ${agentSurfaceSignals.join(" and ")} policy surfaces; ${tool} is the suggested agent default.`
      : "Repository facts: no agent-specific policy surface was detected; codex is the portable agent default.";

  return {
    workflow,
    tool,
    facts: { gitRepository, remoteConfigured, ciSignals, agentSurfaceSignals },
    decisionReasons: [workflowReason, toolReason],
  };
}
