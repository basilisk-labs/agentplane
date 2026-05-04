# PR Review

Created: 2026-05-04T07:57:07.226Z
Branch: task/202605040755-KF1EWC/launch-punch-list

## Summary

Fix launch README example role leakage

Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.

## Scope

- In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
- Out of scope: unrelated refactors not required for "Fix launch README example role leakage".

## Verification

### Plan

1. rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returns no matches.
2. bun run docs:site:typecheck passes.
3. node .agentplane/policy/check-routing.mjs passes.
4. agentplane doctor passes.

### Current Status

- State: ok
- Note: Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed.

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

- Updated: 2026-05-04T07:57:07.226Z
- Branch: task/202605040755-KF1EWC/launch-punch-list
- Head: 3fb4f0809359

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
