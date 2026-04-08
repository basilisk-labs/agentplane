# PR Review

Created: 2026-04-08T19:38:46.175Z
Branch: task/202604081931-P5XKNF/close-superseded-auth

## Summary

Fix pr close-superseded GitHub auth propagation

Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.

## Scope

- In scope: Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.
- Out of scope: unrelated refactors not required for "Fix pr close-superseded GitHub auth propagation".

## Verification

### Plan

1. Run the pr close-superseded focused test suite. Expected: it proves the command forwards the authenticated gh environment and closes the matched PR path without auth failures. 2. Run eslint on touched command/test files. Expected: no lint violations in the modified scope. 3. Re-check the command contract diff. Expected: the fix is limited to auth propagation and does not change unrelated PR-close behavior.

### Current Status

- State: ok
- Note: Focused pr close-superseded auth/env regression tests passed; eslint passed on touched command and test files; command diff remains limited to shared gh auth propagation for close-superseded and close.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T19:43:00.745Z
- Branch: task/202604081931-P5XKNF/close-superseded-auth
- Head: c44361a8aeee

```text
 .agentplane/tasks/202604081931-P5XKNF/README.md    |  91 ++++++++++++++++++
 .../cli/run-cli.core.pr-close-superseded.test.ts   | 107 ++++++++++++++++++++-
 .../agentplane/src/commands/pr/close-superseded.ts |  75 ++-------------
 packages/agentplane/src/commands/pr/close.ts       |  78 ++-------------
 .../agentplane/src/commands/pr/internal/gh-api.ts  |  81 ++++++++++++++++
 5 files changed, 293 insertions(+), 139 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
