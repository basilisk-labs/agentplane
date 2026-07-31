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

- State: ok
- Note:

```text
PASS at f9c7673f: current main is merged without semantic conflict; 20 focused tests, all 12
critical chunks, typecheck, incident collection, release incident gate, and source/asset parity pass
without provider replay.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T13:58:02.416Z
- Branch: task/202607311338-CT2725/resolve-successful-runner-receipt-observation-ra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |  1 -
 docs/developer/incident-archive.mdx                |  4 ++
 packages/agentplane/assets/policy/incidents.md     |  1 -
 .../direct-task-supervisor-observation.test.ts     | 36 ++++++++++++++--
 .../task/direct-task-supervisor-observation.ts     | 23 +++++++++--
 .../commands/task/direct-task-supervisor.test.ts   | 48 ++++++++++++++++++++++
 6 files changed, 104 insertions(+), 9 deletions(-)
```

</details>
