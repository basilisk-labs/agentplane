Task: `202605230546-RS539J`
Title: Release v0.6.7
Canonical task record: `.agentplane/tasks/202605230546-RS539J/README.md`

## Summary

Release v0.6.7

Prepare and publish the next patch release after the backlog is closed. Target version v0.6.7, include all merged changes since v0.6.6, run release gates, publish through branch_pr release candidate flow, and verify npm/GitHub release evidence.

## Scope

- In scope: Prepare and publish the next patch release after the backlog is closed. Target version v0.6.7, include all merged changes since v0.6.6, run release gates, publish through branch_pr release candidate flow, and verify npm/GitHub release evidence.
- Out of scope: unrelated refactors not required for "Release v0.6.7".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed: local release candidate gate completed release:prepublish:fast,
release:prepublish:heavy, 65/65 release-ci-base chunks, workflow/significant coverage suites,
release-critical suite; hosted PR #4077 checks passed on release commit after format correction.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T05:47:25.857Z
- Branch: task/202605230546-RS539J/release-v0-6-7
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.7.md                            | 117 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 website/static/img/social/docs/releases/v0.6.7.png | Bin 0 -> 41158 bytes
 11 files changed, 133 insertions(+), 14 deletions(-)
```

</details>
