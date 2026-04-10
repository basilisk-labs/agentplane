## Summary

Fix protected-main release flow and PR artifact self-drift

Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.

## Scope

- In scope: Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.
- Out of scope: unrelated refactors not required for "Fix protected-main release flow and PR artifact self-drift".

## Verification

- State: ok
- Note: Verified pr open diffstat rendering, remote-link stability, and protected-main local release apply.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T14:11:51.328Z
- Branch: task/202604101047-VRAVWD/release-flow-pr-drift
- Head: 444c2a9b6ce0

```text
 .agentplane/tasks/202604101047-VRAVWD/README.md    | 162 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   4 +-
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  76 ++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  86 ++++++++---
 .../src/commands/release/apply.command.ts          |  21 +--
 .../src/commands/release/apply.preflight.ts        |   3 +-
 .../agentplane/src/commands/release/apply.test.ts  |  10 +-
 .../agentplane/src/commands/shared/git-diff.ts     |  17 ++-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  58 ++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts |  14 +-
 10 files changed, 401 insertions(+), 50 deletions(-)
```

</details>
