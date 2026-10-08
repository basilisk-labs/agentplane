import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { codingCases, materializeCodingFixture } from "./coding-corpus.mjs";
import { runNativeCodingLoop } from "./native-coding-loop.mjs";
import { readNativeCodingTask, nativeCodingFacts } from "./native-coding-evidence.mjs";
import { nativeCodingPort } from "./native-coding-port.mjs";
const cli = fileURLToPath(new URL("../../../../packages/agentplane/bin/ap.js", import.meta.url));
test(
  "real native CLI admits an offline planning double and stops at actual approval",
  { timeout: 60_000 },
  async (t) => {
    const root = mkdtempSync(path.join(os.tmpdir(), "m05-native-cli-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const { subject } = materializeCodingFixture(root, codingCases()[0]);
    const env = {
      ...process.env,
      AGENTPLANE_HOME: path.join(root, "runtime"),
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_TERMINAL_PROMPT: "0",
      GIT_ALLOW_PROTOCOL: "file",
      npm_config_offline: "true",
    };
    const run = (args) =>
      execFileSync(process.execPath, [cli, ...args], {
        cwd: subject,
        env,
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 4 * 1024 * 1024,
      });
    run([
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ]);
    assert.equal(
      execFileSync("git", ["status", "--porcelain"], {
        cwd: subject,
        env,
        encoding: "utf8",
      }).trim(),
      "",
    );
    const created = JSON.parse(
      run([
        "task",
        "create",
        "Repair pure module behavior",
        "--task-kind",
        "code",
        "--mutation-scope",
        "code",
        "--scope-root",
        "src/module.mjs",
        "--capability",
        "task.verify",
        "--resource",
        "path:src/module.mjs:write",
        "--verify",
        "node visible.test.mjs",
        "--json",
      ]),
    );
    const taskId = created.task_id ?? created.id;
    assert.equal(typeof taskId, "string");
    const packet = JSON.parse(run(["task", "advance", taskId, "--agent-json"]));
    assert.equal(packet.authority.role, "PLANNER");
    const executable = path.join(root, "qualified-ap");
    writeFileSync(
      executable,
      `#!${process.execPath}\nawait import(${JSON.stringify(new URL(`file://${cli}`).href)});\n`,
      { mode: 0o700 },
    );
    const resumeExact = nativeCodingPort({
      executable,
      cwd: subject,
      env,
      taskId,
      timeoutMs: 30_000,
    });
    let reservation;
    const result = await runNativeCodingLoop(
      {
        binding: { task_id: taskId, assignment_id: "offline" },
        checkpointRoot: path.join(root, "journal"),
        packet,
        maxSteps: 2,
      },
      {
        resumeExact,
        solve: async ({ order }) => {
          reservation = {
            assignment_id: "offline",
            role: order.role,
            episode_id: order.work_order_id.slice(7),
          };
          return {
            call_id: "offline-double",
            result: {
              work_order_id: order.work_order_id,
              status: "completed",
              summary: "Offline transport qualification, not a model outcome",
              findings: [],
              uncertainty: [],
              canonical_plan: {
                work_items: [
                  {
                    id: "repair",
                    depends_on: [],
                    required_inputs: [],
                    expected_outputs: ["patch"],
                    optional: false,
                    execution_requirements: {
                      scope_roots: ["src/module.mjs"],
                      repository_effects: ["repository_write", "source_code"],
                      external_effects: [],
                      capabilities: [],
                      resources: [],
                    },
                    contract: {
                      role: "EXECUTOR",
                      objective: "Inspect and repair the documented pure module behavior",
                      acceptance_criteria: ["Visible checks pass and assertions remain unchanged"],
                      verification_commands: ["node visible.test.mjs"],
                    },
                  },
                ],
              },
            },
          };
        },
        readCall: async () => ({
          reservation,
          receipt: {
            effect_state: "terminal",
            status: "completed",
            stop_reason: null,
            usage: { state: "observed" },
            identity_valid: true,
          },
        }),
      },
    );
    assert.equal(result.kind, "operator_handoff");
    assert.equal(result.packet.action.kind, "approval_required");
    const task = JSON.parse(run(["task", "show", taskId]));
    assert.equal(task.canonical_record.aggregate.current_plan.state, "PROPOSED");
    assert.equal(task.canonical_record.aggregate.current_plan.approval_actor_id, null);
    const options = { executable, cwd: subject, env, taskId, timeoutMs: 30_000 };
    const observedTask = await readNativeCodingTask(options);
    assert.equal(observedTask.canonical_record.digest, task.canonical_record.digest);
    const facts = nativeCodingFacts({
      ...options,
      ledger: { read: () => ({ calls: {} }) },
      assignmentId: "offline",
      scope: ["src/module.mjs"],
      workflow: "direct",
      fallback: null,
      history: { read: () => ({ records: [] }) },
    });
    await assert.rejects(
      facts({
        subject,
        head: execFileSync("git", ["rev-parse", "HEAD"], {
          cwd: subject,
          env,
          encoding: "utf8",
        }).trim(),
      }),
      /PASSED/u,
    );
  },
);

test(
  "real native Recipe creation retains immutable input before actual instantiation",
  { timeout: 60_000 },
  async (t) => {
    const { writeCodingRecipePackage } = await import("./coding-recipe-package.mjs");
    const root = mkdtempSync(path.join(os.tmpdir(), "m05-native-recipe-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const spec = codingCases()[0],
      { subject } = materializeCodingFixture(root, spec);
    const env = {
      ...process.env,
      AGENTPLANE_HOME: path.join(root, "runtime"),
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_TERMINAL_PROMPT: "0",
      GIT_ALLOW_PROTOCOL: "file",
      npm_config_offline: "true",
    };
    const run = (args) =>
      execFileSync(process.execPath, [cli, ...args], {
        cwd: subject,
        env,
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 4 * 1024 * 1024,
      });
    run([
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ]);
    const recipe = writeCodingRecipePackage(root, spec);
    run(["recipes", "install", "--path", recipe.archive]);
    run(["recipes", "add", `${recipe.id}@1.0.0`, "--mode", "copy"]);
    const selection = path.join(subject, "selection.json");
    writeFileSync(selection, JSON.stringify(recipe.selection));
    const created = JSON.parse(
      run([
        "task",
        "create",
        spec.objective,
        "--task-kind",
        "code",
        "--mutation-scope",
        "code",
        "--scope-root",
        "src/module.mjs",
        "--capability",
        "task.verify",
        "--resource",
        "path:src/module.mjs:write",
        "--verify",
        "node visible.test.mjs",
        "--recipe-file",
        selection,
        "--json",
      ]),
    );
    assert.equal(created.status, "retention_required");
    assert.equal(created.recipe_input.task_id, created.task_id);
    const continuation = path.join(
      subject,
      ".agentplane/tasks",
      created.task_id,
      "recipe-input.json",
    );
    writeFileSync(continuation, JSON.stringify(created.recipe_input));
    execFileSync("git", ["add", "."], { cwd: subject, env });
    execFileSync(
      "git",
      [
        "-c",
        "commit.gpgsign=false",
        "commit",
        "-qm",
        "Retain exact native Recipe continuation in offline fixture",
      ],
      { cwd: subject, env },
    );
    const prepared = JSON.parse(
      run(["task", "plan", "set", created.task_id, "--recipe-file", continuation]),
    );
    assert.equal(prepared.status, "advance_required");
    const packet = JSON.parse(run(["task", "advance", created.task_id, "--agent-json"]));
    assert.equal(packet.action.kind, "approval_required");
    const task = JSON.parse(run(["task", "show", created.task_id]));
    assert.equal(task.canonical_record.aggregate.current_plan.approval_actor_id, null);
  },
);
