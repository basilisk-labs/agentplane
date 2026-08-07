/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();
const TASKS_CLI_TIMEOUT_MS = 300_000;
const execFileAsync = promisify(execFile);

type CliProcessResult = {
  code: number;
  stdout: string;
  stderr: string;
};

const SYNCHRONIZED_CLI_LAUNCHER = String.raw`
const { spawnSync } = require("node:child_process");
const startAt = Number(process.argv[1]);
const cliPath = process.argv[2];
const cliArgs = process.argv.slice(3);
const waitSignal = new Int32Array(new SharedArrayBuffer(4));
while (Date.now() < startAt) {
  Atomics.wait(waitSignal, 0, 0, Math.min(10, startAt - Date.now()));
}
const result = spawnSync(process.execPath, [cliPath, ...cliArgs], {
  cwd: process.cwd(),
  env: process.env,
  encoding: "utf8",
});
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
if (result.error) throw result.error;
process.exit(result.status ?? 1);
`;

async function runSynchronizedCliProcess(opts: {
  args: string[];
  startAt: number;
}): Promise<CliProcessResult> {
  const cliPath = path.resolve("packages/agentplane/bin/agentplane.js");
  try {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      ["-e", SYNCHRONIZED_CLI_LAUNCHER, String(opts.startAt), cliPath, ...opts.args],
      {
        cwd: process.cwd(),
        env: cleanGitEnv(),
        maxBuffer: 4 * 1024 * 1024,
      },
    );
    return { code: 0, stdout, stderr };
  } catch (error) {
    const failure = error as Error & {
      code?: number | string;
      stdout?: string;
      stderr?: string;
    };
    return {
      code: typeof failure.code === "number" ? failure.code : 1,
      stdout: failure.stdout ?? "",
      stderr: failure.stderr ?? failure.message,
    };
  }
}

