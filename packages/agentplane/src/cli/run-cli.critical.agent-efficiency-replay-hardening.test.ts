import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { afterEach, expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const REPO_ROOT = process.cwd();
const TEST_ROOT = path.join(REPO_ROOT, ".agentplane/cache/rf04-test-targets");
const temporaryRoots: string[] = [];

function temporaryRoot(): string {
  mkdirSync(TEST_ROOT, { recursive: true });
  const root = mkdtempSync(path.join(TEST_ROOT, "hardening-"));
  temporaryRoots.push(root);
  return root;
}

function digest(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

async function importModule<T>(relativePath: string): Promise<T> {
  return (await import(pathToFileURL(path.join(REPO_ROOT, relativePath)).href)) as T;
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { force: true, recursive: true });
});

describeCritical("critical: RF-04 replay hardening boundaries", () => {
  it("surfaces only a whole bounded UTF-8 replay driver diagnostic code", async () => {
    const safety = await importModule<{
      replayDriverDiagnosticCode(stderr: Uint8Array): string | null;
    }>("scripts/lib/agent-efficiency-replay-safety.mjs");
    const capture = await importModule<{
      runChecked(
        command: string,
        args: string[],
        options: Record<string, unknown>,
        label: string,
      ): unknown;
    }>("scripts/bench/capture-agent-efficiency-replay.mjs");
    const exact = Buffer.from("RF04_DRIVER_ERROR:CODEX_EXIT\n");
    expect(safety.replayDriverDiagnosticCode(exact)).toBe("CODEX_EXIT");
    const rejectedDiagnostics = [
      Buffer.from("RF04_DRIVER_ERROR:CODEX_EXIT\nraw-secret"),
      Buffer.from("RF04_DRIVER_ERROR:CODEX_EXIT\nRF04_DRIVER_ERROR:SECOND\n"),
      Buffer.from("\u001B[31mRF04_DRIVER_ERROR:CODEX_EXIT\u001B[0m\n"),
      Buffer.from(`RF04_DRIVER_ERROR:${"A".repeat(65)}\n`),
      Buffer.concat([Buffer.from("RF04_DRIVER_ERROR:CODEX_EXIT"), Buffer.from([0xff])]),
    ];
    for (const rejected of rejectedDiagnostics) {
      expect(safety.replayDriverDiagnosticCode(rejected)).toBeNull();
    }

    expect(() =>
      capture.runChecked(
        process.execPath,
        ["-e", 'process.stderr.write("RF04_DRIVER_ERROR:CODEX_EXIT\\n"); process.exit(1);'],
        { exposeStderr: false },
        "synthetic replay driver",
      ),
    ).toThrow("synthetic replay driver failed with exit 1; diagnostic=CODEX_EXIT");

    for (const rejected of rejectedDiagnostics) {
      let rejectedFailure = "";
      try {
        capture.runChecked(
          process.execPath,
          [
            "-e",
            "process.stderr.write(Buffer.from(process.argv[1], 'base64')); process.exit(1);",
            rejected.toString("base64"),
          ],
          { exposeStderr: false },
          "synthetic replay driver",
        );
      } catch (error) {
        rejectedFailure = error instanceof Error ? error.message : String(error);
      }
      expect(rejectedFailure).toBe("synthetic replay driver failed with exit 1");
      expect(rejectedFailure).not.toContain("CODEX_EXIT");
      expect(rejectedFailure).not.toContain("raw-secret");
    }
  });

  it("cleans failed pilot staging without publishing artifacts", async () => {
    const replay = await importModule<{
      MINIMUM_REPLAY_RUNS: number;
      REPLAY_ANCHOR_COMMIT: string;
    }>("scripts/lib/agent-efficiency-replay.mjs");
    const capture = await importModule<{
      captureAgentEfficiencyReplay(options: Record<string, unknown>): unknown;
    }>("scripts/bench/capture-agent-efficiency-replay.mjs");
    const root = temporaryRoot();
    const sourceDirectory = path.join(root, "envelopes");
    const evidenceDirectory = path.join(root, "evidence");
    const outputPath = path.join(root, "baseline.json");
    const driverPath = path.join(
      REPO_ROOT,
      "scripts/bench",
      `.rf04-test-failing-driver-${process.pid}.mjs`,
    );
    const cacheRoot = path.join(REPO_ROOT, ".agentplane/cache");
    const replayCacheBefore = readdirSync(cacheRoot)
      .filter((name) => name.startsWith("rf04-replay-"))
      .toSorted();
    writeFileSync(
      driverPath,
      'process.stderr.write("RF04_DRIVER_ERROR:CODEX_EXIT\\n");\nprocess.exitCode = 1;\n',
    );
    try {
      expect(() =>
        capture.captureAgentEfficiencyReplay({
          allowTestTargets: true,
          anchor: replay.REPLAY_ANCHOR_COMMIT,
          driverPath,
          evidenceDirectory,
          outputPath,
          pilot: true,
          registryPath: path.join(REPO_ROOT, "scripts/bench/agent-efficiency-fixtures.json"),
          replace: false,
          runs: replay.MINIMUM_REPLAY_RUNS,
          sourceDirectory,
        }),
      ).toThrow("direct/run-01 replay driver failed with exit 1; diagnostic=CODEX_EXIT");
    } finally {
      rmSync(driverPath, { force: true });
    }
    expect(existsSync(sourceDirectory)).toBe(false);
    expect(existsSync(evidenceDirectory)).toBe(false);
    expect(existsSync(outputPath)).toBe(false);
    expect(existsSync(path.join(cacheRoot, "rf04-replay-transaction.json"))).toBe(false);
    expect(
      readdirSync(cacheRoot)
        .filter((name) => name.startsWith("rf04-replay-"))
        .toSorted(),
    ).toEqual(replayCacheBefore);
  }, 120_000);

  it("rejects symlinked parents, leaf links, and overlapping publication targets", async () => {
    const safety = await importModule<{
      assertRepoPathNoSymlinkEscape(root: string, candidate: string, label: string): string;
      assertReplayCaptureTargets(options: Record<string, unknown>): unknown;
    }>("scripts/lib/agent-efficiency-replay-safety.mjs");
    const root = temporaryRoot();
    const repository = path.join(root, "repository");
    const outside = path.join(root, "outside");
    mkdirSync(path.join(repository, "scripts/bench"), { recursive: true });
    mkdirSync(outside, { recursive: true });
    writeFileSync(path.join(repository, "scripts/bench/agent-efficiency-fixtures.json"), "{}\n");
    symlinkSync(outside, path.join(repository, "escape"));
    symlinkSync(path.join(outside, "missing"), path.join(repository, "dangling"));

    expect(() =>
      safety.assertRepoPathNoSymlinkEscape(
        repository,
        path.join(repository, "escape/new.json"),
        "target",
      ),
    ).toThrow("symbolic link");
    expect(() =>
      safety.assertRepoPathNoSymlinkEscape(repository, path.join(repository, "dangling"), "target"),
    ).toThrow("symbolic link");

    const targetRoot = path.join(repository, ".agentplane/cache/rf04-test-targets/case");
    mkdirSync(targetRoot, { recursive: true });
    expect(() =>
      safety.assertReplayCaptureTargets({
        driverPath: path.join(repository, "scripts/bench/driver.mjs"),
        evidenceDirectory: path.join(targetRoot, "source/evidence"),
        outputPath: path.join(targetRoot, "source/baseline.json"),
        registryPath: path.join(repository, "scripts/bench/agent-efficiency-fixtures.json"),
        repoRoot: repository,
        sourceDirectory: path.join(targetRoot, "source"),
        testTargetRoot: path.join(repository, ".agentplane/cache/rf04-test-targets"),
      }),
    ).toThrow("pairwise disjoint");
  });

  it("publishes all three artifacts together and restores every prior byte on validation failure", async () => {
    const safety = await importModule<{
      installReplayArtifactTransaction(
        pairs: { staging: string; target: string }[],
        captureRoot: string,
        options?: Record<string, unknown>,
      ): void;
    }>("scripts/lib/agent-efficiency-replay-safety.mjs");
    const root = temporaryRoot();
    const captureRoot = path.join(root, "capture");
    mkdirSync(captureRoot, { recursive: true });
    const pairs = ["envelopes", "evidence", "baseline.json"].map((name, index) => {
      const target = path.join(root, "published", name);
      const staging = path.join(captureRoot, `staged-${index}`);
      if (name.endsWith(".json")) {
        mkdirSync(path.dirname(target), { recursive: true });
        writeFileSync(target, "old-baseline\n");
        writeFileSync(staging, "new-baseline\n");
      } else {
        mkdirSync(target, { recursive: true });
        mkdirSync(staging, { recursive: true });
        writeFileSync(path.join(target, "run.json"), `old-${name}\n`);
        writeFileSync(path.join(staging, "run.json"), `new-${name}\n`);
      }
      return { staging, target };
    });
    const markerPath = path.join(root, "transaction.json");
    expect(() =>
      safety.installReplayArtifactTransaction(pairs, captureRoot, {
        markerPath,
        validateInstalled() {
          expect(JSON.parse(readFileSync(markerPath, "utf8"))).toMatchObject({
            backup_count: 3,
            capture_root: captureRoot,
            installed_count: 3,
            phase: "validating",
            schema_version: 1,
          });
          expect(readFileSync(path.join(pairs[0].target, "run.json"), "utf8")).toBe(
            "new-envelopes\n",
          );
          expect(readFileSync(pairs[2].target, "utf8")).toBe("new-baseline\n");
          throw new Error("post-install validation failure");
        },
      }),
    ).toThrow("post-install validation failure");
    expect(readFileSync(path.join(pairs[0].target, "run.json"), "utf8")).toBe("old-envelopes\n");
    expect(readFileSync(path.join(pairs[1].target, "run.json"), "utf8")).toBe("old-evidence\n");
    expect(readFileSync(pairs[2].target, "utf8")).toBe("old-baseline\n");
  });

  it("detects ignored writes and same-content rewrites under role-specific policy", async () => {
    const effects = await importModule<{
      compareFixtureEffects(
        before: Map<string, unknown>,
        after: Map<string, unknown>,
        allowed: string[],
        policy: string,
      ): {
        changed_paths: string[];
        same_content_rewrites: string[];
        unsafe_allowed_paths: string[];
        violation_paths: string[];
      };
      snapshotFixtureEffects(root: string): Map<string, unknown>;
    }>("scripts/bench/internal/agent-efficiency-fixture-effects.mjs");
    const root = temporaryRoot();
    execFileSync("/usr/bin/git", ["init", "--quiet"], {
      cwd: root,
      env: { GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1", PATH: "/usr/bin:/bin" },
    });
    mkdirSync(path.join(root, "work"), { recursive: true });
    const allowed = path.join(root, "work/allowed.txt");
    writeFileSync(allowed, "SAME\n");
    writeFileSync(path.join(root, "work/target.txt"), "TARGET\n");
    const before = effects.snapshotFixtureEffects(root);
    writeFileSync(allowed, "SAME\n");
    utimesSync(allowed, new Date(2000), new Date(2000));
    writeFileSync(path.join(root, "ignored.secret"), "not persisted\n");
    const gitConfigPath = path.join(root, ".git/config");
    writeFileSync(
      gitConfigPath,
      `${readFileSync(gitConfigPath, "utf8")}\n[rf04]\n\tmarker = changed\n`,
    );
    const after = effects.snapshotFixtureEffects(root);
    const scoped = effects.compareFixtureEffects(
      before,
      after,
      ["work/allowed.txt"],
      "scoped_write",
    );
    expect(scoped.same_content_rewrites).toContain("work/allowed.txt");
    expect(scoped.violation_paths).toContain("ignored.secret");
    expect(scoped.violation_paths).toContain(".git/config");
    const readOnly = effects.compareFixtureEffects(before, after, [], "read_only");
    expect(readOnly.violation_paths).toEqual(readOnly.changed_paths);

    rmSync(allowed);
    symlinkSync("target.txt", allowed);
    const linked = effects.compareFixtureEffects(
      before,
      effects.snapshotFixtureEffects(root),
      ["work/allowed.txt"],
      "scoped_write",
    );
    expect(linked.unsafe_allowed_paths).toEqual(["work/allowed.txt"]);
    expect(linked.violation_paths).toContain("work/allowed.txt");
  });

  it("hashes the transitive harness closure and dereferenced executable dependency bytes", async () => {
    const baseline = await importModule<{
      stableJson(value: unknown, spaces?: number): string;
    }>("scripts/lib/agent-efficiency-baseline.mjs");
    const harness = await importModule<{
      createReplayHarnessManifest(
        root: string,
        driver: { contract_version: number; path: string; sha256: string },
        options: { dependencyClaim: Record<string, unknown> },
      ): { files: { path: string }[]; sha256: string };
    }>("scripts/lib/agent-efficiency-replay-harness.mjs");
    const dependencies = await importModule<{
      assertReplayDependencyManifestUnchanged(
        expected: { capture_receipt_sha256: string; portable_sha256: string },
        actual: { capture_receipt_sha256: string; portable_sha256: string },
      ): void;
      createReplayDependencyManifest(root: string): {
        capture_receipt_sha256: string;
        executable: { entries: { path: string }[] };
        portable_sha256: string;
      };
    }>("scripts/bench/internal/agent-efficiency-dependency-manifest.mjs");
    const root = temporaryRoot();
    for (const relativePath of [
      "scripts/bench/capture-agent-efficiency-replay.mjs",
      "scripts/bench/run-agent-efficiency-codex-replay.mjs",
      "scripts/checks/check-agent-efficiency-replay.mjs",
    ]) {
      mkdirSync(path.dirname(path.join(root, relativePath)), { recursive: true });
      writeFileSync(path.join(root, relativePath), "export const root = true;\n");
    }
    const capture = path.join(root, "scripts/bench/capture-agent-efficiency-replay.mjs");
    const transitive = path.join(root, "scripts/bench/transitive.mjs");
    writeFileSync(capture, 'import "./transitive.mjs";\n');
    writeFileSync(transitive, "export const value = 1;\n");
    const driverPath = "scripts/bench/run-agent-efficiency-codex-replay.mjs";
    const driver = {
      contract_version: 1,
      path: driverPath,
      sha256: digest(readFileSync(path.join(root, driverPath))),
    };
    const captureExecutableSha256 = digest("synthetic-capture-executable");
    const capturePlatform = {
      arch: "arm64",
      libc: "not_applicable",
      node_abi: "137",
      platform: "darwin",
    };
    const portableSha256 = digest("synthetic-portable-graph");
    const dependencyClaim = {
      capture_executable_sha256: captureExecutableSha256,
      capture_platform: capturePlatform,
      capture_receipt_sha256: digest(
        `${baseline.stableJson(
          {
            capture_platform: capturePlatform,
            executable_sha256: captureExecutableSha256,
            portable_sha256: portableSha256,
            schema_version: 1,
          },
          2,
        )}\n`,
      ),
      portable_sha256: portableSha256,
    };
    const first = harness.createReplayHarnessManifest(root, driver, { dependencyClaim });
    writeFileSync(transitive, "export const value = 2;\n");
    const second = harness.createReplayHarnessManifest(root, driver, { dependencyClaim });
    expect(first.files.map((entry) => entry.path)).toContain("scripts/bench/transitive.mjs");
    expect(second.sha256).not.toBe(first.sha256);

    for (const relativePath of [
      "node_modules/tsup",
      "node_modules/typescript",
      "packages/agentplane/node_modules",
      "packages/core/node_modules",
    ]) {
      mkdirSync(path.join(root, relativePath), { recursive: true });
    }
    for (const relativePath of [
      "bun.lock",
      "package.json",
      "packages/agentplane/package.json",
      "packages/core/package.json",
    ]) {
      writeFileSync(path.join(root, relativePath), "{}\n");
    }
    const compiler = path.join(root, "node_modules/typescript/compiler.js");
    writeFileSync(compiler, "one\n");
    const transitivePackage = path.join(root, "node_modules/synthetic-child");
    mkdirSync(transitivePackage, { recursive: true });
    writeFileSync(
      path.join(root, "node_modules/tsup/package.json"),
      JSON.stringify({ dependencies: { "synthetic-child": "1.0.0" }, name: "tsup" }),
    );
    const transitiveRuntime = path.join(transitivePackage, "runtime.js");
    writeFileSync(transitiveRuntime, "one\n");
    const dependencyFirst = dependencies.createReplayDependencyManifest(root);
    expect(dependencyFirst.executable.entries.map((entry) => entry.path).join("\n")).toContain(
      "synthetic-child/runtime.js",
    );
    writeFileSync(transitiveRuntime, "two\n");
    const dependencyTransitive = dependencies.createReplayDependencyManifest(root);
    expect(dependencyTransitive.capture_receipt_sha256).not.toBe(
      dependencyFirst.capture_receipt_sha256,
    );
    writeFileSync(compiler, "two\n");
    const dependencySecond = dependencies.createReplayDependencyManifest(root);
    expect(dependencySecond.capture_receipt_sha256).not.toBe(
      dependencyTransitive.capture_receipt_sha256,
    );
    expect(() =>
      dependencies.assertReplayDependencyManifestUnchanged(dependencyFirst, dependencySecond),
    ).toThrow("executable dependency bytes changed");
  });

  it("uses sterile Git and measures only exact AgentPlane subprocess duration", async () => {
    const safety = await importModule<{
      assertGitCommitAvailable(root: string, anchor: string, source: Record<string, string>): void;
    }>("scripts/lib/agent-efficiency-replay-safety.mjs");
    const supervisor = await importModule<{
      agentplane(
        cli: string,
        root: string,
        args: string[],
        code: string,
        counters: { anchorPreparationCliCalls: number; preparationLatencyMs: number },
        options: Record<string, unknown>,
      ): string;
    }>("scripts/bench/internal/agent-efficiency-anchor-supervisor.mjs");
    const anchor = execFileSync("/usr/bin/git", ["rev-parse", "HEAD"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
    safety.assertGitCommitAvailable(REPO_ROOT, anchor, {
      LANG: "C",
      PATH: path.join(temporaryRoot(), "fake-bin"),
    });
    const fixture = temporaryRoot();
    const counters = { anchorPreparationCliCalls: 0, preparationLatencyMs: 0 };
    const times = [10, 35];
    expect(
      supervisor.agentplane("cli.mjs", fixture, ["task", "run"], "TEST", counters, {
        clock: () => times.shift(),
        measurePreparation: true,
        runner: () => "prepared",
      }),
    ).toBe("prepared");
    expect(counters).toEqual({ anchorPreparationCliCalls: 1, preparationLatencyMs: 25 });
  });

  it("checks a macOS capture on Linux without substituting Linux executable bytes", async () => {
    const baseline = await importModule<{
      stableJson(value: unknown, spaces?: number): string;
    }>("scripts/lib/agent-efficiency-baseline.mjs");
    const dependencies = await importModule<{
      assertReplayDependencyClaim(
        root: string,
        claim: Record<string, unknown>,
        options: Record<string, unknown>,
      ): { capture_verification: string };
      createReplayPortableDependencyManifest(root: string): { sha256: string };
    }>("scripts/bench/internal/agent-efficiency-dependency-manifest.mjs");
    const capturePlatform = {
      arch: "arm64",
      libc: "not_applicable",
      node_abi: "137",
      platform: "darwin",
    };
    const captureExecutableSha256 = digest("macos-capture-executable-bytes");
    const portableSha256 = dependencies.createReplayPortableDependencyManifest(REPO_ROOT).sha256;
    const captureReceiptSha256 = digest(
      `${baseline.stableJson(
        {
          capture_platform: capturePlatform,
          executable_sha256: captureExecutableSha256,
          portable_sha256: portableSha256,
          schema_version: 1,
        },
        2,
      )}\n`,
    );
    let captureManifestCalls = 0;
    const result = dependencies.assertReplayDependencyClaim(
      REPO_ROOT,
      {
        capture_executable_sha256: captureExecutableSha256,
        capture_platform: capturePlatform,
        capture_receipt_sha256: captureReceiptSha256,
        portable_sha256: portableSha256,
      },
      {
        createCaptureManifest() {
          captureManifestCalls += 1;
          throw new Error("foreign platform executable bytes must not be recomputed");
        },
        currentPlatform: {
          arch: "x64",
          libc: "glibc",
          node_abi: "137",
          platform: "linux",
        },
      },
    );
    expect(result.capture_verification).toBe("foreign_platform_portable_only");
    expect(captureManifestCalls).toBe(0);
    expect(() =>
      dependencies.assertReplayDependencyClaim(
        REPO_ROOT,
        {
          capture_executable_sha256: captureExecutableSha256,
          capture_platform: capturePlatform,
          capture_receipt_sha256: digest("unlinked-receipt"),
          portable_sha256: portableSha256,
        },
        {
          currentPlatform: {
            arch: "x64",
            libc: "glibc",
            node_abi: "137",
            platform: "linux",
          },
        },
      ),
    ).toThrow("does not link");
  });

  it("runs the real exact-anchor driver entrypoint offline from the fixture-control registry overlay", async () => {
    const baseline = await importModule<{
      stableJson(value: unknown, spaces?: number): string;
    }>("scripts/lib/agent-efficiency-baseline.mjs");
    const replay = await importModule<{
      REPLAY_ANCHOR_COMMIT: string;
      createReplayDriverIdentity(
        root: string,
        driverPath: string,
      ): {
        contract_version: number;
        path: string;
        sha256: string;
      };
      createReplayHarnessManifest(
        root: string,
        driver: { contract_version: number; path: string; sha256: string },
        options: { dependencyClaim: Record<string, unknown> },
      ): { sha256: string };
      fixtureRegistrySha256(registry: Record<string, unknown>): string;
    }>("scripts/lib/agent-efficiency-replay.mjs");
    const dependencyModule = await importModule<{
      createReplayDependencyManifest(root: string): Record<string, unknown>;
      replayDependencyClaimFromManifest(manifest: Record<string, unknown>): {
        capture_executable_sha256: string;
        capture_platform: Record<string, string>;
        capture_receipt_sha256: string;
        portable_sha256: string;
      };
    }>("scripts/bench/internal/agent-efficiency-dependency-manifest.mjs");
    const driverModule = await importModule<{
      runReplayDriver(
        args: string[],
        dependencies: {
          assertCodexBinary(): void;
          runCodexEpisode(options: { fixtureRoot: string }): Promise<Record<string, unknown>>;
        },
      ): Promise<void>;
    }>("scripts/bench/run-agent-efficiency-codex-replay.mjs");
    const root = temporaryRoot();
    const subject = path.join(root, "subject");
    mkdirSync(subject, { recursive: true });
    execFileSync(
      "/usr/bin/git",
      ["clone", "--quiet", "--shared", "--no-checkout", "--no-tags", REPO_ROOT, "."],
      {
        cwd: subject,
        env: { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1" },
      },
    );
    execFileSync("/usr/bin/git", ["checkout", "--quiet", "--detach", replay.REPLAY_ANCHOR_COMMIT], {
      cwd: subject,
    });
    execFileSync("/usr/bin/git", ["config", "core.hooksPath", "/dev/null"], { cwd: subject });
    const registryBytes = readFileSync(
      path.join(REPO_ROOT, "scripts/bench/agent-efficiency-fixtures.json"),
      "utf8",
    );
    const registry = JSON.parse(registryBytes) as {
      scenarios: { expected_episode_trace: string[]; id: string }[];
    };
    const overlayRelative = ".rf04-runtime/fixture-control/agent-efficiency-fixtures.json";
    mkdirSync(path.dirname(path.join(subject, overlayRelative)), { recursive: true });
    writeFileSync(path.join(subject, overlayRelative), `${baseline.stableJson(registry, 2)}\n`);
    const outputPath = path.join(root, "output.json");
    const evidencePath = path.join(root, "evidence.json");
    const driverPath = path.join(REPO_ROOT, "scripts/bench/run-agent-efficiency-codex-replay.mjs");
    const driverIdentity = replay.createReplayDriverIdentity(REPO_ROOT, driverPath);
    const dependencyManifest = dependencyModule.createReplayDependencyManifest(REPO_ROOT);
    const dependencyClaim = dependencyModule.replayDependencyClaimFromManifest(dependencyManifest);
    const harness = replay.createReplayHarnessManifest(REPO_ROOT, driverIdentity, {
      dependencyClaim,
    });
    const direct = registry.scenarios.find((scenario) => scenario.id === "direct");
    expect(direct).toBeDefined();
    const contract = {
      AGENTPLANE_RF04_REPLAY_ANCHOR: replay.REPLAY_ANCHOR_COMMIT,
      AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_EXECUTABLE_SHA256:
        dependencyClaim.capture_executable_sha256,
      AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_PLATFORM: JSON.stringify(
        dependencyClaim.capture_platform,
      ),
      AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_RECEIPT_SHA256:
        dependencyClaim.capture_receipt_sha256,
      AGENTPLANE_RF04_REPLAY_DEPENDENCY_PORTABLE_SHA256: dependencyClaim.portable_sha256,
      AGENTPLANE_RF04_REPLAY_DRIVER_CONTRACT_VERSION: String(driverIdentity.contract_version),
      AGENTPLANE_RF04_REPLAY_DRIVER_PATH: driverIdentity.path,
      AGENTPLANE_RF04_REPLAY_DRIVER_SHA256: driverIdentity.sha256,
      AGENTPLANE_RF04_REPLAY_EVIDENCE_OUTPUT: evidencePath,
      AGENTPLANE_RF04_REPLAY_EVIDENCE_PATH:
        "scripts/bench/agent-efficiency-replay-evidence/direct/run-01.json",
      AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES: JSON.stringify(direct?.expected_episode_trace),
      AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_ORIGIN: "fixture_control_overlay_v1",
      AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_PATH: overlayRelative,
      AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256: replay.fixtureRegistrySha256(registry),
      AGENTPLANE_RF04_REPLAY_HARNESS_SHA256: harness.sha256,
      AGENTPLANE_RF04_REPLAY_OUTPUT: outputPath,
      AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01",
    };
    const previousDirectory = process.cwd();
    Object.assign(process.env, contract);
    process.chdir(subject);
    try {
      await driverModule.runReplayDriver(
        [
          "--scenario",
          "direct",
          "--run-index",
          "1",
          "--output",
          outputPath,
          "--evidence-output",
          evidencePath,
        ],
        {
          assertCodexBinary: () => expect(true).toBe(true),
          runCodexEpisode({ fixtureRoot }) {
            writeFileSync(path.join(fixtureRoot, "work/allowed.txt"), "DIRECT_OK\n");
            return Promise.resolve({
              final_status: "done",
              provider_usage: {
                cached_input_tokens: 1,
                input_tokens: 2,
                output_tokens: 3,
                reasoning_output_tokens: 4,
                turn_completed_events: 1,
              },
              stderr_bytes: 0,
              stdout_bytes: 0,
            });
          },
        },
      );
    } finally {
      process.chdir(previousDirectory);
      for (const name of Object.keys(contract)) delete process.env[name];
    }
    const envelope = JSON.parse(readFileSync(outputPath, "utf8")) as {
      anchor: Record<string, unknown>;
      resolved_outcomes: Record<"scope_violation" | "verified_success", { value: boolean }>;
    };
    expect(envelope.anchor).toMatchObject({
      capture_platform: dependencyClaim.capture_platform,
      dependency_capture_executable_sha256: dependencyClaim.capture_executable_sha256,
      dependency_capture_receipt_sha256: dependencyClaim.capture_receipt_sha256,
      dependency_portable_sha256: dependencyClaim.portable_sha256,
      fixture_registry_origin: "fixture_control_overlay_v1",
      subject_sha: replay.REPLAY_ANCHOR_COMMIT,
    });
    expect(envelope.resolved_outcomes.verified_success.value).toBe(true);
    expect(envelope.resolved_outcomes.scope_violation.value).toBe(false);
  }, 120_000);
});
