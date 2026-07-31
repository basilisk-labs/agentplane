Task: `202607311338-CT2725`
Title: Preserve typed executor stops with unverified receipts
Canonical task record: `.agentplane/tasks/202607311338-CT2725/README.md`

## Summary

Resolve successful runner receipt observation race

Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.

## Scope

- In scope: Repair the outer direct supervisor so a durably persisted successful runner execution receipt is observed without false runner_receipt_unobserved termination; add deterministic regression coverage, resolve INC-20260731-01 with evidence, and unblock the 0.7.0-rc.1 release gate.
- Out of scope: unrelated refactors not required for "Resolve successful runner receipt observation race".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T13:40:50.644Z
- Branch: task/202607311338-CT2725/resolve-successful-runner-receipt-observation-ra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../direct-task-supervisor-observation.test.ts     | 31 +++++++++++++-
 .../task/direct-task-supervisor-observation.ts     | 23 +++++++++--
 .../commands/task/direct-task-supervisor.test.ts   | 48 ++++++++++++++++++++++
 3 files changed, 96 insertions(+), 6 deletions(-)
```

</details>
