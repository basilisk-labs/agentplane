import { mkdir, readFile, readdir, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  assertEvaluatorPacketCurrent,
  putEvaluatorEvidenceObject,
  writeEvaluatorPacketManifest,
} from "./evaluator-evidence-store.js";

describe("evaluator evidence object store", () => {
  it("reuses immutable content by digest and verifies the compact packet manifest", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202608030000-EVSTORE";
    const qualityRoot = path.join(root, ".agentplane", "tasks", taskId, "quality");
    const reviewRoot = path.join(qualityRoot, "20260803-000000000-recovery-context");
    const contents = "same immutable evaluator input\n";
    const [first, second] = await Promise.all([
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-prompt",
        kind: "prompt",
        extension: ".md",
        mediaType: "text/markdown",
        contents,
      }),
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-prompt-copy",
        kind: "prompt",
        extension: ".md",
        mediaType: "text/markdown",
        contents,
      }),
    ]);
    const schema = await putEvaluatorEvidenceObject({
      gitRoot: root,
      taskQualityRoot: qualityRoot,
      logicalName: "evaluator-result-schema",
      kind: "result_schema",
      extension: ".json",
      mediaType: "application/schema+json",
      contents: "{}\n",
    });

    expect(first.path).toBe(second.path);
    expect(await readdir(path.join(qualityRoot, "objects", "sha256"))).toHaveLength(2);
    const [diff, checks, blueprint] = await Promise.all([
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-diff",
        kind: "actual_diff",
        extension: ".patch",
        mediaType: "text/x-diff",
        contents: "diff\n",
      }),
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-observed-checks",
        kind: "observed_checks",
        extension: ".json",
        mediaType: "application/json",
        contents: '{"checks":[]}\n',
      }),
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-blueprint",
        kind: "blueprint",
        extension: ".json",
        mediaType: "application/json",
        contents: '{"blueprint":true}\n',
      }),
    ]);
    const manifestPath = path.join(reviewRoot, "evaluator-evidence-manifest.json");
    const written = await writeEvaluatorPacketManifest({
      gitRoot: root,
      taskId,
      workOrderId: "evaluator-work-order-test",
      createdAt: "2026-08-03T00:00:00.000Z",
      taskQualityRoot: qualityRoot,
      manifestPath,
      artifacts: [first, schema, diff, checks, blueprint],
    });

    const verified = await assertEvaluatorPacketCurrent({
      gitRoot: root,
      taskId,
      manifestPath: path.relative(root, manifestPath).replaceAll("\\", "/"),
      manifestSha256: written.sha256,
      promptPath: first.path,
      resultSchemaPath: schema.path,
    });
    expect(verified).toMatchObject({ kind: "evaluator_evidence_packet", task_id: taskId });
    expect(
      verified.artifacts.some(
        (artifact) => artifact.logical_name === "evaluator-prompt" && artifact.path === first.path,
      ),
    ).toBe(true);
  });

  it("rejects a tampered object instead of overwriting the content-addressed path", async () => {
    const root = await mkGitRepoRoot();
    const qualityRoot = path.join(root, ".agentplane", "tasks", "T-1", "quality");
    const artifact = await putEvaluatorEvidenceObject({
      gitRoot: root,
      taskQualityRoot: qualityRoot,
      logicalName: "evaluator-diff",
      kind: "actual_diff",
      extension: ".patch",
      mediaType: "text/x-diff",
      contents: "authoritative diff\n",
    });
    const objectPath = path.join(root, artifact.path);
    await mkdir(path.dirname(objectPath), { recursive: true });
    await writeFile(objectPath, "tampered diff\n", "utf8");

    await expect(
      putEvaluatorEvidenceObject({
        gitRoot: root,
        taskQualityRoot: qualityRoot,
        logicalName: "evaluator-diff",
        kind: "actual_diff",
        extension: ".patch",
        mediaType: "text/x-diff",
        contents: "authoritative diff\n",
      }),
    ).rejects.toThrow(/collision or tamper/u);
    expect(await readFile(objectPath, "utf8")).toBe("tampered diff\n");
  });

  for (const symlinkedDirectory of ["objects", "objects/sha256", "objects/.staging"]) {
    it(`rejects a symlinked ${symlinkedDirectory} directory without writing outside the repository`, async () => {
      const root = await mkGitRepoRoot();
      const qualityRoot = path.join(root, ".agentplane", "tasks", "T-SYMLINK", "quality");
      const outsideRoot = `${root}-outside-${symlinkedDirectory.replaceAll("/", "-")}`;
      const linkPath = path.join(qualityRoot, ...symlinkedDirectory.split("/"));
      await Promise.all([
        mkdir(path.dirname(linkPath), { recursive: true }),
        mkdir(outsideRoot, { recursive: true }),
      ]);
      await symlink(outsideRoot, linkPath, "dir");

      try {
        await expect(
          putEvaluatorEvidenceObject({
            gitRoot: root,
            taskQualityRoot: qualityRoot,
            logicalName: "evaluator-diff",
            kind: "actual_diff",
            extension: ".patch",
            mediaType: "text/x-diff",
            contents: "must remain inside the repository\n",
          }),
        ).rejects.toThrow(/symbolic link/u);
        expect(await readdir(outsideRoot)).toEqual([]);
      } finally {
        await rm(outsideRoot, { recursive: true, force: true });
      }
    });
  }

  it("rejects packet verification when the object directory becomes an outside symlink", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "T-VERIFY-SYMLINK";
    const qualityRoot = path.join(root, ".agentplane", "tasks", taskId, "quality");
    const reviewRoot = path.join(qualityRoot, "review");
    const definitions = [
      ["evaluator-diff", "actual_diff", ".patch", "text/x-diff", "diff\n"],
      ["evaluator-observed-checks", "observed_checks", ".json", "application/json", "{}\n"],
      ["evaluator-blueprint", "blueprint", ".json", "application/json", "{}\n"],
      ["evaluator-prompt", "prompt", ".md", "text/markdown", "prompt\n"],
      ["evaluator-result-schema", "result_schema", ".json", "application/schema+json", "{}\n"],
    ] as const;
    const artifacts = await Promise.all(
      definitions.map(([logicalName, kind, extension, mediaType, contents]) =>
        putEvaluatorEvidenceObject({
          gitRoot: root,
          taskQualityRoot: qualityRoot,
          logicalName,
          kind,
          extension,
          mediaType,
          contents,
        }),
      ),
    );
    const manifestPath = path.join(reviewRoot, "evaluator-evidence-manifest.json");
    const written = await writeEvaluatorPacketManifest({
      gitRoot: root,
      taskId,
      workOrderId: "evaluator-work-order-symlink-test",
      createdAt: "2026-08-03T00:00:00.000Z",
      taskQualityRoot: qualityRoot,
      manifestPath,
      artifacts,
    });
    const objectsRoot = path.join(qualityRoot, "objects");
    const savedObjectsRoot = path.join(qualityRoot, "objects-saved");
    const outsideRoot = `${root}-outside-verification`;
    await Promise.all([
      rename(objectsRoot, savedObjectsRoot),
      mkdir(outsideRoot, { recursive: true }),
    ]);
    await symlink(outsideRoot, objectsRoot, "dir");

    try {
      await expect(
        assertEvaluatorPacketCurrent({
          gitRoot: root,
          taskId,
          manifestPath: path.relative(root, manifestPath).replaceAll("\\", "/"),
          manifestSha256: written.sha256,
          promptPath: artifacts[3].path,
          resultSchemaPath: artifacts[4].path,
        }),
      ).rejects.toThrow(/symbolic link/u);
      expect(await readdir(outsideRoot)).toEqual([]);
    } finally {
      await rm(outsideRoot, { recursive: true, force: true });
    }
  });
});
