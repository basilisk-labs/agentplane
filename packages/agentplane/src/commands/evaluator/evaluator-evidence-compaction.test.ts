import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  addTask,
  commitPath,
  freezeTaskExecutionBase,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

describe("evaluator evidence compaction", () => {
  it("stores repeated immutable inputs once and keeps review directories compact", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EVCP";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await commitPath(
      root,
      "src/large-review-target.ts",
      `export const reviewTarget = ${JSON.stringify("x".repeat(200_000))};\n`,
      "feat: large evaluator target",
    );

    const firstReview = await prepareTypedReview(root, taskId, {
      at: "2026-08-03T00:00:00.000Z",
    });
    const secondReview = await prepareTypedReview(root, taskId, {
      at: "2026-08-03T00:01:00.000Z",
    });
    const first = firstReview.prepared;
    const second = secondReview.prepared;
    type PacketManifest = {
      artifacts: { logical_name: string; path: string; size_bytes: number }[];
    };
    const firstManifest = JSON.parse(
      await readFile(first.packet_manifest_path, "utf8"),
    ) as PacketManifest;
    const secondManifest = JSON.parse(
      await readFile(second.packet_manifest_path, "utf8"),
    ) as PacketManifest;
    const firstPaths = new Set(firstManifest.artifacts.map((artifact) => artifact.path));
    const repeatedInputBytes = secondManifest.artifacts.reduce(
      (total, artifact) => total + artifact.size_bytes,
      0,
    );
    const newlyStoredBytes = secondManifest.artifacts
      .filter((artifact) => !firstPaths.has(artifact.path))
      .reduce((total, artifact) => total + artifact.size_bytes, 0);

    expect(1 - newlyStoredBytes / repeatedInputBytes).toBeGreaterThanOrEqual(0.8);
    for (const logicalName of [
      "evaluator-diff",
      "evaluator-observed-checks",
      "evaluator-blueprint",
      "evaluator-result-schema",
    ]) {
      expect(
        firstManifest.artifacts.find((artifact) => artifact.logical_name === logicalName)?.path,
      ).toBe(
        secondManifest.artifacts.find((artifact) => artifact.logical_name === logicalName)?.path,
      );
    }
    const uniquePaths = new Set(
      [...firstManifest.artifacts, ...secondManifest.artifacts].map((artifact) => artifact.path),
    );
    const objectFiles = await readdir(
      path.join(root, ".agentplane", "tasks", taskId, "quality", "objects", "sha256"),
    );
    expect(objectFiles).toHaveLength(uniquePaths.size);
    for (const prepared of [first, second]) {
      expect(await readdir(path.dirname(prepared.work_order_path))).toEqual([
        "evaluator-evidence-manifest.json",
        "evaluator-work-order.json",
      ]);
    }
  });
});
