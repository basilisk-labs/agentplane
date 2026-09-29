import { describe, expect, it } from "vitest";

import { normalizeTaskScopeRoot } from "../shared/task-scope-extension-request.js";
import { extendBlockedTaskExecutionContract } from "./scope-extend.js";
import { scopeExtensionFixture as fixture } from "./scope-extend.testkit.js";

describe("blocked task execution scope extension boundaries", () => {
  it("rejects unsafe roots and no-op extensions", () => {
    const { command, pending, task } = fixture();

    expect(() => normalizeTaskScopeRoot("../outside")).toThrow(/Invalid scope root/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website"],
        repository_effects: ["release_metadata"],
        request_digest: `sha256:${"f".repeat(64)}`,
        by: "USER",
      }),
    ).toThrow(/request digest does not match/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website-other"],
        repository_effects: ["release_metadata"],
        request_digest: pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/exactly match/u);

    const noOp = fixture(
      {},
      { scope_roots: ["docs/releases"], repository_effects: ["documentation"] },
    );
    expect(() =>
      extendBlockedTaskExecutionContract({
        command: noOp.command,
        task: noOp.task,
        scope_roots: ["docs/releases"],
        repository_effects: ["documentation"],
        request_digest: noOp.pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/must add a new scope root or repository effect/u);
  });
});
