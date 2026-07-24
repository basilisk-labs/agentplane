import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { appendRunnerEvent, writePreparedRunnerArtifacts } from "./artifacts.js";
import { resolveTaskRunnerPaths } from "./task-run-paths.js";
import type { RunnerContextBundle } from "./types.js";
import { RUNNER_API_VERSION, RUNNER_BUNDLE_SCHEMA_VERSION } from "./types.js";
import { resolveRunnerAdapterCapabilityRegistry } from "../runtime/capabilities/index.js";

describe("runner artifacts", () => {
  let tempDir = "";

  afterEach(async () => {
    if (tempDir) {
      const { rm } = await import("node:fs/promises");
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("writes bundle, bootstrap, trace, stderr, state, and events layout deterministically", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-runner-artifacts-"));
    const paths = resolveTaskRunnerPaths({
      git_root: tempDir,
      workflow_dir: ".agentplane/tasks",
      task_id: "202603231310-NT5V5C",
      run_id: "2026-03-23T13-00-00-000Z",
    });

    const bundle: RunnerContextBundle = {
      schema_version: RUNNER_BUNDLE_SCHEMA_VERSION,
      runner_api_version: RUNNER_API_VERSION,
      target: { kind: "task", task_id: "202603231310-NT5V5C" },
      base_prompts: [],
      repository: {
        git_root: tempDir,
        workflow_dir: ".agentplane/tasks",
        backend_id: "local",
        backend_config_path: path.join(tempDir, ".agentplane/backends/local/backend.json"),
      },
      task: {
        task_id: "202603231310-NT5V5C",
        data: {
          id: "202603231310-NT5V5C",
          title: "R3",
          description: "Define runner bundle contract",
          status: "DOING",
          priority: "high",
          owner: "CODER",
          depends_on: [],
          tags: ["runner"],
          verify: [],
        },
        frontmatter: { id: "202603231310-NT5V5C", status: "DOING" },
        doc: "## Summary\n\nBundle contract",
        sections: { Summary: "Bundle contract" },
        comments: [],
        events: [],
        readme_path: path.join(tempDir, ".agentplane/tasks/202603231310-NT5V5C/README.md"),
      },
      execution: {
        adapter_id: "codex",
        mode: "dry_run",
        run_id: "2026-03-23T13-00-00-000Z",
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
        artifact_paths: paths,
        adapter_capabilities: {
          adapter_id: "codex",
          fields: {
            sandbox: {
              level: "native",
              channel: "argv",
              supported_values: ["read-only", "workspace-write", "danger-full-access"],
            },
          },
        },
        adapter_capability_registry: resolveRunnerAdapterCapabilityRegistry({
          adapter_id: "codex",
          capabilities: {
            adapter_id: "codex",
            fields: {
              sandbox: {
                level: "native",
                channel: "argv",
                supported_values: ["read-only", "workspace-write", "danger-full-access"],
              },
            },
          },
          requested: { sandbox: "read-only" },
        }),
      },
    };
    const invocation = {
      adapter_id: "codex",
      run_id: "2026-03-23T13-00-00-000Z",
      work_order_id: "2026-03-23T13-00-00-000Z",
      repository_root: tempDir,
      run_dir: paths.run_dir,
      bundle_path: paths.bundle_path,
      state_path: paths.state_path,
      events_path: paths.events_path,
      result_path: paths.result_path,
      receipt_path: paths.receipt_path,
      trace_path: paths.trace_path,
      stderr_path: paths.stderr_path,
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 65_536,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 900_000,
        idle_ms: 180_000,
        terminate_grace_ms: 1500,
      },
      bootstrap_path: paths.bootstrap_path,
      output_last_message_path: path.join(paths.run_dir, "codex-last-message.md"),
      argv: ["codex", "exec", "-"],
      env: {
        AGENTPLANE_RUNNER_ADAPTER: "codex",
        AGENTPLANE_RUNNER_MODE: "dry_run",
      },
      dry_run: true,
    };

    const state = await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "# bootstrap\n",
      created_at: "2026-03-23T13:00:00.000Z",
      invocation,
    });

    expect(state.status).toBe("prepared");
    expect(state.bundle_path).toBe(paths.bundle_path);
    expect(state.trace_path).toBe(paths.trace_path);
    expect(state.stderr_path).toBe(paths.stderr_path);
    expect(state.prepared_metadata).toMatchObject({
      prompt_count: 0,
      has_task_context: true,
      has_recipe_context: false,
      trace_policy: {
        mode: "raw",
        max_tail_bytes: 65_536,
        capture_stderr: true,
      },
      timeout_policy: {
        wall_clock_ms: 900_000,
        idle_ms: 180_000,
        terminate_grace_ms: 1500,
      },
      adapter_capabilities: {
        adapter_id: "codex",
        fields: {
          sandbox: {
            level: "native",
            channel: "argv",
            supported_values: ["read-only", "workspace-write", "danger-full-access"],
          },
        },
      },
      invocation: {
        executable: "codex",
        argv_count: 3,
        env_keys: ["AGENTPLANE_RUNNER_ADAPTER", "AGENTPLANE_RUNNER_MODE"],
        cwd: tempDir,
        has_result_path: true,
        has_output_last_message_path: true,
      },
    });
    expect(state.prepared_metadata?.adapter_capability_registry?.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.adapter.codex",
          availability: "available",
        }),
        expect.objectContaining({
          id: "runner.adapter.codex.policy_field.sandbox",
          availability: "available",
          value: "read-only",
        }),
      ]),
    );

    const writtenBundle = JSON.parse(
      await readFile(paths.bundle_path, "utf8"),
    ) as RunnerContextBundle;
    expect(writtenBundle.execution.artifact_paths.run_dir).toBe(paths.run_dir);
    expect(writtenBundle.execution.adapter_capabilities?.adapter_id).toBe("codex");
    expect(writtenBundle.execution.adapter_capability_registry?.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.adapter.codex.policy_field.sandbox",
          availability: "available",
        }),
      ]),
    );

    const writtenState = JSON.parse(await readFile(paths.state_path, "utf8")) as {
      status: string;
      run_id: string;
      created_at: string;
      prepared_metadata?: {
        trace_policy?: {
          mode: string;
          max_tail_bytes: number;
          capture_stderr: boolean;
        };
        timeout_policy?: {
          wall_clock_ms: number;
          idle_ms: number;
          terminate_grace_ms: number;
        };
        adapter_capabilities?: {
          adapter_id: string;
        };
        adapter_capability_registry?: {
          entries: { id: string; availability: string }[];
        };
      };
    };
    expect(writtenState).toMatchObject({
      status: "prepared",
      run_id: "2026-03-23T13-00-00-000Z",
      created_at: "2026-03-23T13:00:00.000Z",
      trace_path: paths.trace_path,
      stderr_path: paths.stderr_path,
    });
    expect(writtenState.prepared_metadata?.trace_policy).toEqual({
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    });
    expect(writtenState.prepared_metadata?.timeout_policy).toEqual({
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    });
    expect(writtenState.prepared_metadata?.adapter_capabilities?.adapter_id).toBe("codex");
    expect(writtenState.prepared_metadata?.adapter_capability_registry?.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.adapter.codex",
          availability: "available",
        }),
      ]),
    );

    expect(await readFile(paths.bootstrap_path, "utf8")).toBe("# bootstrap\n");
    expect(await readFile(paths.trace_path, "utf8")).toBe("");
    expect(await readFile(paths.stderr_path, "utf8")).toBe("");
    const initialEvents = await readFile(paths.events_path, "utf8");
    expect(initialEvents).toContain('"type":"runner_prepared"');
    expect(initialEvents).toContain('"bundle_sha256"');

    await appendRunnerEvent({
      events_path: paths.events_path,
      event: {
        at: "2026-03-23T13:00:01.000Z",
        type: "bundle_written",
        message: "bundle.json created",
      },
    });
    expect(await readFile(paths.events_path, "utf8")).toContain('"type":"bundle_written"');
  });
});
