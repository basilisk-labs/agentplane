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
PR review thread resolved with exact workflow evidence: Bun 1.3.6 force install produced no bun.lock
diff and frozen install exited 0 on the v0.6.26 candidate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T12:49:53.167Z
- Branch: task/202607311143-YT435C/release-v0-6-26
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   2 +-
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
 docs/releases/v0.6.26.md                           |  47 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.26.png    | Bin 0 -> 55079 bytes
 website/static/img/social/manifest.json            |   8 ++++
 26 files changed, 98 insertions(+), 42 deletions(-)
```

</details>
