Task: `202609190423-4C8RRW`
Title: Resolve hosted CI baseline drift for the canonical 0.7.10 release recovery
Canonical task record: `.agentplane/tasks/202609190423-4C8RRW/README.md`

## Summary

Resolve hosted CI baseline drift for the canonical 0.7.10 release recovery

Remove the two unintended unused exports and refresh the reviewed v0.7 compatibility candidate for the exact canonical recovery surface. Verify knip, compatibility, and full local CI before publishing a superseding PR.

## Scope

- In scope: Remove the two unintended unused exports and refresh the reviewed v0.7 compatibility candidate for the exact canonical recovery surface. Verify knip, compatibility, and full local CI before publishing a superseding PR.
- Out of scope: unrelated refactors not required for "Resolve hosted CI baseline drift for the canonical 0.7.10 release recovery".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T04:54:00.931Z
- Branch: task/202609190423-4C8RRW/hosted-baseline-repair
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/side-effect-authority.ts   |  1 -
 .../commands/task/kernel-repository-coordinator.ts |  4 +---
 .../baselines/v0.7-compatibility-candidate.json    | 22 +++++++++++++++++-----
 .../check-compatibility-contract-baseline.mjs      | 12 ++++++++++++
 4 files changed, 30 insertions(+), 9 deletions(-)
```

</details>
