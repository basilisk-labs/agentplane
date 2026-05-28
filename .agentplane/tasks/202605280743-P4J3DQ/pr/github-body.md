Task: `202605280743-P4J3DQ`
Title: Gate context policy during upgrade
Canonical task record: `.agentplane/tasks/202605280743-P4J3DQ/README.md`

## Summary

Gate context policy during upgrade

Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.

## Scope

- In scope: Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
- Out of scope: unrelated refactors not required for "Gate context policy during upgrade".

## Verification

- State: ok
- Note:

```text
Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined
targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap
quickstart passed after repo-local rebuild.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T07:44:38.631Z
- Branch: task/202605280743-P4J3DQ/gate-context-policy-upgrade
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/assets/AGENTS.md               |   4 +-
 .../agentplane/src/agents/agents-template.test.ts  |   6 +-
 .../src/cli/run-cli.core.upgrade.test.ts           | 180 +++++++++++++++------
 packages/agentplane/src/commands/context/init.ts   |  33 ++++
 packages/agentplane/src/commands/upgrade/plan.ts   |  36 ++++-
 .../src/runtime/prompt-modules/registry.test.ts    |  18 +++
 .../src/runtime/prompt-modules/registry.ts         |   1 +
 .../src/shared/builtin-assets.generated.ts         |  24 +--
 packages/agentplane/src/shared/policy-gateway.ts   |  24 +++
 packages/core/src/process/run-process.ts           |  81 +++++++---
 10 files changed, 324 insertions(+), 83 deletions(-)
```

</details>
