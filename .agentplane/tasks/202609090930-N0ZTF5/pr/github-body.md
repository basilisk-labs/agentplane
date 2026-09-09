Task: `202609090930-N0ZTF5`
Title: Recover committed implementation after an approved verification-only plan refinement without fabricated source changes
Canonical task record: `.agentplane/tasks/202609090930-N0ZTF5/README.md`

## Summary

Recover committed implementation after an approved verification-only plan refinement without fabricated source changes

Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.

## Scope

- In scope: Arkady Factory task 202609090806-AWQTDT on AgentPlane 0.7.8 is blocked: implementation already committed, declared validation failed on task metadata cleanliness, user approved rescheduling the same contracts after a clean checkpoint, refined plan approved, completed no-change executor result rejected with E_VALIDATION and persisted. Diagnose and narrowly fix recovery with exact implementation evidence, unchanged approved source scope, fresh checks under current approved validation plan, and negative tests for source drift and scope expansion. Do not bypass approval, weaken checks, mutate the installed CLI, publish or deploy in this task.
- Out of scope: unrelated refactors not required for "Recover committed implementation after an approved verification-only plan refinement without fabricated source changes".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-09T13:33:11.401Z
- Branch: task/202609090930-N0ZTF5/recover-committed-implementation-after-an-approv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/evidence-only-rework-commit.ts   | 147 +++++++++++++
 .../external-agent-implementation-recovery.test.ts | 228 +++++++++++++++++++++
 .../task/external-agent-implementation-recovery.ts |  29 ++-
 3 files changed, 400 insertions(+), 4 deletions(-)
```

</details>
