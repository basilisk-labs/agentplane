import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { createRunnerAdapter } from "./index.js";
import { CliError } from "../../shared/errors.js";

const CYRILLIC_RE = /[\u0400-\u04FF]/u;
const RUSSIAN_TRACE_LINE = "Привет из raw trace";
const RUSSIAN_LAST_MESSAGE = "Привет из сообщения Codex";

const codexBundleDefaults = {
  adapterId: "codex",
  taskId: "202603231410-ABC123",
  runId: "run-123",
  title: "Adapter test",
  description: "Adapter test task",
  status: "TODO",
  basePrompts: [
    {
      id: "base.policy_gateway",
      role: "policy",
      content: "do not inline this policy text into argv",
      priority: 200,
    },
  ],
};

describe("CodexRunnerAdapter", () => {
  it("describes codex capabilities for recipe run_profile fields", () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const capabilities = adapter.describeCapabilities(makeRunnerContextBundle(codexBundleDefaults));

    expect(capabilities).toMatchObject({
      adapter_id: "codex",
      fields: {
        sandbox: {
          level: "native",
          channel: "argv",
          supported_values: ["read-only", "workspace-write", "danger-full-access"],
        },
      },
    });
  });

  it("returns normalized invocation metadata from bundle path and config-selected adapter", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);

    const invocation = await adapter.prepare(bundle);

    expect(invocation).toMatchObject({
      adapter_id: "codex",
      run_id: "run-123",
      run_dir: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
      bundle_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
      state_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/run-state.json",
      events_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/events.jsonl",
      result_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/result.json",
      trace_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/agent-trace.jsonl",
      stderr_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/stderr.log",
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
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
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
        writes_artifacts_to: ["reports", "logs"],
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
      AGENTPLANE_RECIPE_SANDBOX: "read-only",
      AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["reports", "logs"]),
    });
  });

  it("fails closed when recipe run_profile sandbox is unsupported", () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        mode: "analysis",
        sandbox: "custom-sandbox",
      },
    };

    let error: unknown = null;
    try {
      adapter.prepare(bundle);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_RUNTIME",
      exitCode: 8,
      context: {
        adapter_id: "codex",
        requested_sandbox: "custom-sandbox",
      },
    });
    expect((error as CliError).message).toContain("does not support recipe sandbox");
  });

  it("fails closed when recipe writes_artifacts_to prefixes are invalid", () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        mode: "analysis",
        writes_artifacts_to: ["reports/", "../tmp"],
      },
    };

    let error: unknown = null;
    try {
      adapter.prepare(bundle);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_RUNTIME",
      exitCode: 8,
      context: {
        policy_field: "writes_artifacts_to",
        invalid_declared_prefixes: ["../tmp"],
      },
    });
    expect((error as CliError).message).toContain("invalid relative prefixes");
  });

  it("captures success-path result details and persists run-state updates", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-success-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-123"));
    await writeRunnerExecutable(tempDir, "codex", [
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
        String.raw`printf '%s\n' '${RUSSIAN_LAST_MESSAGE}' > "$out"`,
        String.raw`printf '%s\n' '${RUSSIAN_TRACE_LINE}'`,
        String.raw`printf '{"schema_version":1,"status":"success","summary":"custom codex success","capabilities_used":["codex.exec"],"evidence":{"evidence_paths":["codex-last-message.md"],"verification_candidates":["inspect codex-last-message.md"]}}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);
    const lastMessage = await readFile(invocation.output_last_message_path!, "utf8");

    expect(result.status).toBe("success");
    expect(result.exit_code).toBe(0);
    expect(result.summary).toBe("custom codex success");
    expect(result.stdout_summary).toBe(
      "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
    );
    expect(result.summary).not.toMatch(CYRILLIC_RE);
    expect(result.stdout_summary).not.toMatch(CYRILLIC_RE);
    expect(result.metrics?.stdout_bytes).toBeGreaterThan(0);
    expect(result.metrics?.duration_ms).toBeGreaterThanOrEqual(0);
    expect(lastMessage).toContain(RUSSIAN_LAST_MESSAGE);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      prepared_metadata?: { bundle_bytes: number; bundle_sha256: string };
      result?: {
        status: string;
        exit_code: number | null;
        summary?: string;
        stdout_summary?: string;
        metrics?: { stdout_bytes?: number; output_last_message_bytes?: number | null };
      };
    };
    expect(state.status).toBe("success");
    expect(state.prepared_metadata?.bundle_bytes).toBeGreaterThan(0);
    expect(state.prepared_metadata?.bundle_sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(state.result?.status).toBe("success");
    expect(state.result?.exit_code).toBe(0);
    expect(state.result?.summary).toBe("custom codex success");
    expect(state.result?.summary).not.toMatch(CYRILLIC_RE);
    expect(state.result?.stdout_summary).not.toMatch(CYRILLIC_RE);
    expect(state.result?.metrics?.stdout_bytes).toBeGreaterThan(0);
    expect(state.result?.metrics?.output_last_message_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      stdout_summary?: string;
      artifacts?: { path: string; label?: string }[];
      capabilities_used?: string[];
    };
    expect(resultManifest.status).toBe("success");
    expect(resultManifest.summary).toBe("custom codex success");
    expect(resultManifest.stdout_summary).toBe(
      "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
    );
    expect(resultManifest.summary).not.toMatch(CYRILLIC_RE);
    expect(resultManifest.stdout_summary).not.toMatch(CYRILLIC_RE);
    expect(resultManifest.artifacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: invocation.trace_path, label: "raw-trace" }),
        expect.objectContaining({ path: invocation.stderr_path, label: "stderr-log" }),
        expect.objectContaining({
          path: invocation.output_last_message_path,
          label: "assistant-last-message",
        }),
      ]),
    );
    expect(resultManifest.capabilities_used).toEqual(["codex.exec"]);
    const events = await readFile(invocation.events_path, "utf8");
    const trace = await readFile(invocation.trace_path, "utf8");
    expect(events).toContain('"type":"runner_prepared"');
    expect(events).toContain('"type":"runner_execute_start"');
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stdout_bytes"');
    expect(trace).toContain(RUSSIAN_TRACE_LINE);
    expect(trace).toContain('"stream":"stdout"');
    expect(trace).toContain('"kind":"json_event"');
    expect(trace).toContain(RUSSIAN_TRACE_LINE);

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails execute-mode success when codex exits 0 without writing a result manifest", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-missing-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-missing"));
    await writeRunnerExecutable(tempDir, "codex", [
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
        String.raw`printf '%s\n' 'missing manifest path exercised' > "$out"`,
        String.raw`printf '{"type":"session.started"}\n'`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(8);
    expect(result.summary).toBe("Codex execution failed before producing a valid result manifest.");
    expect(result.stderr_summary).toContain("did not write a valid runner result manifest");
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      result?: {
        status?: string;
        exit_code?: number | null;
        summary?: string;
        stderr_summary?: string;
      };
    };
    expect(state.status).toBe("failed");
    expect(state.result).toMatchObject({
      status: "failed",
      exit_code: 8,
      summary: "Codex execution failed before producing a valid result manifest.",
    });
    expect(state.result?.stderr_summary).toContain("did not write a valid runner result manifest");
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      exit_code?: number | null;
      summary?: string;
      stderr_summary?: string;
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.exit_code).toBe(8);
    expect(resultManifest.summary).toBe(
      "Codex execution failed before producing a valid result manifest.",
    );
    expect(resultManifest.stderr_summary).toContain("did not write a valid runner result manifest");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("captures failure-path stderr and persists failed run-state", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-fail-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-123"));
    await writeRunnerExecutable(tempDir, "codex", [
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
    ]);

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
    expect(result.summary).toBe("Codex execution failed.");
    expect(result.stderr_summary).toBe(
      "Failure details were captured in stderr.log and agent-trace.jsonl.",
    );
    expect(result.started_at).toMatch(/T/);
    expect(result.ended_at).toMatch(/T/);
    expect(result.metrics?.stderr_bytes).toBeGreaterThan(0);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      result?: {
        status: string;
        summary?: string;
        stderr_summary?: string;
        metrics?: { stderr_bytes?: number };
      };
    };
    expect(state.status).toBe("failed");
    expect(state.result?.status).toBe("failed");
    expect(state.result?.summary).toBe("Codex execution failed.");
    expect(state.result?.stderr_summary).toBe(
      "Failure details were captured in stderr.log and agent-trace.jsonl.",
    );
    expect(state.result?.metrics?.stderr_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      stderr_summary?: string;
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.summary).toBe("Codex execution failed.");
    expect(resultManifest.stderr_summary).toBe(
      "Failure details were captured in stderr.log and agent-trace.jsonl.",
    );
    const events = await readFile(invocation.events_path, "utf8");
    const trace = await readFile(invocation.trace_path, "utf8");
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stderr_bytes"');
    expect(trace).toContain('"stream":"stderr"');
    expect(await readFile(invocation.stderr_path, "utf8")).toContain("fake stderr fail");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails deterministically and preserves malformed codex result manifests", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-invalid-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-invalid"));
    await writeRunnerExecutable(tempDir, "codex", [
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
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.summary).toBe("Codex execution failed before producing a valid result manifest.");
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
      summary?: string;
      stderr_summary?: string;
      artifacts?: { path: string }[];
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.summary).toBe(
      "Codex execution failed before producing a valid result manifest.",
    );
    expect(resultManifest.stderr_summary).toContain("Invalid runner result manifest");
    expect(resultManifest.artifacts?.map((artifact) => artifact.path)).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
    );

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails when codex result manifest paths escape declared recipe prefixes", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-codex-adapter-scope-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        writes_artifacts_to: ["reports/", "logs/"],
      },
    };
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-scope"));
    await writeRunnerExecutable(tempDir, "codex", [
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
        String.raw`printf '{"schema_version":1,"artifacts":[{"path":"reports/../tmp/out.txt","label":"report"}],"evidence":{"evidence_paths":["/tmp/out.log"]}}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        String.raw`printf 'Final fake Codex message\n' > "$out"`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.summary).toBe("Codex execution failed before producing a valid result manifest.");
    expect(result.stderr_summary).toContain("writes_artifacts_to prefixes");
    expect(result.stderr_summary).toContain("reports/../tmp/out.txt");
    expect(result.stderr_summary).toContain("/tmp/out.log");
    expect(result.output_paths).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
    );
    expect(
      await readFile(
        path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
        "utf8",
      ),
    ).toContain('"reports/../tmp/out.txt"');

    await rm(tempDir, { recursive: true, force: true });
  });
});
