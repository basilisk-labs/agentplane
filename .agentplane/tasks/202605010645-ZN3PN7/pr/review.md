# PR Review

Created: 2026-05-01T12:45:51.855Z
Branch: task/202605010645-ZN3PN7/spec-examples-validation

## Summary

AP-16: Validate spec examples as mirrors

Validate packages/spec examples against generated schemas without making spec the source of truth.

## Scope

- In scope: Validate packages/spec examples against generated schemas without making spec the source of truth.
- Out of scope: unrelated refactors not required for "AP-16: Validate spec examples as mirrors".

## Verification

### Plan

1. Run `bun run schemas:check && node scripts/check-spec-examples.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified spec examples against generated core schemas.

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

- Updated: 2026-05-01T12:52:20.745Z
- Branch: task/202605010645-ZN3PN7/spec-examples-validation
- Head: fbcd3c080103

```text
 package.json                    |   3 +-
 scripts/README.md               |   4 +-
 scripts/check-spec-examples.mjs | 204 ++++++++++++++++++++++++++++++++++++++++
 scripts/lib/check-registry.mjs  |   4 +
 4 files changed, 213 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
