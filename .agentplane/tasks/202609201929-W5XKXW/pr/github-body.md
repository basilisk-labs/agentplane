Task: `202609201929-W5XKXW`
Title: Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication
Canonical task record: `.agentplane/tasks/202609201929-W5XKXW/README.md`

## Summary

Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication

In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.

## Scope

- In scope: In one PR: make task README stable reads tolerate only bounded transient replacement races while remaining fail-closed; ensure canonical terminal task artifacts leave protected main through the closure-branch flow; lengthen and test bounded npm publication propagation retries; make hook runtime selection prefer the active compatible Node executable over stale NVM_BIN. Add focused regression tests for each behavior and run full local CI.
- Out of scope: unrelated refactors not required for "Fix four release reliability gaps discovered during AgentPlane 0.7.10 publication".

## Verification

- State: ok
- Note: Canonical validation sha256:9d5b7edbf3307a7ca865ebbdb36bb6eed06adaed89df4619c18bc119b7a6b738
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T20:29:05.070Z
- Branch: task/202609201929-W5XKXW/canonical-w5xkxw
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   9 +-
 .../check-published-packages-script.test.ts        |  75 +++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |  37 +++++++-
 .../commands/task/kernel-repository-coordinator.ts |  52 +----------
 .../src/commands/task/kernel-terminal-artifacts.ts | 103 +++++++++++++++++++++
 .../runner/usecases/kernel-task-lifecycle.test.ts  |  39 ++++++++
 .../src/runner/usecases/kernel-task-lifecycle.ts   |  19 +++-
 packages/agentplane/src/shared/runtime-env.test.ts |  30 ++++--
 packages/agentplane/src/shared/runtime-env.ts      |   5 +
 .../src/tasks/task-kernel/authority-delta.test.ts  |  94 ++++++++++++++++++-
 .../src/tasks/task-kernel/authority-lineage.ts     |   8 +-
 scripts/checks/run-pre-push-hook.mjs               |   2 +-
 scripts/release/check-published-packages.mjs       |  23 ++++-
 13 files changed, 427 insertions(+), 69 deletions(-)
```

</details>
