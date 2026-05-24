Task: `202605241224-TPWJQZ`
Title: Release AgentPlane v0.6.9
Canonical task record: `.agentplane/tasks/202605241224-TPWJQZ/README.md`

## Summary

Prepare v0.6.9 patch release

Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.

## Scope

- In scope: Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.6.9 patch release".

## Verification

- State: ok
- Note:

```text
Release candidate checks passed for v0.6.9: registry availability, fast release prepublish gate,
policy routing, and doctor all passed on the task branch.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T12:26:01.681Z
- Branch: task/202605241224-TPWJQZ/prepare-v0-6-9-patch-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.9.md                            | 126 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +++-
 packages/testkit/package.json                      |   2 +-
 website/static/img/social/docs/releases/v0.6.9.png | Bin 0 -> 42033 bytes
 website/static/img/social/manifest.json            |   8 ++
 12 files changed, 164 insertions(+), 18 deletions(-)
```

</details>
