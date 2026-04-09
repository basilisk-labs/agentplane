# PR Review

Created: 2026-04-09T13:10:49.483Z
Branch: task/202604091257-GG6KJG/pr-check-freshness

## Summary

Prefer fresh branch PR artifacts in pr check when base snapshot is stale

Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.

## Scope

- In scope: Make pr check recover from stale base task PR artifacts by reading fresher branch/worktree snapshots instead of failing on outdated local meta/review state.
- Out of scope: unrelated refactors not required for "Prefer fresh branch PR artifacts in pr check when base snapshot is stale".

## Verification

### Plan

1. Run targeted pr-check regression tests for stale-local versus fresh-branch snapshots. Expected: pr check accepts the fresher branch/worktree artifacts instead of failing on stale local base files.
2. Run unit coverage for PR artifact path helpers. Expected: branch-backed artifact reads succeed when local task files are missing or outdated.
3. Run focused lint on changed pr-check files. Expected: the new snapshot-selection flow passes lint without new violations.

### Current Status

- State: ok
- Note: Rebased onto main after 75VJ4R, fixed Windows formatting drift in pr/check.ts, replaced incompatible vi.hoisted test harness in pr-paths.test.ts, and reran targeted pr-flow/pr-paths coverage.

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

- Updated: 2026-04-09T14:20:05.443Z
- Branch: task/202604091257-GG6KJG/pr-check-freshness
- Head: 508b9591ff4d

```text
 .agentplane/tasks/202604091257-GG6KJG/README.md    | 116 ++++++
 .../tasks/202604091257-GG6KJG/pr/diffstat.txt      |   0
 .../tasks/202604091257-GG6KJG/pr/github-body.md    |  50 +++
 .../tasks/202604091257-GG6KJG/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091257-GG6KJG/pr/meta.json |  17 +
 .../tasks/202604091257-GG6KJG/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091257-GG6KJG/pr/review.md |  57 +++
 .../tasks/202604091257-GG6KJG/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  99 +++++
 packages/agentplane/src/commands/pr/check.ts       | 440 ++++++++++++++-------
 .../src/commands/pr/internal/pr-paths.test.ts      |  47 ++-
 .../src/commands/pr/internal/pr-paths.ts           |  17 +-
 12 files changed, 681 insertions(+), 163 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
