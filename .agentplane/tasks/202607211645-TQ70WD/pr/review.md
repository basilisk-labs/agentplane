# PR Review

Created: 2026-07-21T16:46:59.883Z

## Task

- Task: `202607211645-TQ70WD`
- Title: Repair maximum assimilation context lifecycle
- Status: DONE
- Branch: `task/202607211645-TQ70WD/repair-maximum-assimilation-context-lifecycle`
- Canonical task record: `.agentplane/tasks/202607211645-TQ70WD/README.md`

## Verification

- State: ok
- Note: Focused context tests, full AgentPlane suite, smoke gate, typecheck, formatting, routing, CLI help, and doctor all passed; only unrelated historical doctor warnings remain.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
