## Summary

Fix protected-main release flow and PR artifact self-drift

Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.

## Scope

- In scope: Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.
- Out of scope: unrelated refactors not required for "Fix protected-main release flow and PR artifact self-drift".

## Verification

- State: ok
- Note: Verified: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun x tsc --noEmit -p packages/agentplane/tsconfig.json
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T11:00:44.951Z
- Branch: task/202604101047-VRAVWD/release-flow-pr-drift
- Head: 5a8df40d13ec

```text
 .agentplane/tasks/202604101047-VRAVWD/README.md    | 118 +++++++++++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  39 ++++---
 .../src/commands/release/apply.command.ts          |  21 +---
 .../src/commands/release/apply.preflight.ts        |  17 ++-
 .../agentplane/src/commands/release/apply.test.ts  |  14 ++-
 .../agentplane/src/commands/shared/git-diff.ts     |  17 ++-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  58 ++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts |  14 ++-
 8 files changed, 254 insertions(+), 44 deletions(-)
```

</details>
