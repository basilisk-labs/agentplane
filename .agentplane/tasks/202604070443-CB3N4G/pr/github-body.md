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

- Updated: 2026-04-07T05:26:02.476Z
- Branch: task/202604070443-CB3N4G/integrate-fresh-task-snapshot
- Head: aa43c8dca205

```text
 .agentplane/tasks/202604070443-CB3N4G/README.md    | 118 +++++++++++++++++++++
 .../tasks/202604070443-CB3N4G/pr/diffstat.txt      |   0
 .../tasks/202604070443-CB3N4G/pr/github-body.md    |  50 +++++++++
 .../tasks/202604070443-CB3N4G/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604070443-CB3N4G/pr/meta.json |  14 +++
 .../tasks/202604070443-CB3N4G/pr/notes.jsonl       |   0
 .agentplane/tasks/202604070443-CB3N4G/pr/review.md |  57 ++++++++++
 .../tasks/202604070443-CB3N4G/pr/verify.log        |   0
 .../pr/integrate/internal/finalize.test.ts         |  11 +-
 .../src/commands/pr/integrate/internal/finalize.ts |   1 +
 .../commands/pr/integrate/internal/prepare.test.ts |  33 +++++-
 .../src/commands/pr/integrate/internal/prepare.ts  |  33 +++---
 .../src/commands/shared/task-backend.test.ts       |  47 +++++++-
 .../agentplane/src/commands/shared/task-backend.ts |  33 ++++--
 14 files changed, 365 insertions(+), 33 deletions(-)
```

</details>
