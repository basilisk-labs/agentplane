## Summary

Make protected-main integrate a first-class handoff route

Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.

## Scope

- In scope: Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.
- Out of scope: unrelated refactors not required for "Make protected-main integrate a first-class handoff route".

## Verification

- State: ok
- Note: Protected-base integrate now persists a first-class route block and structured next-action diagnostics; schema/runtime validator, integrate cmd unit route, and live protected-main refusal regression all pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T19:58:14.485Z
- Branch: task/202604151957-ZB7XP1/protected-main-integrate-route
- Head: b6a5355d60ff

```text
No changes detected.
```

</details>
