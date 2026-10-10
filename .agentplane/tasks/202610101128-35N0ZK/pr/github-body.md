Task: `202610101128-35N0ZK`
Title: Publish immutable reviewed candidates before final acceptance
Canonical task record: `.agentplane/tasks/202610101128-35N0ZK/README.md`

## Summary

Publish immutable reviewed candidates before final acceptance

Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.

## Scope

- In scope: Add a bounded operator/controller-owned candidate publication checkpoint to break the dependency between hosted candidate qualification and final task acceptance. Bind the separately approved publish-only operation to the canonical task, plan, current work item attempt and immutable reviewed Git candidate. Reuse provider operation journals, preserve exact SHA/tree and frozen file digest bindings, forbid auto-commit, force push, merge, integration and fabricated completion. Do not mutate Factory. Plan against qualified main 017f21d326d151c5ce6cbec4425ff112f4918095 and use an isolated task checkout before implementation.
- Out of scope: unrelated refactors not required for "Publish immutable reviewed candidates before final acceptance".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T12:03:10.589Z
- Branch: task/202610101128-35N0ZK/candidate-publication
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/side-effect-authority-policy.ts         |   5 +
 .../commands/shared/side-effect-authority.test.ts  |  44 +++++
 .../src/commands/shared/side-effect-authority.ts   |   3 +
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../shared/workflow-operation-projection.ts        |  11 ++
 .../shared/workflow-step-publication-spec.ts       |  29 ++++
 .../src/commands/shared/workflow-step.ts           |  22 +--
 .../task/branch-task-supervisor-operations.ts      |   3 +
 .../task/candidate-publication-admission.ts        |  91 +++++++++++
 .../task/candidate-publication-request.test.ts     | 140 ++++++++++++++++
 .../commands/task/candidate-publication-request.ts | 177 +++++++++++++++++++++
 .../commands/task/candidate-publication-tree.ts    |  86 ++++++++++
 .../task/kernel-reviewed-base-import.test.ts       |  56 +++++++
 14 files changed, 655 insertions(+), 14 deletions(-)
```

</details>
