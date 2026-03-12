import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach } from "vitest";

import { silenceStdIO } from "../cli/run-cli.test-helpers.js";

const TMP_PREFIX = "agentplane-task-backend-";

export function installTaskBackendTestHarness(): void {
  let restoreStdIO: (() => void) | null = null;

  beforeEach(() => {
    restoreStdIO = silenceStdIO();
  });

  afterEach(() => {
    restoreStdIO?.();
    restoreStdIO = null;
  });
}

export async function makeTempDir(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
}

export const makeIssue = (priorityName?: string): Record<string, unknown> => ({
  id: 1,
  subject: "Subject",
  description: "Desc",
  status: { id: 1 },
  priority: priorityName ? { name: priorityName } : undefined,
  custom_fields: [
    { id: 2, value: '["echo ok"]' },
    { id: 3, value: '{"hash":"h","message":"m"}' },
    { id: 4, value: "note" },
    { id: 5, value: "2" },
  ],
  updated_on: "2026-01-30T00:00:00Z",
});
