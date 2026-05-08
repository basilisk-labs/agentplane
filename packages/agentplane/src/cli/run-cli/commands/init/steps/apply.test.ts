import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  filterAgentsByWorkflow,
  loadPolicyGatewayTemplate,
} from "../../../../../agents/agents-template.js";
import { ensureAgentsFiles } from "../write-agents.js";
import { applyInitWithProgress, withStep } from "./apply.js";

function createSpinnerMocks() {
  const start = vi.fn();
  const stop = vi.fn();
  const message = vi.fn();
  return { start, stop, message };
}

describe("init apply wrapper", () => {
  it("runs withStep with spinner progress and success message", async () => {
    const spinner = createSpinnerMocks();
    const clack = { spinner: vi.fn(() => spinner) };

    const value = await withStep({
      clack,
      start: "Writing init config",
      success: "Wrote init config",
      failure: "Failed to write init config",
      run: (setProgress) => {
        setProgress("Writing backend stubs");
        return Promise.resolve("ok");
      },
    });

    expect(value).toBe("ok");
    expect(clack.spinner).toHaveBeenCalledTimes(1);
    expect(spinner.start).toHaveBeenCalledWith("Writing init config");
    expect(spinner.message).toHaveBeenCalledWith("Writing backend stubs");
    expect(spinner.stop).toHaveBeenCalledWith("Wrote init config");
  });

  it("stops spinner with failure message when withStep throws", async () => {
    const spinner = createSpinnerMocks();
    const clack = { spinner: vi.fn(() => spinner) };

    await expect(
      withStep({
        clack,
        start: "Creating install commit",
        success: "Created install commit",
        failure: "Failed to create install commit",
        run: () => Promise.reject(new Error("commit failed")),
      }),
    ).rejects.toThrow("commit failed");

    expect(spinner.start).toHaveBeenCalledWith("Creating install commit");
    expect(spinner.stop).toHaveBeenCalledWith("Failed to create install commit");
  });

  it("applies init writers in order and forwards install paths to commit step", async () => {
    const calls: string[] = [];

    const config = vi.fn(() => {
      calls.push("config");
      return Promise.resolve();
    });
    const agents = vi.fn(() => {
      calls.push("agents");
      return Promise.resolve([".agentplane/agents/CODER.md"]);
    });
    const workflow = vi.fn(() => {
      calls.push("workflow");
      return Promise.resolve([".github/workflows/agentplane.yml"]);
    });
    const gitignore = vi.fn(() => {
      calls.push("gitignore");
      return Promise.resolve([".gitignore"]);
    });
    const hooks = vi.fn(() => {
      calls.push("hooks");
      return Promise.resolve([".agentplane/bin/agentplane"]);
    });
    const ideSync = vi.fn(() => {
      calls.push("ide");
      return Promise.resolve([".cursor/rules/agentplane.mdc"]);
    });
    const recipes = vi.fn(() => {
      calls.push("recipes");
      return Promise.resolve();
    });
    const blueprints = vi.fn(() => {
      calls.push("blueprints");
      return Promise.resolve([".agentplane/blueprints/analysis.external.json"]);
    });
    const installCommit = vi.fn(() => {
      calls.push("commit");
      return Promise.resolve();
    });

    const result = await applyInitWithProgress({
      plan: {
        config,
        agents,
        workflow,
        gitignore,
        hooks,
        ideSync,
        recipes,
        blueprints,
        installCommit,
      },
      includeInstallCommit: true,
    });

    expect(calls).toEqual([
      "config",
      "agents",
      "workflow",
      "gitignore",
      "hooks",
      "ide",
      "recipes",
      "blueprints",
      "commit",
    ]);
    expect(result.installPaths).toEqual([
      ".agentplane/agents/CODER.md",
      ".github/workflows/agentplane.yml",
      ".gitignore",
      ".agentplane/bin/agentplane",
      ".cursor/rules/agentplane.mdc",
      ".agentplane/blueprints/analysis.external.json",
    ]);
    expect(installCommit).toHaveBeenCalledWith(result.installPaths);
  });

  it("skips install commit when includeInstallCommit=false", async () => {
    const hooks = vi.fn(() => Promise.resolve([".agentplane/bin/agentplane"]));
    const installCommit = vi.fn(() => Promise.resolve());

    const result = await applyInitWithProgress({
      plan: {
        config: () => Promise.resolve(),
        agents: () => Promise.resolve([]),
        workflow: () => Promise.resolve([]),
        gitignore: () => Promise.resolve([".gitignore"]),
        ideSync: () => Promise.resolve([]),
        recipes: () => Promise.resolve(),
        blueprints: () => Promise.resolve(),
        hooks,
        installCommit,
      },
      includeInstallCommit: false,
    });

    expect(result.installPaths).toEqual([".gitignore", ".agentplane/bin/agentplane"]);
    expect(hooks).toHaveBeenCalledTimes(1);
    expect(installCommit).not.toHaveBeenCalled();
  });

  it("installs gateway, agent profile, and policy files from compiled prompt modules", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-init-modules-"));
    try {
      const agentplaneDir = path.join(root, ".agentplane");
      const agentsDir = path.join(agentplaneDir, "agents");
      const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
      const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
      await mkdir(agentsDir, { recursive: true });
      await mkdir(path.dirname(backendPath), { recursive: true });

      const result = await ensureAgentsFiles({
        gitRoot: root,
        agentplaneDir,
        workflow: "branch_pr",
        policyGateway: "claude",
        workflowPathAbs: workflowPath,
        backendPathAbs: backendPath,
      });

      const gatewayPath = path.join(root, "CLAUDE.md");
      const gateway = await readFile(gatewayPath, "utf8");
      const expectedGateway = filterAgentsByWorkflow(
        await loadPolicyGatewayTemplate("claude"),
        "branch_pr",
      );
      const directPolicyPath = path.join(agentplaneDir, "policy", "workflow.direct.md");
      const branchPolicyPath = path.join(agentplaneDir, "policy", "workflow.branch_pr.md");
      const coderPath = path.join(agentplaneDir, "agents", "CODER.json");
      const branchPolicy = await readFile(branchPolicyPath, "utf8");
      const coderProfile = await readFile(coderPath, "utf8");
      const parsedCoderProfile = JSON.parse(coderProfile) as { id?: unknown };
      const gatewayBaseline = await readFile(
        path.join(agentplaneDir, ".upgrade", "baseline", "CLAUDE.md"),
        "utf8",
      );
      const coderProfileBaseline = await readFile(
        path.join(agentplaneDir, ".upgrade", "baseline", "agents", "CODER.json"),
        "utf8",
      );
      const branchPolicyBaseline = await readFile(
        path.join(agentplaneDir, ".upgrade", "baseline", "policy", "workflow.branch_pr.md"),
        "utf8",
      );
      const directPolicyBaseline = await readFile(
        path.join(agentplaneDir, ".upgrade", "baseline", "policy", "workflow.direct.md"),
        "utf8",
      );

      expect(result.installPaths).toContain("CLAUDE.md");
      expect(result.installPaths).toContain(".agentplane/agents/CODER.json");
      expect(result.installPaths).toContain(".agentplane/policy/workflow.branch_pr.md");
      expect(await readFile(directPolicyPath, "utf8")).toContain("# Workflow: direct");
      expect(gateway).toBe(expectedGateway);
      expect(gateway).toContain("CLAUDE.md");
      expect(gateway).not.toContain("ap:fragment");
      expect(gateway).not.toContain("## A) direct mode (single checkout)");
      expect(parsedCoderProfile.id).toBe("CODER");
      expect(branchPolicy).toContain("# Workflow: branch_pr");
      expect(branchPolicy).not.toContain("ap:fragment");
      expect(gatewayBaseline).toBe(gateway);
      expect(coderProfileBaseline).toBe(coderProfile);
      expect(branchPolicyBaseline).toBe(branchPolicy);
      expect(directPolicyBaseline).toBe(await readFile(directPolicyPath, "utf8"));
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
