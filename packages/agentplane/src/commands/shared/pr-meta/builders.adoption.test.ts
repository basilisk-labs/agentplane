import { describe, expect, it } from "vitest";
import { buildOpenedPrMeta } from "./builders.js";
import { parsePrMeta } from "./parser.js";
import type { PrMeta } from "./model.js";

const taskId = "202610271727-138DXY";
const branch = "external/change";
const at = "2026-10-27T17:27:00.000Z";

function prior(): PrMeta {
  return {
    schema_version: 1,
    task_id: taskId,
    branch,
    base: "main",
    created_at: at,
    updated_at: at,
  };
}

describe("adopted PR metadata rebuild", () => {
  it("preserves the exact immutable adoption record across an open metadata rebuild", () => {
    const adoption = {
      schema_version: 1 as const,
      task_id: taskId,
      provider: "github" as const,
      hostname: "github.com",
      remote: "origin",
      source_project: "org/repo",
      target_project: "org/repo",
      pr_number: 42,
      head_ref: branch,
      base_ref: "main",
      head_sha: "a".repeat(40),
      base_sha: "b".repeat(40),
      observed_at: at,
      readback_digest: `sha256:${"c".repeat(64)}`,
      authority_digest: `sha256:${"d".repeat(64)}`,
    };
    const previous = { ...prior(), adoption };
    const rebuilt = buildOpenedPrMeta({ taskId, branch, at, previousMeta: previous });
    expect(rebuilt.adoption).toEqual(adoption);
    expect(parsePrMeta(JSON.stringify(rebuilt), taskId).adoption).toEqual(adoption);
    expect(previous.adoption).toEqual(adoption);
  });

  it("does not add adoption when prior metadata has none", () => {
    const rebuilt = buildOpenedPrMeta({ taskId, branch, at, previousMeta: prior() });
    expect(rebuilt.adoption).toBeUndefined();
    expect(parsePrMeta(JSON.stringify(rebuilt), taskId).adoption).toBeUndefined();
  });
});
