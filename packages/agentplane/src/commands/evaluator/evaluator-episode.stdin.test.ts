import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";

import { describe, expect, it, vi } from "vitest";

const { spawnMock } = vi.hoisted(() => ({ spawnMock: vi.fn() }));

vi.mock("node:child_process", async (importOriginal) => {
  const original = await importOriginal<typeof import("node:child_process")>();
  return { ...original, spawn: spawnMock };
});

import { executeCodexEvaluatorEpisode } from "./evaluator-episode.js";

function createChild() {
  const child = new EventEmitter() as EventEmitter & {
    stdin: PassThrough;
    stdout: PassThrough;
    stderr: PassThrough;
    kill: ReturnType<typeof vi.fn>;
  };
  child.stdin = new PassThrough();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.kill = vi.fn();
  return child;
}

describe("Codex evaluator stdin dispatch", () => {
  it("records a closed stdin as a typed provider failure without an unhandled EPIPE", async () => {
    const child = createChild();
    spawnMock.mockReturnValueOnce(child);

    const execution = executeCodexEvaluatorEpisode({
      provider: "codex",
      repository_root: "/repo",
      work_order_id: "evaluator-stdin-epipe",
      work_order_path: ".agentplane/tasks/evaluator/work-order.json",
      prompt: "Review this change.",
      output_schema_path: ".agentplane/tasks/evaluator/evaluator-result.schema.json",
      argv: ["codex", "exec", "-"],
    });
    const error = Object.assign(new Error("write EPIPE"), { code: "EPIPE" });

    child.stdin.emit("error", error);
    child.emit("close", 1, null);

    await expect(execution).rejects.toMatchObject({
      kind: "stdin_write_failure",
      exit_code: 1,
      signal: null,
    });
    expect(child.kill).toHaveBeenCalledWith("SIGKILL");
  });
});
