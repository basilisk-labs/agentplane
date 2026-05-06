Task: `202605060921-2MK9RC`
Title: Implement cloud bidirectional pull safeguards

## Summary

Implement cloud bidirectional pull safeguards

Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.

## Scope

- In scope: Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.
- Out of scope: unrelated refactors not required for "Implement cloud bidirectional pull safeguards".

## Verification

- State: ok
- Note: Verified: focused backend and CLI tests passed; typecheck, diff check, policy routing, and repo-local doctor passed. Doctor has one pre-existing branch_pr normalization warning for 202605051844-WCPBCX.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
