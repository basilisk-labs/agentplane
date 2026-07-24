import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { renderCodexResultOutputSchemaJson } from "./adapters/codex-result-transport.js";
import {
  appendStableRegularFileNoFollow,
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "./stable-file.js";
import type {
  RunnerContextBundle,
  RunnerEvent,
  RunnerInvocation,
  RunnerInvocationSnapshot,
  RunnerLifecycleStatus,
  RunnerPreparedMetadata,
  RunnerResult,
  RunnerRunState,
  RunnerSupervisionState,
} from "./types.js";

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function byteLength(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

function invocationSnapshotSha256(invocation: RunnerInvocation): string {
  return sha256(JSON.stringify(createRunnerInvocationSnapshot(invocation)));
}

export function createRunnerInvocationSnapshot(
  invocation?: RunnerInvocation | null,
): RunnerInvocationSnapshot {
  return {
    executable: invocation?.argv[0] ?? null,
    argv: [...(invocation?.argv ?? [])],
    argv_count: invocation?.argv.length ?? 0,
    env_keys: Object.keys(invocation?.env ?? {}).toSorted(),
    work_order_id: invocation?.work_order_id ?? null,
    repository_root: invocation?.repository_root ?? null,
    cwd: invocation?.repository_root ?? null,
    run_dir: invocation?.run_dir ?? null,
    bundle_path: invocation?.bundle_path ?? null,
    state_path: invocation?.state_path ?? null,
    events_path: invocation?.events_path ?? null,
    result_path: invocation?.result_path ?? null,
    receipt_path: invocation?.receipt_path ?? null,
    trace_path: invocation?.trace_path ?? null,
    stderr_path: invocation?.stderr_path ?? null,
    bootstrap_path: invocation?.bootstrap_path ?? null,
    output_last_message_path: invocation?.output_last_message_path ?? null,
    filesystem_effect_containment: invocation?.filesystem_effect_containment
      ? structuredClone(invocation.filesystem_effect_containment)
      : null,
    dry_run: invocation?.dry_run ?? false,
    has_result_path:
      typeof invocation?.result_path === "string" && invocation.result_path.length > 0,
    has_output_last_message_path:
      typeof invocation?.output_last_message_path === "string" &&
      invocation.output_last_message_path.trim().length > 0,
  };
}

function buildPreparedMetadata(opts: {
  bundle: RunnerContextBundle;
  invocation?: RunnerInvocation;
  bundle_text: string;
  bootstrap_text: string;
}): RunnerPreparedMetadata {
  return {
    prompt_count: opts.bundle.base_prompts.length,
    bundle_bytes: byteLength(opts.bundle_text),
    bootstrap_bytes: byteLength(opts.bootstrap_text),
    bundle_sha256: sha256(opts.bundle_text),
    bootstrap_sha256: sha256(opts.bootstrap_text),
    has_task_context: !!opts.bundle.task,
    has_recipe_context: !!opts.bundle.recipe,
    trace_policy: opts.bundle.execution.trace_policy,
    timeout_policy: opts.bundle.execution.timeout_policy,
    adapter_capabilities: opts.bundle.execution.adapter_capabilities,
    adapter_capability_registry: opts.bundle.execution.adapter_capability_registry,
    policy_decision: opts.bundle.execution.policy_decision,
    invocation: createRunnerInvocationSnapshot(opts.invocation),
  };
}

export function createRunnerRunState(opts: {
  bundle: RunnerContextBundle;
  status?: RunnerLifecycleStatus;
  created_at?: string;
  prepared_metadata?: RunnerRunState["prepared_metadata"];
}): RunnerRunState {
  const created_at = opts.created_at ?? new Date().toISOString();
  return {
    schema_version: opts.bundle.schema_version,
    runner_api_version: opts.bundle.runner_api_version,
    run_id: opts.bundle.execution.run_id,
    adapter_id: opts.bundle.execution.adapter_id,
    target: opts.bundle.target,
    status: opts.status ?? "prepared",
    mode: opts.bundle.execution.mode,
    bundle_path: opts.bundle.execution.artifact_paths.bundle_path,
    result_path: opts.bundle.execution.artifact_paths.result_path,
    receipt_path: opts.bundle.execution.artifact_paths.receipt_path,
    bootstrap_path: opts.bundle.execution.artifact_paths.bootstrap_path,
    events_path: opts.bundle.execution.artifact_paths.events_path,
    trace_path: opts.bundle.execution.artifact_paths.trace_path,
    stderr_path: opts.bundle.execution.artifact_paths.stderr_path,
    trace_policy: opts.bundle.execution.trace_policy,
    timeout_policy: opts.bundle.execution.timeout_policy,
    policy_decision: opts.bundle.execution.policy_decision,
    created_at,
    updated_at: created_at,
    prepared_metadata: opts.prepared_metadata,
  };
}

export async function writePreparedRunnerArtifacts(opts: {
  bundle: RunnerContextBundle;
  bootstrap_markdown?: string;
  created_at?: string;
  invocation?: RunnerInvocation;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<RunnerRunState> {
  const paths = opts.bundle.execution.artifact_paths;
  await mkdir(paths.run_dir, { recursive: true });
  const bundleText = `${JSON.stringify(opts.bundle, null, 2)}\n`;
  const bootstrapText = opts.bootstrap_markdown
    ? ensureTrailingNewline(opts.bootstrap_markdown)
    : "";
  const preparedMetadata = buildPreparedMetadata({
    bundle: opts.bundle,
    invocation: opts.invocation,
    bundle_text: bundleText,
    bootstrap_text: bootstrapText,
  });
  if (opts.invocation) {
    opts.invocation.supervisor_prepared_input = {
      bundle: structuredClone(opts.bundle),
      bundle_bytes: preparedMetadata.bundle_bytes,
      bundle_sha256: preparedMetadata.bundle_sha256,
      bootstrap_bytes: preparedMetadata.bootstrap_bytes,
      bootstrap_sha256: preparedMetadata.bootstrap_sha256,
      invocation_snapshot_sha256: invocationSnapshotSha256(opts.invocation),
    };
  }

  const state = createRunnerRunState({
    bundle: opts.bundle,
    created_at: opts.created_at,
    prepared_metadata: preparedMetadata,
  });

  const writePreparedFile = async (
    filePath: string,
    contents: string,
    label: string,
  ): Promise<void> => {
    await opts.assert_artifact_boundary?.(`before writing ${label}`);
    await writeNewStableRegularFileNoFollow(filePath, contents, label);
    await opts.assert_artifact_boundary?.(`after writing ${label}`);
  };

  await writePreparedFile(paths.bundle_path, bundleText, "runner prepared bundle");
  if (opts.invocation?.output_schema_path) {
    const schemaPath = path.resolve(opts.invocation.output_schema_path);
    const relativeSchemaPath = path.relative(path.resolve(paths.run_dir), schemaPath);
    if (
      relativeSchemaPath === "" ||
      relativeSchemaPath === ".." ||
      relativeSchemaPath.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relativeSchemaPath)
    ) {
      throw new Error("Runner output schema path must be a file inside run_dir.");
    }
    await writePreparedFile(
      schemaPath,
      renderCodexResultOutputSchemaJson(),
      "runner prepared output schema",
    );
  }
  await writePreparedFile(
    paths.state_path,
    `${JSON.stringify(state, null, 2)}\n`,
    "runner prepared state",
  );
  await writePreparedFile(paths.bootstrap_path, bootstrapText, "runner prepared bootstrap");
  await writePreparedFile(paths.events_path, "", "runner prepared events");
  await writePreparedFile(paths.trace_path, "", "runner prepared trace");
  await writePreparedFile(paths.stderr_path, "", "runner prepared stderr");
  await appendRunnerEvent({
    events_path: paths.events_path,
    event: {
      at: state.created_at,
      type: "runner_prepared",
      message: `runner prepared with adapter=${opts.bundle.execution.adapter_id} mode=${opts.bundle.execution.mode}`,
      data: {
        prompt_count: preparedMetadata.prompt_count,
        bundle_bytes: preparedMetadata.bundle_bytes,
        bootstrap_bytes: preparedMetadata.bootstrap_bytes,
        bundle_sha256: preparedMetadata.bundle_sha256,
        bootstrap_sha256: preparedMetadata.bootstrap_sha256,
        has_task_context: preparedMetadata.has_task_context,
        has_recipe_context: preparedMetadata.has_recipe_context,
        trace_policy: preparedMetadata.trace_policy,
        timeout_policy: preparedMetadata.timeout_policy,
        adapter_capabilities: preparedMetadata.adapter_capabilities,
        adapter_capability_registry: preparedMetadata.adapter_capability_registry,
        policy_decision: preparedMetadata.policy_decision,
        invocation: preparedMetadata.invocation,
      },
    },
  });

  return state;
}

export async function appendRunnerEvent(opts: {
  events_path: string;
  event: RunnerEvent;
}): Promise<void> {
  await mkdir(path.dirname(opts.events_path), { recursive: true });
  await appendStableRegularFileNoFollow(
    opts.events_path,
    `${JSON.stringify(opts.event)}\n`,
    "runner events file",
  );
}

export async function readRunnerRunState(state_path: string): Promise<RunnerRunState | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const raw = await readStableRegularTextNoFollow(state_path, "runner state file");
      return JSON.parse(raw) as RunnerRunState;
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code === "ENOENT") return null;
      const message = err instanceof Error ? err.message : String(err);
      const replacedDuringAtomicWrite =
        message.startsWith("runner state file ") &&
        (message.includes(" changed before it could be read:") ||
          message.includes(" changed while it was being read:") ||
          message.includes(" path changed while it was being read:"));
      if (!replacedDuringAtomicWrite || attempt === 3) throw err;
      await new Promise<void>((resolve) => setImmediate(resolve));
    }
  }
  return null;
}

export function evolveRunnerRunState(opts: {
  state: RunnerRunState;
  status: RunnerLifecycleStatus;
  result?: RunnerResult;
  updated_at?: string;
  supervision?: RunnerSupervisionState;
}): RunnerRunState {
  const updated_at = opts.updated_at ?? new Date().toISOString();
  return {
    ...opts.state,
    status: opts.status,
    updated_at,
    supervision: opts.supervision ?? opts.state.supervision,
    result: opts.result,
  };
}

export async function writeRunnerRunState(opts: {
  state_path: string;
  state: RunnerRunState;
}): Promise<void> {
  await mkdir(path.dirname(opts.state_path), { recursive: true });
  await atomicWriteFile(opts.state_path, `${JSON.stringify(opts.state, null, 2)}\n`, "utf8");
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}
