import { mkdtemp, readFile, rm } from "node:fs/promises";
import { existsSync, readFileSync as readFileSyncCompat } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { parseDotEnv } from "../../../shared/env.js";
import { silenceStdIO } from "../../../cli/run-cli.test-helpers.js";
import { LocalBackend } from "../local-backend.js";
import { RedmineBackend } from "../redmine-backend.js";

const TMP_PREFIX = "agentplane-redmine-live-";
const REQUIRED_ENV_KEYS = [
  "AGENTPLANE_REDMINE_URL",
  "AGENTPLANE_REDMINE_API_KEY",
  "AGENTPLANE_REDMINE_PROJECT_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID",
];
const CANONICAL_STATE_ENV_KEY = "AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE";

function loadRepoDotEnv(): void {
  const envPath = path.join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const parsed = parseDotEnv(readFileSyncCompat(envPath, "utf8"));
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] ??= value;
  }
}

function missingRequiredEnvKeys(): string[] {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

loadRepoDotEnv();

const describeWhenEnvPresent = missingRequiredEnvKeys().length === 0 ? describe : describe.skip;

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describeWhenEnvPresent("Redmine live projection contract", () => {
  it("refreshes projection from Redmine and exports a snapshot without remote writes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
    const cacheDir = path.join(root, ".agentplane", "tasks");
    const snapshotPath = path.join(root, ".agentplane", "tasks.json");
    const cache = new LocalBackend({ dir: cacheDir });
    const backend = new RedmineBackend({}, { cache });

    try {
      await backend.refreshProjection({
        allowNetwork: true,
        quiet: true,
        conflict: "prefer-remote",
      });

      const projectionTasks = await backend.listTasks();
      expect(projectionTasks.length).toBeGreaterThan(0);

      const firstTaskId = projectionTasks[0]?.id;
      expect(firstTaskId).toEqual(expect.any(String));
      if (!firstTaskId) throw new Error("expected Redmine projection to contain at least one task");

      const loaded = await backend.getTask(firstTaskId);
      expect(loaded?.id).toBe(firstTaskId);

      await backend.exportProjectionSnapshot(snapshotPath);

      const snapshot = JSON.parse(await readFile(snapshotPath, "utf8")) as {
        tasks?: { id?: string }[];
        meta?: { schema_version?: number; managed_by?: string };
      };
      expect(Array.isArray(snapshot.tasks)).toBe(true);
      expect(snapshot.tasks?.length).toBe(projectionTasks.length);
      expect(snapshot.tasks?.some((task) => task.id === firstTaskId)).toBe(true);
      expect(snapshot.meta).toMatchObject({
        schema_version: 1,
        managed_by: "agentplane",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("inspects visible field catalog and canonical_state readiness for the live Redmine sandbox", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
    const cacheDir = path.join(root, ".agentplane", "tasks");
    const cache = new LocalBackend({ dir: cacheDir });
    const backend = new RedmineBackend({}, { cache });

    try {
      const inspection = await backend.inspectConfiguration();
      expect(inspection.visibleCustomFields.length).toBeGreaterThan(0);
      const configuredCanonicalStateField = process.env[CANONICAL_STATE_ENV_KEY]?.trim() ?? "";
      if (!configuredCanonicalStateField) {
        expect(inspection.canonicalState.configuredFieldId).toBeNull();
        expect(backend.capabilities.supports_task_revisions).toBe(false);
        expect(backend.capabilities.supports_revision_guarded_writes).toBe(false);
        return;
      }

      expect(inspection.canonicalState.configuredFieldId).toBe(
        Number(configuredCanonicalStateField),
      );
      expect(backend.capabilities.supports_task_revisions).toBe(true);
      expect(backend.capabilities.supports_revision_guarded_writes).toBe(true);

      await backend.refreshProjection({
        allowNetwork: true,
        quiet: true,
        conflict: "prefer-remote",
      });

      const tasks = await backend.listTasks();
      expect(tasks.length).toBeGreaterThan(0);
      expect(
        tasks.some((task) => Number.isInteger(task.revision) && Number(task.revision) >= 1),
      ).toBe(true);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
