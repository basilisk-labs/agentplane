import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import type {
  RunnerContextBundle,
  RunnerEvent,
  RunnerLifecycleStatus,
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

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}
