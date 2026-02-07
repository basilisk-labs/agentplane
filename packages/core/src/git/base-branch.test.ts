import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  getBaseBranch,
  getPinnedBaseBranch,
  resolveBaseBranch,
  saveConfig,
  clearPinnedBaseBranch,
  setPinnedBaseBranch,
} from "../index.js";

const execFileAsync = promisify(execFile);

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-base-branch-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
}

describe("base-branch", () => {
  it("getBaseBranch rejects when base branch is not pinned", async () => {
    const root = await mkGitRepoRoot();
    await expect(getBaseBranch({ cwd: root, rootOverride: root })).rejects.toThrow(
      "base branch is not pinned",
    );
  });

  it("reads pinned base branch from git config", async () => {
    const root = await mkGitRepoRoot();
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });
    const pinned = await getPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(pinned).toBe("develop");
  });

  it("getBaseBranch prefers pinned value when present", async () => {
    const root = await mkGitRepoRoot();
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });
    const base = await getBaseBranch({ cwd: root, rootOverride: root });
    expect(base).toBe("develop");
  });

  it("resolveBaseBranch prefers explicit CLI base", async () => {
    const root = await mkGitRepoRoot();
    await execFileAsync("git", ["checkout", "-q", "-b", "feature"], { cwd: root });
    const base = await resolveBaseBranch({
      cwd: root,
      rootOverride: root,
      cliBaseOpt: "release",
      mode: "branch_pr",
    });
    expect(base).toBe("release");
  });

  it("resolveBaseBranch falls back to pinned base", async () => {
    const root = await mkGitRepoRoot();
    await execFileAsync("git", ["checkout", "-q", "-b", "feature"], { cwd: root });
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });
    const base = await resolveBaseBranch({
      cwd: root,
      rootOverride: root,
      cliBaseOpt: null,
      mode: "branch_pr",
    });
    expect(base).toBe("develop");
  });

  it("resolveBaseBranch uses current branch for branch_pr when unpinned", async () => {
    const root = await mkGitRepoRoot();
    await execFileAsync("git", ["checkout", "-q", "-b", "feature"], { cwd: root });
    const base = await resolveBaseBranch({
      cwd: root,
      rootOverride: root,
      cliBaseOpt: null,
      mode: "branch_pr",
    });
    expect(base).toBeNull();
  });

  it("resolveBaseBranch returns null in branch_pr mode when unpinned (no defaults)", async () => {
    const root = await mkGitRepoRoot();
    await execFileAsync("git", ["checkout", "-q", "-b", "main"], { cwd: root });
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync(
      "git",
      ["-c", "user.email=test@example.com", "-c", "user.name=Tester", "commit", "-m", "init"],
      { cwd: root },
    );
    await execFileAsync("git", ["checkout", "-q", "-b", "feature"], { cwd: root });
    const base = await resolveBaseBranch({
      cwd: root,
      rootOverride: root,
      cliBaseOpt: null,
      mode: "branch_pr",
    });
    expect(base).toBeNull();
  });

  it("resolveBaseBranch returns null for direct mode without explicit base", async () => {
    const root = await mkGitRepoRoot();
    const base = await resolveBaseBranch({
      cwd: root,
      rootOverride: root,
      cliBaseOpt: null,
      mode: "direct",
    });
    expect(base).toBeNull();
  });

  it("clearPinnedBaseBranch removes the pinned base", async () => {
    const root = await mkGitRepoRoot();
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });
    const cleared = await clearPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(cleared).toBe(true);
    const pinned = await getPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(pinned).toBeNull();
  });

  it("clearPinnedBaseBranch is a no-op when unset", async () => {
    const root = await mkGitRepoRoot();
    const cleared = await clearPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(cleared).toBe(false);
  });

  it("keeps pinned branch even if config exists", async () => {
    const root = await mkGitRepoRoot();
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });

    const agentplaneDir = path.join(root, ".agentplane");
    await mkdir(agentplaneDir, { recursive: true });
    await saveConfig(agentplaneDir, {
      schema_version: 1,
      workflow_mode: "direct",
      status_commit_policy: "warn",
      finish_auto_status_commit: true,
      paths: {
        agents_dir: ".agentplane/agents",
        tasks_path: ".agentplane/tasks.json",
        workflow_dir: ".agentplane/tasks",
        worktrees_dir: ".agentplane/worktrees",
      },
      branch: { task_prefix: "task" },
      framework: { source: "https://github.com/basilisk-labs/agent-plane", last_update: null },
      tasks: {
        id_suffix_length_default: 6,
        verify: { required_tags: ["code", "backend", "frontend"] },
        doc: {
          sections: [
            "Summary",
            "Context",
            "Scope",
            "Plan",
            "Risks",
            "Verification",
            "Rollback Plan",
            "Notes",
          ],
          required_sections: ["Summary", "Scope", "Plan", "Risks", "Verification", "Rollback Plan"],
        },
        comments: {
          start: { prefix: "Start:", min_chars: 40 },
          blocked: { prefix: "Blocked:", min_chars: 40 },
          verified: { prefix: "Verified:", min_chars: 60 },
        },
      },
      commit: {
        generic_tokens: ["start", "status", "mark", "done", "wip", "update", "tasks", "task"],
      },
      tasks_backend: { config_path: ".agentplane/backends/local/backend.json" },
      closure_commit_requires_approval: false,
    });

    const pinned = await getPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(pinned).toBe("develop");
  });

  it("rejects blank pinned base branch values", async () => {
    const root = await mkGitRepoRoot();
    await expect(
      setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "   " }),
    ).rejects.toThrow("base branch must be non-empty");
  });

  it("surfaces git config errors when reading pinned branch", async () => {
    const root = await mkGitRepoRoot();
    const configPath = path.join(root, ".git", "config");
    await rm(configPath);
    await mkdir(configPath);
    await expect(getPinnedBaseBranch({ cwd: root, rootOverride: root })).rejects.toThrow();
  });
});
