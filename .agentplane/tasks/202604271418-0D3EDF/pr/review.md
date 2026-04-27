# PR Review

Created: 2026-04-27T14:18:58.754Z
Branch: task/202604271418-0D3EDF/preserve-merge-history

## Summary

Preserve branch_pr merge history by default

Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.

## Scope

- In scope: Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
- Out of scope: unrelated refactors not required for "Preserve branch_pr merge history by default".

## Verification

### Plan

1. Run focused integrate/PR-flow tests covering merge strategy defaults. Expected: default branch_pr integrate uses merge-preserving strategy and explicit squash remains supported.
2. Run tests or snapshots covering command help/policy prompt text touched by this task. Expected: guidance no longer recommends squash as the default branch_pr route.
3. Run `bun run typecheck`. Expected: it succeeds.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run Prettier/ESLint on touched source and policy/doc files. Expected: both succeed.

### Current Status

- State: ok
- Note: Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T14:30:15.201Z
- Branch: task/202604271418-0D3EDF/preserve-merge-history
- Head: 4c59410b5887

```text
 .agentplane/policy/workflow.branch_pr.md           |  3 +-
 docs/user/branching-and-pr-artifacts.mdx           |  4 ++-
 docs/user/cli-reference.generated.mdx              |  2 +-
 docs/user/commands.mdx                             |  4 +--
 docs/user/task-lifecycle.mdx                       |  6 ++--
 docs/user/workflow.mdx                             |  4 ++-
 packages/agentplane/assets/AGENTS.md               |  2 +-
 .../agentplane/assets/policy/workflow.branch_pr.md |  3 +-
 packages/agentplane/src/cli/command-guide.test.ts  | 10 ++++++
 packages/agentplane/src/cli/command-guide.ts       |  2 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts | 42 +++++++++++++++-------
 packages/agentplane/src/commands/integrate.spec.ts |  7 ++--
 .../src/commands/task/hosted-close.command.ts      |  2 +-
 13 files changed, 63 insertions(+), 28 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
