import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { link, lstat, mkdir, mkdtemp, readFile, rename, utimes, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import {
  evidenceCompactSpec,
  evidenceGcSpec,
  evidenceStatsSpec,
} from "./evidence-maintenance.command.js";
import { buildEvidenceInventory } from "./evidence-inventory.js";
import { compactEvidenceObjects, garbageCollectEvidenceObjects } from "./evidence-maintenance.js";

const execFileAsync = promisify(execFile);
const WORKFLOW_DIR = ".agentplane/tasks";
const OLD = new Date("2025-01-01T00:00:00.000Z");
const NOW = new Date("2026-08-06T00:00:00.000Z");

async function git(root: string, args: string[]): Promise<void> {
  await execFileAsync("git", args, { cwd: root });
}

async function fixture(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-evidence-maintenance-"));
  await git(root, ["init", "-q", "-b", "main"]);
  await git(root, ["config", "user.name", "Evidence Test"]);
  await git(root, ["config", "user.email", "evidence@example.com"]);
  return root;
}

function readme(opts: {
  taskId: string;
  status?: "DONE" | "DOING" | "BLOCKED";
  tags?: string[];
  verification?: "ok" | "needs_rework";
}): string {
  return renderTaskReadme(
    {
      id: opts.taskId,
      title: `Evidence ${opts.taskId}`,
      description: "Evidence retention fixture.",
      status: opts.status ?? "DONE",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: opts.tags ?? ["code"],
      verify: [],
      plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
      verification: {
        state: opts.verification ?? "ok",
        updated_at: null,
        updated_by: null,
        note: null,
      },
      commit: null,
      comments: [],
      events: [],
      revision: 1,
      doc_version: 3,
      doc_updated_at: "2026-08-06T00:00:00.000Z",
      doc_updated_by: "CODER",
      sections: {
        Summary: "Fixture.",
        Scope: "Fixture.",
        Plan: "Fixture.",
        "Verify Steps": "Fixture.",
        Verification: "",
        "Rollback Plan": "Fixture.",
        Findings: "",
      },
    },
    "",
  );
}

async function addTask(
  root: string,
  taskId: string,
  opts?: Omit<Parameters<typeof readme>[0], "taskId">,
): Promise<string> {
  const taskRoot = path.join(root, WORKFLOW_DIR, taskId);
  await mkdir(taskRoot, { recursive: true });
  await writeFile(path.join(taskRoot, "README.md"), readme({ ...(opts ?? {}), taskId }), "utf8");
  return taskRoot;
}

async function addObject(root: string, taskId: string, contents: string): Promise<string> {
  const digest = createHash("sha256").update(contents).digest("hex");
  const objectPath = path.join(
    root,
    WORKFLOW_DIR,
    taskId,
    "quality/objects/sha256",
    `${digest}.json`,
  );
  await mkdir(path.dirname(objectPath), { recursive: true });
  await writeFile(objectPath, contents, "utf8");
  await utimes(objectPath, OLD, OLD);
  return objectPath;
}

async function addManifest(root: string, taskId: string, objectPath: string): Promise<void> {
  const manifestPath = path.join(
    root,
    WORKFLOW_DIR,
    taskId,
    "quality/review/evaluator-evidence-manifest.json",
  );
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(
    manifestPath,
    `${JSON.stringify({ artifacts: [{ path: path.relative(root, objectPath).replaceAll(path.sep, "/") }] })}\n`,
    "utf8",
  );
}

async function publishManifestAtomically(
  root: string,
  taskId: string,
  objectPath: string,
): Promise<void> {
  const manifestPath = path.join(
    root,
    WORKFLOW_DIR,
    taskId,
    "quality/review/evaluator-evidence-manifest.json",
  );
  const stagingPath = `${manifestPath}.tmp`;
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(
    stagingPath,
    `${JSON.stringify({ artifacts: [{ path: path.relative(root, objectPath).replaceAll(path.sep, "/") }] })}\n`,
    "utf8",
  );
  await rename(stagingPath, manifestPath);
}

async function replaceTaskReadmeAtomically(
  root: string,
  taskId: string,
  opts: Omit<Parameters<typeof readme>[0], "taskId">,
): Promise<void> {
  const readmePath = path.join(root, WORKFLOW_DIR, taskId, "README.md");
  const stagingPath = `${readmePath}.tmp`;
  await writeFile(stagingPath, readme({ ...opts, taskId }), "utf8");
  await rename(stagingPath, readmePath);
}

async function commitFixture(root: string): Promise<void> {
  await git(root, ["add", "."]);
  await git(root, ["commit", "-q", "-m", "test: seed evidence objects"]);
}

describe("evidence maintenance command specs", () => {
  it("keeps maintenance dry-run-first and requires an explicit apply confirmation", () => {
    expect(evidenceStatsSpec.parse({ args: {}, opts: { json: true } })).toEqual({ json: true });
    expect(evidenceCompactSpec.parse({ args: {}, opts: {} })).toEqual({
      apply: false,
      yes: false,
      json: false,
    });
    expect(evidenceGcSpec.parse({ args: {}, opts: { apply: true, yes: true } })).toMatchObject({
      apply: true,
      yes: true,
    });
  });
});

describe("evidence object retention", () => {
  it("reports, deduplicates, and collects only expired unreferenced unpinned objects", async () => {
    const root = await fixture();
    const referencedTask = "202608060001-AAAAAA";
    const duplicateTask = "202608060002-BBBBBB";
    const releaseTask = "202608060003-CCCCCC";
    const failureTask = "202608060004-DDDDDD";
    await addTask(root, referencedTask);
    await addTask(root, duplicateTask);
    await addTask(root, releaseTask, { tags: ["release"] });
    await addTask(root, failureTask, {
      status: "BLOCKED",
      verification: "needs_rework",
    });
    const referenced = await addObject(root, referencedTask, '{"same":true}\n');
    const duplicate = await addObject(root, duplicateTask, '{"same":true}\n');
    const release = await addObject(root, releaseTask, '{"release":true}\n');
    const failure = await addObject(root, failureTask, '{"failure":true}\n');
    await addManifest(root, referencedTask, referenced);
    await commitFixture(root);

    const inventory = await buildEvidenceInventory({ root, workflowDir: WORKFLOW_DIR, now: NOW });
    expect(inventory.summary).toMatchObject({
      object_count: 4,
      unique_contents: 3,
      duplicate_objects: 1,
      reachable_objects: 1,
      pinned_objects: 2,
      collectible_objects: 1,
      corrupt_objects: 0,
      missing_references: 0,
    });
    expect(
      inventory.objects.find((object) => object.path.endsWith(path.basename(release))),
    ).toMatchObject({ pinned_reason: "release_evidence", collectible: false });
    expect(
      inventory.objects.find((object) => object.path.endsWith(path.basename(failure))),
    ).toMatchObject({ pinned_reason: "current_failure", collectible: false });

    await expect(
      compactEvidenceObjects({
        root,
        workflowDir: WORKFLOW_DIR,
        apply: true,
        yes: false,
        now: NOW,
      }),
    ).rejects.toThrow(/requires --yes/u);
    const compactDryRun = await compactEvidenceObjects({
      root,
      workflowDir: WORKFLOW_DIR,
      apply: false,
      yes: false,
      now: NOW,
    });
    expect(compactDryRun.candidates).toEqual([
      path.relative(root, duplicate).replaceAll(path.sep, "/"),
    ]);
    const compacted = await compactEvidenceObjects({
      root,
      workflowDir: WORKFLOW_DIR,
      apply: true,
      yes: true,
      now: NOW,
    });
    expect(compacted.changed_objects).toBe(1);
    const referencedEntry = await lstat(referenced, { bigint: true });
    const duplicateEntry = await lstat(duplicate, { bigint: true });
    expect(referencedEntry.ino).toBe(duplicateEntry.ino);

    const gcDryRun = await garbageCollectEvidenceObjects({
      root,
      workflowDir: WORKFLOW_DIR,
      apply: false,
      yes: false,
      now: NOW,
    });
    expect(gcDryRun.candidates).toEqual([path.relative(root, duplicate).replaceAll(path.sep, "/")]);
    const collected = await garbageCollectEvidenceObjects({
      root,
      workflowDir: WORKFLOW_DIR,
      apply: true,
      yes: true,
      now: NOW,
    });
    expect(collected.changed_objects).toBe(1);
    await expect(readFile(duplicate, "utf8")).rejects.toThrow();
    await expect(readFile(referenced, "utf8")).resolves.toBe('{"same":true}\n');
    await expect(readFile(release, "utf8")).resolves.toBe('{"release":true}\n');
    await expect(readFile(failure, "utf8")).resolves.toBe('{"failure":true}\n');

    await git(root, ["add", "-A"]);
    await git(root, ["commit", "-q", "-m", "test: record evidence gc"]);
    const idempotent = await garbageCollectEvidenceObjects({
      root,
      workflowDir: WORKFLOW_DIR,
      apply: true,
      yes: true,
      now: NOW,
    });
    expect(idempotent.changed_objects).toBe(0);
  });

  it("fails closed for dirty repositories, corrupt objects, and missing references", async () => {
    const root = await fixture();
    const firstTask = "202608060005-EEEEEE";
    const secondTask = "202608060006-FFFFFF";
    await addTask(root, firstTask);
    await addTask(root, secondTask);
    const first = await addObject(root, firstTask, '{"same":true}\n');
    await addObject(root, secondTask, '{"same":true}\n');
    await commitFixture(root);
    await writeFile(path.join(root, "dirty.txt"), "dirty\n", "utf8");
    await expect(
      compactEvidenceObjects({ root, workflowDir: WORKFLOW_DIR, apply: true, yes: true, now: NOW }),
    ).rejects.toThrow(/clean repository/u);

    await git(root, ["clean", "-f", "--", "dirty.txt"]);
    const corruptPath = path.join(path.dirname(first), `${"0".repeat(64)}.json`);
    await link(first, corruptPath);
    await addManifest(root, firstTask, path.join(path.dirname(first), `${"1".repeat(64)}.json`));
    const inventory = await buildEvidenceInventory({ root, workflowDir: WORKFLOW_DIR, now: NOW });
    expect(inventory.summary.corrupt_objects).toBe(1);
    expect(inventory.summary.missing_references).toBe(1);
    await expect(
      garbageCollectEvidenceObjects({
        root,
        workflowDir: WORKFLOW_DIR,
        apply: false,
        yes: false,
        now: NOW,
      }),
    ).rejects.toThrow(/inconsistent object store/u);
  });

  it("recovers idempotently from interruption and rejects a concurrent object rewrite", async () => {
    const compactRoot = await fixture();
    const taskIds = ["202608060007-GGGGGG", "202608060008-HHHHHH", "202608060009-IIIIII"];
    const paths: string[] = [];
    for (const taskId of taskIds) {
      await addTask(compactRoot, taskId);
      paths.push(await addObject(compactRoot, taskId, '{"shared":true}\n'));
    }
    await commitFixture(compactRoot);
    let replacements = 0;
    await expect(
      compactEvidenceObjects({
        root: compactRoot,
        workflowDir: WORKFLOW_DIR,
        apply: true,
        yes: true,
        now: NOW,
        beforeReplace: () => {
          replacements += 1;
          if (replacements === 2) throw new Error("simulated interruption");
          return Promise.resolve();
        },
      }),
    ).rejects.toThrow(/simulated interruption/u);
    const afterInterruption = await Promise.all(
      paths.map((filePath) => lstat(filePath, { bigint: true })),
    );
    expect(afterInterruption[0]!.ino).toBe(afterInterruption[1]!.ino);
    expect(afterInterruption[2]!.ino).not.toBe(afterInterruption[0]!.ino);

    const resumed = await compactEvidenceObjects({
      root: compactRoot,
      workflowDir: WORKFLOW_DIR,
      apply: true,
      yes: true,
      now: NOW,
    });
    expect(resumed.changed_objects).toBe(1);
    const afterResume = await Promise.all(
      paths.map((filePath) => lstat(filePath, { bigint: true })),
    );
    expect(new Set(afterResume.map((entry) => entry.ino)).size).toBe(1);

    const gcRoot = await fixture();
    const gcTask = "202608060010-JJJJJJ";
    await addTask(gcRoot, gcTask);
    const collectible = await addObject(gcRoot, gcTask, '{"collectible":true}\n');
    await commitFixture(gcRoot);
    await expect(
      garbageCollectEvidenceObjects({
        root: gcRoot,
        workflowDir: WORKFLOW_DIR,
        apply: true,
        yes: true,
        now: NOW,
        beforeUnlink: async () => {
          await writeFile(collectible, '{"writer":"won"}\n', "utf8");
        },
      }),
    ).rejects.toThrow(/changed during maintenance/u);
    await expect(readFile(collectible, "utf8")).resolves.toBe('{"writer":"won"}\n');
  });

  it("aborts GC when a manifest atomically makes a candidate reachable", async () => {
    const root = await fixture();
    const taskId = "202608060011-KKKKKK";
    await addTask(root, taskId);
    const collectible = await addObject(root, taskId, '{"collectible":true}\n');
    await commitFixture(root);

    await expect(
      garbageCollectEvidenceObjects({
        root,
        workflowDir: WORKFLOW_DIR,
        apply: true,
        yes: true,
        now: NOW,
        beforeUnlink: async () => {
          await publishManifestAtomically(root, taskId, collectible);
          await commitFixture(root);
        },
      }),
    ).rejects.toThrow(/no longer collectible/u);
    await expect(readFile(collectible, "utf8")).resolves.toBe('{"collectible":true}\n');
  });

  it.each([
    ["active", { status: "DOING" as const }],
    ["failing", { status: "BLOCKED" as const, verification: "needs_rework" as const }],
    ["release-pinned", { tags: ["release"] }],
  ])("aborts GC when task state becomes %s", async (_label, nextState) => {
    const root = await fixture();
    const taskId = "202608060012-LLLLLL";
    await addTask(root, taskId);
    const collectible = await addObject(root, taskId, '{"collectible":true}\n');
    await commitFixture(root);

    await expect(
      garbageCollectEvidenceObjects({
        root,
        workflowDir: WORKFLOW_DIR,
        apply: true,
        yes: true,
        now: NOW,
        beforeUnlink: async () => {
          await replaceTaskReadmeAtomically(root, taskId, nextState);
          await commitFixture(root);
        },
      }),
    ).rejects.toThrow(/no longer collectible/u);
    await expect(readFile(collectible, "utf8")).resolves.toBe('{"collectible":true}\n');
  });

  it("rejects retention policies that keep failures for less time than successes", async () => {
    const root = await fixture();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane/evidence-retention.json"),
      `${JSON.stringify({
        schema_version: 1,
        objects: {
          keep_success_days: 30,
          keep_failure_days: 7,
          deduplicate: true,
          pin_release_evidence: true,
        },
      })}\n`,
      "utf8",
    );
    await expect(
      buildEvidenceInventory({ root, workflowDir: WORKFLOW_DIR, now: NOW }),
    ).rejects.toThrow(/keep_failure_days/u);
  });
});
