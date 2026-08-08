Task: `202608082119-P6SHBN`
Title: Publish AgentPlane 0.7.5 from merged qualified candidate
Canonical task record: `.agentplane/tasks/202608082119-P6SHBN/README.md`

## Summary

Publish AgentPlane 0.7.5 from merged qualified candidate

Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.

## Scope

- In scope: Prepare the protected-main release candidate after PR #4798, run the canonical release gates, merge the release PR, dispatch GitHub-only publication for the exact release SHA, and verify GitHub Release plus all public npm packages.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.5 from merged qualified candidate".

## Verification

- State: ok
- Note:

```text
Release candidate verification passed for implementation 7761346d3f0f698e984e4893640d64c4959d5836
with task-evidence tail 8d3b2eaf5e46c99beb8576af1436a8ad2868ca00. The 0.7.5 independent
compatibility reconstruction review finding is fixed; full local fast CI and full release prepublish
pass. Exact final PR-head hosted checks, merge-main proof, publication, and registry checks remain
downstream gates.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T21:36:55.055Z
- Branch: task/202608082119-P6SHBN/publish-agentplane-0-7-5-from-merged-qualified-c
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
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.7.5.md                            | 475 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  16 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |   8 +-
 .../check-compatibility-contract-baseline.mjs      |   8 +-
 27 files changed, 535 insertions(+), 58 deletions(-)
```

</details>
