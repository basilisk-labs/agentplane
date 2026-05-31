Task: `202605311805-PWSTQ5`
Title: Release v0.6.13 patch
Canonical task record: `.agentplane/tasks/202605311805-PWSTQ5/README.md`

## Summary

Release v0.6.13 patch

Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.

## Scope

- In scope: Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.
- Out of scope: unrelated refactors not required for "Release v0.6.13 patch".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T18:47:47.262Z
- Branch: task/202605311805-PWSTQ5/release-v0-6-13-patch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.13.md                           | 127 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.13.png    | Bin 0 -> 54186 bytes
 website/static/img/social/manifest.json            |   8 ++
 11 files changed, 149 insertions(+), 13 deletions(-)
```

</details>
