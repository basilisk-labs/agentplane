## Summary

Explain internal Findings vs incidents registry promotion

When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.

## Scope

- In scope: When Findings contains plain text, incidents collect and close-path diagnostics should explicitly distinguish internal follow-up defects from reusable external incident candidates so operators do not expect incidents.md updates from task-local code bugs.
- Out of scope: unrelated refactors not required for "Explain internal Findings vs incidents registry promotion".

## Verification

### Plan

1. Run the targeted incidents and findings vitest coverage for resolve, finish, and run-cli incidents/findings flows; expected: all pass. 2. Review the changed CLI and guide messages; expected: they explicitly distinguish task-local Findings from reusable incidents registry promotion. 3. Confirm no behavior change in incidents promotion semantics; expected: incidents.md is updated only by structured reusable incident candidates, not by plain Findings text.

### Current Status

- State: ok
- Note: Verified targeted incidents and command-guide coverage; messaging now distinguishes plain task-local Findings from structured external incident promotion without changing promotion semantics.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T01:00:59.289Z
- Branch: task/202604072309-R3SG76/incidents-findings-boundary
- Head: f40d5aa39527

```text
No changes detected.
```

</details>
