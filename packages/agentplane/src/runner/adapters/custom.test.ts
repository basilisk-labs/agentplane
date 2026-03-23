import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import type { RunnerContextBundle } from "../types.js";
import { createRunnerAdapter } from "./index.js";

function makeBundle(): RunnerContextBundle {
  return {
    schema_version: 1,
    runner_api_version: "1",
    target: { kind: "task", task_id: "202603231410-XYZ789" },
    base_prompts: [],
    repository: {
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      backend_id: "local",
      backend_config_path: "/repo/.agentplane/backends/local/backend.json",
      branch: "main",
      head_commit: null,
    },
    task: {
      task_id: "202603231410-XYZ789",
      data: {
        id: "202603231410-XYZ789",
        title: "Custom adapter test",
        description: "Custom adapter test task",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: [],
      },
      frontmatter: { id: "202603231410-XYZ789", title: "Custom adapter test" },
      doc: "## Summary\n",
      sections: { Summary: "" },
      comments: [],
      events: [],
    },
    execution: {
      adapter_id: "custom",
      mode: "dry_run",
      run_id: "run-789",
      artifact_paths: {
        run_dir: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789",
        bundle_path: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/bundle.json",
        bootstrap_path: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/bootstrap.md",
        state_path: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/run-state.json",
        events_path: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/events.jsonl",
        result_path: "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/result.json",
      },
    },
  };
}

describe("CustomRunnerAdapter", () => {
  it("requires config.runner.custom.command and exports bundle paths via env", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      env: {
        CUSTOM_TOKEN: "token",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const bundle = makeBundle();

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual(["custom-runner", "--bundle-from-env"]);
    expect(invocation.env).toMatchObject({
      CUSTOM_TOKEN: "token",
      AGENTPLANE_RUNNER_ADAPTER: "custom",
      AGENTPLANE_RUNNER_MODE: "dry_run",
      AGENTPLANE_RUNNER_TARGET: "task",
      AGENTPLANE_RUNNER_BUNDLE_PATH:
        "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/bundle.json",
      AGENTPLANE_RUNNER_BOOTSTRAP_PATH:
        "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/bootstrap.md",
      AGENTPLANE_RUNNER_STATE_PATH:
        "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/run-state.json",
      AGENTPLANE_RUNNER_EVENTS_PATH:
        "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/events.jsonl",
      AGENTPLANE_RUNNER_RESULT_PATH:
        "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/result.json",
    });
  });

  it("rejects custom adapter selection when no external command is configured", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    const adapter = createRunnerAdapter(raw);

    expect(() => adapter.prepare(makeBundle())).toThrow(
      "Custom runner adapter requires config.runner.custom.command",
    );
  });

  it("captures success-path stdout and persists custom runner state", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      env: {
        CUSTOM_TOKEN: "token",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-custom-adapter-success-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    const bundle = makeBundle();
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    bundle.execution.artifact_paths.run_dir = path.join(tempDir, "runs", "run-789");
    bundle.execution.artifact_paths.bundle_path = path.join(
      bundle.execution.artifact_paths.run_dir,
      "bundle.json",
    );
    bundle.execution.artifact_paths.bootstrap_path = path.join(
      bundle.execution.artifact_paths.run_dir,
      "bootstrap.md",
    );
    bundle.execution.artifact_paths.state_path = path.join(
      bundle.execution.artifact_paths.run_dir,
      "run-state.json",
    );
    bundle.execution.artifact_paths.events_path = path.join(
      bundle.execution.artifact_paths.run_dir,
      "events.jsonl",
    );
    bundle.execution.artifact_paths.result_path = path.join(
      bundle.execution.artifact_paths.run_dir,
      "result.json",
    );

    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      ["#!/bin/sh", "cat >/dev/null", String.raw`printf "custom runner ok\n"`, "exit 0"].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("success");
    expect(result.exit_code).toBe(0);
    expect(result.stdout_summary).toContain("custom runner ok");
    expect(result.metrics?.stdout_bytes).toBeGreaterThan(0);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      prepared_metadata?: { bootstrap_sha256: string };
      result?: {
        status: string;
        exit_code: number | null;
        stdout_summary?: string;
        metrics?: { stdout_bytes?: number };
      };
    };
    expect(state.status).toBe("success");
    expect(state.prepared_metadata?.bootstrap_sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(state.result?.status).toBe("success");
    expect(state.result?.exit_code).toBe(0);
    expect(state.result?.stdout_summary).toContain("custom runner ok");
    expect(state.result?.metrics?.stdout_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      capabilities_used?: string[];
    };
    expect(resultManifest.status).toBe("success");
    expect(resultManifest.summary).toContain("custom runner ok");
    expect(resultManifest.capabilities_used).toEqual(["custom:custom-runner"]);
    const events = await readFile(invocation.events_path, "utf8");
    expect(events).toContain('"type":"runner_prepared"');
    expect(events).toContain('"type":"runner_execute_start"');
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stdout_bytes"');

    await rm(tempDir, { recursive: true, force: true });
  });
});
