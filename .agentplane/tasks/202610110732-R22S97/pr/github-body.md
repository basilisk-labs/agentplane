Task: `202610110732-R22S97`
Title: Authenticate native operator plan receipts in prospective scope rework
Canonical task record: `.agentplane/tasks/202610110732-R22S97/README.md`

## Summary

Authenticate native operator plan receipts in prospective scope rework

Repair the generic dual-provenance scope-replan reader: accept valid native operator plan:sha256: proposal receipts as well as existing result:sha256: semantic proposals, authenticating exact retained command, plan, event, task revision, grant and lineage. Reproduce the real 65K8GW revision22 failure read-only and in isolated regression fixtures; never mutate that consumer or fabricate receipt/history. Preserve rejected missing, forged, ambiguous, cross-task or stale proposal evidence. Use exact reviewed AGR ce174 source because assembly does not yet contain the reader; later compose normally after AGR integration. No project-specific adapter, weakened authority or automatic external effects.

## Scope

- In scope: Repair the generic dual-provenance scope-replan reader: accept valid native operator plan:sha256: proposal receipts as well as existing result:sha256: semantic proposals, authenticating exact retained command, plan, event, task revision, grant and lineage. Reproduce the real 65K8GW revision22 failure read-only and in isolated regression fixtures; never mutate that consumer or fabricate receipt/history. Preserve rejected missing, forged, ambiguous, cross-task or stale proposal evidence. Use exact reviewed AGR ce174 source because assembly does not yet contain the reader; later compose normally after AGR integration. No project-specific adapter, weakened authority or automatic external effects.
- Out of scope: unrelated refactors not required for "Authenticate native operator plan receipts in prospective scope rework".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T07:46:13.985Z
- Branch: task/202610110732-R22S97/operator-scope-replan
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/kernel-scope-replan-inputs.ts    |  16 ++-
 .../src/commands/task/kernel-scope-request.test.ts |  40 ++++++-
 .../tasks/task-kernel/replan-work-items.test.ts    | 127 ++++++++++++++++++++-
 .../src/tasks/task-kernel/replan-work-items.ts     |   3 +-
 4 files changed, 174 insertions(+), 12 deletions(-)
```

</details>
