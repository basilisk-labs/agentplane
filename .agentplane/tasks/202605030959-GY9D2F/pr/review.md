# PR Review

Created: 2026-05-03T10:50:04.318Z
Branch: task/202605030959-GY9D2F/release-recovery-checksum-source

## Summary

Fix release recovery checksum source

Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.

## Scope

- In scope: Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.
- Out of scope: unrelated refactors not required for "Fix release recovery checksum source".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Focused verification passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (7 tests, 158 expects); node .agentplane/policy/check-routing.mjs (policy routing OK).

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

- Updated: 2026-05-03T10:51:48.475Z
- Branch: task/202605030959-GY9D2F/release-recovery-checksum-source
- Head: 9239d1fc0602

```text
 .github/workflows/publish-distribution-module.yml  | 44 +++++++++++++++++++---
 .../release/publish-workflow-contract.test.ts      | 13 +++++++
 2 files changed, 51 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
