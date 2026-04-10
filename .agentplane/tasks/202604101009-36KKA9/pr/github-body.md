## Summary

Prepare patch release v0.3.11 and reconcile protected-main publish path

Generate the next patch release plan from v0.3.10, draft release notes, prepare a release candidate branch/PR, and reconcile the current mismatch between release apply --push and the protected-main publish route before any irreversible release action.

## Scope

- In scope: Generate the next patch release plan from v0.3.10, draft release notes, prepare a release candidate branch/PR, and reconcile the current mismatch between release apply --push and the protected-main publish route before any irreversible release action.
- Out of scope: unrelated refactors not required for "Prepare patch release v0.3.11 and reconcile protected-main publish path".

## Verification

- State: ok
- Note: Verified integrate-hook config override with bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts and bun run docs:site:build
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T15:08:21.987Z
- Branch: task/202604101009-36KKA9/patch-release-v0-3-11
- Head: af5c99a1f219

```text
 .agentplane/config.json                            |   2 +-
 .agentplane/tasks/202604101009-36KKA9/README.md    | 171 ++++++++++++
 bun.lock                                           |   6 +-
 docs/reference/generated-reference.mdx             |   4 +-
 docs/releases/v0.3.11.md                           | 309 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   4 +-
 packages/agentplane/package.json                   |   4 +-
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  76 +++++
 .../commands/pr/integrate/internal/merge.test.ts   |   3 +
 .../src/commands/pr/integrate/internal/merge.ts    |   1 +
 .../agentplane/src/commands/pr/internal/sync.ts    |  86 ++++--
 .../src/commands/release/apply.command.ts          |  21 +-
 .../src/commands/release/apply.preflight.ts        |   3 +-
 .../agentplane/src/commands/release/apply.test.ts  |  10 +-
 .../agentplane/src/commands/shared/git-diff.ts     |  17 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  58 ++++
 packages/agentplane/src/commands/shared/pr-meta.ts |  14 +-
 packages/core/package.json                         |   2 +-
 18 files changed, 732 insertions(+), 59 deletions(-)
```

</details>
