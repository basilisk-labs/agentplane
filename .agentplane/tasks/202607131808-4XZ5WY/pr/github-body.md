Task: `202607131808-4XZ5WY`
Title: Prepare and publish patch release v0.6.23
Canonical task record: `.agentplane/tasks/202607131808-4XZ5WY/README.md`

## Summary

Prepare and publish patch release v0.6.23

Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-13T18:11:52.210Z
- Branch: task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
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
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.23.md                           |  39 ++++++
 packages/agentplane/package.json                   |   6 +-
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts | 132 +++++++++++++++++++++
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  98 ---------------
 .../commands/release/release-ci-contract.test.ts   |   5 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +++-
 packages/testkit/package.json                      |   2 +-
 scripts/lib/test-route-registry.mjs                |   1 +
 .../static/img/social/docs/releases/v0.6.23.png    | Bin 0 -> 54823 bytes
 website/static/img/social/manifest.json            |   8 ++
 29 files changed, 241 insertions(+), 143 deletions(-)
```

</details>
