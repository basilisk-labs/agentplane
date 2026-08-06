Task: `202608061244-J3EC6A`
Title: Publish AgentPlane 0.7.4 from the verified protected-main merge
Canonical task record: `.agentplane/tasks/202608061244-J3EC6A/README.md`

## Summary

Publish AgentPlane 0.7.4 from the verified protected-main merge

Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.

## Scope

- In scope: Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.4 from the verified protected-main merge".

## Verification

- State: ok
- Note: PASS: the complete 0.7.4 prepublish contract and release-only semantic diff are valid.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T12:46:07.734Z
- Branch: task/202608061244-J3EC6A/publish-agentplane-0-7-4-from-the-verified-prote
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
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
 docs/releases/v0.7.4.md                            |  43 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 ...-cli.critical.agent-efficiency-baseline.test.ts |  10 ++---
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |   8 ++--
 .../check-compatibility-contract-baseline.mjs      |   8 ++--
 website/static/img/social/docs/releases/v0.7.4.png | Bin 0 -> 52576 bytes
 website/static/img/social/manifest.json            |   8 ++++
 29 files changed, 108 insertions(+), 55 deletions(-)
```

</details>
