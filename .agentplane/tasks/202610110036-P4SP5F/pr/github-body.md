Task: `202610110036-P4SP5F`
Title: Diagnose evaluator replacement CLI contention failure
Canonical task record: `.agentplane/tasks/202610110036-P4SP5F/README.md`

## Summary

Diagnose evaluator replacement CLI contention failure

Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.

## Scope

- In scope: Reproduce the retained 9R7G0P run-022 failure: two independent replacement CLI processes return [0,1] instead of [0,2]. Capture both child stdout and stderr and actual journal/provider evidence before any expectation change. Fix only the demonstrated generic cause. Preserve exactly one provider start, replacement linkage, usage accounting, durable journal, typed conflict semantics, lease and authority guards. Distinguish environment or fixture failure from product defects. Do not accept arbitrary exit 1, perform real provider calls, or modify a fourth source file without new admission. The supervisor root is admitted only if a reproduced product cause requires correction. Preserve the original failed full receipt. No repeated full regression during this bounded implementation.
- Out of scope: unrelated refactors not required for "Diagnose evaluator replacement CLI contention failure".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T01:05:20.953Z
- Branch: task/202610110036-P4SP5F/evaluator-replacement-contention
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-execute-subprocess.testkit.ts        | 11 +++++++
 .../evaluator/evaluator-execute.command.test.ts    | 36 ++++++++++++++--------
 2 files changed, 35 insertions(+), 12 deletions(-)
```

</details>
