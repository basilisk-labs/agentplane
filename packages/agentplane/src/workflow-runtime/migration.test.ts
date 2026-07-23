import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { UnsupportedWorkflowVersionError } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import {
  applyWorkflowMigration,
  planWorkflowMigration,
  rollbackWorkflowMigration,
} from "./migration.js";

const V1_WORKFLOW = [
  "---",
  "version: 1",
  "mode: branch_pr",
  "owners:",
  "  orchestrator: ORCHESTRATOR",
  "approvals:",
  "  require_plan: true",
  "  require_verify: true",
  "  require_network: true",
  "retry_policy:",
  "  normal_exit_continuation: true",
  "  abnormal_backoff: exponential",
  "  max_attempts: 5",
  "timeouts:",
  "  stall_seconds: 900",
  "in_scope_paths:",
  '  - "**"',
  "---",
  "",
  "## Prompt Template",
  "Keep {{ runtime.repo_name }} exactly.",
  "",
  "## Checks",
  "- verify",
  "",
  "## Fallback",
  "last_known_good: .agentplane/workflows/last-known-good.md",
  "",
].join("\r\n");

async function makeRepo(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-migration-"));
  await fs.mkdir(path.join(root, ".agentplane", "workflows"), { recursive: true });
  await fs.writeFile(path.join(root, ".agentplane", "WORKFLOW.md"), V1_WORKFLOW, "utf8");
  return root;
}

