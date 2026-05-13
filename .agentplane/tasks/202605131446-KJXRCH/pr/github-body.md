Task: `202605131446-KJXRCH`
Title: Bootstrap AgentPlane from context init
Canonical task record: `.agentplane/tasks/202605131446-KJXRCH/README.md`

## Summary

Bootstrap AgentPlane from context init

Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.

## Scope

- In scope: Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.
- Out of scope: unrelated refactors not required for "Bootstrap AgentPlane from context init".

## Verification

- State: ok
- Note: Verified context init empty-directory bootstrap with targeted source CLI tests, package typecheck, exact-file lint, CLI docs freshness, routing check, doctor, repo-local bin smoke, pre-push fast CI, and hosted PR checks.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T14:54:04.085Z
- Branch: task/202605131446-KJXRCH/context-init-bootstrap
- Head: 87dfdcee6636

```text
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 docs/user/local-context.mdx                        |   5 +
 docs/user/setup.mdx                                |   4 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  89 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +-
 .../src/commands/context/context.spec.ts           |   2 +
 packages/agentplane/src/commands/context/init.ts   |  89 +++-
 7 files changed, 702 insertions(+), 3 deletions(-)
```

</details>
