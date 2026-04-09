## Summary

Show incident IDs and registry paths after successful promotion

Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.

## Scope

- In scope: Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.
- Out of scope: unrelated refactors not required for "Show incident IDs and registry paths after successful promotion".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Verification refreshed on final branch head after success-output cleanup; targeted incidents/task CLI tests and eslint remain green.

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

- Updated: 2026-04-09T22:20:12.357Z
- Branch: task/202604092201-9CPEMF/incidents-promotion-success
- Head: 731125fdbb0d

```text
 .agentplane/tasks/202604092201-9CPEMF/README.md    | 121 +++++++++++++++++++++
 .../tasks/202604092201-9CPEMF/pr/diffstat.txt      |   9 ++
 .../tasks/202604092201-9CPEMF/pr/github-body.md    |  52 +++++++++
 .../tasks/202604092201-9CPEMF/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092201-9CPEMF/pr/meta.json |  14 +++
 .../tasks/202604092201-9CPEMF/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092201-9CPEMF/pr/review.md |  59 ++++++++++
 .../tasks/202604092201-9CPEMF/pr/verify.log        |   0
 .../src/cli/run-cli.core.incidents.test.ts         |  84 ++++++++++++++
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |   2 +
 .../src/commands/incidents/collect.command.ts      |   6 +-
 .../agentplane/src/commands/incidents/shared.ts    |  51 ++++++++-
 .../src/commands/pr/integrate/internal/finalize.ts |   2 +
 packages/agentplane/src/commands/task/finish.ts    |   4 +
 .../src/commands/task/hosted-close.command.ts      |   2 +
 .../agentplane/src/commands/task/verify-record.ts  |   2 +
 16 files changed, 400 insertions(+), 9 deletions(-)
```

</details>
