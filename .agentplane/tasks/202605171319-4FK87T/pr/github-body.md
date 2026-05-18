Task: `202605171319-4FK87T`
Title: Prepare AgentPlane v0.6.2
Canonical task record: `.agentplane/tasks/202605171319-4FK87T/README.md`

## Summary

Prepare AgentPlane v0.6.2

Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.

## Scope

- In scope: Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.
- Out of scope: unrelated refactors not required for "Prepare AgentPlane v0.6.2".

## Verification

- State: ok
- Note:

```text
Release candidate PR #3865 green on head 88302c5a8: Core CI test/test-windows/release-ready
manifest, Docs CI, Dependency Review, and CodeQL passed. Local release candidate and pre-push fast
CI passed; release notes and knip baseline refreshed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T08:15:50.970Z
- Branch: task/202605171319-4FK87T/release-0-6-2
- Head: 88302c5a8334

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.2.md                            | 238 ++++++++++++
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.help-snap.test.ts.snap            | 403 ++------------------
 .../src/cli/run-cli.core.help-contract.test.ts     |   5 +-
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |  10 +-
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   2 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |   5 +-
 .../cli/run-cli.core.pr-flow.pr-lifecycle.test.ts  |  16 +-
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |  13 +-
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  35 +-
 ...run-cli.core.pr-flow.pr-open.validation.test.ts |   8 +
 packages/agentplane/src/cli/run-cli.ts             |   2 +-
 .../commands/release/apply.preflight.publish.ts    |  36 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 scripts/baselines/knip-baseline.json               |   6 +-
 21 files changed, 796 insertions(+), 422 deletions(-)
```

</details>
