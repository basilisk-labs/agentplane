Task: `202609201952-ZW7H9X`
Title: LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary
Canonical task record: `.agentplane/tasks/202609201952-ZW7H9X/README.md`

## Summary

LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary

Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.

## Scope

- In scope: Implement only roadmap LC-01 on the published v0.7.10 baseline. Audit the live source first. Record a symbol-level ownership map for state mutation, scheduling, admission, completion, and effects. Preserve all hosted, recovery, context, authority, and effect guarantees. Do not retain or add a competing reducer, kernel-specific outer loop, or third coordinator. Acceptance: each frozen case has one Kernel command/event path, one canonical writer, and one effect owner; every production entrypoint and retained pure helper is mapped; any missing guarantee is reported as a concrete blocker.
- Out of scope: unrelated refactors not required for "LC-01: establish Task Kernel as the sole domain reducer with one application coordinator boundary".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T21:27:13.605Z
- Branch: task/202609201952-ZW7H9X/canonical-zw7h9x
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/checks/lifecycle-owner-map.json     | 330 ++++++++++++++++++++++++++++
 scripts/checks/lifecycle-owner-map.test.mjs | 211 ++++++++++++++++++
 2 files changed, 541 insertions(+)
```

</details>
