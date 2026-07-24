# PR Review

Created: 2026-07-24T07:37:26.385Z

## Task

- Task: `202607240736-FCBKJQ`
- Title: Align integration quality review targets for metadata-only tasks
- Status: DOING
- Branch: `task/202607240736-FCBKJQ/align-integration-quality-review-targets-for-met`
- Canonical task record: `.agentplane/tasks/202607240736-FCBKJQ/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T07:37:41.475Z
- Branch: task/202607240736-FCBKJQ/align-integration-quality-review-targets-for-met
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/evaluator/evaluator.command.ts    |  79 +---------
 .../commands/pr/integrate/internal/prepare.test.ts |  72 +++++++---
 .../src/commands/pr/integrate/internal/prepare.ts  |  47 ++----
 .../commands/shared/quality-review-target.test.ts  | 134 +++++++++++++++++
 .../src/commands/shared/quality-review-target.ts   | 102 +++++++++++++
 .../route-decision-blockers.quality-review.test.ts | 160 +++++++++++++++++++++
 .../src/commands/shared/route-decision-blockers.ts |  39 ++++-
 .../shared/route-decision-next-action.test.ts      |  36 +++++
 .../commands/shared/route-decision-next-action.ts  |  14 ++
 9 files changed, 545 insertions(+), 138 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