describe("runCli", { timeout: TASKS_CLI_TIMEOUT_MS }, () => {
  it("task new creates a task README and prints the id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "sleep 1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain(`id: "${id}"`);
    expect(readme).toContain("doc_version: 3");
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('title: "My task"');
    expect(readme).toContain("origin:");
    expect(readme).toContain('system: "manual"');
    expect(readme).toContain("## Summary");
    expect(readme).toContain("## Scope");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("## Risks");
  });

  it("task new runs backend mutation readiness before emitting verify-step warnings", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const assertLocalMutationReady = vi
      .fn<() => Promise<void>>()
      .mockRejectedValue(new Error("projection stale"));
    const listTasks = vi.fn().mockResolvedValue([]);
    const writeTask = vi.fn().mockResolvedValue(null);
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({
        id: "cloud",
        assertLocalMutationReady,
        listTasks,
        writeTask,
        generateTaskId: vi.fn().mockResolvedValue("202605100747-ABC123"),
      }),
      backendId: "cloud",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "cloud", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cloud task",
        "--description",
        "Create through cloud backend",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(assertLocalMutationReady).toHaveBeenCalledOnce();
      expect(listTasks).not.toHaveBeenCalled();
      expect(writeTask).not.toHaveBeenCalled();
      expect(io.stderr).not.toContain("task requires Verify Steps");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task new normalizes escaped newlines into readable summary and scope text", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Multiline task",
        "--description",
        String.raw`Line one\n\nLine two`,
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("description: |-");
    expect(readme).toContain("  Line one");
    expect(readme).toContain("  Line two");
    expect(readme).not.toContain(String.raw`literal \n sequences`);
    expect(readme).toContain("## Summary");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.description).toBe("Line one\n\nLine two");
    expect(task.frontmatter.sections?.Summary).toContain("Line one\n\nLine two");
    expect(task.frontmatter.sections?.Scope).toContain("- In scope: Line one Line two.");
  });

  it("task new supports depends-on and verify flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dependent task",
        "--description",
        "Has deps and verify",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.origin).toEqual({ system: "manual" });
    expect(task.frontmatter.depends_on).toContain("202601010101-ABCDEF");
    expect(task.frontmatter.verify).toContain("bun run ci");
  });

  it("task new stores structured blueprint intent fields", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Market analysis note",
        "--description",
        "Analyze the current market context without repository mutation",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "content",
        "--task-kind",
        "analysis",
        "--mutation-scope",
        "none",
        "--risk",
        "network",
        "--blueprint-request",
        "analysis.light",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.task_kind).toBe("analysis");
    expect(task.frontmatter.mutation_scope).toBe("none");
    expect(task.frontmatter.risk_flags).toEqual(["network"]);
    expect(task.frontmatter.blueprint_request).toBe("analysis.light");
  });

  it("task new persists an explainable automatic execution route", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Publish a patch",
        "--description",
        "Prepare and publish a patch release",
        "--owner",
        "CODER",
        "--tag",
        "release",
        "--task-kind",
        "release",
        "--mutation-scope",
        "release",
        "--risk",
        "publish",
        "--route",
        "auto",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.execution_route).toEqual({
      schema_version: 1,
      requested_mode: "auto",
      selected_mode: "branch_pr",
      repository_mode: "direct",
      reason_codes: ["mutation_requires_isolation", "risk_publish"],
      frozen: true,
    });
  });

  it("task create infers bounded code intent and returns one semantic next step", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "create",
        "Fix the parser edge case",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        status: string;
        inferred_intent: {
          code: string;
          task_kind: string;
          mutation_scope: string;
          blueprint_request: string;
        };
        execution_route: { requested_mode: string; selected_mode: string; reason_codes: string[] };
        required_role: string;
        next_command: string;
      };
      expect(payload.status).toBe("semantic_input_required");
      expect(payload.inferred_intent).toMatchObject({
        code: "bounded_code_change",
        task_kind: "code",
        mutation_scope: "code",
        blueprint_request: "code.direct",
      });
      expect(payload.execution_route).toMatchObject({
        requested_mode: "auto",
        selected_mode: "direct",
        reason_codes: ["automatic_safe_direct"],
      });
      expect(payload.required_role).toBe("PLANNER");
      expect(payload.next_command).toBe(`agentplane task advance ${payload.task_id} --agent-json`);

      const task = await readTask({ cwd: root, rootOverride: root, taskId: payload.task_id });
      expect(task.frontmatter.execution_route).toEqual(
        expect.objectContaining({
          requested_mode: "auto",
          selected_mode: "direct",
          frozen: true,
        }),
      );
      expect(task.frontmatter.blueprint_request).toBe("code.direct");
    } finally {
      io.restore();
    }
  });

  it("task create conservatively isolates complex and release outcomes", async () => {
    const root = await mkGitRepoRoot();
    const outcomes = [
      ["Refactor the task framework", "complex_code_change", "code.branch_pr"],
      ["Выпусти следующий патч-релиз", "release_intent", "release.strict"],
    ] as const;

    for (const [outcome, inferenceCode, blueprint] of outcomes) {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "create", outcome, "--json", "--root", root]);
        expect(code).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          inferred_intent: { code: string; blueprint_request: string };
          execution_route: { selected_mode: string; reason_codes: string[] };
        };
        expect(payload.inferred_intent).toMatchObject({
          code: inferenceCode,
          blueprint_request: blueprint,
        });
        expect(payload.execution_route.selected_mode).toBe("branch_pr");
        expect(payload.execution_route.reason_codes.length).toBeGreaterThan(0);
      } finally {
        io.restore();
      }
    }
  });

  it("task create rejects invalid intake and persists safe explicit route overrides", async () => {
    const root = await mkGitRepoRoot();

    for (const args of [
      ["task", "create", "   ", "--root", root],
      ["task", "create", "Fix the parser", "--route", "sideways", "--root", root],
    ]) {
      const io = captureStdIO();
      try {
        const code = await runCli(args);
        expect(code).toBe(2);
        expect(io.stderr).toMatch(/outcome|--route/u);
      } finally {
        io.restore();
      }
    }

    const cases = [
      ["Fix the direct parser path", "direct", "direct", "explicit_direct"],
      ["Fix the isolated parser path", "branch_pr", "branch_pr", "explicit_branch_pr"],
      ["Publish the next patch release", "direct", "branch_pr", "direct_request_overridden"],
    ] as const;
    for (const [outcome, requestedRoute, selectedRoute, reason] of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "create",
          outcome,
          "--route",
          requestedRoute,
          "--json",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          execution_route: {
            requested_mode: string;
            selected_mode: string;
            reason_codes: string[];
          };
        };
        expect(payload.execution_route).toMatchObject({
          requested_mode: requestedRoute,
          selected_mode: selectedRoute,
        });
        expect(payload.execution_route.reason_codes).toContain(reason);

        const task = await readTask({ cwd: root, rootOverride: root, taskId: payload.task_id });
        expect(task.frontmatter.execution_route).toEqual(
          expect.objectContaining({
            requested_mode: requestedRoute,
            selected_mode: selectedRoute,
            frozen: true,
          }),
        );
      } finally {
        io.restore();
      }
    }
  });

  it("task create keeps the compact task advance agent-json handoff compatible", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    const createIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "create",
        "Fix the compact handoff",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = (JSON.parse(createIo.stdout) as { task_id: string }).task_id;
    } finally {
      createIo.restore();
    }

    const advanceIo = captureStdIO();
    try {
      const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
      expect(code).toBe(0);
      const packet = JSON.parse(advanceIo.stdout) as {
        schema_version: number;
        task_id: string;
        action: { kind: string };
        stop: { reason: string; resume: string };
      };
      expect(packet).toMatchObject({
        schema_version: 1,
        task_id: taskId,
        action: { kind: "agent_episode" },
        stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
      });
    } finally {
      advanceIo.restore();
    }
  });

  it("task create serializes cross-process exact duplicates and preserves the selected route", async () => {
    const root = await mkGitRepoRoot();
    const args = ["task", "create", "Fix the concurrent parser path", "--json", "--root", root];
    const startAt = Date.now() + 1000;
    const results = await Promise.all([
      runSynchronizedCliProcess({ args, startAt }),
      runSynchronizedCliProcess({ args, startAt }),
    ]);

    expect(results.map((result) => result.code).toSorted()).toEqual([0, 4]);
    const successfulResult = results.find((result) => result.code === 0);
    const duplicateResult = results.find((result) => result.code === 4);
    expect(successfulResult).toBeDefined();
    expect(duplicateResult?.stderr).toContain("exact duplicate open task detected");
    const created = JSON.parse(successfulResult?.stdout ?? "") as {
      task_id: string;
      execution_route: { selected_mode: string; frozen: boolean };
    };
    expect(created.execution_route).toMatchObject({ selected_mode: "direct", frozen: true });

    const taskEntries = await readdir(path.join(root, ".agentplane", "tasks"), {
      withFileTypes: true,
    });
    const taskIds = taskEntries
      .filter((entry) => entry.isDirectory() && /^\d{12}-[A-Z0-9]{6}$/u.test(entry.name))
      .map((entry) => entry.name);
    expect(taskIds).toEqual([created.task_id]);
    const task = await readTask({ cwd: root, rootOverride: root, taskId: taskIds[0] ?? "" });
    expect(task.frontmatter.execution_route).toEqual(
      expect.objectContaining({
        requested_mode: "auto",
        selected_mode: "direct",
        reason_codes: ["automatic_safe_direct"],
        frozen: true,
      }),
    );
  });

  it("task new can preview the resolved blueprint route without changing stdout", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Market analysis route preview",
        "--description",
        "Analyze market context without repository mutation",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "analysis",
        "--task-kind",
        "analysis",
        "--mutation-scope",
        "none",
        "--blueprint-request",
        "analysis.light",
        "--show-blueprint",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
      expect(taskId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
      expect(io.stdout).toBe(`${taskId}\n`);
      expect(io.stderr).toContain("Blueprint route preview:");
      expect(io.stderr).toContain("blueprint_id: analysis.light");
      expect(io.stderr).toContain(
        "workflow_git: implementation_commit_location=current_checkout finish_commit_source=explicit_hash_or_comment_commit close_tail_required=no finish_commit_from_comment=yes",
      );
      expect(io.stderr).toContain(
        "route: intake -> scope -> context_resolve -> work_unit -> artifact_write -> verify_record -> quality_gate -> finish",
      );
      expect(io.stderr).toContain(
        "selection_reasons: explicit blueprint requested: analysis.light",
      );
      expect(io.stderr).toContain("required_evidence: analysis.sources");
      expect(io.stderr).toContain(`explain_command: agentplane blueprint explain ${taskId}`);
      expect(io.stderr).toContain(`snapshot_command: agentplane blueprint snapshot ${taskId}`);
    } finally {
      io.restore();
    }
  });

  it("task new warns but allows highly similar open task titles by default", async () => {
    const root = await mkGitRepoRoot();
    const firstIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize gh env for hosted merge sync lookups",
        "--description",
        "Original workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      firstIo.restore();
    }

    const io = captureStdIO();
    let followupId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize hosted-merge-sync gh lookups",
        "--description",
        "Duplicate workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      followupId = io.stdout.trim();
      expect(io.stderr).toContain("similar open task detected");
      expect(io.stderr).toContain("close-duplicate");
    } finally {
      io.restore();
    }

    expect(followupId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
  });

  it("task new rejects exact duplicate open task titles unless --allow-duplicate is passed", async () => {
    const root = await mkGitRepoRoot();
    const firstIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize gh env for hosted merge sync lookups",
        "--description",
        "Original workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      firstIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Sanitize gh env for hosted merge sync lookups",
        "--description",
        "Duplicate workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("exact duplicate open task detected");
      expect(io.stderr).toContain("--allow-duplicate");
      expect(io.stderr).toContain("close-duplicate");
    } finally {
      io.restore();
    }
  });

  it("task new allows similar titles when --allow-duplicate is explicit", async () => {
    const root = await mkGitRepoRoot();
    const firstIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Infer branch_pr base branch from default branch when pin is absent",
        "--description",
        "Original workflow task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      firstIo.restore();
    }

    const io = captureStdIO();
    let duplicateId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Infer default branch_pr base when pin is absent",
        "--description",
        "Intentional follow-up task",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--allow-duplicate",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      duplicateId = io.stdout.trim();
      expect(io.stderr).toContain("similar open task detected");
      expect(io.stderr).toContain("creating a new task");
    } finally {
      io.restore();
    }

    expect(duplicateId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
  });

  it("task new requires values for flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Needs tag",
        "--description",
        "Missing tag value should error",
        "--owner",
        "CODER",
        "--tag",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value after --tag");
    } finally {
      io.restore();
    }
  });

  it("task new fails when owner is not registered in .agentplane/agents", async () => {
    const root = await mkGitRepoRoot();
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Coder", workflow: [] }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Unknown owner",
        "--description",
        "Should fail fast",
        "--priority",
        "med",
        "--owner",
        "NOPE",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("unknown task owner id: NOPE");
    } finally {
      io.restore();
    }
  });

  it("task new seeds Verify Steps in README for verify-required primary tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Code task",
        "--description",
        "Needs verify steps",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun run test:fast",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).toContain("seeded a PLANNER fallback ## Verify Steps scaffold");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain("Run `bun run test:fast`.");
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Expected: it succeeds and confirms the requested outcome",
    );
    expect(task.frontmatter.sections?.Findings).toBe("");
    expect(task.frontmatter.sections?.Summary).toContain("Code task");
  });

  it("task new without verify commands still seeds approvable Verify Steps for verify-required primary tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Code task without verify command",
        "--description",
        "Still needs approvable verify steps",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).toContain("seeded a PLANNER fallback ## Verify Steps scaffold");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Review the changed artifact or behavior for the `code` task.",
    );
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Run the most relevant validation step for the `code` task.",
    );
  });

  it("task new seeds concrete Verify Steps even for non-verify-required tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Workflow task",
        "--description",
        "Improve lifecycle ergonomics",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("sections:");
    expect(readme).toContain("## Verify Steps");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");

    const task = await readTask({ cwd: root, rootOverride: root, taskId: id });
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      'Review the requested outcome for "Workflow task".',
    );
    expect(task.frontmatter.sections?.["Verify Steps"]).toContain(
      "Run the most relevant validation step for this task.",
    );
  });

  it("task add creates tasks with explicit ids", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const taskIds = ["202601010101-ABCD", "202601010102-BCDE"];
    try {
      const code = await runCli([
        "task",
        "add",
        ...taskIds,
        "--title",
        "Added task",
        "--description",
        "Added description",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    for (const taskId of taskIds) {
      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.id).toBe(taskId);
      expect(task.frontmatter.title).toBe("Added task");
      expect(task.frontmatter.doc_version).toBe(3);
    }
  });
});
