import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { TaskBackendCapabilities } from "../../backends/task-backend.js";

import { defaultConfig } from "@agentplaneorg/core";
import { afterEach, describe, expect, it } from "vitest";

import { resolveHarnessContract } from "./resolve.js";

const tempDirs = new Set<string>();

async function makeRepo(): Promise<{ gitRoot: string; agentplaneDir: string }> {
  const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-harness-"));
  tempDirs.add(gitRoot);
  await mkdir(path.join(gitRoot, ".git"), { recursive: true });
  await mkdir(path.join(gitRoot, ".agentplane", "agents"), { recursive: true });
  return { gitRoot, agentplaneDir: path.join(gitRoot, ".agentplane") };
}

afterEach(async () => {
  const dirs = [...tempDirs];
  tempDirs.clear();
  await Promise.all(dirs.map(async (dir) => rm(dir, { recursive: true, force: true })));
});

function makeCapabilities(): TaskBackendCapabilities {
  return {
    canonical_source: "remote",
    projection: "cache",
    projection_read_mode: "native",
    reads_from_projection_by_default: false,
    writes_task_readmes: true,
    supports_task_revisions: true,
    supports_revision_guarded_writes: true,
    may_access_network_on_read: true,
    may_access_network_on_write: true,
    supports_projection_refresh: true,
    supports_push_sync: true,
    supports_snapshot_export: true,
  };
}

describe("resolveHarnessContract", () => {
  it("collects repo, policy gateway, config, and backend invariants into one contract", async () => {
    const project = await makeRepo();
    await writeFile(path.join(project.gitRoot, "AGENTS.md"), "# Repo policy\n");

    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.execution.profile = "conservative";
    config.tasks_backend.config_path = ".agentplane/backends/custom/backend.json";
    config.paths.agents_dir = ".agentplane/custom-agents";

    const harness = await resolveHarnessContract({
      project,
      config,
      backendId: "redmine",
      backendConfigPath: config.tasks_backend.config_path,
      backendCapabilities: makeCapabilities(),
    });

    expect(harness.repo.policy_gateway.fileName).toBe("AGENTS.md");
    expect(harness.workflow.mode).toBe("branch_pr");
    expect(harness.workflow.paths.agents_dir).toBe(".agentplane/custom-agents");
    expect(harness.task.doc_sections).toContain("Plan");
    expect(harness.backend.restrictions.may_access_network_on_write).toBe(true);
    expect(harness.policy.approvals.require_network).toBe(true);
    expect(harness.policy.protected_paths.policy).toContain(".agentplane/custom-agents");
    expect(harness.policy.protected_paths.config).toContain(
      ".agentplane/backends/custom/backend.json",
    );
    expect(harness.trace.policy_gateway).toEqual([{ id: "policy_gateway", detail: "AGENTS.md" }]);
    expect(harness.trace.approval_requirements).toEqual([
      { id: "config", detail: ".agentplane/config.json" },
      { id: "execution_profile", detail: "conservative" },
    ]);
  });

  it("deduplicates protected path prefixes when config stays on default paths", async () => {
    const project = await makeRepo();
    await writeFile(path.join(project.gitRoot, "CLAUDE.md"), "# Claude policy\n");

    const config = defaultConfig();
    const harness = await resolveHarnessContract({
      project,
      config,
      backendId: "local",
      backendConfigPath: config.tasks_backend.config_path,
      backendCapabilities: null,
      fallbackPolicyGatewayFlavor: "claude",
    });

    expect(harness.repo.policy_gateway.fileName).toBe("CLAUDE.md");
    expect(harness.policy.protected_paths.config).toEqual([
      ".agentplane/backends",
      ".agentplane/backends/local",
      ".agentplane/backends/local/backend.json",
      ".agentplane/config.json",
    ]);
    expect(harness.trace.protected_paths).toEqual([
      { id: "config", detail: ".agentplane/config.json" },
      { id: "builtin", detail: "shared protected path defaults" },
      { id: "policy_gateway", detail: "CLAUDE.md" },
      { id: "backend", detail: ".agentplane/backends/local/backend.json" },
    ]);
  });
});
