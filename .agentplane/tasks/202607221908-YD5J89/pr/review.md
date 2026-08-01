# PR Review

Created: 2026-08-01T00:38:26.423Z

## Task

- Task: `202607221908-YD5J89`
- Title: Migrate context and evaluator command boundaries
- Status: DONE
- Branch: `task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries`
- Canonical task record: `.agentplane/tasks/202607221908-YD5J89/README.md`

## Verification

- State: ok
- Note: Command: bun test <8 focused context/evaluator/lifecycle files>
Result: pass
Evidence: 53 tests passed with 508 assertions at 346e9681ba68631bd22d5e40c328654c30a8892e.
Scope: command-session capability isolation, evaluator prepare/execute, lifecycle finish, incident promotion, and multi-task exact-SHA review.

Command: bun run ci:local:fast
Result: pass
Evidence: format, schemas, templates, policy, release parity, builds, cold-start, docs/inventory, hotspot, lint, 514 test files with 3595 tests, and all 12 critical CLI chunks passed at c00ecad0034a9bea01df07e0c0cffc34a6cf229c.
Scope: repository-wide merged-main regression surface; the following exact-SHA commit removes only one stale eslint-disable comment.

Command: bunx eslint <4 changed files>; bun run guards:check; bun run schemas:check; bun run typecheck; git diff --check c00ecad..346e9681
Result: pass
Evidence: no lint findings, shared guards and trust ratchet passed, schemas OK, TypeScript 7 build passed, and the final behavioral diff from the full-gate SHA is comment-only.
Scope: final SHA 346e9681ba68631bd22d5e40c328654c30a8892e and all changed fixture paths.

Command: hosted Core CI run 30694611692 and local reproduction before fix
Result: pass
Evidence: the hosted failure reproduced locally as 10 deterministic E_VALIDATION failures across 3 lifecycle files; after the fixture fix all 17 tests pass repeatedly.
Scope: regression reproduction and flake classification; deterministic integration defect, not a flake.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T01:33:10.068Z
- Branch: task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.core.lifecycle.finish-close-commit.test.ts |  37 +-
 ...un-cli.core.lifecycle.finish-validation.test.ts |  72 ++-
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |  37 +-
 packages/agentplane/src/cli/run-cli.ts             |  13 +
 .../src/cli/run-cli/command-catalog.test.ts        |  93 ++++
 .../command-catalog/command-context-port.ts        | 153 ++++++
 .../cli/run-cli/command-catalog/command-session.ts |  45 +-
 .../context-evaluator-capability-profiles.ts       |  72 +++
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 224 +++++++-
 .../src/cli/run-cli/command-catalog/kernel.ts      |  65 +++
 .../src/cli/run-cli/command-catalog/project.ts     | 285 +++++++++--
 .../src/cli/run-cli/command-loaders/project.ts     | 215 +++++++-
 .../src/cli/run-cli/registry.run.test.ts           | 377 ++++++++++++++
 .../agentplane/src/cli/run-cli/registry.run.ts     |  42 +-
 .../commands/context/context-results.unit.test.ts  | 175 +++++++
 .../src/commands/context/context-runner.ts         | 344 ++++++++-----
 .../agentplane/src/commands/context/finalize.ts    |   5 +-
 packages/agentplane/src/commands/context/graph.ts  | 129 +++--
 packages/agentplane/src/commands/context/search.ts | 141 ++++--
 packages/agentplane/src/commands/context/show.ts   |  35 +-
 .../src/commands/context/wiki-reports.ts           |  28 +-
 packages/agentplane/src/commands/context/wiki.ts   |  94 +++-
 .../commands/evaluator/evaluator-artifact-port.ts  |  67 +++
 .../evaluator/evaluator-catalog.command.ts         | 122 +++++
 .../evaluator/evaluator-execute-supervisor.ts      |  11 +-
 .../evaluator/evaluator-prepare.command.test.ts    |  82 +++
 .../src/commands/evaluator/evaluator.command.ts    | 561 ++++++++++++---------
 .../task/direct-task-supervisor-evaluator.ts       |   2 +
 packages/agentplane/src/context/doctor.ts          |  60 ++-
 packages/agentplane/src/context/ingest.ts          | 121 +++--
 packages/agentplane/src/context/reindex.ts         | 101 ++--
 packages/testkit/src/cli-harness.ts                |  50 +-
 32 files changed, 3116 insertions(+), 742 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
