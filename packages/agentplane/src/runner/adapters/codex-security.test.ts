import { mkdtemp, readFile, readlink, rm, symlink, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { CliError } from "../../shared/errors.js";
import { readRunnerRunState, writePreparedRunnerArtifacts } from "../artifacts.js";
import { buildRunnerPolicyDecision } from "../policy-decision.js";
import { codexInvocationHasExactFilesystemEffectSandbox } from "./codex-preparation.js";
import { createRunnerAdapter } from "./index.js";

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

function codexSemanticResultEvent(workOrderId: string, summary: string): string {
  return JSON.stringify({
    type: "item.completed",
    item: {
      type: "agent_message",
      text: JSON.stringify({
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
      }),
    },
  });
}

describe("CodexRunnerAdapter security policy", () => {
  it.each([
    [
      "sandbox replacement",
      (argv: string[]) => argv.splice(argv.indexOf("-s") + 1, 1, "workspace-write"),
    ],
    ["duplicate sandbox", (argv: string[]) => argv.splice(-1, 0, "--sandbox=workspace-write")],
    [
      "sandbox bypass",
      (argv: string[]) => argv.splice(-1, 0, "--dangerously-bypass-approvals-and-sandbox"),
    ],
    [
      "hook trust bypass",
      (argv: string[]) => argv.splice(-1, 0, "--dangerously-bypass-hook-trust"),
    ],
    ["additional writable directory", (argv: string[]) => argv.splice(-1, 0, "--add-dir", "/tmp")],
    [
      "config override",
      (argv: string[]) => argv.splice(-1, 0, "-c", 'sandbox_policy="workspace-write"'),
    ],
    ["profile override", (argv: string[]) => argv.splice(-1, 0, "--profile", "unsafe")],
    ["feature enablement", (argv: string[]) => argv.splice(-1, 0, "--enable", "hooks")],
  ])("rejects a read-only effect attestation after %s", async (_label, mutateArgv) => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
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
    bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
    bundle.execution.policy_decision = buildRunnerPolicyDecision({
      adapter_id: "codex",
      capabilities: bundle.execution.adapter_capabilities,
      recipe: bundle.recipe,
      requested: { sandbox: "read-only" },
    });

    const invocation = await adapter.prepare(bundle);
    expect(codexInvocationHasExactFilesystemEffectSandbox(invocation, "read-only")).toBe(true);

    mutateArgv(invocation.argv);

    expect(codexInvocationHasExactFilesystemEffectSandbox(invocation, "read-only")).toBe(false);
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
    bundle.execution.sandbox_policy = {
      requested: "custom-sandbox",
      source: "recipe_run_profile",
      role: "EVALUATOR",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
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

  it("requires explicit typed authority before preparing danger-full-access", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.execution.sandbox_policy = {
      requested: "danger-full-access",
      source: "role_default",
      role: "CODER",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
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
      code: "E_VALIDATION",
      context: {
        adapter_id: "codex",
        declared_value: "danger-full-access",
        required_authority: "danger_full_access_authorized",
      },
    });

    bundle.execution.sandbox_policy.authority = {
      danger_full_access_authorized: true,
      provenance: "explicit_operator",
      source: "task run --allow-danger-full-access",
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
      "danger-full-access",
      "--output-schema",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/codex-semantic-output.schema.json",
      "-",
    ]);
    expect(invocation.env).toMatchObject({
      AGENTPLANE_RUNNER_RESULT_TRANSPORT: "supervisor_jsonl_event_collector",
    });
    expect(invocation.env).not.toHaveProperty("AGENTPLANE_RUNNER_RESULT_PATH");
  });

  it.each([
    ["null source", null],
    ["blank source", " "],
  ])("rejects danger-full-access runtime authority with %s", async (_label, source) => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.execution.sandbox_policy = {
      requested: "danger-full-access",
      source: "role_default",
      role: "CODER",
      authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source,
      },
    };

    await expect(Promise.resolve().then(() => adapter.prepare(bundle))).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        adapter_id: "codex",
        declared_value: "danger-full-access",
        required_authority: "danger_full_access_authorized",
      },
    });
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

  it.each(["bootstrap", "output_schema"] as const)(
    "refuses a same-content %s symlink before spawning Codex",
    async (preparedInput) => {
      const adapter = createRunnerAdapter(defaultConfig());
      const root = await makeGitTempRoot(`agentplane-codex-${preparedInput}-symlink-`);
      const fakeBinDir = path.join(root, "bin");
      const markerPath = path.join(root, "codex-spawned.txt");
      const bundle = makeRunnerContextBundle(codexBundleDefaults);
      bundle.repository.git_root = root;
      bundle.execution.mode = "execute";
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
        protected_paths: [],
      };
      bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
      bundle.execution.policy_decision = buildRunnerPolicyDecision({
        adapter_id: "codex",
        capabilities: bundle.execution.adapter_capabilities,
        recipe: bundle.recipe,
        requested: { sandbox: "read-only" },
      });
      setRunnerBundleRunDir(bundle, path.join(root, "runs", `run-${preparedInput}-symlink`));
      await writeRunnerExecutable(root, "codex", [
        "#!/bin/sh",
        String.raw`printf "spawned\n" > "$TEST_SPAWN_MARKER"`,
        "cat >/dev/null",
        "exit 0",
      ]);

      const invocation = await adapter.prepare(bundle);
      invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
      invocation.env.TEST_SPAWN_MARKER = markerPath;
      await writePreparedRunnerArtifacts({
        bundle,
        bootstrap_markdown: "Read only the prepared input.\n",
        invocation,
      });
      const preparedPath =
        preparedInput === "bootstrap" ? invocation.bootstrap_path! : invocation.output_schema_path!;
      const attackerPath = path.join(root, `attacker-${preparedInput}.txt`);
      await writeFile(attackerPath, await readFile(preparedPath));
      await unlink(preparedPath);
      await symlink(attackerPath, preparedPath);

      await expect(adapter.execute(invocation)).rejects.toMatchObject({
        code: "RUNNER_PREPARED_INPUT",
      });
      await expect(readFile(markerPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      expect(await readRunnerRunState(invocation.state_path)).toMatchObject({
        status: "prepared",
      });
      expect(await readFile(invocation.events_path, "utf8")).not.toContain(
        '"type":"runner_execute_start"',
      );

      await rm(root, { recursive: true, force: true });
    },
  );

  it("does not expose an agent-writable output-last-message path to Codex", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const root = await makeGitTempRoot("agentplane-codex-output-symlink-");
    const fakeBinDir = path.join(root, "bin");
    const secret = "TOP_SECRET_CODEX_OUTPUT_LAST_MESSAGE";
    const secretPath = path.join(root, "sensitive.txt");
    const legacyOutputPath = path.join(root, "runs", "run-output-symlink", "codex-last-message.md");
    const bundle = makeRunnerContextBundle(codexBundleDefaults);
    bundle.repository.git_root = root;
    bundle.execution.mode = "execute";
    bundle.execution.sandbox_policy = {
      requested: "workspace-write",
      source: "role_default",
      role: "CODER",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
      },
    };
    bundle.execution.write_scope = {
      mutation_scope: "code",
      writable_roots: ["."],
      protected_paths: [],
    };
    bundle.execution.adapter_capabilities = adapter.describeCapabilities(bundle);
    bundle.execution.policy_decision = buildRunnerPolicyDecision({
      adapter_id: "codex",
      capabilities: bundle.execution.adapter_capabilities,
      recipe: bundle.recipe,
      requested: { sandbox: "workspace-write" },
    });
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-output-symlink"));
    await writeFile(secretPath, `${secret}\n`, "utf8");
    await writeRunnerExecutable(root, "codex", [
      [
        "#!/bin/sh",
        'legacy_out=""',
        'while [ "$#" -gt 0 ]; do',
        '  case "$1" in',
        "    --output-last-message)",
        '      legacy_out="$2"',
        "      shift 2",
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
        'if [ -n "$legacy_out" ]; then',
        String.raw`  printf 'ATTACK\n' > "$legacy_out"`,
        "fi",
        String.raw`printf '%s\n' '${codexSemanticResultEvent(
          "run-output-symlink",
          "supervisor captured output",
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
    await symlink(secretPath, legacyOutputPath);

    const result = await adapter.execute(invocation);
    const persistedSupervisorArtifacts = await Promise.all(
      [
        invocation.result_path,
        invocation.events_path,
        invocation.receipt_path,
        invocation.trace_path,
        invocation.stderr_path,
      ].map(async (artifactPath) => await readFile(artifactPath, "utf8")),
    );
    const persistedSupervisorOutput = persistedSupervisorArtifacts.join("\n");

    expect(invocation.output_last_message_path).toBeNull();
    expect(invocation.argv).not.toContain("--output-last-message");
    expect(result.exit_code).toBe(0);
    expect(result.status).toBe("success");
    expect(result.metrics?.output_last_message_bytes).toBeGreaterThan(0);
    expect(result.stdout_summary).toBe(
      "Structured assistant output was extracted from supervised JSONL and normalized into result.json.",
    );
    expect(result.execution_receipt?.verification_state).toBe("unverified");
    expect(result.artifacts).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ path: legacyOutputPath })]),
    );
    expect(await readlink(legacyOutputPath)).toBe(secretPath);
    expect(await readFile(secretPath, "utf8")).toBe(`${secret}\n`);
    expect(persistedSupervisorOutput).not.toContain(secret);

    await rm(root, { recursive: true, force: true });
  });
});
