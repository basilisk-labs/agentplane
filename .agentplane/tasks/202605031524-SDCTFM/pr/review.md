# PR Review

Created: 2026-05-03T16:01:08.820Z
Branch: task/202605031524-SDCTFM/batch-hosted-close-cascade

## Summary

Cascade hosted branch_pr closure across batch tasks

Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.

## Scope

- In scope: Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.
- Out of scope: unrelated refactors not required for "Cascade hosted branch_pr closure across batch tasks".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: hosted-close now cascades branch_pr batch closure to included tasks.

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

- Updated: 2026-05-03T16:01:25.887Z
- Branch: task/202605031524-SDCTFM/batch-hosted-close-cascade
- Head: ccfe5b3420bd

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 158 +++++++++++++++++++++
 .../agentplane/src/commands/guard/impl/commit.ts   |   4 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   6 +-
 .../src/commands/task/hosted-close.command.ts      | 120 +++++++++++-----
 4 files changed, 252 insertions(+), 36 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
