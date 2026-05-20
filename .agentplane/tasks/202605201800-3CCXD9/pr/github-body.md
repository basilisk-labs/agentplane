Task: `202605201800-3CCXD9`
Title: Release AgentPlane v0.6.4
Canonical task record: `.agentplane/tasks/202605201800-3CCXD9/README.md`

## Summary

Release AgentPlane v0.6.4

Prepare, verify, publish, and audit the next AgentPlane patch release from current main.

## Scope

- In scope: Prepare, verify, publish, and audit the next AgentPlane patch release from current main.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.4".

## Verification

- State: ok
- Note:

```text
Local release gates passed for v0.6.4 candidate preparation: ci:local:full succeeded after
refreshing website/static/llms-full.txt; hosted publish evidence will be recorded by publish
workflow after merge and dispatch.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T21:33:16.869Z
- Branch: task/202605201800-3CCXD9/release-v0.6.4
- Head: 13d55af69d66

```text
 .agentplane/WORKFLOW.md                            |    3 +-
 .agentplane/tasks/202605191736-EQBZ4M/README.md    |    3 +
 .../tasks/202605191736-EQBZ4M/observations.jsonl   |    2 -
 .../blueprint/resolved-snapshot.json               |  455 ++++++
 .agentplane/workflows/last-known-good.md           |    5 +-
 docs/reference/generated-reference.mdx             |    6 +-
 docs/releases/v0.6.4.md                            |  256 ++++
 packages/agentplane/package.json                   |    6 +-
 .../run-cli.core.help-snap.test.ts.snap            |  341 +----
 packages/agentplane/src/cli/cli-smoke.test.ts      |   13 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |   78 +-
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |   10 +-
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   12 +-
 ...un-cli.core.lifecycle.finish-validation.test.ts |   18 +-
 .../src/cli/run-cli.core.task-guided.test.ts       |    2 +
 .../src/cli/run-cli.core.tasks.create.test.ts      |    2 +-
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |    2 +-
 .../src/commands/guard/impl/comment-commit.ts      |   20 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 website/static/llms-full.txt                       | 1557 +++++++++++++++++++-
 24 files changed, 2354 insertions(+), 449 deletions(-)
```

</details>
