# PR Review

Created: 2026-04-10T01:50:27.909Z
Branch: task/202604100138-87X9YD/closeout-incident-guidance

## Summary

Use finish-style incident no-op guidance in branch_pr closeout flows

branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.

## Scope

- In scope: branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.
- Out of scope: unrelated refactors not required for "Use finish-style incident no-op guidance in branch_pr closeout flows".

## Verification

### Plan

1. Run the focused integrate/hosted-close regression coverage for plain incident no-op cases. Expected: both base-side closeout paths emit explicit incidents.md guidance instead of the generic no-op text.
2. Run the touched lint/test slice for the closeout command files. Expected: the context reuse stays green with no new lint failures.
3. Inspect operator-facing output for branch_pr closeout when no structured incident finding exists. Expected: it explains that plain verify/finish text stayed task-local and points at the structured next step.

### Current Status

- State: ok
- Note: Focused regression checks passed: targeted vitest for integrate and hosted-close incident no-op messaging plus eslint on the touched command/test files.

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

- Updated: 2026-04-10T02:07:39.172Z
- Branch: task/202604100138-87X9YD/closeout-incident-guidance
- Head: 373b29880520

```text
 .agentplane/tasks/202604100138-87X9YD/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604100138-87X9YD/pr/diffstat.txt      |   5 +
 .../tasks/202604100138-87X9YD/pr/github-body.md    |  54 ++++++++++
 .../tasks/202604100138-87X9YD/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604100138-87X9YD/pr/meta.json |  17 +++
 .../tasks/202604100138-87X9YD/pr/notes.jsonl       |   0
 .agentplane/tasks/202604100138-87X9YD/pr/review.md |  61 +++++++++++
 .../tasks/202604100138-87X9YD/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |   2 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   2 +-
 .../src/commands/pr/integrate/internal/finalize.ts |   2 +-
 .../src/commands/task/hosted-close.command.ts      |   2 +-
 12 files changed, 259 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
