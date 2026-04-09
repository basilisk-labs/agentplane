## Summary

Allow cleanup merged to delete remote task branches

Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.

## Scope

- In scope: Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to delete remote task branches".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green.

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

- Updated: 2026-04-09T22:16:51.077Z
- Branch: task/202604092201-RM6TDD/cleanup-remote-delete
- Head: 8401e016e721

```text
 .agentplane/tasks/202604092201-RM6TDD/README.md    | 121 ++++++++++++++++++++
 .../tasks/202604092201-RM6TDD/pr/diffstat.txt      |   4 +
 .../tasks/202604092201-RM6TDD/pr/github-body.md    |  52 +++++++++
 .../tasks/202604092201-RM6TDD/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092201-RM6TDD/pr/meta.json |  14 +++
 .../tasks/202604092201-RM6TDD/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092201-RM6TDD/pr/review.md |  59 ++++++++++
 .../tasks/202604092201-RM6TDD/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |   7 ++
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    | 125 ++++++++++++++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  48 +++++++-
 .../src/commands/cleanup/merged.command.ts         |  13 +++
 12 files changed, 441 insertions(+), 3 deletions(-)
```

</details>
