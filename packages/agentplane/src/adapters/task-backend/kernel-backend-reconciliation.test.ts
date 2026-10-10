import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocalBackend } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "./kernel-replay-journey.test-fixtures.js";

const paths: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(paths.splice(0).map((p) => rm(p, { recursive: true, force: true })));
});
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-backend-"));
  paths.push(root);
  return { backend: new LocalBackend({ dir: root }) };
}

describe("canonical retained mutation reconciliation", () => {
  it.each([false, true])(
    "recognizes a retained mutation after a later writer (lost response=%s)",
    async (lost) => {
      const { backend } = await fixture();
      const journey = kernelReplayJourney("direct");
      const adapter = new KernelBackendAdapter(backend, replayRepositoryIdentity);
      const original = backend.writeTask.bind(backend);
      const write = vi.spyOn(backend, "writeTask").mockImplementationOnce(async (...args) => {
        await original(...args);
        expect(await adapter.execute(journey.steps[1]!.input)).toMatchObject({ kind: "committed" });
        if (lost) throw new Error("response lost");
      });
      const result = await adapter.create(journey.task, journey.steps[0]!.input);
      expect(result).toMatchObject({ kind: "committed", replayed: true });
      expect(write).toHaveBeenCalledTimes(2);
      expect(await adapter.read(journey.task.id)).toMatchObject({
        kind: "canonical",
        record: { aggregate: { revision: 2 } },
      });
    },
  );
});
