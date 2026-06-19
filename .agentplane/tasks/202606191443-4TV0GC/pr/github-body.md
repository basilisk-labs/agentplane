Task: `202606191443-4TV0GC`
Title: Prepare v0.6.21 patch release
Canonical task record: `.agentplane/tasks/202606191443-4TV0GC/README.md`

## Summary

Prepare v0.6.21 patch release

Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.

## Scope

- In scope: Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.
- Out of scope: unrelated refactors not required for "Prepare v0.6.21 patch release".

## Verification

- State: ok
- Note:

```text
Remote PR publication attempted after local release candidate verification. ap pr open failed on SSH
host key verification; HTTPS pushes via gh credential helper hung and were interrupted without
creating the remote branch. Local candidate remains clean and verified at HEAD
2322d3db77775f59e6da8e9423fd33653bf64a9b.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-19T14:45:09.630Z
- Branch: task/202606191443-4TV0GC/prepare-v0-6-21-patch-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                  |  3 +-
 .agentplane/workflows/last-known-good.md |  3 +-
 docs/reference/generated-reference.mdx   |  6 +-
 docs/releases/v0.6.21.md                 | 96 ++++++++++++++++++++++++++++++++
 docs/user/commands.mdx                   | 11 ++--
 packages/agentplane/package.json         |  6 +-
 packages/core/package.json               |  2 +-
 packages/recipes/package.json            |  2 +-
 packages/recipes/src/index.ts            |  2 +-
 packages/spec/examples/acr.json          | 22 ++++++--
 packages/testkit/package.json            |  2 +-
 11 files changed, 132 insertions(+), 23 deletions(-)
```

</details>
