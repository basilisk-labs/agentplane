import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { diffJsonPaths, hashJson, packageSurface } from "./compatibility-contract.mjs";
import {
  readCompatibilityCandidate,
  resolveCompatibilityCandidatePath,
  writeCompatibilityCandidateAtomic,
} from "./compatibility-candidate-path.mjs";
import {
  normalizePackageVersions,
  reconstructHistoricalPackageSurface,
  reviewedPackageVersion,
} from "./compatibility-incremental-package-delta.mjs";

const manifestPath = "packages/example/package.json";
const historicalManifest = packageSurface(manifestPath, {
  name: "example",
  version: "0.7.13",
  dependencies: { zod: "4.6.5" },
});
const currentManifest = packageSurface(manifestPath, {
  name: "example",
  version: "0.7.13",
  dependencies: { zod: "4.6.7" },
});

test("candidate reads and atomic writes reject a swapped leaf symlink", (context) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-safe-"));
  try {
    const baselineDir = path.join(root, "scripts/baselines");
    mkdirSync(baselineDir, { recursive: true });
    const candidate = path.join(baselineDir, "current-compatibility-candidate.json");
    const outside = path.join(root, "outside.json");
    writeFileSync(candidate, "original");
    writeFileSync(outside, "outside");
    try {
      symlinkSync(outside, `${candidate}.tmp`);
    } catch (error) {
      if (process.platform === "win32" && ["EPERM", "EACCES"].includes(error.code)) {
        context.skip("Windows runner does not permit symlink creation");
        return;
      }
      throw error;
    }
    assert.equal(readCompatibilityCandidate(candidate), "original");
    writeCompatibilityCandidateAtomic(candidate, "recaptured");
    assert.equal(readFileSync(candidate, "utf8"), "recaptured");
    assert.equal(readFileSync(outside, "utf8"), "outside");
    assert.throws(
      () =>
        writeCompatibilityCandidateAtomic(candidate, "stale-write", {
          beforeReplace() {
            const replacement = path.join(root, "new-regular-file.json");
            writeFileSync(replacement, "new-regular-file");
            renameSync(replacement, candidate);
          },
        }),
      /changed before write/u,
    );
    assert.equal(readFileSync(candidate, "utf8"), "new-regular-file");
    assert.throws(
      () =>
        readCompatibilityCandidate(candidate, {
          beforeOpen() {
            rmSync(candidate);
            symlinkSync(outside, candidate);
          },
        }),
      (error) => error.code === "ELOOP" || /changed before read/u.test(error.message),
    );
    assert.throws(() => readCompatibilityCandidate(candidate), /regular repository file/u);
    assert.throws(
      () => writeCompatibilityCandidateAtomic(candidate, "untrusted"),
      /regular repository file/u,
    );
    assert.equal(readFileSync(outside, "utf8"), "outside");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test(
  "candidate read rejects a swapped FIFO without blocking",
  { skip: process.platform === "win32" },
  () => {
    const root = mkdtempSync(path.join(os.tmpdir(), "candidate-fifo-"));
    try {
      const candidate = path.join(root, "candidate.json");
      writeFileSync(candidate, "regular");
      const source = new URL("compatibility-candidate-path.mjs", import.meta.url).href;
      const child = spawnSync(
        process.execPath,
        [
          "--input-type=module",
          "-e",
          `import { execFileSync } from "node:child_process"; import { rmSync } from "node:fs"; import { readCompatibilityCandidate } from ${JSON.stringify(source)}; readCompatibilityCandidate(process.argv[1], { beforeOpen() { rmSync(process.argv[1]); execFileSync("mkfifo", [process.argv[1]]); } });`,
          candidate,
        ],
        { encoding: "utf8", timeout: 3000 },
      );
      assert.equal(
        child.signal,
        null,
        "candidate read must return without waiting for a FIFO writer",
      );
      assert.equal(child.status, 1);
      assert.match(child.stderr, /changed before read/u);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  },
);

function fixture() {
  const surface = {
    schema_version: 2,
    cli_topology: { commands: ["new-command"] },
    package_manifests: [currentManifest],
  };
  const delta = {
    section: "package_manifests",
    historical_dependencies: [{ manifest_path: manifestPath, name: "zod", version: "4.6.5" }],
    from_sha256: hashJson([historicalManifest]),
    to_sha256: hashJson([currentManifest]),
    from_surface_sha256: "immutable-historical-full-surface-digest",
    to_surface_sha256: "immutable-reviewed-full-surface-digest",
    allowed_json_paths: diffJsonPaths(
      [historicalManifest],
      [currentManifest],
      "$.package_manifests",
    ),
  };
  return { surface, delta };
}

test("historical package evidence survives later unrelated surface changes", () => {
  const { surface, delta } = fixture();
  const reconstructed = reconstructHistoricalPackageSurface(surface, delta);
  assert.deepEqual(reconstructed.package_manifests, [historicalManifest]);
  assert.deepEqual(reconstructed.cli_topology, surface.cli_topology);
  assert.deepEqual(surface.package_manifests, [currentManifest]);
  surface.cli_topology.commands.push("another-command");
  assert.deepEqual(reconstructHistoricalPackageSurface(surface, delta).package_manifests, [
    historicalManifest,
  ]);
});

test("historical package evidence rejects package and path drift", () => {
  const cases = [
    (surface) => {
      surface.package_manifests[0] = { ...currentManifest, version: "0.7.14" };
    },
    (surface) => {
      surface.package_manifests.push(
        packageSurface("packages/extra/package.json", { name: "extra" }),
      );
    },
    (_surface, delta) => {
      delta.from_sha256 = "incorrect";
    },
    (_surface, delta) => {
      delta.to_sha256 = "incorrect";
    },
    (_surface, delta) => {
      delta.allowed_json_paths = [];
    },
    (_surface, delta) => {
      delta.historical_dependencies[0].version = "4.6.6";
    },
    (_surface, delta) => {
      delta.historical_dependencies = [];
    },
  ];
  for (const change of cases) {
    const { surface, delta } = fixture();
    change(surface, delta);
    assert.throws(() => reconstructHistoricalPackageSurface(surface, delta));
  }
});

test("reviewed package hashes survive only a parity-only release version bump", () => {
  const { surface, delta } = fixture();
  const reviewedVersion = surface.package_manifests[0].version;
  surface.package_manifests = [
    packageSurface(manifestPath, {
      name: "example",
      version: "0.7.14",
      dependencies: { zod: "4.6.7" },
    }),
  ];
  const historical = reconstructHistoricalPackageSurface(surface, delta, reviewedVersion);
  assert.equal(historical.package_manifests[0].version, "0.7.14");
  assert.equal(historical.package_manifests[0].dependencies.zod, "4.6.5");
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, "0.7.15"));
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, "invalid"));
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, ""));

  surface.package_manifests[0] = packageSurface(manifestPath, {
    name: "example",
    version: "0.7.14",
    dependencies: { zod: "4.6.7", unrelated: "1.0.0" },
  });
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, reviewedVersion));
  surface.package_manifests[0] = packageSurface(manifestPath, {
    name: "example",
    version: "0.7.14",
    dependencies: { zod: "4.6.8" },
  });
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, reviewedVersion));
  delta.allowed_json_paths = [];
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, reviewedVersion));
});

