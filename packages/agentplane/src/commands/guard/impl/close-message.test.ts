import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../../backends/task-backend.js";
import { nowIso } from "../../task/shared.js";

import { buildCloseCommitMessage, renderMergeMessage } from "./close-message.js";

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

describe("buildCloseCommitMessage", { timeout: 60_000 }, () => {
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
    expect(msg.subject).toBe("cli: add close commit mode");
    expect(msg.subject).not.toContain("✅");
    expect(msg.subject).not.toContain("R18Y1Q");
    expect(msg.body).toContain("Summary:\n- Add close commit mode.");
    expect(msg.body).toContain("Verification:\n- Bun run test:full passed.");
    expect(msg.body).toContain("Refs:\n- Agentplane task: R18Y1Q");
    expect(msg.body).toContain("- Agentplane run: 202602081506-R18Y1Q");

    // Key files should be based on churn ordering and exclude task artifacts.
    expect(msg.body).toContain("Key files:\n- src/b.ts\n- src/a.ts");
    expect(msg.body).not.toContain(".agentplane/tasks/");
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
    expect(msg.subject).toBe("cli: add close commit mode");
    expect(msg.subject).not.toContain("(no result_summary)");
  });

  it("uses the task title for the subject when result_summary is a machine slug", async () => {
    const { root, implHash } = await mkRepoWithImplCommit();
    const task: TaskData = {
      id: "202602081506-R18Y1Q",
      title: "Finish force approval",
      description: "desc",
      result_summary: "force-finish-check",
      status: "DONE",
      priority: "med",
      owner: "ORCHESTRATOR",
      depends_on: [],
      tags: ["docs"],
      verify: [],
      verification: {
        state: "ok",
        updated_at: nowIso(),
        updated_by: "TESTER",
        note: "Verified: force finish check",
      },
      commit: { hash: implHash, message: "impl" },
    };

    const msg = await buildCloseCommitMessage({ gitRoot: root, task });
    expect(msg.subject).toBe("docs: finish force approval");
    expect(msg.subject).not.toBe("docs: force-finish-check");
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
    expect(msg.subject).toBe("cli: spike close message builder");
    expect(msg.subject.startsWith("🧪")).toBe(false);
    expect(msg.body).toContain("Verification:\n- Not required (spike).");
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
    expect(msg.subject).toBe(
      "cli: this summary is intentionally very long to exceed the close subject...",
    );
    expect(msg.body).toContain("Verification:\n- Ok (see task verification note).");
    expect(msg.body).toContain("Why:\n- Task metadata: breaking; risk=high.");
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
    expect(msg.body).toContain(
      "Verification:\n- Bun run test:unit passed.\n- Bun run lint passed.",
    );
    expect(msg.body).not.toContain("Key files:");
  });
});

