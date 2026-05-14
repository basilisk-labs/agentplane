import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { readCloudBackendState, writeCloudBackendState } from "./cloud-backend-state.js";

describe("cloud backend state", () => {
  it("falls back to stale state when state JSON is malformed", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");
    await writeFile(statePath, "{", "utf8");

    await expect(readCloudBackendState(statePath)).resolves.toEqual({ last_checked_at: null });
  });

  it("writes state JSON through the shared atomic write helper", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "nested", "state.json");

    await writeCloudBackendState(statePath, { last_checked_at: "2026-05-14T09:00:00.000Z" });

    await expect(readCloudBackendState(statePath)).resolves.toEqual({
      last_checked_at: "2026-05-14T09:00:00.000Z",
    });
    await expect(readFile(statePath, "utf8")).resolves.toContain(
      '"last_checked_at": "2026-05-14T09:00:00.000Z"',
    );
  });
});
