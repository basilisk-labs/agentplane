Task: `202607221848-VC4VVS`
Title: Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2
Canonical task record: `.agentplane/tasks/202607221848-VC4VVS/README.md`

## Summary

Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.

## Scope

- In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
- Out of scope: removing the announced v1 compatibility output during its support window.

## Verification

- State: needs_rework
- Note:

```text
Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation
paths for the approved AgentWorkOrder v2 scope.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T10:55:35.062Z
- Branch: task/202607221848-VC4VVS/unify-brief-next-action-runner-and-hermes-on-age
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
