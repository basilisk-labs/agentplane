import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";

import { taskAuthorityGrantSpec } from "./authority-grant.command.js";

describe("task authority grant", () => {
  it("preserves the explicit hosted-route context emitted by task next-action", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--remote",
        "--operation",
        "task.pre_merge_close",
        "--operation-digest",
        "sha256:operation",
        "--state-fingerprint",
        "sha256:fingerprint",
        "--state-scope-digest",
        "sha256:scope",
        "--by",
        "USER",
      ]),
    ).toMatchObject({
      parsed: {
        taskId: "T-1",
        operationId: "task.pre_merge_close",
        remote: true,
      },
    });
  });
});
