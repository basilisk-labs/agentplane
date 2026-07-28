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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T12:28:33.723Z
- Branch: task/202607281227-GX5NVT/handle-evaluator-stdin-epipe-without-unhandled-c
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
