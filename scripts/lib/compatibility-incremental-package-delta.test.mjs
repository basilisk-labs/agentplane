import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { diffJsonPaths, hashJson, packageSurface } from "./compatibility-contract.mjs";
import { resolveCompatibilityCandidatePath } from "./compatibility-candidate-path.mjs";
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
