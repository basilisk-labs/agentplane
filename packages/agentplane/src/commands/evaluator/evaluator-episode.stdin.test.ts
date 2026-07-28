import { PassThrough } from "node:stream";

import { describe, expect, it, vi } from "vitest";

const { spawnMock } = vi.hoisted(() => ({ spawnMock: vi.fn() }));

vi.mock("node:child_process", async (importOriginal) => {
  const original = await importOriginal();
  return { ...(original as object), spawn: spawnMock };
});

import { executeCodexEvaluatorEpisode } from "./evaluator-episode.js";

function createChild() {
  const listeners = new Map<string, ((...args: unknown[]) => void)[]>();
  const child = {
    stdin: new PassThrough(),
    stdout: new PassThrough(),
    stderr: new PassThrough(),
    kill: vi.fn(),
    on(event: string, listener: (...args: unknown[]) => void) {
      const current = listeners.get(event) ?? [];
      current.push(listener);
      listeners.set(event, current);
      return child;
    },
    emit(event: string, ...args: unknown[]) {
      for (const listener of listeners.get(event) ?? []) listener(...args);
    },
  };
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
