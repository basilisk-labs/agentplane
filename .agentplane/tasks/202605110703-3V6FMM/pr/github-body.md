Task: `202605110703-3V6FMM`
Title: Fix ACR projection checkout collision
Canonical task record: `.agentplane/tasks/202605110703-3V6FMM/README.md`

## Summary

Fix ACR projection checkout collision

Prevent automatic ACR refresh during branch_pr finish/hosted-close from leaving local untracked acr.json files that later block fast-forward pulls after hosted close commits track the same path.

## Scope

- In scope: Prevent automatic ACR refresh during branch_pr finish/hosted-close from leaving local untracked acr.json files that later block fast-forward pulls after hosted close commits track the same path.
- Out of scope: unrelated refactors not required for "Fix ACR projection checkout collision".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --reporter dot; Result: pass, 2 files / 33 tests. Command: bunx eslint touched finish files; Result: pass. Command: bunx prettier --check touched finish files; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass, oversized baseline OK.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-11T07:12:54.165Z
- Branch: task-202605110703-3V6FMM-acr-checkout-collision
- Head: 8573b3209341

```text
 .../blueprint/resolved-snapshot.json               | 498 +++++++++++++++++++++
 .../agentplane/src/commands/task/finish-close.ts   |  38 +-
 .../agentplane/src/commands/task/finish-execute.ts |  32 +-
 .../commands/task/finish.validation.unit.test.ts   |  44 +-
 4 files changed, 578 insertions(+), 34 deletions(-)
```

</details>
