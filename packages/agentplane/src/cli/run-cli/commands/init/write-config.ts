import { mkdir } from "node:fs/promises";
import path from "node:path";

import { defaultConfig, saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { writeJsonStableIfChanged } from "../../../../shared/write-if-changed.js";

export async function ensureAgentplaneDirs(agentplaneDir: string): Promise<void> {
  await mkdir(agentplaneDir, { recursive: true });
  await mkdir(path.join(agentplaneDir, "tasks"), { recursive: true });
  await mkdir(path.join(agentplaneDir, "agents"), { recursive: true });
  await mkdir(path.join(agentplaneDir, "cache"), { recursive: true });
  await mkdir(path.join(agentplaneDir, "backends", "local"), { recursive: true });
  await mkdir(path.join(agentplaneDir, "backends", "redmine"), { recursive: true });
}

export async function writeInitConfig(opts: {
  agentplaneDir: string;
  gitRoot: string;
  workflow: "direct" | "branch_pr";
  backendConfigPathAbs: string;
  requirePlanApproval: boolean;
  requireNetworkApproval: boolean;
  requireVerifyApproval: boolean;
}): Promise<void> {
  const rawConfig = defaultConfig() as unknown as Record<string, unknown>;
  setByDottedKey(rawConfig, "workflow_mode", opts.workflow);
  setByDottedKey(
    rawConfig,
    "tasks_backend.config_path",
    path.relative(opts.gitRoot, opts.backendConfigPathAbs),
  );
  setByDottedKey(rawConfig, "agents.approvals.require_plan", String(opts.requirePlanApproval));
  setByDottedKey(
    rawConfig,
    "agents.approvals.require_network",
    String(opts.requireNetworkApproval),
  );
  setByDottedKey(rawConfig, "agents.approvals.require_verify", String(opts.requireVerifyApproval));
  await saveConfig(opts.agentplaneDir, rawConfig);
}

export async function writeBackendStubs(opts: {
  localBackendPath: string;
  redmineBackendPath: string;
}): Promise<void> {
  const localBackendPayload = {
    id: "local",
    version: 1,
    module: "backend.py",
    class: "LocalBackend",
    settings: { dir: ".agentplane/tasks" },
  };
  const redmineBackendPayload = {
    id: "redmine",
    version: 1,
    module: "backend.py",
    class: "RedmineBackend",
    settings: {
      url: "https://redmine.example",
      api_key: "replace-me",
      project_id: "replace-me",
      owner_agent: "REDMINE",
      custom_fields: { task_id: 1 },
    },
  };
  await writeJsonStableIfChanged(opts.localBackendPath, localBackendPayload);
  await writeJsonStableIfChanged(opts.redmineBackendPath, redmineBackendPayload);
}
