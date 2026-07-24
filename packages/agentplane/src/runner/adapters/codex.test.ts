import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { buildRunnerPolicyDecision } from "../policy-decision.js";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { createRunnerAdapter } from "./index.js";

const CYRILLIC_RE = /[\u0400-\u04FF]/u;
const RUSSIAN_TRACE_LINE = "Привет из raw trace";

function codexAgentMessageEvent(text: string): string {
  return JSON.stringify({
    type: "item.completed",
    item: {
      type: "agent_message",
      text,
    },
  });
}

function codexSemanticResult(
  workOrderId: string,
  summary: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: workOrderId,
    status: "completed",
    summary,
    findings: [],
    uncertainty: [],
    claimed_checks: [],
    blocker: null,
    knowledge_request: null,
    ...overrides,
  };
}

function codexSemanticResultEvent(
  workOrderId: string,
  summary: string,
  overrides: Record<string, unknown> = {},
): string {
  return codexAgentMessageEvent(
    JSON.stringify(codexSemanticResult(workOrderId, summary, overrides)),
  );
}

async function makeGitTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  return root;
}

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
    expect(capabilities.filesystem_effect_containment).toBeUndefined();
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
      output_last_message_path: null,
      output_schema_path:
        "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-semantic-output.schema.json",
      dry_run: true,
      env: {
        AGENTPLANE_RUNNER_ADAPTER: "codex",
        AGENTPLANE_RUNNER_MODE: "dry_run",
        AGENTPLANE_RUNNER_API_VERSION: "1",
        AGENTPLANE_RUNNER_TARGET: "task",
        AGENTPLANE_RUNNER_RESULT_TRANSPORT: "supervisor_jsonl_event_collector",
      },
    });
    expect(invocation.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--ignore-user-config",
      "--strict-config",
      "--disable",
      "hooks",
      "--ephemeral",
      "-c",
      "sandbox_workspace_write.exclude_tmpdir_env_var=true",
      "-c",
      "sandbox_workspace_write.exclude_slash_tmp=true",
      "--json",
      "-C",
      "/repo",
      "-s",
      "workspace-write",
      "--output-schema",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-semantic-output.schema.json",
      "-",
    ]);
    expect(invocation.env).not.toHaveProperty("AGENTPLANE_RUNNER_RESULT_PATH");
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
    bundle.execution.sandbox_policy = {
      requested: "read-only",
      source: "recipe_run_profile",
      role: "EVALUATOR",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
      },
    };

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual([
      "codex",
      "-a",
      "never",
      "exec",
      "--ignore-user-config",
      "--strict-config",
      "--disable",
      "hooks",
      "--ephemeral",
      "--json",
      "-C",
      "/repo",
      "-s",
      "read-only",
      "--output-schema",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-semantic-output.schema.json",
      "-",
    ]);
    expect(invocation.output_schema_path).toBe(
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-semantic-output.schema.json",
    );
    expect(invocation.filesystem_effect_containment).toBeNull();
    expect(invocation.env).toMatchObject({
      AGENTPLANE_RECIPE_SANDBOX: "read-only",
      AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["reports", "logs"]),
      AGENTPLANE_RUNNER_RESULT_TRANSPORT: "supervisor_jsonl_event_collector",
    });
    expect(invocation.env).not.toHaveProperty("AGENTPLANE_RUNNER_RESULT_PATH");
  });

  it("preserves mechanical success while workspace-write containment remains unverified", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-success-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-123"));
    bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
    bundle.execution.policy_decision = buildRunnerPolicyDecision({
      adapter_id: "codex",
      capabilities: bundle.execution.adapter_capabilities,
      recipe: bundle.recipe,
      requested: { sandbox: "workspace-write" },
    });
    await writeRunnerExecutable(tempDir, "codex", [
      [
        "#!/bin/sh",
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    -C|-s|-a|--output-schema)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '{"type":"session.started"}\n'`,
        String.raw`printf '%s\n' '${codexSemanticResultEvent("run-123", "custom codex success")}'`,
        String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
        String.raw`printf '%s\n' '${RUSSIAN_TRACE_LINE}'`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    expect(invocation.filesystem_effect_containment).toBeNull();
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle and act on it.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("success");
    expect(result.execution_receipt?.verification_state).toBe("unverified");
    expect(result.exit_code).toBe(0);
    expect(result.summary).toBe("custom codex success");
    expect(result.stdout_summary).toBe(
      "Structured assistant output was extracted from supervised JSONL and normalized into result.json.",
    );
    expect(result.summary).not.toMatch(CYRILLIC_RE);
    expect(result.stdout_summary).not.toMatch(CYRILLIC_RE);
    expect(result.metrics?.stdout_bytes).toBeGreaterThan(0);
    expect(result.metrics?.duration_ms).toBeGreaterThanOrEqual(0);
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
      kind?: string;
      observed_by?: string;
      status?: string;
      summary?: string;
      stdout_summary?: string;
      artifacts?: { path: string; label?: string }[];
      capabilities_used?: string[];
      semantic_result?: { provenance?: string; value?: { kind?: string; summary?: string } };
    };
    expect(resultManifest.kind).toBe("runner_result_record");
    expect(resultManifest.observed_by).toBe("agentplane");
    expect(resultManifest.status).toBe("success");
    expect(resultManifest.summary).toBe("custom codex success");
    expect(resultManifest.stdout_summary).toBe(
      "Structured assistant output was extracted from supervised JSONL and normalized into result.json.",
    );
    expect(resultManifest.summary).not.toMatch(CYRILLIC_RE);
    expect(resultManifest.stdout_summary).not.toMatch(CYRILLIC_RE);
    expect(resultManifest.artifacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: invocation.trace_path, label: "raw-trace" }),
        expect.objectContaining({ path: invocation.stderr_path, label: "stderr-log" }),
        expect.objectContaining({
          path: path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
          label: "source-result-manifest",
        }),
      ]),
    );
    expect(resultManifest.capabilities_used).toEqual(["codex.exec"]);
    expect(resultManifest.semantic_result).toMatchObject({
      provenance: "agent_reported",
      value: {
        kind: "agent_semantic_result",
        summary: "custom codex success",
      },
    });
    expect(
      JSON.parse(
        await readFile(
          path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
          "utf8",
        ),
      ),
    ).toEqual({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "run-123",
      status: "completed",
      summary: "custom codex success",
      findings: [],
      uncertainty: [],
      claimed_checks: [],
    });
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

  it("fails a clean exit when supervised JSONL lacks AgentSemanticResult v2", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-missing-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-missing"));
    await writeRunnerExecutable(tempDir, "codex", [
      [
        "#!/bin/sh",
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    -C|-s|-a|--output-schema)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '{"type":"session.started"}\n'`,
        String.raw`printf '%s\n' '${codexAgentMessageEvent("missing manifest path exercised")}'`,
        String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
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
    expect(result.exit_code).toBe(1);
    expect(result.summary).toBe(
      "Codex execution failed before producing a valid supervised semantic result.",
    );
    expect(result.stderr_summary).toMatch(/JSON|Unexpected token/u);
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
      exit_code: 1,
      summary: "Codex execution failed before producing a valid supervised semantic result.",
    });
    expect(state.result?.stderr_summary).toMatch(/JSON|Unexpected token/u);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      exit_code?: number | null;
      summary?: string;
      stderr_summary?: string;
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.exit_code).toBe(1);
    expect(resultManifest.summary).toBe(
      "Codex execution failed before producing a valid supervised semantic result.",
    );
    expect(resultManifest.stderr_summary).toMatch(/JSON|Unexpected token/u);

    await rm(tempDir, { recursive: true, force: true });
  });

  it("captures failure-path stderr and persists failed run-state", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-fail-");
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
        "    -C|-s|-a)",
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

  it("keeps process failure authoritative over a conflicting semantic success claim", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-conflict-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-conflict"));
    await writeRunnerExecutable(tempDir, "codex", [
      [
        "#!/bin/sh",
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    -C|-s|-a|--output-schema)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '%s\n' '${codexSemanticResultEvent(
          "run-conflict",
          "Agent claims success.",
        )}'`,
        String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
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
    expect(result.semantic_result).toBeUndefined();
    expect(result.execution_receipt?.path).toMatch(
      /^agentplane-run:\/\/tasks\/[^/]+\/run-conflict\/execution-receipt\.json$/u,
    );
    expect(result.execution_receipt).toMatchObject({
      verification_state: "rejected",
      observed_by: "agentplane",
    });
    await expect(
      readFile(path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      process?: { exit_code?: number | null; outcome?: string };
      success_policy?: { outcome?: string };
    };
    expect(receipt.process).toMatchObject({ exit_code: 42, outcome: "exited" });
    expect(receipt.success_policy?.outcome).toBe("rejected");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("rejects supervisor-owned legacy fields in Codex semantic output", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-invalid-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-invalid"));
    await writeRunnerExecutable(tempDir, "codex", [
      [
        "#!/bin/sh",
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    -C|-s|-a|--output-schema)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '%s\n' '${codexSemanticResultEvent(
          "run-invalid",
          "Invalid semantic result.",
          { exit_code: 0 },
        )}'`,
        String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
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
    expect(result.summary).toBe(
      "Codex execution failed before producing a valid supervised semantic result.",
    );
    expect(result.stderr_summary).toMatch(/root.*unexpected fields: exit_code/u);
    await expect(
      readFile(path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      readFile(path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      stderr_summary?: string;
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.summary).toBe(
      "Codex execution failed before producing a valid supervised semantic result.",
    );
    expect(resultManifest.stderr_summary).toMatch(/root.*unexpected fields: exit_code/u);

    await rm(tempDir, { recursive: true, force: true });
  });

  it("rejects legacy artifact and evidence fields in Codex semantic output", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const tempDir = await makeGitTempRoot("agentplane-codex-adapter-scope-");
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
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    exec|--json|-|danger-full-access|never)",
        "      shift",
        "      ;;",
        "    -C|-s|-a|--output-schema)",
        "      shift 2",
        "      ;;",
        "    *)",
        "      shift",
        "      ;;",
        "  esac",
        "done",
        "cat >/dev/null",
        String.raw`printf '%s\n' '${codexSemanticResultEvent(
          "run-scope",
          "Legacy fields must be rejected.",
          {
            artifacts: [{ path: "reports/../tmp/out.txt", label: "report" }],
            evidence: { evidence_paths: ["/tmp/out.log"] },
          },
        )}'`,
        String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
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
    expect(result.summary).toBe(
      "Codex execution failed before producing a valid supervised semantic result.",
    );
    expect(result.stderr_summary).toMatch(/root.*unexpected fields: artifacts, evidence/u);
    await expect(
      readFile(path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });

    await rm(tempDir, { recursive: true, force: true });
  });

  it.each([
    {
      label: "trace capture disabled",
      traceMode: "off",
      redactPatterns: [],
    },
    {
      label: "persisted trace content redacted",
      traceMode: "raw",
      redactPatterns: ["read-only evaluation complete"],
    },
  ] as const)(
    "materializes read-only structured output with $label",
    async ({ traceMode, redactPatterns }) => {
      const adapter = createRunnerAdapter(defaultConfig());
      const tempDir = await makeGitTempRoot("agentplane-codex-adapter-read-only-");
      const fakeBinDir = path.join(tempDir, "bin");
      const bundle = makeRunnerContextBundle(codexBundleDefaults);
      bundle.repository.git_root = tempDir;
      bundle.execution.mode = "execute";
      bundle.execution.trace_policy = {
        ...bundle.execution.trace_policy,
        mode: traceMode,
        redact_patterns: [...redactPatterns],
      };
      bundle.execution.sandbox_policy = {
        requested: "read-only",
        source: "role_default",
        role: "EVALUATOR",
        authority: {
          danger_full_access_authorized: false,
          provenance: null,
          source: null,
        },
      };
      bundle.execution.write_scope = {
        mutation_scope: "none",
        writable_roots: [],
        protected_paths: [".agentplane/policy"],
      };
      bundle.execution.policy_decision = {
        adapter_id: "codex",
        requested: { sandbox: "read-only" },
        effective: { sandbox: "read-only" },
        fields: {
          sandbox: {
            requested: "read-only",
            effective: "read-only",
            status: "enforced",
            capability_level: "native",
            channel: "argv",
          },
        },
        refusal_reason: null,
      };
      bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
      setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-transport"));
      await writeRunnerExecutable(tempDir, "codex", [
        [
          "#!/bin/sh",
          'while [ "$#" -gt 0 ]; do',
          '  case "$1" in',
          "    exec|--json|-|read-only|never)",
          "      shift",
          "      ;;",
          "    -C|-s|-a|--output-schema)",
          "      shift 2",
          "      ;;",
          "    *)",
          "      shift",
          "      ;;",
          "  esac",
          "done",
          "cat >/dev/null",
          String.raw`printf '%s\n' '${codexAgentMessageEvent(
            JSON.stringify({
              schema_version: 2,
              kind: "agent_semantic_result",
              work_order_id: "run-transport",
              status: "completed",
              summary: "read-only evaluation complete",
              findings: [],
              uncertainty: [],
              claimed_checks: [],
              blocker: null,
              knowledge_request: null,
            }),
          )}'`,
          String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
          "exit 0",
        ].join("\n"),
      ]);

      const invocation = await adapter.prepare(bundle);
      expect(invocation.filesystem_effect_containment).toBeNull();
      invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
      await writePreparedRunnerArtifacts({
        bundle,
        bootstrap_markdown: "Return the structured semantic result.\n",
        invocation,
      });

      const executionPromise = adapter.execute(invocation);
      invocation.argv[invocation.argv.indexOf("-s") + 1] = "workspace-write";
      const result = await executionPromise;
      const sourceManifest = JSON.parse(
        await readFile(path.join(invocation.run_dir, "result.source.json"), "utf8"),
      ) as Record<string, unknown>;
      const resultRecord = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
        semantic_result?: { provenance?: string; value?: Record<string, unknown> };
        artifacts?: { path: string; label?: string }[];
      };

      expect(sourceManifest).toEqual({
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: "run-transport",
        status: "completed",
        summary: "read-only evaluation complete",
        findings: [],
        uncertainty: [],
        claimed_checks: [],
      });
      expect(result.semantic_result).toMatchObject({
        provenance: "agent_reported",
        value: {
          work_order_id: "run-transport",
          status: "completed",
          summary: "read-only evaluation complete",
        },
      });
      expect(resultRecord.semantic_result).toEqual(result.semantic_result);
      expect(resultRecord.artifacts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: invocation.output_schema_path,
            label: "semantic-output-schema",
          }),
        ]),
      );
      expect(invocation.output_last_message_path).toBeNull();
      expect(invocation.argv).not.toContain("--output-last-message");
      expect(result.status).toBe("success");
      expect(result.execution_receipt?.verification_state).toBe("unverified");
      const persistedTrace = await readFile(invocation.trace_path, "utf8");
      if (traceMode === "off") {
        expect(persistedTrace).toBe("");
      } else {
        expect(persistedTrace).toContain("[REDACTED]");
        expect(persistedTrace).not.toContain("read-only evaluation complete");
      }

      await rm(tempDir, { recursive: true, force: true });
    },
  );
});
