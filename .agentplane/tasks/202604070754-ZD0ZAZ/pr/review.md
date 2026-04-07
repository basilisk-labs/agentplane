# PR Review

Created: 2026-04-07T07:58:45.096Z
Branch: task/202604070754-ZD0ZAZ/incidents-autopromote

## Summary

Auto-promote incident findings into incidents collect flow

Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.

## Scope

- In scope: Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.
- Out of scope: unrelated refactors not required for "Auto-promote incident findings into incidents collect flow".

## Verification

### Plan

- Add or update targeted tests that prove incident-oriented findings are promoted into collection.
- Add or update targeted tests that ordinary findings stay local and do not create incidents.
- Run the focused test commands for the touched findings/incidents path and record the results.

### Current Status

- State: ok
- Note: Verified: task findings add now emits promotable external incident metadata by default, --local-only preserves task-local findings, targeted bun tests pass, eslint passes, and incidents collect --check shows a promotable candidate without hidden flags.

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

- Updated: 2026-04-07T07:58:45.096Z
- Branch: task/202604070754-ZD0ZAZ/incidents-autopromote
- Head: bec7459768f6

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
