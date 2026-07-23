import { createHash } from "node:crypto";
import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { observeRunnerArtifacts } from "./artifacts.js";

const roots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-artifact-observer-"));
  roots.push(root);
  return root;
}

function sha256(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("runner artifact observer", () => {
  it("hashes regular artifacts and verifies prepared digests", async () => {
    const root = await tempRoot();
    const bundlePath = path.join(root, "bundle.json");
    await writeFile(bundlePath, "bundle\n", "utf8");

    const observed = await observeRunnerArtifacts({
      artifacts: [{ path: bundlePath, label: "bundle" }],
      expected_sha256_by_path: new Map([[bundlePath, sha256("bundle\n")]]),
    });

    expect(observed.errors).toEqual([]);
    expect(observed.observations).toEqual([
      {
        provenance: "supervisor_observed",
        path: bundlePath,
        label: "bundle",
        required: true,
        state: "present",
        bytes: 7,
        sha256: sha256("bundle\n"),
      },
    ]);
  });

  it("reports later artifact tampering as an integrity error", async () => {
    const root = await tempRoot();
    const artifactPath = path.join(root, "artifact.txt");
    await writeFile(artifactPath, "after\n", "utf8");

    const observed = await observeRunnerArtifacts({
      artifacts: [{ path: artifactPath, label: "report" }],
      expected_sha256_by_path: new Map([[artifactPath, sha256("before\n")]]),
    });

    expect(observed.observations[0]).toMatchObject({
      state: "present",
      sha256: sha256("after\n"),
    });
    expect(observed.errors).toEqual([expect.stringContaining("artifact digest mismatch")]);
  });

  it.skipIf(process.platform === "win32")("does not follow symlinked artifacts", async () => {
    const root = await tempRoot();
    const targetPath = path.join(root, "target.txt");
    const linkPath = path.join(root, "artifact.txt");
    await writeFile(targetPath, "secret\n", "utf8");
    await symlink(targetPath, linkPath);

    const observed = await observeRunnerArtifacts({
      artifacts: [{ path: linkPath, label: "report" }],
    });

    expect(observed.observations[0]).toMatchObject({
      path: linkPath,
      state: "unsupported",
      bytes: null,
      sha256: null,
    });
    expect(observed.errors).toEqual([expect.stringContaining("not a regular file")]);
  });

  it("excludes self-referential result and receipt artifacts", async () => {
    const root = await tempRoot();
    const resultPath = path.join(root, "result.json");
    const receiptPath = path.join(root, "execution-receipt.json");
    await writeFile(resultPath, "{}\n", "utf8");
    await writeFile(receiptPath, "{}\n", "utf8");

    const observed = await observeRunnerArtifacts({
      artifacts: [
        { path: resultPath, label: "result-manifest" },
        { path: receiptPath, label: "execution-receipt" },
      ],
      excluded_paths: [resultPath, receiptPath],
    });

    expect(observed).toEqual({ observations: [], errors: [] });
  });
});
