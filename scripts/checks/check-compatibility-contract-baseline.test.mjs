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

test("completed repair reconcile retains exact reviewed option and source provenance", () => {
  const sourceTask = "202610300522-MRJ9WH";
  const delta = candidate.deltas.find((entry) => entry.section === "cli_topology");
  assert.ok(candidate.source_tasks.includes(sourceTask));
  assert.ok(delta.source_tasks.includes(sourceTask));
  const command = delta.evidence.added_command_descriptors.find(
    (entry) => entry.id.join(" ") === "task scope extend",
  );
  assert.deepEqual(
    command.options.find((option) => option.name === "reconcile-request"),
    {
      kind: "string",
      name: "reconcile-request",
      valueHint: "<private-json>",
    },
  );
  assert.deepEqual(
    delta.evidence.addition_sources.filter(
      (entry) => entry.command === "task scope extend" && entry.name === "reconcile-request",
    ),
    [
      {
        command: "task scope extend",
        kind: "option",
        name: "reconcile-request",
        source_task: sourceTask,
      },
    ],
  );
});

test("retire-admission retains its exact command, options and source-task provenance", () => {
  const sourceTask = "202611010728-AV4G8P";
  const delta = candidate.deltas.find((entry) => entry.section === "cli_topology");
  const options = [
    { default: false, kind: "boolean", name: "apply", valueHint: null },
    { kind: "string", name: "request", valueHint: "<request.json>" },
    { default: false, kind: "boolean", name: "yes", valueHint: null },
  ];
  assert.ok(candidate.source_tasks.includes(sourceTask));
  assert.ok(delta.source_tasks.includes(sourceTask));
  assert.deepEqual(
    delta.evidence.added_command_descriptors.find(
      (entry) => entry.id.join(" ") === "task retire-admission",
    ),
    {
      args: [{ name: "task-id", required: true, valueHint: "<task-id>", variadic: false }],
      group: "Task",
      id: ["task", "retire-admission"],
      options,
      visibility: "advanced",
    },
  );
  assert.deepEqual(
    delta.evidence.added_options.filter((entry) => entry.command === "task retire-admission"),
    options.map((option) => ({ command: "task retire-admission", ...option })),
  );
  assert.deepEqual(
    delta.evidence.addition_sources.filter((entry) => entry.command === "task retire-admission"),
    [
      { command: "task retire-admission", kind: "command", source_task: sourceTask },
      ...options.map(({ name }) => ({
        command: "task retire-admission",
        kind: "option",
        name,
        source_task: sourceTask,
      })),
    ],
  );
});

test("reviewed retirement addition does not admit drift in the other six sections", () => {
  const reviewed = candidate.candidate.section_digests;
  const otherSections = Object.keys(reviewed).filter((section) => section !== "cli_topology");
  assert.equal(otherSections.length, 6);
  for (const section of otherSections) {
    assert.throws(
      () => assertReviewedSectionDigests({ ...reviewed, [section]: "0".repeat(64) }),
      /section inventory drift/u,
    );
  }
});
