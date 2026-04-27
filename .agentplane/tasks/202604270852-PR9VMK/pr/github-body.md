## Summary

Introduce branch_pr lifecycle context resolver

Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.

## Scope

- In scope: Create a shared resolver for branch_pr task route context: base checkout, task branch, worktree path, PR artifact paths, head SHA, freshness state, and allowed mutation route. Keep behavior-compatible and wire only low-risk consumers if needed for validation.
- Out of scope: unrelated refactors not required for "Introduce branch_pr lifecycle context resolver".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T09:15:52.366Z
- Branch: task/202604270852-PR9VMK/branch-pr-context-resolver
- Head: a6f7871c4b9e

```text
 .agentplane/WORKFLOW.md                            |   4 +-
 .agentplane/config.json                            |   2 +-
 .agentplane/tasks/202604270744-R33QS8/README.md    | 161 +++++++++++++++++++++
 .agentplane/tasks/202604270852-3FX0AN/README.md    |  91 ++++++++++++
 .agentplane/tasks/202604270853-8D0EH8/README.md    |  91 ++++++++++++
 .agentplane/tasks/202604270853-ZDBDWP/README.md    |  90 ++++++++++++
 .agentplane/tasks/202604270854-D9N9B2/README.md    |  90 ++++++++++++
 .agentplane/tasks/202604270854-ECZV49/README.md    |  89 ++++++++++++
 .agentplane/tasks/202604270854-N1QDXW/README.md    |  91 ++++++++++++
 .agentplane/tasks/202604270855-5AVFXS/README.md    |  92 ++++++++++++
 .agentplane/workflows/last-known-good.md           |   4 +-
 .../task/hosted-merge-sync/local-branch.ts         |   5 +-
 packages/core/src/git/git-client.ts                |   6 +
 13 files changed, 810 insertions(+), 6 deletions(-)
```

</details>
