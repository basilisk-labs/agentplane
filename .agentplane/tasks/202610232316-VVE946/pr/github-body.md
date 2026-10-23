Task: `202610232316-VVE946`
Title: Align conflict fake GitHub providers with branch protection observation
Canonical task record: `.agentplane/tasks/202610232316-VVE946/README.md`

## Summary

Align conflict fake GitHub providers with branch protection observation

Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.

## Scope

- In scope: Fix release 0.7.13 pre-bump failures in PR conflict publication and rework fixtures. Fake GitHub providers must answer the exact branches/main observation before branches/main/protection while still rejecting unknown endpoints. Keep production fail-closed protection logic unchanged. Audit other protection fixtures and strengthen the focused resolver call-order assertion.
- Out of scope: unrelated refactors not required for "Align conflict fake GitHub providers with branch protection observation".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-23T23:40:09.752Z
- Branch: task/202610232316-VVE946/align-conflict-fake-github-providers-with-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/run-cli.core.pr-conflict-publication.test.ts  | 4 ++++
 packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts  | 4 ++++
 .../src/commands/pr/integrate/internal/github-protection.test.ts     | 5 +++--
 3 files changed, 11 insertions(+), 2 deletions(-)
```

</details>
