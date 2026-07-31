Task: `202607311707-DRYTNK`
Title: Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility
Canonical task record: `.agentplane/tasks/202607311707-DRYTNK/README.md`

## Summary

Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility

Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.

## Scope

- In scope: Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.
- Out of scope: unrelated refactors not required for "Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility".

## Verification

- State: ok
- Note:

```text
Hosted verify-static rework verified locally against the exact CI build order; TypeScript 7 and
TypeScript 6 rollback remain green.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T21:00:58.689Z
- Branch: task/202607311707-DRYTNK/adopt-typescript-7-for-typechecking-with-typescr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |  47 ++++++-
 depcruise.config.cjs                               |   4 +-
 package.json                                       |   6 +-
 packages/agentplane/package.json                   |   2 +-
 ...tical.agent-efficiency-replay-hardening.test.ts |  29 ++++
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 .../internal/agent-efficiency-anchor-runtime.mjs   |  78 ++++++++++-
 .../agent-efficiency-dependency-manifest.mjs       |   4 +-
 scripts/checks/check-typescript-toolchain.mjs      | 153 +++++++++++++++++++++
 scripts/checks/run-typescript-build.mjs            |  30 +++-
 tsconfig.base.json                                 |  31 +++--
 tsconfig.depcruise.json                            |   8 ++
 website/package.json                               |   4 +-
 website/tsconfig.docusaurus.json                   |  18 +++
 website/tsconfig.json                              |   3 +-
 17 files changed, 389 insertions(+), 34 deletions(-)
```

</details>
