Task: `202605211431-A5GBYT`
Title: Release AgentPlane v0.6.5
Canonical task record: `.agentplane/tasks/202605211431-A5GBYT/README.md`

## Summary

Release AgentPlane v0.6.5

Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.

## Scope

- In scope: Prepare, verify, publish, and record evidence for the next patch release after v0.6.4.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.5".

## Verification

- State: ok
- Note:

```text
Evaluator gate for release implementation head 63b0b14d4513bc8c6cafce1b443ede2d24c39e32: release
candidate passed, hosted PR #4007 checks were green, and task-local artifact commits are excluded
from the implementation head.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T17:19:41.962Z
- Branch: task/202605211431-A5GBYT/release-v0-6-5
- Head: 63b0b14d4513

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++
 .../release-ci-base-focused-report.json            | 875 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.5.md                            |  94 +++
 packages/agentplane/package.json                   |   6 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |   2 +-
 ...n-cli.core.branch-meta.workflow-profile.test.ts |   2 +-
 .../src/cli/run-cli.core.context-init.test.ts      |  14 +-
 .../agentplane/src/cli/run-cli.core.demo.test.ts   | 104 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/checks/check-spec-examples.mjs             |   1 +
 scripts/lib/test-route-registry.mjs                |   8 +-
 18 files changed, 1515 insertions(+), 70 deletions(-)
```

</details>
