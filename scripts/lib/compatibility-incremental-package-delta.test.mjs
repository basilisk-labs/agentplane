import assert from "node:assert/strict";
import { test } from "node:test";

import { diffJsonPaths, hashJson, packageSurface } from "./compatibility-contract.mjs";
import { reconstructHistoricalPackageSurface } from "./compatibility-incremental-package-delta.mjs";

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
