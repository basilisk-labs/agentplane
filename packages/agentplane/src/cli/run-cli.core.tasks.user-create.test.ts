import { execFile } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { readTask } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  cleanGitEnv,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
} from "@agentplane/testkit";
import { inferUserTaskIntent } from "../commands/task/create.command.js";
import { runCli } from "./run-cli.js";

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

describe("task create user-first intake", { timeout: TASKS_CLI_TIMEOUT_MS }, () => {
  it("infers bounded code intent and returns one semantic next step", async () => {
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

  it("requires confirmation and isolation when natural-language intent is unknown", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "create", "Make this better", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        inferred_intent: {
          code: string;
          task_kind: string | null;
          mutation_scope: string;
          blueprint_request: string | null;
          confirmation_required: boolean;
        };
        execution_route: { selected_mode: string; reason_codes: string[] };
      };
      expect(payload.inferred_intent).toEqual(
        expect.objectContaining({
          code: "unknown_intent",
          task_kind: null,
          mutation_scope: "unknown",
          blueprint_request: null,
          confirmation_required: true,
        }),
      );
      expect(payload.execution_route).toMatchObject({
        selected_mode: "branch_pr",
        reason_codes: ["mutation_scope_unknown"],
      });

      const task = await readTask({ cwd: root, rootOverride: root, taskId: payload.task_id });
      expect(task.frontmatter.task_kind).toBeUndefined();
      expect(task.frontmatter.mutation_scope).toBe("unknown");
      expect(task.frontmatter.execution_route).toEqual(
        expect.objectContaining({
          selected_mode: "branch_pr",
          reason_codes: ["mutation_scope_unknown"],
          frozen: true,
        }),
      );
      expect(inferUserTaskIntent("Address ambiguous behavior")).toMatchObject({
        inference_code: "unknown_intent",
        mutationScope: "unknown",
        confirmation_required: true,
      });
    } finally {
      io.restore();
    }
  });

  it("recovers an interrupted repository-wide creation lock", async () => {
    const root = await mkGitRepoRoot();
    const lockPath = path.join(root, ".agentplane", "tasks", "..task-create.README.md.lock");
    await mkdir(path.dirname(lockPath), { recursive: true });
    await writeFile(
      lockPath,
      `${JSON.stringify({
        schema_version: 1,
        generation: "crashed-task-create",
        process_instance_id: "crashed-task-create",
        owner_pid: 2_147_483_647,
        owner_command: "missing",
        owner_started_at: "2026-01-01T00:00:00.000Z",
        acquired_at: "2026-01-01T00:00:00.000Z",
      })}\n`,
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "create",
        "Fix the parser after interruption",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as { task_id: string };
      expect(payload.task_id).toMatch(/^\d{12}-[A-Z0-9]{6}$/u);
      const taskDirectoryEntries = await readdir(path.join(root, ".agentplane", "tasks"));
      expect(
        taskDirectoryEntries.filter((name) => name.startsWith("..task-create.README.md.lock")),
      ).toEqual([]);
    } finally {
      io.restore();
    }
  });

  it("conservatively isolates complex and release outcomes", async () => {
    const root = await mkGitRepoRoot();
    const outcomes = [
      ["Refactor the task framework", "complex_code_change", "code.branch_pr"],
      ["Выпусти следующий патч-релиз", "release_intent", "release.strict"],
      ["Do not publish; only fix the parser", "release_intent", "release.strict"],
      ["Document the release checklist", "release_intent", "release.strict"],
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

  it("rejects invalid intake and persists safe explicit route overrides", async () => {
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

  it("keeps the compact task advance agent-json handoff compatible", async () => {
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

  it("serializes cross-process exact duplicates and preserves the selected route", async () => {
    const root = await mkGitRepoRoot();
    const args = ["task", "create", "Fix the concurrent parser path", "--json", "--root", root];
    const startAt = Date.now() + 1000;
    const results = await Promise.all([
      runSynchronizedCliProcess({ args, startAt }),
      runSynchronizedCliProcess({ args, startAt }),
    ]);

    expect(results.map((result) => result.code).toSorted(), JSON.stringify(results)).toEqual([
      0, 4,
    ]);
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
});