test("version normalization rejects mismatched internal dependency parity", () => {
  const manifest = packageSurface("packages/agentplane/package.json", {
    name: "agentplane",
    version: "0.7.14",
    dependencies: {
      "@agentplaneorg/core": "0.7.13",
      "@agentplaneorg/recipes": "0.7.14",
    },
  });
  assert.throws(() => normalizePackageVersions([manifest], "0.7.12"));
});

test("reviewed-version anchor cannot be null or replaced with a new release version", () => {
  const legacy = { release_version_delta: { to_version: "0.7.12" } };
  assert.equal(reviewedPackageVersion(legacy), "0.7.12");
  assert.throws(() =>
    reviewedPackageVersion({ ...legacy, incremental_package_delta_reviewed_version: null }),
  );
  const { surface, delta } = fixture();
  assert.throws(() => reconstructHistoricalPackageSurface(surface, delta, "0.7.14"));
});

test("candidate path accepts one explicit versioned artifact and rejects path escape", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-candidate-path-"));
  try {
    const baselines = path.join(root, "scripts/baselines");
    mkdirSync(baselines, { recursive: true });
    const candidate = path.join(baselines, "v0.8-compatibility-candidate.json");
    writeFileSync(candidate, "{}\n");
    assert.equal(
      resolveCompatibilityCandidatePath(
        root,
        "scripts/baselines/v0.8-compatibility-candidate.json",
      ),
      candidate,
    );
    assert.throws(() =>
      resolveCompatibilityCandidatePath(root, "scripts/baselines/../outside-candidate.json"),
    );
    assert.throws(() => resolveCompatibilityCandidatePath(root, "/tmp/outside-candidate.json"));
    symlinkSync(candidate, path.join(baselines, "v0.9-compatibility-candidate.json"));
    assert.throws(() =>
      resolveCompatibilityCandidatePath(
        root,
        "scripts/baselines/v0.9-compatibility-candidate.json",
      ),
    );
    rmSync(baselines, { recursive: true });
    symlinkSync(path.join(root, "outside"), baselines);
    assert.throws(() =>
      resolveCompatibilityCandidatePath(
        root,
        "scripts/baselines/v0.8-compatibility-candidate.json",
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
