Task: `202607291035-XXKY7B`
Title: Prevent evaluator self-referential evidence in recovery-context review
Canonical task record: `.agentplane/tasks/202607291035-XXKY7B/README.md`

## Summary

Prevent evaluator self-referential evidence in recovery-context review

Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.

## Scope

- In scope: Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.
- Out of scope: unrelated refactors not required for "Prevent evaluator self-referential evidence in recovery-context review".

## Verification

- State: ok
- Note: Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head.
- Canonical workflow state lives in the task README.

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
