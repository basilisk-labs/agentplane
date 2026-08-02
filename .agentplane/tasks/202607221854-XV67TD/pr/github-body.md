Task: `202607221854-XV67TD`
Title: Prepare and publish AgentPlane 0.7.0
Canonical task record: `.agentplane/tasks/202607221854-XV67TD/README.md`

## Summary

Prepare and publish AgentPlane 0.7.0

Integrate the fully verified RF-00 through RF-27 program, run exact release gates on the final main SHA, publish all packages and GitHub release, audit hosted evidence, and confirm post-publish compatibility.

## Scope

- In scope: final integration queue, version 0.7.0 bump, release notes, prepublish gates, exact-SHA GitHub workflow publication, npm/GitHub/package audit, installed smoke, hosted-close evidence, and final clean main readback.
- Out of scope: new feature/refactor scope after rc; any regression requires a separately approved release-blocker task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T06:26:45.368Z
- Branch: task/202607221854-XV67TD/prepare-and-publish-agentplane-0-7-0
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    3 +-
 .agentplane/workflows/last-known-good.md           |    3 +-
 docs/assets/header.svg                             |    4 +-
 docs/assets/readme-headers/adr.svg                 |    4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |    4 +-
 docs/assets/readme-headers/agentplane.svg          |    4 +-
 docs/assets/readme-headers/core.svg                |    4 +-
 docs/assets/readme-headers/docs.svg                |    4 +-
 docs/assets/readme-headers/humanizer.svg           |    4 +-
 docs/assets/readme-headers/recipes.svg             |    4 +-
 docs/assets/readme-headers/releases.svg            |    4 +-
 docs/assets/readme-headers/schemas.svg             |    4 +-
 docs/assets/readme-headers/scripts.svg             |    4 +-
 docs/assets/readme-headers/skills.svg              |    4 +-
 docs/assets/readme-headers/spec.svg                |    4 +-
 docs/assets/readme-headers/testkit.svg             |    4 +-
 docs/reference/generated-reference.mdx             |    6 +-
 docs/releases/v0.7.0.md                            | 1818 ++++++++++++++++++++
 packages/agentplane/package.json                   |    6 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   16 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 website/static/img/social/docs/releases/v0.7.0.png |  Bin 0 -> 53239 bytes
 website/static/img/social/manifest.json            |    8 +
 27 files changed, 1878 insertions(+), 50 deletions(-)
```

</details>