describe("workflow migration", () => {
  it("plans v1 to v2 without changing source bytes", () => {
    const plan = planWorkflowMigration(V1_WORKFLOW);

    expect(plan.changed).toBe(true);
    expect(plan.sourceVersion).toBe(1);
    expect(plan.targetVersion).toBe(2);
    expect(plan.sourceText).toBe(V1_WORKFLOW);
    expect(plan.targetText).toContain("version: 2");
    expect(plan.targetText).toContain('workflow:\r\n  mode: "branch_pr"');
    expect(plan.targetText).toContain("Keep {{ runtime.repo_name }} exactly.\r\n");
  });

  it("uses an active commit point, is idempotent, and rolls back exact source bytes", async () => {
    const root = await makeRepo();
    try {
      const dryRun = await applyWorkflowMigration(root, { dryRun: true });
      expect(dryRun).toMatchObject({ changed: true, applied: false, receiptPath: null });
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(V1_WORKFLOW);

      const applied = await applyWorkflowMigration(root, {
        now: "2026-07-23T00:00:00.000Z",
      });
      expect(applied.applied).toBe(true);
      expect(applied.receiptPath).toContain("workflow-v1-to-v2-");
      const target = await fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
      expect(target).toBe(applied.targetText);
      await expect(
        fs.readFile(path.join(root, ".agentplane", "workflows", "last-known-good.md"), "utf8"),
      ).resolves.toBe(target);

      const second = await applyWorkflowMigration(root);
      expect(second).toMatchObject({ changed: false, applied: false, receiptPath: null });
      expect(second.targetText).toBe(target);

      const rollback = await rollbackWorkflowMigration(root, applied.receiptPath!);
      expect(rollback.restored).toBe(true);
      const restored = await fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"));
      expect(restored.equals(Buffer.from(V1_WORKFLOW, "utf8"))).toBe(true);
      const lastKnownGood = await fs.readFile(
        path.join(root, ".agentplane", "workflows", "last-known-good.md"),
      );
      expect(lastKnownGood.equals(Buffer.from(V1_WORKFLOW, "utf8"))).toBe(true);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("rejects an active workflow symlink that resolves outside the repository", async () => {
    const root = await makeRepo();
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-outside-"));
    const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
    const outsideWorkflowPath = path.join(outside, "WORKFLOW.md");
    try {
      await fs.writeFile(outsideWorkflowPath, V1_WORKFLOW, "utf8");
      await fs.rm(workflowPath);
      await fs.symlink(outsideWorkflowPath, workflowPath);

      await expect(applyWorkflowMigration(root)).rejects.toThrow(
        "active WORKFLOW.md path resolves outside repository root",
      );
      await expect(fs.readFile(outsideWorkflowPath, "utf8")).resolves.toBe(V1_WORKFLOW);
      await expect(fs.readdir(path.join(root, ".agentplane", "workflows"))).resolves.toEqual([]);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a last-known-good symlink that resolves outside the repository", async () => {
    const root = await makeRepo();
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-outside-"));
    const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
    const outsideLastKnownGoodPath = path.join(outside, "last-known-good.md");
    try {
      await fs.writeFile(outsideLastKnownGoodPath, "outside recovery bytes\n", "utf8");
      await fs.symlink(outsideLastKnownGoodPath, lastKnownGoodPath);

      await expect(applyWorkflowMigration(root)).rejects.toThrow(
        "last-known-good path resolves outside repository root",
      );
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(V1_WORKFLOW);
      await expect(fs.readFile(outsideLastKnownGoodPath, "utf8")).resolves.toBe(
        "outside recovery bytes\n",
      );
    } finally {
      await fs.rm(root, { recursive: true, force: true });
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a migrations directory symlink that resolves outside the repository", async () => {
    const root = await makeRepo();
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-outside-"));
    try {
      await fs.symlink(outside, path.join(root, ".agentplane", "workflows", "migrations"), "dir");

      await expect(applyWorkflowMigration(root)).rejects.toThrow(
        "migration receipts path resolves outside repository root",
      );
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(V1_WORKFLOW);
      await expect(fs.readdir(outside)).resolves.toEqual([]);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a rollback receipt symlink that resolves outside the repository", async () => {
    const root = await makeRepo();
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-outside-"));
    try {
      const applied = await applyWorkflowMigration(root, {
        now: "2026-07-23T00:00:00.000Z",
      });
      const receiptBytes = await fs.readFile(applied.receiptPath!);
      const outsideReceiptPath = path.join(outside, "receipt.json");
      await fs.writeFile(outsideReceiptPath, receiptBytes);
      await fs.rm(applied.receiptPath!);
      await fs.symlink(outsideReceiptPath, applied.receiptPath!);

      await expect(rollbackWorkflowMigration(root, applied.receiptPath!)).rejects.toThrow(
        "migration receipt path resolves outside repository root",
      );
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(applied.targetText);
      const outsideReceiptBytes = await fs.readFile(outsideReceiptPath);
      expect(outsideReceiptBytes.equals(receiptBytes)).toBe(true);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects rollback when last-known-good resolves outside the repository", async () => {
    const root = await makeRepo();
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-outside-"));
    const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
    const outsideLastKnownGoodPath = path.join(outside, "last-known-good.md");
    try {
      const applied = await applyWorkflowMigration(root, {
        now: "2026-07-23T00:00:00.000Z",
      });
      await fs.writeFile(outsideLastKnownGoodPath, "outside recovery bytes\n", "utf8");
      await fs.rm(lastKnownGoodPath);
      await fs.symlink(outsideLastKnownGoodPath, lastKnownGoodPath);

      await expect(rollbackWorkflowMigration(root, applied.receiptPath!)).rejects.toThrow(
        "last-known-good path resolves outside repository root",
      );
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(applied.targetText);
      await expect(fs.readFile(outsideLastKnownGoodPath, "utf8")).resolves.toBe(
        "outside recovery bytes\n",
      );
    } finally {
      await fs.rm(root, { recursive: true, force: true });
      await fs.rm(outside, { recursive: true, force: true });
    }
  });

  it("leaves the active workflow exact when apply fails before its commit point", async () => {
    const root = await makeRepo();
    const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
    try {
      await fs.mkdir(lastKnownGoodPath);

      await expect(applyWorkflowMigration(root)).rejects.toBeTruthy();
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(V1_WORKFLOW);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("leaves the migration target active when rollback preparation fails", async () => {
    const root = await makeRepo();
    const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
    try {
      const applied = await applyWorkflowMigration(root, {
        now: "2026-07-23T00:00:00.000Z",
      });
      await fs.rm(lastKnownGoodPath);
      await fs.mkdir(lastKnownGoodPath);

      await expect(rollbackWorkflowMigration(root, applied.receiptPath!)).rejects.toBeTruthy();
      await expect(
        fs.readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8"),
      ).resolves.toBe(applied.targetText);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("rejects future versions before producing a candidate", () => {
    expect(() => planWorkflowMigration(V1_WORKFLOW.replace("version: 1", "version: 3"))).toThrow(
      UnsupportedWorkflowVersionError,
    );
  });
});
