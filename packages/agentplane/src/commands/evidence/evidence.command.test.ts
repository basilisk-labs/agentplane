import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import {
  cmdEvidenceBundle,
  cmdEvidenceVerify,
  evidenceBundleSpec,
  evidenceVerifySpec,
  readTaskEvidenceBundleTrustExtension,
} from "./evidence.command.js";

function fakeCommandContext(root: string): CommandContext {
  return {
    resolvedProject: { gitRoot: root },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    taskBackend: {
      getTask: (taskId: string) =>
        Promise.resolve({
        id: taskId,
        title: "Evidence task",
        description: "Create evidence bundle.",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        }),
    },
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
    git: {} as CommandContext["git"],
    memo: {},
  } as CommandContext;
}

describe("evidence command specs", () => {
  it("parses bundle and verify flags", () => {
    expect(
      evidenceBundleSpec.parse({
        args: { "task-id": "202605031625-886KZ6" },
        opts: { json: true },
      }),
    ).toMatchObject({ taskId: "202605031625-886KZ6", json: true });

    expect(
      evidenceVerifySpec.parse({
        args: { "task-id-or-manifest": "202605031625-886KZ6" },
        opts: { strict: true },
      }),
    ).toMatchObject({ target: "202605031625-886KZ6", strict: true });
  });
});

describe("evidence bundle manifest", () => {
  it("writes and verifies deterministic task-local file hashes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-evidence-"));
    const taskId = "202605031625-886KZ6";
    const taskRoot = path.join(root, ".agentplane/tasks", taskId);
    await mkdir(path.join(taskRoot, "blueprint"), { recursive: true });
    await writeFile(path.join(taskRoot, "README.md"), "# Task\n", "utf8");
    await writeFile(path.join(taskRoot, "acr.json"), "{}\n", "utf8");
    await writeFile(path.join(taskRoot, "blueprint/resolved-snapshot.json"), "{}\n", "utf8");

    const ctx = fakeCommandContext(root);
    await cmdEvidenceBundle({
      commandCtx: ctx,
      cwd: root,
      parsed: { taskId, json: false },
    });

    const manifestPath = path.join(taskRoot, "evidence/manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
      files: { path: string; role: string }[];
      integrity: { manifest_digest: string };
    };
    expect(manifest.integrity.manifest_digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(manifest.files.map((file) => file.role)).toEqual([
      "acr",
      "blueprint_snapshot",
      "task_readme",
    ]);

    await expect(
      cmdEvidenceVerify({
        commandCtx: ctx,
        cwd: root,
        parsed: { target: taskId, json: false, strict: true },
      }),
    ).resolves.toBe(0);
    await expect(readTaskEvidenceBundleTrustExtension({ ctx, taskId })).resolves.toMatchObject({
      "agentplane.trust": {
        schema_version: 1,
        evidence_bundle: {
          path: `.agentplane/tasks/${taskId}/evidence/manifest.json`,
          status: "available",
        },
      },
    });

    await writeFile(path.join(taskRoot, "acr.json"), "{\"changed\":true}\n", "utf8");
    await expect(
      cmdEvidenceVerify({
        commandCtx: ctx,
        cwd: root,
        parsed: { target: taskId, json: false, strict: true },
      }),
    ).rejects.toThrow("hash mismatch");
  });
});
