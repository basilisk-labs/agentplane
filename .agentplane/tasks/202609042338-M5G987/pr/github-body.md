Task: `202609042338-M5G987`
Title: Repair atomic scope extension projection and accepted-result recovery
Canonical task record: `.agentplane/tasks/202609042338-M5G987/README.md`

## Summary

Repair atomic scope extension projection and accepted-result recovery

Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.

## Scope

- In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
- Out of scope: unrelated refactors not required for "Repair atomic scope extension projection and accepted-result recovery".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-05T00:35:18.474Z
- Branch: task/202609042338-M5G987/repair-atomic-scope-extension-projection-and-acc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
