Task: `202607211645-TQ70WD`
Title: Repair maximum assimilation context lifecycle
Canonical task record: `.agentplane/tasks/202607211645-TQ70WD/README.md`

## Summary

Repair the maximum-assimilation context lifecycle so the documented path finishes without manual derived-file edits and all context commands agree on Wiki, modality, artifact, and evaluator contracts.

## Scope

In scope: context runtime and CLI implementation under packages/agentplane/src/context/** and packages/agentplane/src/commands/context/**; related schemas/assets only when required by a shared contract; focused and end-to-end tests in the same package; task-local AgentPlane artifacts. Deliver evaluator projection or canonical consumption, valid and consistently linted Wiki frontmatter, shared modality vocabulary, complete expected reports including topology, generated graph-ref rationale, actionable diagnostics, finalization/reporting support where it fits the existing CLI architecture, and raw-deletion regression coverage. Out of scope: release/version changes, unrelated workflow code, and agentplane-loops.

## Verification

- State: ok
- Note:

```text
Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help,
and doctor all passed; only unrelated historical doctor warnings remain.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T10:57:22.306Z
- Branch: task/202607211645-TQ70WD/repair-maximum-assimilation-context-lifecycle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   2 +
 docs/user/cli-reference.generated.mdx              |  13 +-
 packages/agentplane/assets/policy/incidents.md     |   2 +
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../src/commands/context/check.unit.test.ts        |  14 ++
 .../src/commands/context/context-runner.ts         |  12 ++
 .../src/commands/context/context.spec.ts           |  11 +-
 .../agentplane/src/commands/context/finalize.ts    | 141 +++++++++++++++++++++
 .../src/commands/context/finalize.unit.test.ts     |  58 +++++++++
 .../src/commands/context/init-manifest.ts          |   1 +
 .../agentplane/src/commands/context/init-wiki.ts   |   1 +
 .../context/release-readiness.raw-deletion.test.ts |  79 ++++++++++++
 .../verify-task.maximum-assimilation.unit.test.ts  |  27 ++--
 .../src/commands/context/wiki-frontmatter.ts       | 115 +++++++++++++++++
 .../src/commands/context/wiki-index.unit.test.ts   |   6 +
 .../agentplane/src/commands/context/wiki-lint.ts   | 140 ++++++++++++--------
 .../src/commands/context/wiki-lint.unit.test.ts    |  35 +++++
 .../agentplane/src/commands/context/wiki-page.ts   |  89 +++----------
 .../src/commands/context/wiki-reports.ts           | 130 +++++++++++++++----
 .../src/commands/context/wiki-reports.unit.test.ts |  29 +++++
 .../commands/context/wiki.obsidian.unit.test.ts    |  37 ++++++
 .../src/commands/evaluator/evaluator.command.ts    |  15 +++
 packages/agentplane/src/context/doctor.ts          |  10 +-
 .../src/context/evaluator-projection.test.ts       |  81 ++++++++++++
 .../agentplane/src/context/evaluator-projection.ts |  98 ++++++++++++++
 .../src/context/ingest-task-pack.test.ts           |   2 +
 .../agentplane/src/context/ingest-task-pack.ts     |   1 +
 .../agentplane/src/context/ingest-task.test.ts     |   7 +
 packages/agentplane/src/context/ingest-task.ts     |   8 +-
 packages/agentplane/src/context/integrity.ts       |   7 +-
 ...ximum-assimilation-artifacts-validation.test.ts |  23 ++++
 .../maximum-assimilation-artifacts-validation.ts   |   4 +
 32 files changed, 1031 insertions(+), 169 deletions(-)
```

</details>
