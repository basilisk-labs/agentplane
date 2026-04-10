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

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T01:57:01.303Z
- Branch: task/202604100138-87X9YD/closeout-incident-guidance
- Head: 20c6ef6f8d03

```text
 packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts | 2 +-
 packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts | 2 +-
 packages/agentplane/src/commands/pr/integrate/internal/finalize.ts | 2 +-
 packages/agentplane/src/commands/task/hosted-close.command.ts      | 2 +-
 4 files changed, 4 insertions(+), 4 deletions(-)
```

</details>
