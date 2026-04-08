## Summary

Detect stale open branch_pr PR drift from projection snapshots

Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.

## Scope

- In scope: Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.
- Out of scope: unrelated refactors not required for "Detect stale open branch_pr PR drift from projection snapshots".

## Verification

### Plan

1. Run the focused doctor branch_pr tests. Expected: doctor warns when a DONE task with open PR artifacts exists only in the current projection snapshot, not just legacy tasks.json. 2. Run the touched lint/build or focused CLI suite. Expected: the updated detection path passes without widening unrelated doctor noise. 3. Run agentplane doctor against this repository or a representative fixture. Expected: the stale open PR condition becomes visible with an actionable next step.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts; bun x eslint packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor.command.test.ts. Result: pass. Evidence: doctor branch_pr open-PR drift now reads live backend state before falling back to tasks.json, and the new regression locks the projection-only stale snapshot shape. Scope: doctor branch_pr stale open-PR detection.

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

- Updated: 2026-04-08T18:32:22.444Z
- Branch: task/202604081816-XYTDYA/doctor-open-pr-projection
- Head: 1616c12bbca9

```text
 .agentplane/tasks/202604081816-XYTDYA/README.md    | 113 +++++++++++++++++++
 .../tasks/202604081816-XYTDYA/pr/diffstat.txt      |   0
 .../tasks/202604081816-XYTDYA/pr/github-body.md    |  48 ++++++++
 .../tasks/202604081816-XYTDYA/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604081816-XYTDYA/pr/meta.json |  14 +++
 .../tasks/202604081816-XYTDYA/pr/notes.jsonl       |   0
 .agentplane/tasks/202604081816-XYTDYA/pr/review.md |  55 +++++++++
 .../tasks/202604081816-XYTDYA/pr/verify.log        |   0
 .../agentplane/src/commands/doctor.command.test.ts | 123 +++++++++++++++++++++
 .../agentplane/src/commands/doctor/branch-pr.ts    |   9 ++
 10 files changed, 363 insertions(+)
```

</details>
