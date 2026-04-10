# PR Review

Created: 2026-04-10T03:29:50.795Z
Branch: task/202604100318-2Z6N94/harden-task-lifecycle-status

## Summary

Harden task lifecycle status handoff and reduce PR artifact duplication

Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.

## Scope

- In scope: Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.
- Out of scope: unrelated refactors not required for "Harden task lifecycle status handoff and reduce PR artifact duplication".

## Verification

### Plan

1. Run bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Expected: exit code 0 and no failing tests.
2. Run bun test packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts. Expected: exit code 0 and no failing tests.
3. Run bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts -t isVerifyStepsFilled rejects empty/placeholder and accepts real text|cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification|task verify-show prints Verify Steps|task verify-show rejects placeholder Verify Steps unless quiet|task plan approve rejects verify-required tasks with missing Verify Steps|task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery|start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing. Expected: all targeted Verify Steps lifecycle tests pass.
4. Run git diff --check. Expected: no output.

### Current Status

- State: ok
- Note: Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract.

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

- Updated: 2026-04-10T09:14:40.667Z
- Branch: task/202604100318-2Z6N94/harden-task-lifecycle-status
- Head: f49e0b4c01c5

```text
 .agentplane/tasks/202604100318-2Z6N94/README.md    | 253 +++++++++++++++++++++
 .../tasks/202604100318-2Z6N94/pr/diffstat.txt      |   0
 .../tasks/202604100318-2Z6N94/pr/github-body.md    |  33 +++
 .../tasks/202604100318-2Z6N94/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604100318-2Z6N94/pr/meta.json |  14 ++
 .../tasks/202604100318-2Z6N94/pr/notes.jsonl       |   0
 .agentplane/tasks/202604100318-2Z6N94/pr/review.md |  58 +++++
 .../tasks/202604100318-2Z6N94/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  24 ++
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 201 +++++++++++++++-
 .../src/cli/run-cli.core.tasks.query.test.ts       |  53 +++++
 .../cli/run-cli.core.tasks.scaffold-derive.test.ts |   6 +-
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |  36 +++
 .../agentplane/src/cli/run-cli.test-helpers.ts     |  12 +
 .../src/cli/wait-remote-pr-checks-script.test.ts   |   3 +-
 .../src/commands/pr/internal/review-template.ts    |  47 +++-
 .../agentplane/src/commands/task/doc-template.ts   |  16 +-
 .../src/commands/task/hosted-close-pr.command.ts   | 114 ++++++----
 packages/agentplane/src/commands/task/plan.ts      |  18 +-
 packages/agentplane/src/commands/task/shared.ts    |   1 +
 .../src/commands/task/shared.unit.test.ts          |   8 +
 .../agentplane/src/commands/task/shared/docs.ts    |  19 ++
 packages/agentplane/src/commands/task/start.ts     |  18 +-
 .../agentplane/src/commands/task/verify-record.ts  |  15 +-
 .../src/commands/task/verify-record.unit.test.ts   |  50 ++++
 .../src/commands/task/verify-show.command.ts       |  31 ++-
 scripts/wait-remote-pr-checks.mjs                  |  20 +-
 27 files changed, 970 insertions(+), 81 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
