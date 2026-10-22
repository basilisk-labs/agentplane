Task: `202610102040-FCFE5R`
Title: Authenticate retained issuance across repeated approved scope replans
Canonical task record: `.agentplane/tasks/202610102040-FCFE5R/README.md`

## Summary

Authenticate retained issuance across repeated approved scope replans

Repair the generic retained issuance proof failure after two successive genuine prospective scope amendments. Actual retained evidence is HY7B36-second-scope-diagnostic.json: the second Plan was accepted and attempt3 began, but packet construction rejects the preceding valid stop because retainedIssuanceAuthority selects an authority_continued event from the earlier Plan epoch. Authenticate issuance within its own approved Plan epoch using the real native approval receipt. Preserve exact delegation digest, repository fingerprint, task/plan/claim/attempt and all historical receipts. Test two successive genuine amendments plus forged, missing and cross-plan proof negatives. Do not replay the consumed HY Plan, mutate consumer canonical state, waive authentication, add consumer-specific behavior or change lifecycle ownership. Limit implementation to kernel-rework-lineage.ts and kernel-scope-request.test.ts; return a bounded native plan for independent review first.

## Scope

- In scope: Repair the generic retained issuance proof failure after two successive genuine prospective scope amendments. Actual retained evidence is HY7B36-second-scope-diagnostic.json: the second Plan was accepted and attempt3 began, but packet construction rejects the preceding valid stop because retainedIssuanceAuthority selects an authority_continued event from the earlier Plan epoch. Authenticate issuance within its own approved Plan epoch using the real native approval receipt. Preserve exact delegation digest, repository fingerprint, task/plan/claim/attempt and all historical receipts. Test two successive genuine amendments plus forged, missing and cross-plan proof negatives. Do not replay the consumed HY Plan, mutate consumer canonical state, waive authentication, add consumer-specific behavior or change lifecycle ownership. Limit implementation to kernel-rework-lineage.ts and kernel-scope-request.test.ts; return a bounded native plan for independent review first.
- Out of scope: unrelated refactors not required for "Authenticate retained issuance across repeated approved scope replans".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T21:10:37.020Z
- Branch: task/202610102040-FCFE5R/retained-scope-issuance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-rework-lineage.ts     | 74 +++++++++++++++--
 .../src/commands/task/kernel-scope-request.test.ts | 92 ++++++++++++++++++++++
 2 files changed, 161 insertions(+), 5 deletions(-)
```

</details>
