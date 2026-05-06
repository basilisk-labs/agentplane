import path from "node:path";

import type { RunnerContextBundle } from "../../agentplane/src/runner/types.js";
import {
  RUNNER_API_VERSION,
  RUNNER_BUNDLE_SCHEMA_VERSION,
} from "../../agentplane/src/runner/types.js";
import { writeExecutableFile } from "./fixtures.js";

type MakeRunnerContextBundleOptions = {
  adapterId?: string;
  taskId?: string;
  runId?: string;
  gitRoot?: string;
  workflowDir?: string;
  title?: string;
  description?: string;
  status?: string;
  owner?: string;
  priority?: string;
  tags?: string[];
  mode?: RunnerContextBundle["execution"]["mode"];
  doc?: string;
  sections?: Record<string, string>;
  basePrompts?: RunnerContextBundle["base_prompts"];
  target?: RunnerContextBundle["target"];
  recipe?: RunnerContextBundle["recipe"];
  repository?: Partial<RunnerContextBundle["repository"]>;
  task?: Partial<RunnerContextBundle["task"]>;
  execution?: Partial<Omit<RunnerContextBundle["execution"], "artifact_paths">> & {
    artifact_paths?: Partial<RunnerContextBundle["execution"]["artifact_paths"]>;
  };
};

export function setRunnerBundleRunDir(bundle: RunnerContextBundle, runDir: string): void {
  bundle.execution.artifact_paths.run_dir = runDir;
  bundle.execution.artifact_paths.bundle_path = path.join(runDir, "bundle.json");
  bundle.execution.artifact_paths.blueprint_plan_path = path.join(runDir, "blueprint-plan.json");
  bundle.execution.artifact_paths.blueprint_execution_plan_path = path.join(
    runDir,
    "blueprint-execution-plan.json",
  );
  bundle.execution.artifact_paths.context_manifest_path = path.join(
    runDir,
    "context-manifest.json",
  );
  bundle.execution.artifact_paths.bootstrap_path = path.join(runDir, "bootstrap.md");
  bundle.execution.artifact_paths.state_path = path.join(runDir, "run-state.json");
  bundle.execution.artifact_paths.events_path = path.join(runDir, "events.jsonl");
  bundle.execution.artifact_paths.result_path = path.join(runDir, "result.json");
  bundle.execution.artifact_paths.trace_path = path.join(runDir, "agent-trace.jsonl");
  bundle.execution.artifact_paths.stderr_path = path.join(runDir, "stderr.log");
}

export function makeRunnerContextBundle(
  opts: MakeRunnerContextBundleOptions = {},
): RunnerContextBundle {
  const taskId = opts.taskId ?? "202603231410-ABC123";
  const runId = opts.runId ?? "run-123";
  const gitRoot = opts.gitRoot ?? "/repo";
  const workflowDir = opts.workflowDir ?? ".agentplane/tasks";
  const runDir = path.join(gitRoot, workflowDir, taskId, "runs", runId);
  const title = opts.title ?? "Adapter test";
  const description = opts.description ?? "Adapter test task";
  const status = opts.status ?? "TODO";
  const adapterId = opts.adapterId ?? "codex";
  const executionPathOverrides = opts.execution?.artifact_paths ?? {};
  const executionRest = opts.execution ? { ...opts.execution } : null;
  if (executionRest) delete executionRest.artifact_paths;
  const execution: RunnerContextBundle["execution"] = {
    adapter_id: adapterId,
    mode: opts.mode ?? "dry_run",
    run_id: runId,
    timeout_policy: {
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    },
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    },
    artifact_paths: {
      run_dir: runDir,
      bundle_path: path.join(runDir, "bundle.json"),
      blueprint_plan_path: path.join(runDir, "blueprint-plan.json"),
      blueprint_execution_plan_path: path.join(runDir, "blueprint-execution-plan.json"),
      context_manifest_path: path.join(runDir, "context-manifest.json"),
      bootstrap_path: path.join(runDir, "bootstrap.md"),
      state_path: path.join(runDir, "run-state.json"),
      events_path: path.join(runDir, "events.jsonl"),
      result_path: path.join(runDir, "result.json"),
      trace_path: path.join(runDir, "agent-trace.jsonl"),
      stderr_path: path.join(runDir, "stderr.log"),
      ...executionPathOverrides,
    },
  };
  if (executionRest) Object.assign(execution, executionRest);
  const bundle: RunnerContextBundle = {
    schema_version: RUNNER_BUNDLE_SCHEMA_VERSION,
    runner_api_version: RUNNER_API_VERSION,
    target: opts.target ?? { kind: "task", task_id: taskId },
    base_prompts: opts.basePrompts ?? [],
    repository: {
      git_root: gitRoot,
      workflow_dir: workflowDir,
      backend_id: "local",
      backend_config_path: path.join(gitRoot, ".agentplane/backends/local/backend.json"),
      branch: "main",
      head_commit: null,
      ...opts.repository,
    },
    task: {
      task_id: taskId,
      data: {
        id: taskId,
        title,
        description,
        status,
        priority: opts.priority ?? "med",
        owner: opts.owner ?? "CODER",
        depends_on: [],
        tags: opts.tags ?? ["code"],
        verify: [],
      },
      frontmatter: { id: taskId, title },
      doc: opts.doc ?? "## Summary\n",
      sections: opts.sections ?? { Summary: "" },
      comments: [],
      events: [],
      ...opts.task,
    },
    execution,
    ...(opts.recipe ? { recipe: opts.recipe } : {}),
  };
  return bundle;
}

export async function writeRunnerExecutable(
  root: string,
  commandName: string,
  content: string | readonly string[],
): Promise<string> {
  return await writeExecutableFile(root, path.join("bin", commandName), content);
}
