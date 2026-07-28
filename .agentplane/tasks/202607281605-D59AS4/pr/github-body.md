Task: `202607281605-D59AS4`
Title: Recover completed evaluator supervisor journals for new episodes
Canonical task record: `.agentplane/tasks/202607281605-D59AS4/README.md`

## Summary

Recover completed evaluator supervisor journals for new episodes

Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.

## Scope

- In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
- Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".

## Verification

- State: ok
- Note:

```text
Verified: focused build, evaluator recovery tests, typecheck, formatting, routing, and a repeated
live provider episode all passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T16:07:49.726Z
- Branch: task/202607281605-D59AS4/recover-evaluator-supervisor-journals
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-execute-supervisor.ts      | 52 ++++++++++-----
 .../evaluator/evaluator-execute.command.test.ts    | 73 ++++++++++++++++++++++
 .../runner/supervisor-execution-episode.test.ts    | 70 +++++++++++++++++++++
 .../src/runner/supervisor-execution-episode.ts     | 36 +++++++++++
 packages/core/src/schemas/index.ts                 |  1 +
 5 files changed, 215 insertions(+), 17 deletions(-)
```

</details>
