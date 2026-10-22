Task: `202610160508-9N195W`
Title: Authenticate final historical plan amendment for unchanged blocked-item recovery
Canonical task record: `.agentplane/tasks/202610160508-9N195W/README.md`

## Summary

Authenticate final historical plan amendment for unchanged blocked-item recovery

Replacement of held child 202610160459-20WNVX, which was created from an internal checkout and is not consumed. Preserve its history and completed parent 202610120014-1C3ZFG. Frozen PR6147 head d54af9b1a697e5fc4f9d3fa5f7561aa3b4cfc79f. Fix only the remaining review finding: final USER plan_amended endpoint must authenticate through genuine command/event/receipt and authority lineage when the blocked target definition is unchanged. Preserve approved-plan and intermediate-amendment recovery, exact task/claim/attempt/source and stop ordering. Require genuine positive regression and missing, duplicate, forged, cross-plan and changed-target negatives. Quota issue6151 is already fixed by merged PR6154 on main52bd; do not duplicate it. Parent main composition/conflicts/PR publication are separately reviewed operator work. No implementation or full checks before approved plan and genuine EXEC.

## Scope

- In scope: Replacement of held child 202610160459-20WNVX, which was created from an internal checkout and is not consumed. Preserve its history and completed parent 202610120014-1C3ZFG. Frozen PR6147 head d54af9b1a697e5fc4f9d3fa5f7561aa3b4cfc79f. Fix only the remaining review finding: final USER plan_amended endpoint must authenticate through genuine command/event/receipt and authority lineage when the blocked target definition is unchanged. Preserve approved-plan and intermediate-amendment recovery, exact task/claim/attempt/source and stop ordering. Require genuine positive regression and missing, duplicate, forged, cross-plan and changed-target negatives. Quota issue6151 is already fixed by merged PR6154 on main52bd; do not duplicate it. Parent main composition/conflicts/PR publication are separately reviewed operator work. No implementation or full checks before approved plan and genuine EXEC.
- Out of scope: unrelated refactors not required for "Authenticate final historical plan amendment for unchanged blocked-item recovery".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-16T05:21:09.346Z
- Branch: task/202610160508-9N195W/final-amendment-proof
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/kernel-recovery-evidence.test.ts | 65 +++++++++++-----------
 .../src/commands/task/kernel-recovery-evidence.ts  | 14 +++--
 2 files changed, 43 insertions(+), 36 deletions(-)
```

</details>
