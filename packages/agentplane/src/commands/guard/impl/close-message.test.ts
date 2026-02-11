import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../../backends/task-backend.js";
import { nowIso } from "../../task/shared.js";

import { buildCloseCommitMessage } from "./close-message.js";

const execFileAsync = promisify(execFile);

async function git(root: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: root });
  return String(stdout ?? "").trim();
}

async function mkRepoWithImplCommit(): Promise<{ root: string; implHash: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-close-msg-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });

  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "src", "a.ts"), "a\n", "utf8");
  await writeFile(
    path.join(root, "src", "b.ts"),
    ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b"].join("\n"),
    "utf8",
  );

  // This should be excluded from Key files.
  await mkdir(path.join(root, ".agentplane", "tasks", "T-1"), { recursive: true });
  await writeFile(path.join(root, ".agentplane", "tasks", "T-1", "README.md"), "task\n", "utf8");

  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
  const implHash = await git(root, ["rev-parse", "HEAD"]);
  return { root, implHash };
}

describe("buildCloseCommitMessage", () => {
  it("builds a deterministic close commit message (non-spike) and filters task artifacts from key files", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Add close commit mode",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["code", "cli"],
      verify: ["bun run test:full"],
      verification: {
        state: "ok",
        updated_at: nowIso(),
        updated_by: "TESTER",
        note: "Verified: bun run test:full; manual: agentplane commit --close",
      },
      commit: { hash: implHash, message: "✨ R18Y1Q guard: add close commit mode" },
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "TESTER",
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task });
    expect(msg.subject).toContain("✅ R18Y1Q close:");
    expect(msg.subject).toContain("(202602081506-R18Y1Q)");
    expect(msg.subject).toContain("[cli,code]");
    expect(msg.body).toContain("Scope: cli, code");
    expect(msg.body).toContain(
      "Verify: Verified: bun run test:full; manual: agentplane commit --close",
    );

    // Key files should be based on churn ordering and exclude task artifacts.
    const keyLine = msg.body.split("\n").find((l) => l.startsWith("Key files:"));
    expect(keyLine).toBeTruthy();
    expect(keyLine).toContain("src/b.ts");
    expect(keyLine).toContain("src/a.ts");
    expect(keyLine).not.toContain(".agentplane/tasks/");
  });

  it("uses a clear fallback marker when result_summary is missing", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Add close commit mode",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["cli"],
      verify: [],
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      commit: { hash: implHash, message: "impl" },
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task });
    expect(msg.subject).toContain("(no result_summary)");
  });

  it("uses spike emoji and does not require verify summary", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Spike close message builder",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["spike", "cli"],
      verify: ["bun run test:full"],
      verification: {
        state: "ok",
        updated_at: nowIso(),
        updated_by: "TESTER",
        note: "Verified: bun run test:full",
      },
      commit: { hash: implHash, message: "impl" },
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task });
    expect(msg.subject.startsWith("🧪")).toBe(true);
    expect(msg.body).toContain("Verify: not required (spike)");
  });

  it("throws when task status is not DONE", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Not done",
      description: "desc",
      status: "DOING",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: [],
      verify: [],
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      commit: { hash: implHash, message: "impl" },
    };
    await expect(buildCloseCommitMessage({ gitRoot: root, task })).rejects.toThrow(/not DONE/u);
  });

  it("throws when recorded implementation commit is missing", async () => {
    const { root } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Missing commit",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: [],
      verify: [],
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      commit: { hash: "   ", message: "impl" },
    };
    await expect(buildCloseCommitMessage({ gitRoot: root, task })).rejects.toThrow(
      /missing recorded commit metadata/u,
    );
  });

  it("writes verify fallback, notes, and +extra tag marker", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Coverage close message",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["cli", "code", "backend", "frontend", "testing"],
      verify: [],
      verification: { state: "ok", updated_at: nowIso(), updated_by: "TESTER", note: "" },
      commit: { hash: implHash, message: "impl" },
      breaking: true,
      risk_level: "high",
      result_summary:
        "This summary is intentionally very long to exceed the close subject limit and verify truncation behavior in deterministic subject generation.",
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task });
    expect(msg.subject).toContain("[backend,cli,code,frontend,+1]");
    expect(msg.subject.endsWith("... (202602081506-R18Y1Q) [backend,cli,code,frontend,+1]")).toBe(
      true,
    );
    expect(msg.body).toContain("Verify: ok (see task verification note)");
    expect(msg.body).toContain("Notes: breaking; risk=high");
  });

  it("uses verify command fallback and can emit no key files", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "No key files",
      description: "desc",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["cli"],
      verify: ["bun run test:unit", "bun run lint"],
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      commit: { hash: implHash, message: "impl" },
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task, keyFilesLimit: 0 });
    expect(msg.body).toContain("Verify: bun run test:unit; bun run lint");
    expect(msg.body).toContain("Key files: (none)");
  });
});
