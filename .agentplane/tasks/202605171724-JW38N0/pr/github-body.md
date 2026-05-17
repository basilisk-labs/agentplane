Task: `202605171724-JW38N0`
Title: Add local Turborepo dev graph overlay
Canonical task record: `.agentplane/tasks/202605171724-JW38N0/README.md`

## Summary

Add local Turborepo dev graph overlay

Add a local-only Turborepo development overlay for the AgentPlane framework checkout: root dev dependency, turbo.json, ignored local cache, explicit dev:turbo scripts, and conservative package script normalization without adding any runtime or published-package dependency on Turborepo.

## Scope

- In scope: Add a local-only Turborepo development overlay for the AgentPlane framework checkout: root dev dependency, turbo.json, ignored local cache, explicit dev:turbo scripts, and conservative package script normalization without adding any runtime or published-package dependency on Turborepo.
- Out of scope: unrelated refactors not required for "Add local Turborepo dev graph overlay".

## Verification

- State: ok
- Note:

```text
Local Turborepo dev overlay verified: turbo ls, graph, affected package build/typecheck/test, docs
typecheck/build, ci:local:turbo, prettier check, policy routing, and doctor all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:40:43.503Z
- Branch: task/202605171724-JW38N0/local-turbo-dev-overlay
- Head: 773d323d33a2

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 .agentplane/tasks/202605171725-AB0HM9/README.md    |  89 ++++
 .agentplane/tasks/202605171725-AEFDJR/README.md    |  89 ++++
 .gitignore                                         |   1 +
 bun.lock                                           |  15 +
 package.json                                       |   7 +
 packages/agentplane/package.json                   |   1 +
 packages/core/package.json                         |   1 +
 packages/recipes/package.json                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 turbo.json                                         |  30 ++
 11 files changed, 761 insertions(+), 2 deletions(-)
```

</details>
