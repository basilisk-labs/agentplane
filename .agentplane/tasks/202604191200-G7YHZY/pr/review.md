# PR Review

Created: 2026-04-19T12:24:30.431Z
Branch: task/202604191200-G7YHZY/avoid-redundant-close-tail

## Summary

Avoid redundant manual close tails after hosted closure

Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.

## Scope

- In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
- Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".

## Verification

### Plan

1. Review the requested outcome for "Avoid redundant manual close tails after hosted closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Avoided redundant branch_pr close tails after canonical hosted closure: hosted-close-pr now skips follow-up PR creation when task README history already records a canonical close on base, and finish regression coverage prevents re-materializing redundant local task-close tails; validated by close-tail-state unit tests, finish unit regression, hosted-close-pr CLI regression, eslint, and prettier.

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

- Updated: 2026-04-19T13:59:13.764Z
- Branch: task/202604191200-G7YHZY/avoid-redundant-close-tail
- Head: e1c131c36d1e

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 121 +++++----------------
 .../src/commands/task/close-tail-state.test.ts     |  50 +++++++++
 .../src/commands/task/close-tail-state.ts          |  30 +++++
 packages/agentplane/src/commands/task/finish.ts    |  67 +++++++++++-
 .../src/commands/task/finish.unit.test.ts          |  71 ++++++++++++
 .../src/commands/task/hosted-close-pr.command.ts   |  40 ++++++-
 6 files changed, 278 insertions(+), 101 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
