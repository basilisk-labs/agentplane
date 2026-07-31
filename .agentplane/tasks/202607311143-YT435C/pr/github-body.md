Task: `202607311143-YT435C`
Title: Release AgentPlane v0.6.26
Canonical task record: `.agentplane/tasks/202607311143-YT435C/README.md`

## Summary

Release AgentPlane v0.6.26

Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.

## Scope

- In scope: Prepare and publish v0.6.26 exclusively from codex/fix-v0.6.24-closeout-route, including release notes for the routing fixes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub Release verification, and proof that main does not contain the maintenance release.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.26".

## Verification

- State: ok
- Note:

```text
Integration finalization now uses immutable branchHeadSha instead of the cleanup-prone branch name.
Focused integration/shared tests pass 40/40; typecheck, lint, and fast release gate pass; the
preceding merge-lane full release:prepublish and all three Verify Steps passed before the
finalize-only failure.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T12:49:53.167Z
- Branch: task/202607311143-YT435C/release-v0-6-26
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/pr/integrate/internal/finalize.test.ts  | 1 +
 packages/agentplane/src/commands/pr/integrate/internal/finalize.ts  | 6 +++++-
 2 files changed, 6 insertions(+), 1 deletion(-)
```

</details>
