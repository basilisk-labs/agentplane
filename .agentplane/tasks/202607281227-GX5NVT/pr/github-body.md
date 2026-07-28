Task: `202607281227-GX5NVT`
Title: Handle evaluator stdin EPIPE without unhandled CI failures
Canonical task record: `.agentplane/tasks/202607281227-GX5NVT/README.md`

## Summary

Handle evaluator stdin EPIPE without unhandled CI failures

Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.

## Scope

- In scope: Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
- Out of scope: unrelated refactors not required for "Handle evaluator stdin EPIPE without unhandled CI failures".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest --config vitest.workspace.ts run --project agentplane
packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts
packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts; Result: pass (2 files,
5 tests), deterministic EPIPE becomes stdin_write_failure with no unhandled error. Command: bun run
typecheck; Result: pass. Command: bun run test:fast; Result: pass (480 files, 3345 tests) with no
unhandled errors. Scope: evaluator stdin dispatch and repository fast regression suite. Residual
risk: hosted PR verification remains required.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T12:29:58.601Z
- Branch: task/202607281227-GX5NVT/handle-evaluator-stdin-epipe-without-unhandled-c
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-episode.stdin.test.ts      | 60 ++++++++++++++++++++++
 .../src/commands/evaluator/evaluator-episode.ts    | 23 ++++++++-
 2 files changed, 81 insertions(+), 2 deletions(-)
```

</details>
