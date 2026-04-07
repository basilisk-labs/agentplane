## Summary

Make integrate recover from repairable PR artifact drift

Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.

## Scope

- In scope: Allow branch_pr integrate to repair or tolerate refreshable pr/meta.json and verify-sha drift instead of hard-failing on recoverable projection mismatches.
- Out of scope: unrelated refactors not required for "Make integrate recover from repairable PR artifact drift".

## Verification

### Plan

1. Run focused integrate tests. Expected: recoverable pr/meta.json or verify-sha drift no longer hard-fails integrate.
2. Exercise strict drift coverage. Expected: real branch drift still fails with an explicit validation error.
3. Run focused lint on touched integrate files. Expected: repaired artifact-refresh paths lint cleanly.

### Current Status

- State: ok
- Note: Refreshed verification after rebase onto origin/main. Checks remain valid for the rebased head because the code diff did not change; only parent history changed.

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

- Updated: 2026-04-07T20:53:31.402Z
- Branch: task/202604071954-6WR36R/integrate-artifact-recovery
- Head: 92a3c7bc8211

```text
 .agentplane/policy/incidents.md                    |  14 ---
 .agentplane/tasks/202604071954-6WR36R/README.md    | 118 +++++++++++++++++
 .../tasks/202604071954-6WR36R/pr/diffstat.txt      |   6 +
 .../tasks/202604071954-6WR36R/pr/github-body.md    |  55 ++++++++
 .../tasks/202604071954-6WR36R/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604071954-6WR36R/pr/meta.json |  14 +++
 .../tasks/202604071954-6WR36R/pr/notes.jsonl       |   0
 .agentplane/tasks/202604071954-6WR36R/pr/review.md |  62 +++++++++
 .../tasks/202604071954-6WR36R/pr/verify.log        |   0
 .agentplane/tasks/202604071954-90V7J2/README.md    | 140 +++++++++++++++++++++
 .../tasks/202604071954-90V7J2/pr/diffstat.txt      |   8 ++
 .../tasks/202604071954-90V7J2/pr/github-body.md    |  57 +++++++++
 .../tasks/202604071954-90V7J2/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604071954-90V7J2/pr/meta.json |  14 +++
 .../tasks/202604071954-90V7J2/pr/notes.jsonl       |   0
 .agentplane/tasks/202604071954-90V7J2/pr/review.md |  64 ++++++++++
 .../tasks/202604071954-90V7J2/pr/verify.log        |   0
 packages/agentplane/assets/policy/incidents.md     |  14 ---
 .../src/cli/run-cli.core.incidents.test.ts         | 109 ++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  93 ++++++++++++++
 .../agentplane/src/commands/incidents/shared.ts    |  17 +++
 packages/agentplane/src/commands/pr/check.ts       |  71 ++++++-----
 .../commands/pr/integrate/internal/prepare.test.ts |  43 ++++++-
 .../src/commands/pr/integrate/internal/prepare.ts  |  49 ++++----
 .../src/commands/pr/internal/freshness.ts          |  77 ++++++++++++
 .../src/runtime/incidents/resolve.test.ts          | 136 ++++++++++++++++++++
 .../agentplane/src/runtime/incidents/resolve.ts    | 134 +++++++++++++++++---
 27 files changed, 1191 insertions(+), 106 deletions(-)
```

</details>
