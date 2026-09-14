Task: `202609142255-KR5FPV`
Title: Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30
Canonical task record: `.agentplane/tasks/202609142255-KR5FPV/README.md`

## Summary

Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.

## Scope

- In scope: On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
- Out of scope: unrelated refactors not required for "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T23:07:09.197Z
- Branch: task/202609142255-KR5FPV/backport-install-layout-guard
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/branch/work-start.materialize.test.ts | 107 +++++++++++++++++++++
 .../src/commands/branch/work-start.materialize.ts  |  55 ++++++++++-
 2 files changed, 160 insertions(+), 2 deletions(-)
```

</details>