describe("renderMergeMessage", () => {
  it("renders full structured input", () => {
    expect(
      renderMergeMessage({
        scope: "context",
        prTitle: "Add context release readiness tests for v0.6",
        sourcePrNumber: 3612,
        mergePrNumber: 3613,
        taskId: "202605130501-4B49ZZ",
        runId: "202605130501-4B49ZZ",
        summary: [
          "Added and verified the local and hosted v0.6 context readiness flow.",
          "Updated generated CLI docs and context verification coverage.",
        ],
        why: [
          "The v0.6 context release needs parity between local checks, hosted checks, and generated documentation before shipping.",
        ],
        changed: [
          "Updated context release-readiness tests.",
          "Refined context verification and reindex command behavior.",
          "Regenerated CLI reference documentation.",
        ],
        verification: [
          "typecheck",
          "context release-readiness tests",
          "release parity",
          "local and hosted readiness checks",
        ],
        keyFiles: [
          "docs/user/cli-reference.generated.mdx",
          "packages/agentplane/src/commands/context/release-readiness.test.ts",
          "packages/agentplane/src/commands/context/verify-task.ts",
          "packages/agentplane/src/commands/context/reindex.ts",
          "docs/index.mdx",
        ],
      }),
    ).toMatchInlineSnapshot(`
      "context: add context release readiness tests for v0.6

      Summary:
      - Added and verified the local and hosted v0.6 context readiness flow.
      - Updated generated CLI docs and context verification coverage.
      Why:
      - The v0.6 context release needs parity between local checks, hosted checks, and generated documentation before shipping.
      Changed:
      - Updated context release-readiness tests.
      - Refined context verification and reindex command behavior.
      - Regenerated CLI reference documentation.
      Verification:
      - Typecheck passed.
      - Context release-readiness tests passed.
      - Release parity checks passed.
      - Local and hosted readiness checks passed.
      Key files:
      - docs/user/cli-reference.generated.mdx
      - packages/agentplane/src/commands/context/release-readiness.test.ts
      - packages/agentplane/src/commands/context/verify-task.ts
      - packages/agentplane/src/commands/context/reindex.ts
      - docs/index.mdx
      Refs:
      - Source PR: #3612
      - Merge PR: #3613
      - Agentplane task: 4B49ZZ
      - Agentplane run: 202605130501-4B49ZZ"
    `);
  });

  it("omits Why when no PR body or safe why source is present", () => {
    const message = renderMergeMessage({
      scope: "docs",
      prTitle: "Regenerate CLI reference for context commands",
      verification: ["docs generation", "lint"],
      keyFiles: ["docs/user/cli-reference.generated.mdx"],
      taskId: "202605130501-4B49ZZ",
    });
    expect(message).not.toContain("Why:");
    expect(message).toMatchInlineSnapshot(`
      "docs: regenerate CLI reference for context commands

      Summary:
      - Regenerate CLI reference for context commands.
      Changed:
      - Updated documentation artifacts.
      Verification:
      - Docs generation passed.
      - Lint passed.
      Key files:
      - docs/user/cli-reference.generated.mdx
      Refs:
      - Agentplane task: 4B49ZZ"
    `);
  });

  it("derives a meaningful subject from files when generated title is noisy", () => {
    expect(
      renderMergeMessage({
        prTitle: "✅ 4B49ZZ close: Merged via PR #3612. (202605130501-4B49ZZ) [code] (#3613)",
        taskId: "202605130501-4B49ZZ",
        runId: "202605130501-4B49ZZ",
        sourcePrNumber: 3612,
        mergePrNumber: 3613,
        keyFiles: [
          "packages/agentplane/src/commands/context/release-readiness.test.ts",
          "packages/agentplane/src/commands/context/verify-task.ts",
          "docs/user/cli-reference.generated.mdx",
        ],
      }).split("\n")[0],
    ).toBe("context: update v0.6 release readiness flow");
  });

  it("splits long verification text into non-truncated bullets", () => {
    expect(
      renderMergeMessage({
        scope: "release",
        prTitle: "Verify local and hosted v0.6 parity",
        verification: [
          "Local and hosted v0.6 readiness checks passed: typecheck, context release-readiness tests, release parity, release:build, docs generation, lint",
        ],
      }),
    ).toContain(
      [
        "Verification:",
        "- Typecheck passed.",
        "- Context release-readiness tests passed.",
        "- Release parity checks passed.",
        "- Release build passed.",
        "- Docs generation passed.",
        "- Lint passed.",
      ].join("\n"),
    );
  });

  it("caps many key files", () => {
    const files = Array.from({ length: 20 }, (_, index) => `src/file-${index + 1}.ts`);
    expect(
      renderMergeMessage({
        scope: "code",
        prTitle: "Improve merge message rendering",
        keyFiles: files,
      }),
    ).toContain("- +12 more files");
  });

  it("renders metadata-only fallback", () => {
    expect(
      renderMergeMessage({
        scope: "code",
        taskId: "202605130501-4B49ZZ",
        runId: "202605130501-4B49ZZ",
        sourcePrNumber: 3612,
        mergePrNumber: 3613,
      }),
    ).toMatchInlineSnapshot(`
      "code: merge Agentplane task 4B49ZZ

      Summary:
      - Merged Agentplane task 4B49ZZ.
      Refs:
      - Source PR: #3612
      - Merge PR: #3613
      - Agentplane task: 4B49ZZ
      - Agentplane run: 202605130501-4B49ZZ"
    `);
  });
});
