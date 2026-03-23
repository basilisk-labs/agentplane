import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import type {
  RunnerContextBundle,
  RunnerEvent,
  RunnerLifecycleStatus,
  RunnerResult,
  RunnerRunState,
} from "./types.js";

export function createRunnerRunState(opts: {
  bundle: RunnerContextBundle;
  status?: RunnerLifecycleStatus;
  created_at?: string;
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
    bootstrap_path: opts.bundle.execution.artifact_paths.bootstrap_path,
    events_path: opts.bundle.execution.artifact_paths.events_path,
    created_at,
    updated_at: created_at,
  };
}

export async function writePreparedRunnerArtifacts(opts: {
  bundle: RunnerContextBundle;
  bootstrap_markdown?: string;
  created_at?: string;
}): Promise<RunnerRunState> {
  const paths = opts.bundle.execution.artifact_paths;
  await mkdir(paths.run_dir, { recursive: true });

  const state = createRunnerRunState({
    bundle: opts.bundle,
    created_at: opts.created_at,
  });

  await atomicWriteFile(paths.bundle_path, `${JSON.stringify(opts.bundle, null, 2)}\n`, "utf8");
  await atomicWriteFile(paths.state_path, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await atomicWriteFile(
    paths.bootstrap_path,
    opts.bootstrap_markdown ? ensureTrailingNewline(opts.bootstrap_markdown) : "",
    "utf8",
  );
  await atomicWriteFile(paths.events_path, "", "utf8");

  return state;
}

export async function appendRunnerEvent(opts: {
  events_path: string;
  event: RunnerEvent;
}): Promise<void> {
  await mkdir(path.dirname(opts.events_path), { recursive: true });
  await appendFile(opts.events_path, `${JSON.stringify(opts.event)}\n`, "utf8");
}

export async function readRunnerRunState(state_path: string): Promise<RunnerRunState | null> {
  try {
    const raw = await readFile(state_path, "utf8");
    return JSON.parse(raw) as RunnerRunState;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export function evolveRunnerRunState(opts: {
  state: RunnerRunState;
  status: RunnerLifecycleStatus;
  result?: RunnerResult;
  updated_at?: string;
}): RunnerRunState {
  const updated_at = opts.updated_at ?? new Date().toISOString();
  return {
    ...opts.state,
    status: opts.status,
    updated_at,
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
