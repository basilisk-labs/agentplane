import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { createRunnerAdapter } from "./index.js";

async function makeGitTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  return root;
}

function currentCodexSandboxPlatform(): "macos" | "linux" | "windows" {
  switch (process.platform) {
    case "darwin": {
      return "macos";
    }
    case "linux": {
      return "linux";
    }
    case "win32": {
      return "windows";
    }
    default: {
      throw new Error(`Unsupported platform for codex sandbox test: ${process.platform}`);
    }
  }
}

const customBundleDefaults = {
  adapterId: "custom",
  taskId: "202603231410-XYZ789",
  runId: "run-789",
  title: "Custom adapter test",
  description: "Custom adapter test task",
  status: "DOING",
};

describe("CustomRunnerAdapter", () => {
  it("creates an explicit Hermes runner adapter surface", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "hermes";
    raw.runner.custom = {
      command: ["hermes", "agentplane", "run"],
    };
    const adapter = createRunnerAdapter(raw);
    const capabilities = adapter.describeCapabilities(
      makeRunnerContextBundle({ ...customBundleDefaults, adapterId: "hermes" }),
    );

    expect(adapter.id).toBe("hermes");
    expect(capabilities.adapter_id).toBe("hermes");
  });

  it("describes custom-runner capabilities as advisory env propagation", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
    };
    const adapter = createRunnerAdapter(raw);
    const capabilities = adapter.describeCapabilities(
      makeRunnerContextBundle(customBundleDefaults),
    );

    expect(capabilities).toMatchObject({
      adapter_id: "custom",
      fields: {
        sandbox: {
          level: "advisory",
          channel: "env",
        },
        writes_artifacts_to: {
          level: "advisory",
          channel: "env",
        },
      },
    });
  });

  it("describes sandbox as wrapper-enforced when codex full-auto enforcement is configured", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "auto",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const capabilities = adapter.describeCapabilities(
      makeRunnerContextBundle(customBundleDefaults),
    );

    expect(capabilities).toMatchObject({
      adapter_id: "custom",
      fields: {
        sandbox: {
          level: "wrapper",
          channel: "argv",
          supported_values: ["workspace-write"],
        },
      },
    });
    expect(capabilities.fields.sandbox?.note).toContain(
      "requires writable result and trace artifacts inside run_dir",
    );
  });

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
    const bundle = makeRunnerContextBundle(customBundleDefaults);

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual(["custom-runner", "--bundle-from-env"]);
    expect(invocation.env).toMatchObject({
      CUSTOM_TOKEN: "token",
      AGENTPLANE_RUNNER_ADAPTER: "custom",
      AGENTPLANE_RUNNER_MODE: "dry_run",
      AGENTPLANE_RUNNER_TARGET: "task",
      AGENTPLANE_RUNNER_TASK_ID: "202603231410-XYZ789",
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
      AGENTPLANE_RUNNER_ENFORCEMENT_MODE: "none",
      AGENTPLANE_RUNNER_ENFORCEMENT_PLATFORM: "auto",
    });
    expect(invocation.trace_path).toBe(
      "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/agent-trace.jsonl",
    );
    expect(invocation.stderr_path).toBe(
      "/repo/.agentplane/tasks/202603231410-XYZ789/runs/run-789/stderr.log",
    );
    expect(invocation.trace_policy).toEqual({
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    });
    expect(invocation.timeout_policy).toEqual({
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    });
  });

  it("exports resolved recipe run_profile policy for recipe-scenario bundles", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      env: {
        CUSTOM_TOKEN: "token",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.target = {
      kind: "recipe_scenario",
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      task_id: "202603231410-XYZ789",
    };
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        mode: "analysis",
        sandbox: "workspace-write",
        writes_artifacts_to: ["logs/", "reports/"],
      },
    };

    const invocation = await adapter.prepare(bundle);

    expect(invocation.env).toMatchObject({
      CUSTOM_TOKEN: "token",
      AGENTPLANE_RECIPE_ID: "viewer",
      AGENTPLANE_SCENARIO_ID: "RECIPE_SCENARIO",
      AGENTPLANE_RECIPE_SANDBOX: "workspace-write",
      AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["logs", "reports"]),
    });
    expect(JSON.parse(invocation.env.AGENTPLANE_RECIPE_RUN_PROFILE ?? "{}")).toMatchObject({
      sandbox: "workspace-write",
      writes_artifacts_to: ["logs", "reports"],
    });
  });

  it("wraps the custom command with codex sandbox full-auto when workspace-write enforcement is configured", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "auto",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.target = {
      kind: "recipe_scenario",
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      task_id: "202603231410-XYZ789",
    };
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        sandbox: "workspace-write",
      },
    };

    const invocation = await adapter.prepare(bundle);

    expect(invocation.argv).toEqual([
      "codex",
      "sandbox",
      currentCodexSandboxPlatform(),
      "--full-auto",
      "custom-runner",
      "--bundle-from-env",
    ]);
    expect(invocation.env).toMatchObject({
      AGENTPLANE_RUNNER_ENFORCEMENT_MODE: "codex_sandbox_full_auto",
      AGENTPLANE_RUNNER_ENFORCEMENT_PLATFORM: "auto",
      AGENTPLANE_RECIPE_SANDBOX: "workspace-write",
    });
  });

  it("fails closed when codex sandbox wrapper mode receives an unsupported sandbox", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "auto",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.target = {
      kind: "recipe_scenario",
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      task_id: "202603231410-XYZ789",
    };
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        sandbox: "read-only",
      },
    };

    expect(() => adapter.prepare(bundle)).toThrow(
      /cannot support recipe sandbox "read-only" because the shared runner contract requires write access to result\.json and trace artifacts inside run_dir/i,
    );
  });

  it("fails closed when recipe writes_artifacts_to prefixes are invalid", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
    };
    const adapter = createRunnerAdapter(raw);
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.target = {
      kind: "recipe_scenario",
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      task_id: "202603231410-XYZ789",
    };
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        writes_artifacts_to: ["reports/", "../tmp"],
      },
    };

    expect(() => adapter.prepare(bundle)).toThrow(/invalid relative prefixes/);
  });

  it("rejects custom adapter selection when no external command is configured", () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    const adapter = createRunnerAdapter(raw);

    expect(() => adapter.prepare(makeRunnerContextBundle(customBundleDefaults))).toThrow(
      "Custom runner adapter requires config.runner.custom.command",
    );
  });

  it("captures clean-exit stdout without claiming success under limited containment", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner", "--bundle-from-env"],
      env: {
        CUSTOM_TOKEN: "token",
      },
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-adapter-success-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-789"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      "#!/bin/sh",
      "cat >/dev/null",
      String.raw`printf "custom runner ok\n"`,
      "exit 0",
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(0);
    expect(result.summary).toBe("Custom runner execution completed successfully.");
    expect(result.stdout_summary).toBe("Raw execution trace was captured in agent-trace.jsonl.");
    expect(result.metrics?.stdout_bytes).toBeGreaterThan(0);
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      prepared_metadata?: { bootstrap_sha256: string };
      result?: {
        status: string;
        exit_code: number | null;
        summary?: string;
        stdout_summary?: string;
        metrics?: { stdout_bytes?: number };
      };
    };
    expect(state.status).toBe("failed");
    expect(state.prepared_metadata?.bootstrap_sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(state.result?.status).toBe("failed");
    expect(state.result?.exit_code).toBe(0);
    expect(state.result?.summary).toBe("Custom runner execution completed successfully.");
    expect(state.result?.stdout_summary).toBe(
      "Raw execution trace was captured in agent-trace.jsonl.",
    );
    expect(state.result?.metrics?.stdout_bytes).toBeGreaterThan(0);
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      stdout_summary?: string;
      artifacts?: { path: string; label?: string }[];
      capabilities_used?: string[];
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.summary).toBe("Custom runner execution completed successfully.");
    expect(resultManifest.stdout_summary).toBe(
      "Raw execution trace was captured in agent-trace.jsonl.",
    );
    expect(resultManifest.artifacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: invocation.trace_path, label: "raw-trace" }),
        expect.objectContaining({ path: invocation.stderr_path, label: "stderr-log" }),
      ]),
    );
    expect(resultManifest.capabilities_used).toEqual(["custom:custom-runner"]);
    const events = await readFile(invocation.events_path, "utf8");
    const trace = await readFile(invocation.trace_path, "utf8");
    expect(events).toContain('"type":"runner_prepared"');
    expect(events).toContain('"type":"runner_execute_start"');
    expect(events).toContain('"type":"runner_execute_finish"');
    expect(events).toContain('"stdout_bytes"');
    expect(trace).toContain('"stream":"stdout"');
    expect(trace).toContain("custom runner ok");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails deterministically and preserves structurally invalid custom runner manifests", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-adapter-invalid-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-invalid"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        String.raw`printf '{"schema_version":2,"kind":"agent_semantic_result","work_order_id":"run-invalid","status":"completed","summary":"Invalid semantic result.","findings":[],"uncertainty":[],"artifacts":[{"path":"reports/out.txt"}]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        String.raw`printf "custom runner wrote invalid manifest\n"`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(1);
    expect(result.summary).toBe(
      "Custom runner execution failed before producing a valid result manifest.",
    );
    expect(result.stderr_summary).toContain("Invalid runner result manifest");
    expect(result.output_paths).toContain(invocation.result_path);
    expect(result.output_paths).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
    );
    expect(result.output_paths).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
    );
    const preserved = await readFile(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
      "utf8",
    );
    expect(preserved).toContain('"artifacts":[{"path":"reports/out.txt"}]');
    const sourceManifest = await readFile(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
      "utf8",
    );
    expect(sourceManifest).toContain('"artifacts":[{"path":"reports/out.txt"}]');
    const resultManifest = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      status?: string;
      summary?: string;
      stderr_summary?: string;
      artifacts?: { path: string }[];
    };
    expect(resultManifest.status).toBe("failed");
    expect(resultManifest.summary).toBe(
      "Custom runner execution failed before producing a valid result manifest.",
    );
    expect(resultManifest.stderr_summary).toContain("Invalid runner result manifest");
    expect(resultManifest.artifacts?.map((artifact) => artifact.path)).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.invalid.json"),
    );
    expect(resultManifest.artifacts?.map((artifact) => artifact.path)).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
    );
    const trace = await readFile(invocation.trace_path, "utf8");
    expect(trace).toContain("custom runner wrote invalid manifest");
    const state = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      status: string;
      result?: { status?: string; summary?: string; stderr_summary?: string };
    };
    expect(state.status).toBe("failed");
    expect(state.result?.summary).toBe(
      "Custom runner execution failed before producing a valid result manifest.",
    );
    expect(state.result?.stderr_summary).toContain("Invalid runner result manifest");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("preserves the original custom manifest while separating semantic and observed data", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-adapter-source-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-source"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        String.raw`printf '{"schema_version":1,"summary":"Привет из custom manifest","artifacts":[{"path":"reports/out.txt","label":"report"}],"findings":["русский finding"],"verification_hints":["русский hint"],"capabilities_used":["custom.report"],"evidence":{"evidence_paths":["reports/out.txt","logs/out.log"],"changed_paths":["src/runner/task-state.ts","src/runner/result-manifest.ts"],"files_changed_count":2,"tests_run":["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],"verification_candidates":["inspect reports/out.txt","inspect logs/out.log"]}}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.summary).toBe("Привет из custom manifest");
    expect(result.findings).toEqual(["русский finding"]);
    expect(result.verification_hints).toBeUndefined();
    expect(result.capabilities_used).toEqual(["custom:custom-runner"]);
    expect(result.artifacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: invocation.result_path, label: "result-manifest" }),
        expect.objectContaining({
          path: path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
          label: "source-result-manifest",
        }),
      ]),
    );
    expect(result.artifacts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "reports/out.txt", label: "report" }),
      ]),
    );
    expect(result.semantic_result).toMatchObject({
      provenance: "agent_reported",
      value: {
        kind: "legacy_agent_semantic_result",
        summary: "Привет из custom manifest",
        findings: ["русский finding"],
      },
    });
    expect(result.agent_reported_claims).toEqual(
      expect.arrayContaining([
        {
          field: "artifacts",
          value: [{ path: "reports/out.txt", label: "report" }],
          provenance: "agent_reported",
        },
        {
          field: "capabilities_used",
          value: ["custom.report"],
          provenance: "agent_reported",
        },
        {
          field: "evidence.changed_paths",
          value: ["src/runner/task-state.ts", "src/runner/result-manifest.ts"],
          provenance: "agent_reported",
        },
        {
          field: "evidence.tests_run",
          value: ["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],
          provenance: "agent_reported",
        },
      ]),
    );

    const normalized = JSON.parse(await readFile(invocation.result_path, "utf8")) as {
      kind?: string;
      observed_by?: string;
      summary?: string;
      artifacts?: { path: string; label?: string }[];
      findings?: string[];
      verification_hints?: string[];
      capabilities_used?: string[];
      evidence?: {
        provenance?: string;
        evidence_paths?: string[];
        changed_paths?: string[];
        files_changed_count?: number;
        tests_run?: string[];
        verification_candidates?: string[];
        receipt_path?: string;
        receipt_sha256?: string;
      };
      execution_receipt?: {
        path?: string;
        sha256?: string;
        verification_state?: string;
        observed_by?: string;
      };
      semantic_result?: { provenance?: string; value?: { kind?: string; summary?: string } };
      agent_reported_claims?: { field?: string; provenance?: string; value?: unknown }[];
    };
    expect(normalized).toMatchObject({
      kind: "runner_result_record",
      observed_by: "agentplane",
      summary: "Привет из custom manifest",
      findings: ["русский finding"],
      capabilities_used: ["custom:custom-runner"],
      semantic_result: {
        provenance: "agent_reported",
        value: {
          kind: "legacy_agent_semantic_result",
          summary: "Привет из custom manifest",
        },
      },
    });
    expect(normalized.artifacts).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "reports/out.txt" })]),
    );
    expect(normalized.verification_hints).toBeUndefined();
    expect(normalized.evidence).toMatchObject({
      provenance: "supervisor_observed",
      changed_paths: [],
      files_changed_count: 0,
      receipt_path: "runs/run-source/execution-receipt.json",
    });
    expect(normalized.evidence?.tests_run).toBeUndefined();
    expect(normalized.execution_receipt).toMatchObject({
      path: "runs/run-source/execution-receipt.json",
      verification_state: "unverified",
      observed_by: "agentplane",
    });
    expect(normalized.execution_receipt?.sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(normalized.agent_reported_claims).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "evidence.evidence_paths",
          provenance: "agent_reported",
        }),
      ]),
    );

    const sourceManifest = await readFile(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
      "utf8",
    );
    expect(sourceManifest).toBe(
      '{"schema_version":1,"summary":"Привет из custom manifest","artifacts":[{"path":"reports/out.txt","label":"report"}],"findings":["русский finding"],"verification_hints":["русский hint"],"capabilities_used":["custom.report"],"evidence":{"evidence_paths":["reports/out.txt","logs/out.log"],"changed_paths":["src/runner/task-state.ts","src/runner/result-manifest.ts"],"files_changed_count":2,"tests_run":["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],"verification_candidates":["inspect reports/out.txt","inspect logs/out.log"]}}\n',
    );

    await rm(tempDir, { recursive: true, force: true });
  });

  it("attributes unreported repository writes without inheriting pre-existing dirt", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-adapter-observed-delta-");
    const fakeBinDir = path.join(tempDir, "bin");
    await writeFile(path.join(tempDir, "tracked.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "--", "tracked.txt"], { cwd: tempDir });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane Test",
        "-c",
        "user.email=agentplane@example.test",
        "commit",
        "--quiet",
        "-m",
        "seed",
      ],
      { cwd: tempDir },
    );
    await writeFile(path.join(tempDir, "pre-existing-untracked.txt"), "existing dirt\n", "utf8");

    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.task!.data.verify = ["bun run focused-check"];
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-observed-delta"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        "cat >/dev/null",
        String.raw`printf "runner change\n" > "$TEST_REPOSITORY_ROOT/tracked.txt"`,
        String.raw`printf "unreported output\n" > "$TEST_REPOSITORY_ROOT/observed-untracked.txt"`,
        String.raw`printf '{"schema_version":1,"summary":"Agent claimed a different delta.","evidence":{"changed_paths":["claimed-only.txt"],"files_changed_count":1}}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    invocation.env.TEST_REPOSITORY_ROOT = tempDir;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.evidence).toMatchObject({
      provenance: "supervisor_observed",
      changed_paths: ["observed-untracked.txt", "tracked.txt"],
      files_changed_count: 2,
    });
    expect(result.evidence?.changed_paths).not.toContain("pre-existing-untracked.txt");
    expect(result.evidence?.changed_paths).not.toContain("claimed-only.txt");
    expect(result.agent_reported_claims).toEqual(
      expect.arrayContaining([
        {
          field: "evidence.changed_paths",
          value: ["claimed-only.txt"],
          provenance: "agent_reported",
        },
      ]),
    );

    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      git?: {
        state?: string;
        before?: { dirty_paths?: string[] };
        delta?: { changed_paths?: string[] };
      };
      process?: {
        process_tree?: {
          scope?: string;
          cleanup_state?: string;
          residual_alive?: boolean | null;
          containment_state?: string;
          containment_limitation?: string | null;
        };
      };
      success_policy?: { outcome?: string };
      checks?: { id?: string; required?: boolean; status?: string; details?: string }[];
    };
    expect(receipt.git?.state).toBe("observed");
    expect(receipt.git?.before?.dirty_paths).toEqual(
      expect.arrayContaining(["bin/custom-runner", "pre-existing-untracked.txt"]),
    );
    expect(receipt.git?.delta?.changed_paths).toEqual(["observed-untracked.txt", "tracked.txt"]);
    expect(receipt.process?.process_tree).toMatchObject({
      scope: "posix_process_group",
      cleanup_state: "not_needed",
      residual_alive: false,
      containment_state: "limited",
    });
    expect(receipt.process?.process_tree?.containment_limitation).toContain("new session");
    expect(receipt.success_policy?.outcome).toBe("unverified");
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.process_group_cleanup",
          required: true,
          status: "passed",
        }),
        expect.objectContaining({
          id: "runner.process_containment",
          required: true,
          status: "not_run",
        }),
        expect.objectContaining({
          id: "task.verify.deferred",
          required: false,
          status: "not_run",
        }),
      ]),
    );
    expect(receipt.checks?.find((check) => check.id === "task.verify.deferred")?.details).toContain(
      "does not claim task or semantic success",
    );

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails when external custom manifest paths escape declared recipe prefixes", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-adapter-scope-");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-scope"));
    bundle.recipe = {
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      run_profile: {
        writes_artifacts_to: ["reports/", "logs/"],
      },
    };

    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        String.raw`printf '{"schema_version":1,"summary":"custom scope fail","artifacts":[{"path":"reports/../tmp/out.txt","label":"report"}],"evidence":{"evidence_paths":["reports/ok.txt","/tmp/out.log"]}}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result.status).toBe("failed");
    expect(result.summary).toBe(
      "Custom runner execution failed before producing a valid result manifest.",
    );
    expect(result.stderr_summary).toContain("writes_artifacts_to prefixes");
    expect(result.stderr_summary).toContain("reports/../tmp/out.txt");
    expect(result.stderr_summary).toContain("/tmp/out.log");
    expect(result.output_paths).toContain(
      path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
    );
    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      observed_by?: string;
      process?: { exit_code?: number | null };
      checks?: { id?: string; status?: string }[];
      success_policy?: { outcome?: string };
    };
    expect(receipt.observed_by).toBe("agentplane");
    expect(receipt.process?.exit_code).toBe(0);
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "runner.manifest.valid", status: "failed" }),
      ]),
    );
    expect(receipt.success_policy?.outcome).toBe("rejected");
    expect(
      await readFile(
        path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
        "utf8",
      ),
    ).toContain('"reports/../tmp/out.txt"');

    await rm(tempDir, { recursive: true, force: true });
  });
});
