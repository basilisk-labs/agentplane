Task: `202605251945-BGE4V3`
Title: Normalize stale branch_pr integration queue entries
Canonical task record: `.agentplane/tasks/202605251945-BGE4V3/README.md`

## Summary

Normalize stale branch_pr integration queue entries

Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.

## Scope

- In scope: Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.
- Out of scope: unrelated refactors not required for "Normalize stale branch_pr integration queue entries".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts
packages/agentplane/src/commands/pr/integrate/queue-state.test.ts; Result: pass; Evidence: 2 files,
15 tests passed. Command: bunx vitest run
packages/agentplane/src/commands/integrate-queue.spec.test.ts
packages/agentplane/src/commands/integrate-queue-recovery.test.ts; Result: pass; Evidence: 2 files,
9 tests passed. Command: ap integrate queue list after rebuild; Result: pass; Evidence: stale DONE
queue entries normalized, output: No integration queue entries found. Command: node
.agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor;
Result: pass; Evidence: doctor OK, errors=0 warnings=0. Extra checks: bun run --filter=agentplane
typecheck and prettier --check passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:51:34.554Z
- Branch: task/202605251945-BGE4V3/normalize-integration-queue
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/integrate-queue-recovery.test.ts  | 15 +++++
 .../src/commands/integrate-queue-recovery.ts       |  7 +++
 .../src/commands/integrate-queue.command.ts        | 65 +++++++++++++++++++++-
 3 files changed, 84 insertions(+), 3 deletions(-)
```

</details>
