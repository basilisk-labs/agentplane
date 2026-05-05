# PR Review

Created: 2026-05-05T06:22:07.988Z
Branch: task/202605050621-DNQ2XD/closeout-idempotency

## Summary

Make branch_pr closeout idempotent

Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.

## Scope

- In scope: Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.
- Out of scope: unrelated refactors not required for "Make branch_pr closeout idempotent".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass.

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

- Updated: 2026-05-05T06:26:59.940Z
- Branch: task/202605050621-DNQ2XD/closeout-idempotency
- Head: 9efb44f9c1d3

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  | 45 ++++++++++---
 .../agentplane/src/commands/task/finish-close.ts   | 53 +++++++++++++++
 .../commands/task/finish.close-tail.unit.test.ts   | 76 ++++++++++++++++++++++
 scripts/lib/pre-push-scope.mjs                     | 19 ++++--
 4 files changed, 178 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
