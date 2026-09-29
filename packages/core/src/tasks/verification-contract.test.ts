import { describe, expect, it } from "vitest";

import { repositoryEffectsForChange, repositoryEffectsForPath } from "./verification-contract.js";

describe("repository effect classification", () => {
  it("does not classify dependency-free package manifest changes as dependency effects", () => {
    const before = JSON.stringify({ name: "example", scripts: { test: "vitest" } });
    const after = JSON.stringify({ name: "renamed", scripts: { test: "vitest run" } });

    expect(repositoryEffectsForPath("packages/example/package.json")).toEqual(["repository_write"]);
    expect(repositoryEffectsForChange("packages/example/package.json", before, after)).toEqual([
      "repository_write",
    ]);
  });

  it.each([
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
    "bundledDependencies",
    "bundleDependencies",
  ])("classifies a changed %s field as a dependency effect", (field) => {
    const before = JSON.stringify({ name: "example", [field]: { alpha: "1.0.0" } });
    const after = JSON.stringify({ name: "example", [field]: { alpha: "2.0.0" } });

    expect(repositoryEffectsForChange("package.json", before, after)).toEqual([
      "dependencies",
      "repository_write",
    ]);
  });

  it("ignores dependency map key ordering", () => {
    const before = JSON.stringify({ dependencies: { alpha: "1", beta: "2" } });
    const after = JSON.stringify({ dependencies: { beta: "2", alpha: "1" } });

    expect(repositoryEffectsForChange("package.json", before, after)).toEqual(["repository_write"]);
  });

  it("fails closed for an invalid package manifest", () => {
    expect(repositoryEffectsForChange("package.json", "{}", "{")).toEqual([
      "dependencies",
      "repository_write",
    ]);
  });

  it("keeps lockfiles classified as dependency effects", () => {
    expect(repositoryEffectsForPath("packages/example/pnpm-lock.yaml")).toEqual([
      "dependencies",
      "repository_write",
    ]);
  });
});
