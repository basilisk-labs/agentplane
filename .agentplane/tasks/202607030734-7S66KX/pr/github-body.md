Task: `202607030734-7S66KX`
Title: Context graph: align SGR vocabulary and diagnostics
Canonical task record: `.agentplane/tasks/202607030734-7S66KX/README.md`

## Summary

Context graph: align SGR vocabulary and diagnostics

Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.

## Scope

- In scope: Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.
- Out of scope: unrelated refactors not required for "Context graph: align SGR vocabulary and diagnostics".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts
packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18
tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane
typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and
invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation
and advanced context help.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-03T07:55:11.513Z
- Branch: task/202607030734-7S66KX/context-graph-align-sgr-vocabulary-and-diagnosti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607030734-6T937A/README.md    | 182 +++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  18 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  20 +
 .../run-cli.core.help-snap.test.ts.snap            |   9 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |  38 ++
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |  17 +-
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   6 +-
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  12 +-
 ...re.pr-flow.pr-validation.open-hydration.test.ts |  41 +-
 ...n-cli.core.pr-flow.pr-validation.update.test.ts |  10 +-
 packages/agentplane/src/cli/run-cli.ts             |   7 +-
 .../commands/context/extraction-apply.unit.test.ts | 103 ++++
 packages/agentplane/src/commands/context/graph.ts  |   7 +-
 16 files changed, 1082 insertions(+), 36 deletions(-)
```

</details>
