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
    target: { kind: "task", task_id: "202603231410-ABC123" },
    base_prompts: [
      {
        id: "base.policy_gateway",
        role: "policy",
        content: "do not inline this policy text into argv",
        priority: 200,
      },
    ],
    repository: {
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      backend_id: "local",
      backend_config_path: "/repo/.agentplane/backends/local/backend.json",
      branch: "main",
      head_commit: null,
    },
    task: {
      task_id: "202603231410-ABC123",
      data: {
        id: "202603231410-ABC123",
        title: "Adapter test",
        description: "Adapter test task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: [],
      },
      frontmatter: { id: "202603231410-ABC123", title: "Adapter test" },
      doc: "## Summary\n",
      sections: { Summary: "" },
      comments: [],
      events: [],
    },
    execution: {
      adapter_id: "codex",
      mode: "dry_run",
      run_id: "run-123",
      artifact_paths: {
        run_dir: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
        bundle_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
        bootstrap_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bootstrap.md",
        state_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/run-state.json",
        events_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/events.jsonl",
        result_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/result.json",
      },
    },
  };
}

describe("CodexRunnerAdapter", () => {
  it("returns normalized invocation metadata from bundle path and config-selected adapter", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeBundle();

    const invocation = await adapter.prepare(bundle);

    expect(invocation).toMatchObject({
      adapter_id: "codex",
      run_id: "run-123",
      run_dir: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
      bundle_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
      state_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/run-state.json",
      events_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/events.jsonl",
      result_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/result.json",
      bootstrap_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bootstrap.md",
      output_last_message_path:
        "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-last-message.md",
      dry_run: true,
      env: {
        AGENTPLANE_RUNNER_ADAPTER: "codex",
        AGENTPLANE_RUNNER_MODE: "dry_run",
        AGENTPLANE_RUNNER_API_VERSION: "1",
        AGENTPLANE_RUNNER_TARGET: "task",
      },
    });
    expect(invocation.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--json",
      "--output-last-message",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-last-message.md",
      "-C",
      "/repo",
      "-s",
      "danger-full-access",
      "-",
    ]);
    expect(invocation.argv.join(" ")).not.toContain("do not inline this policy text into argv");
  });

  it("maps recipe run_profile sandbox into codex argv and exports the remaining fields via env", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeBundle();
    bundle.target = {
      kind: "recipe_scenario",
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      task_id: "202603231410-ABC123",
    };
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        mode: "analysis",
        sandbox: "read-only",
        requires_human_approval: true,
        writes_artifacts_to: ["reports", "logs"],
        expected_exit_contract: "exit_zero",
      },
    };

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--json",
      "--output-last-message",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-last-message.md",
      "-C",
      "/repo",
      "-s",
      "read-only",
      "-",
    ]);
    expect(invocation.env).toMatchObject({
      AGENTPLANE_RECIPE_MODE: "analysis",
      AGENTPLANE_RECIPE_SANDBOX: "read-only",
      AGENTPLANE_RECIPE_REQUIRES_HUMAN_APPROVAL: "true",
      AGENTPLANE_RECIPE_EXPECTED_EXIT_CONTRACT: "exit_zero",
      AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["reports", "logs"]),
    });
  });

  it("falls back to the default codex sandbox when recipe run_profile sandbox is unsupported", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeBundle();
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        mode: "analysis",
        sandbox: "custom-sandbox",
      },
    };

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--json",
      "--output-last-message",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-last-message.md",
      "-C",
      "/repo",
      "-s",
      "danger-full-access",
      "-",
    ]);
    expect(invocation.env.AGENTPLANE_RECIPE_SANDBOX).toBe("custom-sandbox");
  });

  it("captures success-path result details and persists run-state updates", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-success-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const fakeCodexPath = path.join(fakeBinDir, "codex");
    const bundle = makeBundle();
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    bundle.execution.artifact_paths.run_dir = path.join(tempDir, "runs", "run-123");
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
      fakeCodexPath,
      [
        "#!/bin/sh",
        'out=""',
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    --output-last-message|-C|-s|-a)",
        '      if [ "$1" = "--output-last-message" ]; then out="$2"; fi',
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '{"type":"session.started"}\n'`,
        String.raw`printf 'Final fake Codex message\n' > "$out"`,
        String.raw`printf 'fake stdout ok\n'`,
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeCodexPath, 0o755);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("success");
    expect(result.exit_code).toBe(0);
    expect(result.stdout_summary).toContain("Final fake Codex message");
    expect(result.metrics?.stdout_bytes).toBeGreaterThan(0);
    expect(result.metrics?.duration_ms).toBeGreaterThanOrEqual(0);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      prepared_metadata?: { bundle_bytes: number; bundle_sha256: string };
      result?: {
        status: string;
        exit_code: number | null;
        stdout_summary?: string;
        metrics?: { stdout_bytes?: number; output_last_message_bytes?: number | null };
      };
    };
    expect(state.status).toBe("success");
    expect(state.prepared_metadata?.bundle_bytes).toBeGreaterThan(0);
    expect(state.prepared_metadata?.bundle_sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(state.result?.status).toBe("success");
    expect(state.result?.exit_code).toBe(0);
    expect(state.result?.metrics?.stdout_bytes).toBeGreaterThan(0);
    expect(state.result?.metrics?.output_last_message_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      capabilities_used?: string[];
    };
    expect(resultManifest.status).toBe("success");
    expect(resultManifest.summary).toContain("Final fake Codex message");
    expect(resultManifest.capabilities_used).toEqual(["codex.exec"]);
    const events = await readFile(invocation.events_path, "utf8");
    expect(events).toContain('"type":"runner_prepared"');
    expect(events).toContain('"type":"runner_execute_start"');
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stdout_bytes"');

    await rm(tempDir, { recursive: true, force: true });
  });

  it("captures failure-path stderr and persists failed run-state", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-fail-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const fakeCodexPath = path.join(fakeBinDir, "codex");
    const bundle = makeBundle();
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    bundle.execution.artifact_paths.run_dir = path.join(tempDir, "runs", "run-123");
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
      fakeCodexPath,
      [
        "#!/bin/sh",
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    --output-last-message|-C|-s|-a)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf 'fake stderr fail\n' >&2`,
        "exit 42",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeCodexPath, 0o755);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(42);
    expect(result.stderr_summary).toContain("fake stderr fail");
    expect(result.started_at).toMatch(/T/);
    expect(result.ended_at).toMatch(/T/);
    expect(result.metrics?.stderr_bytes).toBeGreaterThan(0);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      result?: {
        status: string;
        stderr_summary?: string;
        metrics?: { stderr_bytes?: number };
      };
    };
    expect(state.status).toBe("failed");
    expect(state.result?.status).toBe("failed");
    expect(state.result?.stderr_summary).toContain("fake stderr fail");
    expect(state.result?.metrics?.stderr_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      stderr_summary?: string;
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.stderr_summary).toContain("fake stderr fail");
    const events = await readFile(invocation.events_path, "utf8");
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stderr_bytes"');

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails deterministically and preserves malformed codex result manifests", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-invalid-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const fakeCodexPath = path.join(fakeBinDir, "codex");
    const bundle = makeBundle();
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    bundle.execution.artifact_paths.run_dir = path.join(tempDir, "runs", "run-invalid");
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
      fakeCodexPath,
      [
        "#!/bin/sh",
        'out=""',
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    --output-last-message|-C|-s|-a)",
        '      if [ "$1" = "--output-last-message" ]; then out="$2"; fi',
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        String.raw`printf '{"schema_version":1,"capabilities_used":["ok",42]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        String.raw`printf 'Final fake Codex message\n' > "$out"`,
        String.raw`printf 'fake stdout ok\n'`,
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeCodexPath, 0o755);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.stderr_summary).toContain("Invalid runner result manifest");
    expect(result.output_paths).toContain(invocation.result_path);
    expect(result.output_paths).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
    );
    const preserved = await readFile(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
      "utf8",
    );
    expect(preserved).toContain('"capabilities_used":["ok",42]');
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      stderr_summary?: string;
      artifacts?: { path: string }[];
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.stderr_summary).toContain("Invalid runner result manifest");
    expect(resultManifest.artifacts?.map((artifact) => artifact.path)).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
    );

    await rm(tempDir, { recursive: true, force: true });
  });
});
