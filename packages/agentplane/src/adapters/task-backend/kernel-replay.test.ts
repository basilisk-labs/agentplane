import { readFile, mkdtemp, mkdir, writeFile, symlink, realpath, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import {
  compareReplayObservations,
  observeKernelEvidenceReplay,
  replayBytesDigest,
  replayKernelFixture,
  type KernelReplayFixture,
  type ObservationReplayInput,
  type ReplayIdentity,
} from "./kernel-replay.js";

const isolation = (await import(
  pathToFileURL(path.join(process.cwd(), "scripts/bench/internal/kernel-replay-isolation.mjs")).href
)) as {
  linkReplayDependencies(
    source: string,
    checkout: string,
  ): { modules: string; mappings: { path: string; unavailable?: boolean }[] };
  summarizeReplayReport(
    report: unknown,
    failure?: string | null,
  ): {
    success: boolean;
    first_failure: string | null;
    failure_details: string[];
  };
};
const dependencyCapture = (await import(
  pathToFileURL(
    path.join(process.cwd(), "scripts/bench/internal/agent-efficiency-dependency-manifest.mjs"),
  ).href
)) as {
  createReplayDependencyManifest(
    root: string,
    seeds?: { label: string; path: string }[],
  ): {
    capture_executable_sha256: string;
  };
};
const isolationRoots: string[] = [];
afterEach(async () => {
  await Promise.all(
    isolationRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});
async function isolationFixture() {
  const temporary = await mkdtemp(path.join(os.tmpdir(), "kernel-replay-isolation-"));
  isolationRoots.push(temporary);
  const source = path.join(temporary, "source");
  const checkout = path.join(temporary, "checkout");
  const put = async (file: string, text: string) => {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, text);
  };
  for (const root of [source, checkout]) {
    for (const [directory, name] of [
      ["agentplane", "agentplane"],
      ["core", "@agentplaneorg/core"],
    ]) {
      await put(path.join(root, "packages", directory!, "package.json"), JSON.stringify({ name }));
    }
  }
  await put(path.join(source, "package.json"), JSON.stringify({ name: "replay-fixture" }));
  await put(path.join(source, "bun.lock"), JSON.stringify({ workspaces: {} }));
  const external = path.join(source, "node_modules/.bun/canonicalize/node_modules/canonicalize");
  await put(path.join(external, "package.json"), JSON.stringify({ name: "canonicalize" }));
  await put(path.join(external, "index.js"), "export default JSON.stringify;\n");
  const runner = path.join(source, "node_modules/vitest");
  await put(path.join(runner, "package.json"), JSON.stringify({ name: "vitest" }));
  await put(path.join(runner, "index.js"), "export const runner = 1;\n");
  await mkdir(path.join(source, "packages/core/node_modules"), { recursive: true });
  await symlink(external, path.join(source, "packages/core/node_modules/canonicalize"), "junction");
  await mkdir(path.join(source, "packages/agentplane/node_modules/@agentplaneorg"), {
    recursive: true,
  });
  await symlink(
    path.join(source, "packages/core"),
    path.join(source, "packages/agentplane/node_modules/@agentplaneorg/core"),
    "junction",
  );
  return { source, checkout, external, runner, temporary };
}

describe("exact-anchor replay isolation", () => {
  it("links package-local external dependencies and redirects workspace links to the anchor", async () => {
    const f = await isolationFixture();
    await mkdir(path.join(f.source, "node_modules/@agentplane"));
    await symlink(
      path.join(f.source, "packages/core"),
      path.join(f.source, "node_modules/@agentplane/core"),
      "junction",
    );
    isolation.linkReplayDependencies(f.source, f.checkout);
    expect(await realpath(path.join(f.checkout, "packages/core/node_modules/canonicalize"))).toBe(
      await realpath(f.external),
    );
    expect(
      await realpath(path.join(f.checkout, "packages/agentplane/node_modules/@agentplaneorg/core")),
    ).toBe(await realpath(path.join(f.checkout, "packages/core")));
    expect(await realpath(path.join(f.checkout, "node_modules/@agentplane/core"))).toBe(
      await realpath(path.join(f.checkout, "packages/core")),
    );
  });

  it("rejects an external dependency that resolves outside the dependency tree", async () => {
    const f = await isolationFixture();
    const outside = path.join(f.temporary, "outside");
    await mkdir(outside);
    await symlink(outside, path.join(f.source, "node_modules/escape"), "junction");
    expect(() => isolation.linkReplayDependencies(f.source, f.checkout)).toThrow(
      "escapes node_modules",
    );
  });

  it("reports a dangling dependency as unavailable without replacing it from another checkout", async () => {
    const f = await isolationFixture();
    await symlink(
      path.join(f.source, "node_modules/missing-target"),
      path.join(f.source, "node_modules/missing"),
      "junction",
    );
    const result = isolation.linkReplayDependencies(f.source, f.checkout);
    expect(result.mappings).toContainEqual({
      path: path.join("node_modules", "missing"),
      workspace: null,
      unavailable: true,
    });
    await expect(realpath(path.join(f.checkout, "node_modules/missing"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("binds test-runner bytes without changing the existing default dependency capture", async () => {
    const f = await isolationFixture();
    const seeds = [{ label: "node_modules/vitest", path: f.runner }];
    const before = dependencyCapture.createReplayDependencyManifest(f.source);
    const runnerBefore = dependencyCapture.createReplayDependencyManifest(f.source, seeds);
    await writeFile(path.join(f.runner, "index.js"), "export const runner = 2;\n");
    expect(dependencyCapture.createReplayDependencyManifest(f.source)).toEqual(before);
    expect(
      dependencyCapture.createReplayDependencyManifest(f.source, seeds).capture_executable_sha256,
    ).not.toBe(runnerBefore.capture_executable_sha256);
  });

  it.each([
    [null, "missing_report"],
    [{ success: true, numTotalTests: 0 }, "no_tests"],
    [{ success: true, numTotalTests: 1, numPassedTests: 1 }, "inconsistent_report"],
    [
      {
        success: false,
        numTotalTests: 0,
        testResults: [
          { name: "broken suite", status: "failed", message: "Cannot find package canonicalize" },
        ],
      },
      "broken suite",
    ],
  ])("does not hide a missing, empty or failed suite report", (report, reason) => {
    expect(isolation.summarizeReplayReport(report)).toMatchObject({
      success: false,
      first_failure: reason,
    });
  });

  it("preserves runner and suite diagnostics and accepts only a nonempty successful report", () => {
    const passing = {
      success: true,
      numTotalTests: 1,
      numPassedTests: 1,
      testResults: [{ status: "passed", assertionResults: [{ status: "passed" }] }],
    };
    expect(isolation.summarizeReplayReport(passing).success).toBe(true);
    expect(isolation.summarizeReplayReport(passing, "runner terminated")).toMatchObject({
      success: false,
      first_failure: "runner_failure",
      failure_details: ["runner terminated"],
    });
    expect(
      isolation.summarizeReplayReport({
        success: false,
        testResults: [{ name: "suite", status: "failed", message: "missing dependency" }],
      }).failure_details,
    ).toEqual(["missing dependency"]);
  });
});

const corpus = JSON.parse(
  await readFile(new URL("kernel-replay.corpus.json", import.meta.url), "utf8"),
) as {
  source_anchor: string;
  fixtures: KernelReplayFixture[];
};

describe("frozen canonical kernel replay", () => {
  for (const fixture of corpus.fixtures) {
    it(fixture.identity.fixture_id, () => {
      const original = JSON.stringify(fixture);
      const replay = replayKernelFixture(fixture);
      expect(replay, JSON.stringify(replay)).toMatchObject({
        matched: true,
        first_divergent_field: null,
      });
      expect(JSON.stringify(fixture)).toBe(original);
    });
  }

  it("covers the closed Task and WorkItem action products without duplicate fixture identities", () => {
    const ids = corpus.fixtures.map((fixture) => fixture.identity.fixture_id);
    expect(new Set(ids).size).toBe(ids.length);
    const required = [
      ...Object.keys(taskKernel.TASK_ACTION_TRANSITION_TABLE).flatMap((action) =>
        taskKernel.TASK_STATES.map((state) => `task-${action}-${state}`),
      ),
      ...Object.keys(taskKernel.WORK_ITEM_TRANSITION_TABLE).flatMap((action) =>
        taskKernel.WORK_ITEM_STATES.map((state) => `work-item-${action}-${state}`),
      ),
    ];
    expect(required.filter((id) => !ids.includes(id))).toEqual([]);
    expect(
      corpus.fixtures.every(
        (fixture) => fixture.identity.implementation_anchor === corpus.source_anchor,
      ),
    ).toBe(true);
  });

  it("reports source corruption before interpreting the command", () => {
    const fixture = corpus.fixtures[0]!;
    const replay = replayKernelFixture({ ...fixture, source_bytes: "invalid JSON" });
    expect(replay).toMatchObject({ matched: false, first_divergent_field: '$["source_digest"]' });
  });

  it("reports the first divergent event and keeps exact source and reproduction identity", () => {
    const fixture = corpus.fixtures.find((value) => value.expected.events.length > 0)!;
    const expected = structuredClone(fixture.expected);
    Reflect.set(expected.events[0]!, "actor_id", "different-actor");
    const replay = replayKernelFixture({ ...fixture, expected });
    expect(replay).toMatchObject({
      ...fixture.identity,
      matched: false,
      first_divergent_field: '$["events"][0]["actor_id"]',
    });
  });

  it("does not hide missing fields, array reorder or a missing event behind final state equality", () => {
    const identity = corpus.fixtures[0]!.identity;
    expect(compareReplayObservations(identity, { a: undefined }, {}).matched).toBe(false);
    expect(compareReplayObservations(identity, [1, 2], [2, 1]).first_divergent_field).toBe("$[0]");
    expect(
      compareReplayObservations(identity, { events: ["one"] }, { events: [] })
        .first_divergent_field,
    ).toBe('$["events"][0]');
    expect(compareReplayObservations(identity, { b: 2, a: 1 }, { a: 1, b: 2 }).matched).toBe(true);
  });
});

const evidenceCorpus = JSON.parse(
  await readFile(new URL("kernel-replay-evidence.corpus.json", import.meta.url), "utf8"),
) as {
  fixtures: { identity: ReplayIdentity; source_bytes: string; expected: unknown }[];
};
describe("frozen evidence adapter replay", () => {
  for (const fixture of evidenceCorpus.fixtures) {
    it(fixture.identity.fixture_id, () => {
      expect(replayBytesDigest(fixture.source_bytes)).toBe(fixture.identity.source_digest);
      const input = JSON.parse(fixture.source_bytes) as ObservationReplayInput;
      const before = JSON.stringify(input);
      const comparison = compareReplayObservations(
        fixture.identity,
        fixture.expected,
        observeKernelEvidenceReplay(input),
      );
      expect(comparison, JSON.stringify(comparison)).toMatchObject({ matched: true });
      expect(JSON.stringify(input)).toBe(before);
    });
  }
});
