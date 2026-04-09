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
- Note: Command: bun x eslint packages/agentplane/src/commands/pr/check.ts packages/agentplane/src/commands/pr/internal/pr-paths.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass. Evidence: eslint clean and targeted pr-check vitest passed including stale-local/fresh-branch fallback coverage. Scope: pr check artifact snapshot selection and helper path reads.

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

- Updated: 2026-04-09T13:12:18.632Z
- Branch: task/202604091257-GG6KJG/pr-check-freshness
- Head: 14b5ecd6ca96

```text
No changes detected.
```

</details>
