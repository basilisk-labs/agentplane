# PR Review

Created: 2026-05-06T09:22:21.754Z
Branch: task/202605060921-2MK9RC/cloud-bidirectional-pull

## Summary

Implement cloud bidirectional pull safeguards

Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.

## Scope

- In scope: Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.
- Out of scope: unrelated refactors not required for "Implement cloud bidirectional pull safeguards".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: hosted required checks passed for PR #970 after local verification. Remote check summary: Release-ready manifest, test-windows, recovery-validate, test, docs, Socket checks, and changes all succeeded.

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

- Updated: 2026-05-06T09:30:50.735Z
- Branch: task/202605060921-2MK9RC/cloud-bidirectional-pull
- Head: c32c34453c28

```text
 docs/developer/cloud-backend-integration-plan.mdx  |  30 ++-
 docs/user/backends/cloud.mdx                       |  25 +-
 docs/user/tasks-and-backends.mdx                   |   6 +
 .../src/backends/task-backend.cloud.test.ts        | 290 ++++++++++++++++++++-
 .../src/backends/task-backend/cloud-backend.ts     | 215 +++++++++++++--
 .../src/cli/run-cli.core.backend-sync.test.ts      |  57 ++++
 6 files changed, 594 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
