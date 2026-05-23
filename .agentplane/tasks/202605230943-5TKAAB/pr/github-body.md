Task: `202605230943-5TKAAB`
Title: Release AgentPlane v0.6.8
Canonical task record: `.agentplane/tasks/202605230943-5TKAAB/README.md`

## Summary

Release AgentPlane v0.6.8

Prepare and publish the next patch release from current main after validating repository state, release notes, candidate PR, hosted publish, and npm/GitHub release evidence.

## Scope

- In scope: Prepare and publish the next patch release from current main after validating repository state, release notes, candidate PR, hosted publish, and npm/GitHub release evidence.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.8".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T09:43:56.745Z
- Branch: task/202605230943-5TKAAB/release-v0-6-8
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 ++--
 docs/releases/v0.6.8.md                            |  38 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 ++--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +--
 packages/testkit/package.json                      |   2 +-
 website/static/img/social/docs/releases/v0.6.8.png | Bin 0 -> 42124 bytes
 website/static/img/social/manifest.json            |   8 +++++
 12 files changed, 62 insertions(+), 14 deletions(-)
```

</details>
