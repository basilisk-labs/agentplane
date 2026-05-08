Task: `202605081752-A6GW7X`
Title: Add branch PR integration queue
Canonical task record: `.agentplane/tasks/202605081752-A6GW7X/README.md`

## Summary

Add branch PR integration queue

Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.

## Scope

- In scope: Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.
- Out of scope: unrelated refactors not required for "Add branch PR integration queue".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts; Result: pass; Evidence: 3 files, 16 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: ap integrate queue list; Result: pass, queue command dispatch works. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:16:17.726Z
- Branch: task/202605081752-A6GW7X/integration-queue
- Head: 97448aafec23

```text
No changes detected.
```

</details>
