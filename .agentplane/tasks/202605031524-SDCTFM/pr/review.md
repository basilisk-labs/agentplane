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

- Updated: 2026-05-03T16:01:08.820Z
- Branch: task/202605031524-SDCTFM/batch-hosted-close-cascade
- Head: e2cfd48bac43

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
