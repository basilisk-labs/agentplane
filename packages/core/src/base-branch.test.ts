import { execFile } from "node:child_process";
import { mkdir, mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { getBaseBranch, getPinnedBaseBranch, saveConfig, setPinnedBaseBranch } from "./index.js";

const execFileAsync = promisify(execFile);

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-base-branch-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
}

describe("base-branch", () => {
  it("returns default base branch when not pinned", async () => {
    const root = await mkGitRepoRoot();
    const base = await getBaseBranch({ cwd: root, rootOverride: root });
    expect(base).toBe("main");
  });

  it("reads pinned base branch from git config", async () => {
    const root = await mkGitRepoRoot();
    await setPinnedBaseBranch({ cwd: root, rootOverride: root, value: "develop" });
    const pinned = await getPinnedBaseBranch({ cwd: root, rootOverride: root });
    expect(pinned).toBe("develop");
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
      base_branch: "release",
      paths: {
        agents_dir: ".agentplane/agents",
        agentctl_docs_path: ".agentplane/agentctl.md",
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
            "Risks",
            "Verify Steps",
            "Rollback Plan",
            "Notes",
          ],
          required_sections: ["Summary", "Scope", "Risks", "Verify Steps", "Rollback Plan"],
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
});
