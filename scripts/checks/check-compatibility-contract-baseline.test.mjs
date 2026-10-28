import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { assertReviewedSectionDigests } from "./check-compatibility-contract-baseline.mjs";

const candidate = JSON.parse(
  readFileSync(new URL("../baselines/v0.7-compatibility-candidate.json", import.meta.url), "utf8"),
);
const sourceTask = "202610270555-MY0JZE";

test("reviewed candidate rejects unknown CLI and workflow surface deltas", () => {
  const reviewed = candidate.candidate.section_digests;
  assert.doesNotThrow(() => assertReviewedSectionDigests(reviewed));
  for (const section of ["cli_topology", "workflow_schema"]) {
    const changed = { ...reviewed, [section]: "0".repeat(64) };
    assert.throws(() => assertReviewedSectionDigests(changed), /section inventory drift/u);
  }
});

test("pr adopt command and options retain exact source-task provenance", () => {
  const cliDelta = candidate.deltas.find((delta) => delta.section === "cli_topology");
  const workflowDelta = candidate.deltas.find((delta) => delta.section === "workflow_schema");
  assert.ok(candidate.source_tasks.includes(sourceTask));
  assert.ok(cliDelta.source_tasks.includes(sourceTask));
  assert.ok(workflowDelta.source_tasks.includes(sourceTask));
  const sources = cliDelta.evidence.addition_sources.filter(
    (entry) => entry.command === "pr adopt",
  );
  assert.deepEqual(sources, [
    { command: "pr adopt", kind: "command", source_task: sourceTask },
    ...["approval-digest", "by", "file", "request-digest", "ttl-minutes"].map((name) => ({
      command: "pr adopt",
      kind: "option",
      name,
      source_task: sourceTask,
    })),
  ]);
});
