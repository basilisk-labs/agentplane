Task: `202609061750-Z0XXVD`
Title: Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication
Canonical task record: `.agentplane/tasks/202609061750-Z0XXVD/README.md`

## Summary

Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.

## Scope

- In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
- Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run release:prepublish
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T18:16:20.873Z
- Branch: task/202609061750-Z0XXVD/prepare-and-qualify-agentplane-0-7-8-for-exact-s
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    2 +-
 docs/reference/generated-reference.mdx             |   14 +-
 docs/releases/v0.7.8-evidence/preparation.md       |   31 +
 .../v0.7.8-evidence/qualify-upgrade-0.7.7.mjs      |  283 +
 .../v0.7.8-evidence/release-plan-changes.json      | 7087 ++++++++++++++++++++
 .../v0.7.8-evidence/release-plan-version.json      |    8 +
 docs/releases/v0.7.8.md                            | 1689 +++++
 packages/agentplane/package.json                   |    6 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 13 files changed, 9115 insertions(+), 17 deletions(-)
```

</details>
