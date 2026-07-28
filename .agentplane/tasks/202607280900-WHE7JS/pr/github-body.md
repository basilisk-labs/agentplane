Task: `202607280900-WHE7JS`
Title: Break authority-close lifecycle feedback loop
Canonical task record: `.agentplane/tasks/202607280900-WHE7JS/README.md`

## Summary

Break authority-close lifecycle feedback loop

v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.

## Scope

- In scope: v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
- Out of scope: unrelated refactors not required for "Break authority-close lifecycle feedback loop".

## Verification

- State: ok
- Note:

```text
After rebasing onto main with the runner cancellation-intent retry, focused authority and runner
regressions pass, typecheck/task-state/routing pass, and critical CLI matrix passes 11/11. Hosted CI
must still validate the rebased PR head.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T09:22:13.954Z
- Branch: task/202607280900-WHE7JS/break-authority-close-lifecycle-feedback-loop
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.task-next-action-json.test.ts | 133 +++++++++++++++++++++
 .../src/commands/task/authority-grant.command.ts   |  16 ++-
 2 files changed, 147 insertions(+), 2 deletions(-)
```

</details>
