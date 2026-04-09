## Summary

Allow cleanup merged to fetch origin before candidate resolution

Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.

## Scope

- In scope: Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to fetch origin before candidate resolution".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Rebased cleanup merged fetch mode on top of remote-delete support; targeted cleanup merged vitest suite and eslint passed on the final branch head.

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

- Updated: 2026-04-09T22:53:56.616Z
- Branch: task/202604092201-C3ZHCX/cleanup-fetch-origin
- Head: dd1c7f4b0d45

```text
 .agentplane/tasks/202604092201-C3ZHCX/README.md    | 143 +++++++++++++
 .../tasks/202604092201-C3ZHCX/pr/diffstat.txt      |   5 +
 .../tasks/202604092201-C3ZHCX/pr/github-body.md    |  52 +++++
 .../tasks/202604092201-C3ZHCX/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092201-C3ZHCX/pr/meta.json |  17 ++
 .../tasks/202604092201-C3ZHCX/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092201-C3ZHCX/pr/review.md |  59 ++++++
 .../tasks/202604092201-C3ZHCX/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |   7 +
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    | 234 ++++++++++++++-------
 .../src/commands/branch/cleanup-merged.ts          |  11 +-
 .../src/commands/cleanup/merged.command.ts         |  13 ++
 12 files changed, 464 insertions(+), 78 deletions(-)
```

</details>
