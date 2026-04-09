## Summary

Doctor --fix safe-removes legacy untracked task README collisions

Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.

## Scope

- In scope: Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.
- Out of scope: unrelated refactors not required for "Doctor --fix safe-removes legacy untracked task README collisions".

## Verification

### Plan

1. Create a repo state with an untracked .agentplane/tasks/<task-id>/README.md that would be overwritten by a tracked task README on origin/main, then run doctor. Expected: doctor reports the collision clearly.
2. Run agentplane doctor --fix on that state. Expected: the safe collision is removed and the next doctor run is clean.
3. Leave an unrelated untracked task artifact outside the safe-collision rule and rerun doctor --fix. Expected: doctor does not delete the unrelated file.

### Current Status

- State: ok
- Note: Verified current HEAD after formatting commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.

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

- Updated: 2026-04-09T23:22:53.124Z
- Branch: task/202604092306-JRGSGJ/doctor-safe-cleanup
- Head: 593d86d5e2b8

```text
 .agentplane/tasks/202604092306-JRGSGJ/README.md    | 140 +++++++++++++++++++++
 .../tasks/202604092306-JRGSGJ/pr/diffstat.txt      |  12 ++
 .../tasks/202604092306-JRGSGJ/pr/github-body.md    |  61 +++++++++
 .../tasks/202604092306-JRGSGJ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092306-JRGSGJ/pr/meta.json |  14 +++
 .../tasks/202604092306-JRGSGJ/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092306-JRGSGJ/pr/review.md |  68 ++++++++++
 .../tasks/202604092306-JRGSGJ/pr/verify.log        |   0
 .../agentplane/src/commands/doctor.fast.test.ts    | 128 +++++++++++++++++++
 packages/agentplane/src/commands/doctor.run.ts     |   8 +-
 packages/agentplane/src/commands/doctor/fixes.ts   |  87 +++++++++++++
 11 files changed, 518 insertions(+), 1 deletion(-)
```

</details>
