Task: `202610150442-4S7ZSN`
Title: Bind canonical integration recovery to the resolved task checkout
Canonical task record: `.agentplane/tasks/202610150442-4S7ZSN/README.md`

## Summary

Bind canonical integration recovery to the resolved task checkout

Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.

## Scope

- In scope: Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
- Out of scope: unrelated refactors not required for "Bind canonical integration recovery to the resolved task checkout".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-15T06:03:34.407Z
- Branch: task/202610150442-4S7ZSN/bind-canonical-integration-recovery-to-the-resol
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/external-agent-workflow-recovery.ts       | 30 +++++++--
 .../commands/task/roadmap-common-recovery.test.ts  | 78 +++++++++++++++++++---
 2 files changed, 95 insertions(+), 13 deletions(-)
```

</details>
