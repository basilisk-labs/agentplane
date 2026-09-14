Task: `202609141440-VFA9C1`
Title: Repair managed usage observation and branch-pr finish guard regressions
Canonical task record: `.agentplane/tasks/202609141440-VFA9C1/README.md`

## Summary

Repair managed usage observation and branch-pr finish guard regressions

Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.

## Scope

- In scope: Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.
- Out of scope: unrelated refactors not required for "Repair managed usage observation and branch-pr finish guard regressions".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T15:15:16.456Z
- Branch: task/202609141440-VFA9C1/repair-managed-usage-observation-and-branch-pr-f
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/finish-command.ts |  2 +-
 .../agentplane/src/runner/adapters/custom.test.ts  |  1 +
 packages/agentplane/src/runner/adapters/custom.ts  | 22 ++++++++++++++++++++--
 3 files changed, 22 insertions(+), 3 deletions(-)
```

</details>
