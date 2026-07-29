# PR Review

Created: 2026-07-29T10:37:41.423Z

## Task

- Task: `202607291035-XXKY7B`
- Title: Prevent evaluator self-referential evidence in recovery-context review
- Status: DOING
- Branch: `task/202607291035-XXKY7B/prevent-evaluator-self-referential-evidence-in-r`
- Canonical task record: `.agentplane/tasks/202607291035-XXKY7B/README.md`

## Verification

- State: ok
- Note: Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T10:42:20.564Z
- Branch: task/202607291035-XXKY7B/prevent-evaluator-self-referential-evidence-in-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/evaluators/recovery-context.md                       | 5 +++--
 packages/agentplane/assets/evaluators/recovery-context.md        | 5 +++--
 .../src/commands/evaluator/evaluator-episode.calibration.test.ts | 9 +++++++++
 3 files changed, 15 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
