import { describe, expect, it } from "vitest";

import { matchOverlayWhen } from "./overlay.js";

describe("matchOverlayWhen", () => {
  it("matches when all configured predicates pass together", () => {
    expect(
      matchOverlayWhen(
        {
          task_kinds: ["bugfix"],
          commands: ["task run"],
          tags_any: ["bug"],
          repo_types: ["node"],
        },
        {
          task_kind: "bugfix",
          command: "task run",
          tags: ["bug", "urgent"],
          repo_types: ["generic", "node"],
        },
      ),
    ).toBe(true);
  });

  it("fails when any configured predicate does not match", () => {
    expect(
      matchOverlayWhen(
        {
          task_kinds: ["bugfix"],
          commands: ["task run"],
          tags_any: ["bug"],
          repo_types: ["node"],
        },
        {
          task_kind: "bugfix",
          command: "recipes scenario execute",
          tags: ["bug", "urgent"],
          repo_types: ["generic", "node"],
        },
      ),
    ).toBe(false);
  });

  it("ignores predicates that are not configured", () => {
    expect(
      matchOverlayWhen(
        {
          commands: ["task run"],
          repo_types: ["node"],
        },
        {
          command: "task run",
          repo_types: ["node"],
        },
      ),
    ).toBe(true);
  });
});
