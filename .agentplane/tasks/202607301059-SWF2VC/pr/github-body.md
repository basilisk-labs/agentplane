Task: `202607301059-SWF2VC`
Title: Release AgentPlane v0.6.25
Canonical task record: `.agentplane/tasks/202607301059-SWF2VC/README.md`

## Summary

Release AgentPlane v0.6.25 from maintenance branch

Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.

## Scope

- In scope: Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.25 from maintenance branch".

## Verification

- State: ok
- Note:

```text
Verified: raised integration verify output capacity from 10 MiB to 50 MiB; focused pr-meta 19/19,
typecheck, formatting, fast prepublish, the preceding full release:prepublish 82/82 plus coverage
suites, and hosted PR checks all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T11:00:00.322Z
- Branch: task/202607301059-SWF2VC/release-v0-6-25
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 bun.lock                                           |  12 +++---
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/reference/generated-reference.mdx             |   6 +--
 docs/releases/v0.6.25.md                           |  41 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 .../agentplane/src/commands/shared/pr-meta.test.ts |   7 +++-
 .../src/commands/shared/pr-meta/verify-log.ts      |   2 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.25.png    | Bin 0 -> 54765 bytes
 website/static/img/social/manifest.json            |   8 ++++
 29 files changed, 105 insertions(+), 51 deletions(-)
```

</details>
