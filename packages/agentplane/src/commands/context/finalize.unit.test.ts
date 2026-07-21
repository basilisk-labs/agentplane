import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { runContextFinalization } from "./finalize.js";

let tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

describe("context finalize-task", () => {
  it("runs the lifecycle in dependency-safe order", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-finalize-"));
    tempRoots.push(root);
    const calls: string[] = [];
    const step = (name: string) => () => {
      calls.push(name);
      return Promise.resolve();
    };

    const summary = await runContextFinalization(
      { cwd: root, parsed: { taskId: "202607211617-XMV6XV" } },
      {
        wikiReport: step("report"),
        wikiIndex: step("index"),
        wikiLint: step("lint"),
        reindex: step("reindex"),
        graphValidate: step("graph"),
        verifyTask: step("verify"),
        doctor: step("doctor"),
      },
    );

    expect(calls).toEqual([
      "report",
      "index",
      "report",
      "lint",
      "reindex",
      "graph",
      "verify",
      "doctor",
    ]);
    expect(summary).toEqual({
      wiki_pages: 0,
      facts: 0,
      entities: 0,
      edges: 0,
      provenance: 0,
      coverage: 0,
      evaluator_scenarios: 0,
    });
  });
});
