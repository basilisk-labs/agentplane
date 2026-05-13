import { mkdtemp, rm } from "node:fs/promises";
import { existsSync, readFileSync as readFileSyncCompat } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { parseDotEnv } from "../../../shared/env.js";
import { describeWhenEnvPresent, silenceStdIO } from "@agentplane/testkit";
import { LocalBackend } from "../local-backend.js";
import { RedmineBackend } from "../redmine-backend.js";

const TMP_PREFIX = "agentplane-redmine-live-";
const LIVE_OPT_IN_ENV_KEY = "AGENTPLANE_ENABLE_BACKEND_LIVE_TESTS";
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

function missingRequiredEnvKeys(env: NodeJS.ProcessEnv = process.env): string[] {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

export function shouldRunRedmineLiveSuite(env: NodeJS.ProcessEnv = process.env): boolean {
  return env[LIVE_OPT_IN_ENV_KEY] === "1" && missingRequiredEnvKeys(env).length === 0;
}

loadRepoDotEnv();

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("Redmine live suite gating", () => {
  const requiredEnv = {
    AGENTPLANE_REDMINE_URL: "https://redmine.example.test",
    AGENTPLANE_REDMINE_API_KEY: "test-key",
    AGENTPLANE_REDMINE_PROJECT_ID: "sandbox",
    AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID: "123",
  } satisfies Partial<NodeJS.ProcessEnv>;

  it("stays disabled by default even when Redmine env is present", () => {
    expect(shouldRunRedmineLiveSuite(requiredEnv)).toBe(false);
  });

  it("enables the live suite only when the explicit opt-in flag is set", () => {
    expect(
      shouldRunRedmineLiveSuite({
        ...requiredEnv,
        AGENTPLANE_ENABLE_BACKEND_LIVE_TESTS: "1",
      }),
    ).toBe(true);
  });
});

describeWhenEnvPresent(shouldRunRedmineLiveSuite())("Redmine live projection contract", () => {
  it("refreshes projection from Redmine and exports a snapshot without remote writes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
    const cacheDir = path.join(root, ".agentplane", "tasks");
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

      expect(backend.capabilities.supports_snapshot_export).toBe(false);
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
