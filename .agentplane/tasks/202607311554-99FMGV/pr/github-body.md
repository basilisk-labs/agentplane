Task: `202607311554-99FMGV`
Title: Allow fast-forward publication before conflict rework
Canonical task record: `.agentplane/tasks/202607311554-99FMGV/README.md`

## Summary

Allow fast-forward publication before conflict rework

When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.

## Scope

- In scope: When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.
- Out of scope: unrelated refactors not required for "Allow fast-forward publication before conflict rework".

## Verification

- State: ok
- Note:

```text
PASS: semantic SHA a2c70c4504b3d3729e0cc0767e64b796d9d951ba; focused route/publication matrix 21/21,
conflict units 38/38, legacy/recovery 22/22, critical CLI 12/12 chunks, typecheck, format, routing,
and real CT2725 route projection passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T15:56:54.955Z
- Branch: task/202607311554-99FMGV/allow-fast-forward-publication-before-conflict-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 222 ++++++++++++++++++++-
 .../pr/conflict-rework-route-eligibility.ts        |  37 +++-
 .../src/commands/pr/conflict-rework.command.ts     |  18 ++
 .../src/commands/pr/conflict-rework.test.ts        | 138 ++++++++++++-
 .../agentplane/src/commands/pr/conflict-rework.ts  | 212 +++++++++++++-------
 .../src/commands/shared/route-decision-blockers.ts |   1 +
 .../shared/workflow-step-conflict-rework.ts        |  26 +++
 ...rkflow-step-projections.conflict-rework.test.ts |  67 ++++++-
 .../src/commands/shared/workflow-step.ts           |   1 +
 9 files changed, 634 insertions(+), 88 deletions(-)
```

</details>
