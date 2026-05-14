Task: `202605142055-F5M77X`
Title: Release AgentPlane v0.6.1
Canonical task record: `.agentplane/tasks/202605142055-F5M77X/README.md`

## Summary

Release AgentPlane v0.6.1

Prepare, verify, publish, and prove AgentPlane patch release v0.6.1 from the current stable main branch, including release notes, version bump, hosted publish, and post-publish platform verification.

## Scope

- In scope: Prepare, verify, publish, and prove AgentPlane patch release v0.6.1 from the current stable main branch, including release notes, version bump, hosted publish, and post-publish platform verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.1".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T23:26:17.235Z
- Branch: task/202605142055-F5M77X/release-v0-6-1
- Head: d1d4aeb1e472

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .../blueprint/resolved-snapshot.json               | 417 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   5 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.1.md                            | 178 +++++++++
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.help-snap.test.ts.snap            | 380 +++++++++++++++++--
 ...n-cli.core.lifecycle.start-commit.basic.test.ts |   4 +
 ...-cli.core.lifecycle.start-commit.format.test.ts |   2 +
 ...n-cli.core.lifecycle.start-commit.paths.test.ts |   8 +
 ...-cli.core.lifecycle.start-commit.policy.test.ts |   2 +
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   7 +-
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   7 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   7 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   7 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |   2 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   1 +
 .../src/workflow-runtime/validate-frontmatter.ts   |   1 +
 packages/core/package.json                         |   2 +-
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 packages/testkit/src/hooks.ts                      |   7 +-
 25 files changed, 1024 insertions(+), 43 deletions(-)
```

</details>
