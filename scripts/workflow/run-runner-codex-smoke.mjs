import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { classifyCodexSmokeRun } from "../../packages/agentplane/src/runner/codex-smoke.ts";

const execFileAsync = promisify(execFile);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const REPO_AGENTPLANE_BIN = path.join(REPO_ROOT, "packages", "agentplane", "bin", "agentplane.js");

function usage() {
  console.log(
    [
      "Usage: bun scripts/run-runner-codex-smoke.mjs (--live | --live-custom-wrapper | --fixture-outcome <outcome>) [--keep-workspace]",
      "",
      "Outcomes: success | timeout | policy_refusal | runner_failure",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const out = {
    live: false,
    liveCustomWrapper: false,
    keepWorkspace: false,
    fixtureOutcome: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--live") {
      out.live = true;
      continue;
    }
    if (arg === "--live-custom-wrapper") {
      out.liveCustomWrapper = true;
      continue;
    }
    if (arg === "--keep-workspace") {
      out.keepWorkspace = true;
      continue;
    }
    if (arg === "--fixture-outcome") {
      out.fixtureOutcome = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  const selectedModes =
    Number(out.live) + Number(out.liveCustomWrapper) + Number(out.fixtureOutcome !== null);
  if (selectedModes !== 1) {
    throw new Error(
      "Choose exactly one mode: --live, --live-custom-wrapper, or --fixture-outcome <outcome>.",
    );
  }
  return out;
}

async function runCommand(cmd, args, cwd) {
  try {
    const { stdout, stderr } = await execFileAsync(cmd, args, { cwd });
    return { exitCode: 0, stdout, stderr };
  } catch (error) {
    return {
      exitCode: Number.isInteger(error?.code) ? error.code : 1,
      stdout: typeof error?.stdout === "string" ? error.stdout : "",
      stderr:
        typeof error?.stderr === "string"
          ? error.stderr
          : error instanceof Error
            ? error.message
            : String(error),
    };
  }
}

async function runCommandStrict(cmd, args, cwd) {
  const result = await runCommand(cmd, args, cwd);
  if (result.exitCode !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed with exit=${String(result.exitCode)}\n${result.stderr}`,
    );
  }
  return result;
}

async function runAgentplane(args, cwd) {
  return runCommandStrict("node", [REPO_AGENTPLANE_BIN, ...args], cwd);
}

async function writeSmokeDocFile(root, fileName, lines) {
  const filePath = path.join(root, fileName);
  await writeFile(filePath, `${lines.join("\n")}\n`, "utf8");
  return filePath;
}

async function initTempRepo() {
  const tempRoot = path.join(REPO_ROOT, ".agentplane", "tmp");
  await mkdir(tempRoot, { recursive: true });
  const root = await mkdtemp(path.join(tempRoot, "runner-codex-smoke-"));
  await runCommandStrict("git", ["init", "-q"], root);
  await runCommandStrict("git", ["config", "user.email", "runner-smoke@example.com"], root);
  await runCommandStrict("git", ["config", "user.name", "runner-smoke"], root);
  await runAgentplane(
    [
      "init",
      "--setup-profile",
      "light",
      "--backend",
      "local",
      "--workflow",
      "direct",
      "--hooks",
      "false",
      "--yes",
    ],
    root,
  );
  await runAgentplane(["config", "set", "runner.timeouts.wall_clock_ms", "180000"], root);
  await runAgentplane(["config", "set", "runner.timeouts.idle_ms", "60000"], root);
  await runAgentplane(["config", "set", "runner.timeouts.terminate_grace_ms", "1000"], root);
  return root;
}

async function configureCustomWrapperRunner(root) {
  const runnerScriptPath = path.join(root, "custom-wrapper-smoke-runner.mjs");
  const runnerScript = [
    'import { mkdir, readFile, writeFile } from "node:fs/promises";',
    'import path from "node:path";',
    "",
    "const bundlePath = process.env.AGENTPLANE_RUNNER_BUNDLE_PATH;",
    "const resultPath = process.env.AGENTPLANE_RUNNER_RESULT_PATH;",
    'if (!bundlePath || !resultPath) throw new Error("Missing runner env paths.");',
    'const bundle = JSON.parse(await readFile(bundlePath, "utf8"));',
    "const target = bundle.target ?? {};",
    'const taskId = bundle.task?.task_id ?? target.task_id ?? (target.kind === "task" ? target.task_id : null);',
    "const runDir = process.env.AGENTPLANE_RUNNER_RUN_DIR ?? path.dirname(resultPath);",
    'if (!taskId) throw new Error("Missing task id in runner bundle.");',
    'const smokeFile = path.join(runDir, "runner-custom-wrapper-smoke-output.md");',
    "await mkdir(path.dirname(smokeFile), { recursive: true });",
    String.raw`await writeFile(smokeFile, "# Runner Custom Wrapper Smoke Output\n\nRUNNER_CUSTOM_WRAPPER_SMOKE_OK\n", "utf8");`,
    "await writeFile(",
    "  resultPath,",
    "  JSON.stringify(",
    "    {",
    "      schema_version: 1,",
    '      status: "success",',
    '      summary: "Custom wrapper smoke completed.",',
    '      capabilities_used: ["custom.wrapper.smoke"],',
    '      artifacts: [{ path: smokeFile, label: "smoke-output" }],',
    "      evidence: {",
    "        evidence_paths: [smokeFile],",
    '        verification_candidates: ["Inspect runner-custom-wrapper-smoke-output.md"],',
    "      },",
    "    },",
    "    null,",
    "    2,",
    "  ),",
    '  "utf8",',
    ");",
    'console.log("custom wrapper smoke ok");',
  ].join("\n");
  await writeFile(runnerScriptPath, runnerScript, "utf8");
  await runAgentplane(["config", "set", "runner.default_adapter", "custom"], root);
  await runAgentplane(
    ["config", "set", "runner.custom.command", JSON.stringify(["node", runnerScriptPath])],
    root,
  );
  await runAgentplane(
    ["config", "set", "runner.custom.enforcement.mode", "codex_sandbox_full_auto"],
    root,
  );
  return { runnerScriptPath };
}

function buildFixtureState(outcome) {
  const base = {
    schema_version: 1,
    runner_api_version: "1",
    run_id: "fixture-run",
    adapter_id: "codex",
    target: { kind: "task", task_id: "FIXTURE-TASK" },
    mode: "execute",
    bundle_path: "/tmp/bundle.json",
    result_path: "/tmp/result.json",
    bootstrap_path: "/tmp/bootstrap.md",
    events_path: "/tmp/events.jsonl",
    trace_path: "/tmp/agent-trace.jsonl",
    stderr_path: "/tmp/stderr.log",
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    },
    timeout_policy: {
      wall_clock_ms: 180_000,
      idle_ms: 60_000,
      terminate_grace_ms: 1000,
    },
    created_at: "2026-03-24T00:00:00.000Z",
    updated_at: "2026-03-24T00:00:01.000Z",
  };
  if (outcome === "success") {
    return {
      ...base,
      status: "success",
      result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-03-24T00:00:00.000Z",
        ended_at: "2026-03-24T00:00:01.000Z",
      },
    };
  }
  if (outcome === "timeout") {
    return {
      ...base,
      status: "failed",
      result: {
        status: "failed",
        exit_code: 124,
        started_at: "2026-03-24T00:00:00.000Z",
        ended_at: "2026-03-24T00:01:00.000Z",
        timeout_reason: "idle",
      },
      supervision: {
        timeout_reason: "idle",
      },
    };
  }
  if (outcome === "policy_refusal") {
    return {
      ...base,
      status: "failed",
      policy_decision: {
        adapter_id: "codex",
        requested: { requires_human_approval: true },
        effective: {},
        fields: {},
        refusal_reason: {
          code: "E_RUNTIME",
          message: "refused",
          policy_field: "requires_human_approval",
          declared_value: true,
        },
      },
    };
  }
  if (outcome === "runner_failure") {
    return {
      ...base,
      status: "failed",
      result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-03-24T00:00:00.000Z",
        ended_at: "2026-03-24T00:00:10.000Z",
      },
    };
  }
  throw new Error(`Unsupported fixture outcome: ${outcome}`);
}

async function createSmokeTask(root) {
  const taskNew = await runAgentplane(
    [
      "task",
      "new",
      "--title",
      "Runner live smoke task",
      "--description",
      "Tiny Codex-backed runner smoke harness task",
      "--owner",
      "CODER",
      "--tag",
      "docs",
    ],
    root,
  );
  const taskId = taskNew.stdout.trim();
  const smokeFile = `.agentplane/tasks/${taskId}/runner-live-smoke-output.md`;
  const verifyStepsFile = await writeSmokeDocFile(root, ".runner-live-smoke-verify-steps.md", [
    `1. Inspect ${smokeFile}. Expected: the file exists and contains RUNNER_LIVE_SMOKE_OK.`,
    "2. Inspect the latest run-state.json. Expected: the smoke run ends in success, timeout, policy refusal, or runner failure with trace artifacts present.",
    "3. Inspect git status --short. Expected: only .agentplane workflow files change inside the temp workspace.",
  ]);
  await runAgentplane(
    [
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      [
        `1. Create ${smokeFile} with the exact marker line RUNNER_LIVE_SMOKE_OK.`,
        "2. Do not modify unrelated repository files.",
        "3. Stop after the task-local artifact exists.",
      ].join("\n"),
      "--updated-by",
      "ORCHESTRATOR",
    ],
    root,
  );
  await runAgentplane(
    [
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--file",
      verifyStepsFile,
      "--updated-by",
      "ORCHESTRATOR",
    ],
    root,
  );
  await runAgentplane(
    ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--note", "Live smoke scope ready"],
    root,
  );
  await runAgentplane(
    [
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: execute the live Codex smoke harness by creating the task-local smoke output file and stopping without unrelated changes.",
    ],
    root,
  );
  return { taskId, smokeFile };
}

async function installCustomWrapperSmokeRecipe(root) {
  const recipeId = "custom-wrapper-smoke";
  const scenarioId = "WRAPPER_SMOKE";
  const recipeDir = path.join(root, ".agentplane", "recipes", recipeId);
  const scenarioRelativePath = "scenarios/wrapper-smoke.json";
  const scenarioPath = path.join(recipeDir, scenarioRelativePath);
  await mkdir(path.dirname(scenarioPath), { recursive: true });
  await writeFile(
    path.join(recipeDir, "manifest.json"),
    JSON.stringify(
      {
        schema_version: "1",
        id: recipeId,
        version: "0.0.1",
        name: "Custom Wrapper Smoke",
        summary: "Exercise the custom runner through codex sandbox full-auto.",
        description:
          "Minimal local recipe used by the live smoke harness for custom wrapper enforcement.",
        tags: ["runner", "smoke", "custom"],
        agents: [
          {
            id: "RECIPE_AGENT",
            display_name: "Recipe Agent",
            role: "executor",
            summary: "Minimal recipe-local smoke agent.",
            file: "agents/recipe-agent.json",
          },
        ],
        scenarios: [
          {
            id: scenarioId,
            name: "Wrapper smoke",
            summary: "Run the custom wrapper smoke scenario.",
            use_when: ["Validate custom wrapper enforcement."],
            required_inputs: [],
            outputs: ["runner-custom-wrapper-smoke-output.md"],
            permissions: [],
            artifacts: ["runner-custom-wrapper-smoke-output.md"],
            agents_involved: ["RECIPE_AGENT"],
            skills_used: [],
            tools_used: [],
            run_profile: {
              mode: "analysis",
              sandbox: "workspace-write",
              expected_exit_contract: "report",
            },
            file: scenarioRelativePath,
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );
  await mkdir(path.join(recipeDir, "agents"), { recursive: true });
  await writeFile(
    path.join(recipeDir, "agents", "recipe-agent.json"),
    JSON.stringify(
      {
        id: "RECIPE_AGENT",
        display_name: "Recipe Agent",
        role: "executor",
        summary: "Minimal recipe-local smoke agent.",
      },
      null,
      2,
    ),
    "utf8",
  );
  await writeFile(
    path.join(recipeDir, "installed.json"),
    JSON.stringify(
      {
        schema_version: 1,
        id: recipeId,
        version: "0.0.1",
        source: "project-local-smoke",
        installed_at: "2026-03-24T00:00:00.000Z",
        tags: ["runner", "smoke", "custom"],
        install_mode: "project-local",
      },
      null,
      2,
    ),
    "utf8",
  );
  await writeFile(
    scenarioPath,
    JSON.stringify(
      {
        schema_version: "1",
        id: scenarioId,
        summary: "Run the custom wrapper smoke scenario.",
        goal: "Create the run-local custom wrapper smoke output file and report success.",
        task_template: {
          title: "Runner live custom wrapper smoke task",
          description: "Tiny custom-adapter runner smoke harness task under codex sandbox wrapper",
          owner: "CODER",
          priority: "med",
          tags: ["code", "runner", "custom", "smoke"],
          doc: {
            verify_steps:
              "1. Inspect the run-local smoke output file.\n2. Inspect run-state/result/trace artifacts.\n3. Confirm the run ends in success.",
          },
        },
        inputs: [],
        outputs: [{ name: "runner-custom-wrapper-smoke-output.md", type: "file" }],
        steps: [],
      },
      null,
      2,
    ),
    "utf8",
  );
  return { recipeId, scenarioId };
}

async function locateLatestRun(root, taskId) {
  const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
  const entries = await readdir(runsRoot, { withFileTypes: true });
  const runId = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
    .at(-1);
  if (!runId) {
    throw new Error(`No runner runs found for task ${taskId}`);
  }
  const runDir = path.join(runsRoot, runId);
  const state = JSON.parse(await readFile(path.join(runDir, "run-state.json"), "utf8"));
  return { runId, runDir, state };
}

async function runLiveSmoke(opts) {
  const root = await initTempRepo();
  let retained = opts.keepWorkspace;
  try {
    const { taskId, smokeFile } = await createSmokeTask(root);
    const execution = await runCommand("node", [REPO_AGENTPLANE_BIN, "task", "run", taskId], root);
    const { runId, runDir, state } = await locateLatestRun(root, taskId);
    const classification = classifyCodexSmokeRun(state);
    if (classification.outcome !== "success") retained = true;
    const smokeFilePath = path.join(root, smokeFile);
    const smokeFileText = await readFile(smokeFilePath, "utf8").catch(() => null);
    const gitStatus = await runCommandStrict("git", ["status", "--short"], root);
    const output = {
      mode: "live",
      workspace: root,
      workspace_retained: retained,
      task_id: taskId,
      run_id: runId,
      run_dir: runDir,
      run_exit_code: execution.exitCode,
      smoke_file: smokeFile,
      smoke_file_present: typeof smokeFileText === "string",
      smoke_marker_present: smokeFileText?.includes("RUNNER_LIVE_SMOKE_OK") === true,
      classification,
      state_path: path.join(runDir, "run-state.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      result_path: path.join(runDir, "result.json"),
      git_status: gitStatus.stdout.trim().split(/\r?\n/u).filter(Boolean),
      stdout_excerpt: execution.stdout.trim().split(/\r?\n/u).slice(-8),
      stderr_excerpt: execution.stderr.trim().split(/\r?\n/u).slice(-8),
    };
    console.log(JSON.stringify(output, null, 2));
    return { exitCode: classification.outcome === "success" ? 0 : 1, retained, root };
  } finally {
    if (!retained) {
      await rm(root, { recursive: true, force: true });
    }
  }
}

async function runLiveCustomWrapperSmoke(opts) {
  const root = await initTempRepo();
  let retained = opts.keepWorkspace;
  try {
    await configureCustomWrapperRunner(root);
    const { recipeId, scenarioId } = await installCustomWrapperSmokeRecipe(root);
    const execution = await runCommand(
      "node",
      [REPO_AGENTPLANE_BIN, "scenario", "execute", `${recipeId}:${scenarioId}`],
      root,
    );
    const taskId = /^task_id: (.+)$/mu.exec(execution.stdout)?.[1]?.trim();
    if (!taskId) {
      throw new Error(`Custom wrapper live smoke did not report a task_id.\n${execution.stdout}`);
    }
    const { runId, runDir, state } = await locateLatestRun(root, taskId);
    const smokeFile = path.join(runDir, "runner-custom-wrapper-smoke-output.md");
    const classification = classifyCodexSmokeRun(state);
    if (classification.outcome !== "success") retained = true;
    const smokeFileText = await readFile(smokeFile, "utf8").catch(() => null);
    const gitStatus = await runCommandStrict("git", ["status", "--short"], root);
    const output = {
      mode: "live_custom_wrapper",
      workspace: root,
      workspace_retained: retained,
      recipe_id: recipeId,
      scenario_id: scenarioId,
      task_id: taskId,
      run_id: runId,
      run_dir: runDir,
      run_exit_code: execution.exitCode,
      smoke_file: smokeFile,
      smoke_file_present: typeof smokeFileText === "string",
      smoke_marker_present: smokeFileText?.includes("RUNNER_CUSTOM_WRAPPER_SMOKE_OK") === true,
      classification,
      state_path: path.join(runDir, "run-state.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      result_path: path.join(runDir, "result.json"),
      git_status: gitStatus.stdout.trim().split(/\r?\n/u).filter(Boolean),
      stdout_excerpt: execution.stdout.trim().split(/\r?\n/u).slice(-8),
      stderr_excerpt: execution.stderr.trim().split(/\r?\n/u).slice(-8),
    };
    console.log(JSON.stringify(output, null, 2));
    return { exitCode: classification.outcome === "success" ? 0 : 1, retained, root };
  } finally {
    if (!retained) {
      await rm(root, { recursive: true, force: true });
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.fixtureOutcome) {
    const state = buildFixtureState(args.fixtureOutcome);
    const classification = classifyCodexSmokeRun(state);
    const output = {
      mode: "fixture",
      fixture_outcome: args.fixtureOutcome,
      classification,
    };
    console.log(JSON.stringify(output, null, 2));
    process.exitCode = classification.outcome === args.fixtureOutcome ? 0 : 1;
    return;
  }

  if (args.liveCustomWrapper) {
    const result = await runLiveCustomWrapperSmoke(args);
    process.exitCode = result.exitCode;
    return;
  }

  const result = await runLiveSmoke(args);
  process.exitCode = result.exitCode;
}

try {
  await main();
} catch (error) {
  usage();
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
