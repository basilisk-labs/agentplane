Task: `202609291223-N4B1DN`
Title: Complete issue 5991: verify test fixture cleanup and interrupted-run recovery
Canonical task record: `.agentplane/tasks/202609291223-N4B1DN/README.md`

## Summary

Complete issue 5991: verify test fixture cleanup and interrupted-run recovery

Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.

## Scope

- In scope: Current main has owned Vitest temp roots and bounded stale-root recovery. Four cleanup unit tests pass, but issue #5991 also requires ordinary test failure, subprocess failure and concurrent-run regression coverage plus repeated focused and full local CI residue measurements. Audit direct temporary fixture users, add missing lifecycle coverage, repair any reproduced leaks, and measure owned residual count and bytes in an isolated parent. Never delete unrelated directories, active worktrees or another live worker's roots. Close the issue only when its acceptance criteria are demonstrated.
- Out of scope: unrelated refactors not required for "Complete issue 5991: verify test fixture cleanup and interrupted-run recovery".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-29T22:42:38.299Z
- Branch: task/202609291223-N4B1DN/complete-issue-5991-verify-test-fixture-cleanup
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../temp-root-cleanup.integration.test.ts          | 143 +++++++++++++++++++++
 .../src/cli-harness/temp-root-cleanup.measure.mjs  |  69 ++++++++++
 2 files changed, 212 insertions(+)
```

</details>
