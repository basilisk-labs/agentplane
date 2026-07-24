import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
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

import { readRunnerRunState, writePreparedRunnerArtifacts } from "../artifacts.js";
import { createRunnerAdapter } from "./index.js";

async function makeGitTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  return root;
}

const customBundleDefaults = {
  adapterId: "custom",
  taskId: "202603231410-XYZ789",
  runId: "run-789",
  title: "Custom adapter security test",
  description: "Custom adapter security test task",
  status: "DOING",
};

describe("CustomRunnerAdapter security boundaries", () => {
  it("rejects actual out-of-scope and gitignored protected writes after a clean agent exit", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    raw.runner.trace.retention = "remove_on_success";
    raw.runner.trace.compression = "none";
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-actual-scope-");
    const fakeBinDir = path.join(tempDir, "bin");
    await mkdir(path.join(tempDir, ".agentplane", "policy"), { recursive: true });
    await writeFile(path.join(tempDir, ".gitignore"), ".agentplane/policy/*.local\n", "utf8");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.task!.data.mutation_scope = "context";
    bundle.execution.mode = "execute";
    bundle.execution.write_scope = {
      mutation_scope: "context",
      writable_roots: ["context"],
      protected_paths: [".agentplane/policy"],
    };
    bundle.execution.policy_decision = {
      adapter_id: "custom",
      requested: { sandbox: "workspace-write" },
      effective: {},
      fields: {
        sandbox: {
          requested: "workspace-write",
          status: "advisory",
          capability_level: "advisory",
          channel: "env",
        },
      },
      refusal_reason: null,
    };
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-actual-scope"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        "cat >/dev/null",
        String.raw`printf "outside\n" > "$TEST_REPOSITORY_ROOT/outside.txt"`,
        String.raw`printf "protected\n" > "$TEST_REPOSITORY_ROOT/.agentplane/policy/ignored.local"`,
        String.raw`printf '{"schema_version":1,"summary":"agent completed cleanly"}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
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
    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      scope_evaluation?: {
        state?: string;
        violations?: { path?: string; kind?: string }[];
      };
      process?: { exit_code?: number | null };
      checks?: { id?: string; status?: string }[];
      success_policy?: { outcome?: string };
    };

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(0);
    expect(result.execution_receipt?.verification_state).toBe("rejected");
    expect(receipt.process?.exit_code).toBe(0);
    expect(receipt.scope_evaluation).toMatchObject({
      state: "rejected",
    });
    expect(receipt.scope_evaluation?.violations).toEqual(
      expect.arrayContaining([
        { path: "outside.txt", kind: "out_of_scope" },
        { path: ".agentplane/policy/ignored.local", kind: "protected_path" },
      ]),
    );
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "runner.manifest.valid", status: "passed" }),
        expect.objectContaining({ id: "runner.scope.within_authority", status: "failed" }),
      ]),
    );
    expect(receipt.success_policy?.outcome).toBe("rejected");
    const trace = await readFile(invocation.trace_path);
    const stderr = await readFile(invocation.stderr_path);
    expect(trace.byteLength).toBeGreaterThanOrEqual(0);
    expect(stderr.byteLength).toBeGreaterThanOrEqual(0);

    await rm(tempDir, { recursive: true, force: true });
  });

  it("fails closed when a clean agent exit makes required filesystem observation unavailable", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-observer-unavailable-");
    const fakeBinDir = path.join(tempDir, "bin");
    await mkdir(path.join(tempDir, ".agentplane", "policy"), { recursive: true });
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.task!.data.mutation_scope = "context";
    bundle.execution.mode = "execute";
    bundle.execution.write_scope = {
      mutation_scope: "context",
      writable_roots: ["context"],
      protected_paths: [".agentplane/policy"],
    };
    bundle.execution.policy_decision = {
      adapter_id: "custom",
      requested: { sandbox: "workspace-write" },
      effective: {},
      fields: {
        sandbox: {
          requested: "workspace-write",
          status: "advisory",
          capability_level: "advisory",
          channel: "env",
        },
      },
      refusal_reason: null,
    };
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-observer-unavailable"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        "cat >/dev/null",
        String.raw`mkfifo "$TEST_REPOSITORY_ROOT/.agentplane/policy/observer.fifo"`,
        String.raw`printf '{"schema_version":1,"summary":"agent completed cleanly"}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
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
    const receipt = JSON.parse(await readFile(invocation.receipt_path, "utf8")) as {
      scope_evaluation?: { state?: string; limitations?: string[] };
      process?: { exit_code?: number | null };
      checks?: { id?: string; status?: string }[];
      success_policy?: { outcome?: string };
    };

    expect(result.exit_code).toBe(0);
    expect(result.status).toBe("success");
    expect(result.execution_receipt?.verification_state).toBe("unverified");
    expect(receipt.process?.exit_code).toBe(0);
    expect(receipt.scope_evaluation?.state).toBe("unverified");
    expect(receipt.scope_evaluation?.limitations?.join(" ")).toContain("unsupported_entry");
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.protected_filesystem.observed",
          status: "not_run",
        }),
        expect.objectContaining({ id: "runner.scope.within_authority", status: "not_run" }),
      ]),
    );
    expect(receipt.success_policy?.outcome).toBe("unverified");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("refuses a replaced run directory without writing through the attacker symlink", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-run-dir-boundary-");
    const externalDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-run-dir-victim-"));
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-boundary"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        "cat >/dev/null",
        'mv "$AGENTPLANE_RUNNER_RUN_DIR" "$AGENTPLANE_RUNNER_RUN_DIR.old"',
        'ln -s "$TEST_EXTERNAL_DIR" "$AGENTPLANE_RUNNER_RUN_DIR"',
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    invocation.env.TEST_EXTERNAL_DIR = externalDir;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    await expect(adapter.execute(invocation)).rejects.toMatchObject({
      code: "RUNNER_RUN_DIRECTORY_BOUNDARY",
    });
    expect(await readdir(externalDir)).toEqual([]);

    await rm(tempDir, { recursive: true, force: true });
    await rm(externalDir, { recursive: true, force: true });
  });

  it("never appends runner events through an agent-created symlink", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const tempDir = await makeGitTempRoot("agentplane-custom-events-boundary-");
    const victimPath = path.join(tempDir, "victim.txt");
    await writeFile(victimPath, "sentinel\n", "utf8");
    const fakeBinDir = path.join(tempDir, "bin");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = tempDir;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(tempDir, "runs", "run-events-boundary"));
    await writeRunnerExecutable(tempDir, "custom-runner", [
      [
        "#!/bin/sh",
        "cat >/dev/null",
        'rm "$AGENTPLANE_RUNNER_EVENTS_PATH"',
        'ln -s "$TEST_VICTIM_FILE" "$AGENTPLANE_RUNNER_EVENTS_PATH"',
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    invocation.env.TEST_VICTIM_FILE = victimPath;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    await expect(adapter.execute(invocation)).rejects.toThrow(
      /Refusing non-regular runner events file/u,
    );
    expect(await readFile(victimPath, "utf8")).toBe("sentinel\n");

    await rm(tempDir, { recursive: true, force: true });
  });

  it.each(["digest_mismatch", "read_failure"] as const)(
    "refuses bootstrap %s before spawning the custom runner",
    async (failure) => {
      const raw = defaultConfig();
      raw.runner.default_adapter = "custom";
      raw.runner.custom = {
        command: ["custom-runner"],
      };
      const adapter = createRunnerAdapter(raw);
      const root = await makeGitTempRoot(`agentplane-custom-bootstrap-${failure}-`);
      const fakeBinDir = path.join(root, "bin");
      const markerPath = path.join(root, "custom-spawned.txt");
      const bundle = makeRunnerContextBundle(customBundleDefaults);
      bundle.repository.git_root = root;
      bundle.execution.mode = "execute";
      setRunnerBundleRunDir(bundle, path.join(root, "runs", `run-${failure}`));
      await writeRunnerExecutable(root, "custom-runner", [
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
        bootstrap_markdown: "Use this exact prepared bootstrap.\n",
        invocation,
      });
      if (failure === "digest_mismatch") {
        await writeFile(invocation.bootstrap_path!, "tampered bootstrap\n", "utf8");
      } else {
        await unlink(invocation.bootstrap_path!);
      }

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

  it("rejects a bundle rewrite even when mutable state metadata is forged to match", async () => {
    const raw = defaultConfig();
    raw.runner.default_adapter = "custom";
    raw.runner.custom = {
      command: ["custom-runner"],
    };
    const adapter = createRunnerAdapter(raw);
    const root = await makeGitTempRoot("agentplane-custom-forged-prepared-state-");
    const fakeBinDir = path.join(root, "bin");
    const markerPath = path.join(root, "custom-spawned.txt");
    const bundle = makeRunnerContextBundle(customBundleDefaults);
    bundle.repository.git_root = root;
    bundle.execution.mode = "execute";
    bundle.task!.data.mutation_scope = "context";
    bundle.execution.write_scope = {
      mutation_scope: "context",
      writable_roots: ["context"],
      protected_paths: [".agentplane/policy"],
    };
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-forged-prepared-state"));
    await writeRunnerExecutable(root, "custom-runner", [
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
      bootstrap_markdown: "Use this exact prepared bootstrap.\n",
      invocation,
    });

    const forgedBundle = structuredClone(bundle);
    forgedBundle.execution.write_scope = {
      mutation_scope: "code",
      writable_roots: ["."],
      protected_paths: [],
    };
    const forgedBundleText = `${JSON.stringify(forgedBundle, null, 2)}\n`;
    await writeFile(invocation.bundle_path, forgedBundleText, "utf8");
    const forgedState = JSON.parse(await readFile(invocation.state_path, "utf8")) as {
      prepared_metadata?: {
        bundle_bytes: number;
        bundle_sha256: string;
      };
    };
    if (!forgedState.prepared_metadata) throw new Error("prepared metadata fixture missing");
    forgedState.prepared_metadata.bundle_bytes = Buffer.byteLength(forgedBundleText, "utf8");
    forgedState.prepared_metadata.bundle_sha256 = createHash("sha256")
      .update(forgedBundleText)
      .digest("hex");
    await writeFile(invocation.state_path, `${JSON.stringify(forgedState, null, 2)}\n`, "utf8");

    await expect(adapter.execute(invocation)).rejects.toMatchObject({
      code: "RUNNER_PREPARED_INPUT",
    });
    await expect(readFile(markerPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });

    await rm(root, { recursive: true, force: true });
  });
});
