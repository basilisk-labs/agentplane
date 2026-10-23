Task: `202610222233-X2FBX2`
Title: Reject malformed persisted operational projections for PR #6158
Canonical task record: `.agentplane/tasks/202610222233-X2FBX2/README.md`

## Summary

Reject malformed persisted operational projections for PR #6158

P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.

## Scope

- In scope: P2 repair for PR #6158 at exact head 8bd75d62ca7cc8fe1c7bd020d6514315d5600b7e. A persisted kernel operational projection with missing or wrong-type required fields can recompute its digest and still match a normalized review, causing recovery to return unchanged. Validate the complete persisted projection shape before accepting it. Add negative tests for missing and wrong-type fields and repeated recovery. Preserve failed A3NC2N native history; use its named frozen branch as base. No Factory-specific behavior or broader source changes.
- Out of scope: unrelated refactors not required for "Reject malformed persisted operational projections for PR #6158".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-22T22:42:45.320Z
- Branch: task/202610222233-X2FBX2/reject-malformed-persisted-operational-projectio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../kernel-operational-projection-recovery.test.ts | 31 +++++++++++++++++++
 .../task/kernel-operational-projection.test.ts     | 36 ++++++++++++++++++++++
 .../commands/task/kernel-operational-projection.ts | 29 +++++++++++++++--
 3 files changed, 94 insertions(+), 2 deletions(-)
```

</details>
