Task: `202610102351-9M0CCX`
Title: Honor admitted CI effect in canonical implementation commits
Canonical task record: `.agentplane/tasks/202610102351-9M0CCX/README.md`

## Summary

Honor admitted CI effect in canonical implementation commits

Native task4WQ91M explicitly admits ci effect and its exact workflow path, but canonical commit failed before commit because kernel-repository-coordinator hardcodes allowCI false. Repair only capability mapping after existing path and WorkOrder validation. Require explicit ci effect plus protected CI paths and strict unrelated staged-path rejection; preserve all hooks, protected defaults, scope checks and retry/idempotency evidence. No manual commit, broad guard relaxation or consumer replay. Preserve 4WQ staged state and failed intent.

## Scope

- In scope: Native task4WQ91M explicitly admits ci effect and its exact workflow path, but canonical commit failed before commit because kernel-repository-coordinator hardcodes allowCI false. Repair only capability mapping after existing path and WorkOrder validation. Require explicit ci effect plus protected CI paths and strict unrelated staged-path rejection; preserve all hooks, protected defaults, scope checks and retry/idempotency evidence. No manual commit, broad guard relaxation or consumer replay. Preserve 4WQ staged state and failed intent.
- Out of scope: unrelated refactors not required for "Honor admitted CI effect in canonical implementation commits".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T00:04:21.769Z
- Branch: task/202610102351-9M0CCX/canonical-ci-commit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/kernel-repository-coordinator.test.ts     | 33 ++++++++++++++++++----
 .../commands/task/kernel-repository-coordinator.ts |  5 ++--
 2 files changed, 30 insertions(+), 8 deletions(-)
```

</details>
