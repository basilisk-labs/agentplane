import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runDirectTaskVerification } from "./direct-task-verification.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("zero-command verification policy", () => {
  it.each([
    { allow_empty: false, empty_is_failure: true, expected: "failed" },
    { allow_empty: true, empty_is_failure: false, expected: "passed" },
  ])(
    "persists an honest $expected result for an explicit zero-command policy",
    async ({ allow_empty, empty_is_failure, expected }) => {
      const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-empty-verification-"));
      roots.push(cwd);
      const runProcess = vi.fn();
      const result = await runDirectTaskVerification({
        command: {
          config: { paths: { workflow_dir: ".agentplane/tasks" } },
          resolvedProject: { gitRoot: cwd },
        } as never,
        task: { verify: [] },
        task_id: "202607290000-RF10A1",
        cwd,
        run_process: runProcess,
        additional_only: true,
        allow_empty,
        empty_is_failure,
      });
      expect(result.status).toBe(expected);
      expect(result.checks).toEqual([]);
      expect(runProcess).not.toHaveBeenCalled();
      expect(
        JSON.parse(await readFile(path.join(cwd, result.artifact_path), "utf8")),
      ).toMatchObject({ status: expected, checks: [] });
    },
  );
});
