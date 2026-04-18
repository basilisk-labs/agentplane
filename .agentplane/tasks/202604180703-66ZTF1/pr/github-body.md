## Summary

Auto-publish unpublished task branches during pr open

Remove the redundant manual push plus second pr open pass in branch_pr mode by teaching pr open to publish the task branch to origin when remote PR creation is requested and the branch has no upstream yet.

## Scope

- In scope: Remove the redundant manual push plus second pr open pass in branch_pr mode by teaching pr open to publish the task branch to origin when remote PR creation is requested and the branch has no upstream yet.
- Out of scope: unrelated refactors not required for "Auto-publish unpublished task branches during pr open".

## Verification

- State: ok
- Note: pr open now auto-publishes only from the active task branch, including reruns after locally committed PR artifacts; PR-flow coverage, typecheck, and lint passed after the follow-up fix.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:19:21.184Z
- Branch: task/202604180703-66ZTF1/pr-open-auto-publish
- Head: f91cd1fa4070

```text
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 55 ++++++++++++++++++----
 packages/agentplane/src/commands/pr/open.ts        | 16 ++++++-
 2 files changed, 62 insertions(+), 9 deletions(-)
```

</details>
