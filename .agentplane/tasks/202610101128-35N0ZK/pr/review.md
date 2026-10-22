# PR Review

Created: 2026-10-10T12:03:10.589Z

## Task

- Task: `202610101128-35N0ZK`
- Title: Publish immutable reviewed candidates before final acceptance
- Status: DOING
- Branch: `task/202610101128-35N0ZK/candidate-publication`
- Canonical task record: `.agentplane/tasks/202610101128-35N0ZK/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:ee9e0e978e39e8f530c28fa6dc9cbccf6f9363ec48a9243849ceff45c412a22c
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
 .../shared/workflow-step-publication-spec.ts       |  29 +++
 .../src/commands/shared/workflow-step.ts           |  22 +--
 .../task/branch-task-supervisor-operations.ts      |   3 +
 .../task/candidate-publication-admission.ts        |  91 +++++++++
 .../task/candidate-publication-executor.test.ts    | 204 +++++++++++++++++++
 .../task/candidate-publication-executor.ts         | 218 +++++++++++++++++++++
 .../task/candidate-publication-git.test.ts         |  93 +++++++++
 .../src/commands/task/candidate-publication-git.ts | 116 +++++++++++
 .../commands/task/candidate-publication-receipt.ts |  84 ++++++++
 .../task/candidate-publication-request.test.ts     | 140 +++++++++++++
 .../commands/task/candidate-publication-request.ts | 177 +++++++++++++++++
 .../commands/task/candidate-publication-tree.ts    |  86 ++++++++
 .../task/candidate-publication.test-helpers.ts     | 145 ++++++++++++++
 .../task/kernel-reviewed-base-import.test.ts       |  56 ++++++
 20 files changed, 1515 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
