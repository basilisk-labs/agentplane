## Summary

Fix pr open when remote branch already exists

Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.

## Scope

- In scope: Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
- Out of scope: unrelated refactors not required for "Fix pr open when remote branch already exists".

## Verification

- State: ok
- Note: Validated branch_pr pr open against a published task branch with a simulated internal push failure; the command now reuses the matching remote head and continues to GitHub PR creation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T12:11:04.433Z
- Branch: task/202604191200-N6XPEJ/pr-open-existing-branch
- Head: 5f9aaa0e0863

```text
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 146 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/open.ts        | 125 ++++++++++++++++--
 2 files changed, 263 insertions(+), 8 deletions(-)
```

</details>
