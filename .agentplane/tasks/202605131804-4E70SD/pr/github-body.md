Task: `202605131804-4E70SD`
Title: Add phase-aware policy engine
Canonical task record: `.agentplane/tasks/202605131804-4E70SD/README.md`

## Summary

Add phase-aware policy engine

Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.

## Scope

- In scope: Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.
- Out of scope: unrelated refactors not required for "Add phase-aware policy engine".

## Verification

- State: ok
- Note: Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:09:21.608Z
- Branch: task/202605131804-4E70SD/phase-aware-policy
- Head: 707ddf167b73

```text
No changes detected.
```

</details>
