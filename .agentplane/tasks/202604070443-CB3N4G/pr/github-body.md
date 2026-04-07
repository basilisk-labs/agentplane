## Summary

Prefer fresher branch task snapshots during integrate incident collection

Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.

## Scope

- In scope: Make integrate incident collection prefer a branch-backed task README when it is newer than the stale base snapshot so operator-facing diagnostics reflect the branch being merged.
- Out of scope: unrelated refactors not required for "Prefer fresher branch task snapshots during integrate incident collection".

## Verification

### Plan

1. Exercise the integrate-time task loading path with a stale base task snapshot plus a newer branch README. Expected: integrate-scoped incident collection uses the fresher branch-backed task state in diagnostics.
2. Exercise a non-integrate task loading path with the same stale/fresh inputs. Expected: default task resolution remains unchanged outside integrate-specific callers.
3. Run focused task-backend and integrate tests covering the new precedence rule. Expected: touched tests pass without widening branch precedence globally.

### Current Status

- State: ok
- Note: Focused task-backend/integrate vitest suite and ESLint passed; repo-local bootstrap rebuild passed after touched src changes.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T05:25:00.537Z
- Branch: task/202604070443-CB3N4G/integrate-fresh-task-snapshot
- Head: add431763ba6

```text
No changes detected.
```

</details>
