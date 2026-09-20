# PR Review

Created: 2026-09-20T00:19:00.343Z

## Task

- Task: `202609192353-V24DRJ`
- Title: Fix canonical final-validation recovery loops before 0.7.10 release
- Status: DOING
- Branch: `task/202609192353-V24DRJ/canonical-v24drj`
- Canonical task record: `.agentplane/tasks/202609192353-V24DRJ/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T00:19:00.343Z
- Branch: task/202609192353-V24DRJ/canonical-v24drj
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-review-apply.test.ts       | 14 +++++
 .../commands/evaluator/evaluator-review-apply.ts   |  8 +++
 .../agentplane/src/commands/task/kernel-advance.ts |  6 +-
 .../commands/task/kernel-final-validation.test.ts  | 56 ++++++++++++++++++
 .../src/commands/task/kernel-final-validation.ts   | 68 +++++++++++++++++++---
 5 files changed, 143 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
