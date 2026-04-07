## Summary

Add first-class command to append structured Findings incident candidates

Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.

## Scope

- In scope: Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.
- Out of scope: unrelated refactors not required for "Add first-class command to append structured Findings incident candidates".

## Verification

### Plan

1. Run a focused CLI test that appends a structured Findings block to a v3 task. Expected: the task README gains a canonical Observation/Impact/Resolution block in ## Findings without manual full-doc replacement.
2. Run a focused CLI test with optional external incident metadata. Expected: Promotion/Fixability/Incident* fields serialize in a shape that incidents collect can parse directly.
3. Run eslint and the touched task/incident CLI test files. Expected: touched checks pass with no regressions in task doc mutation behavior.

### Current Status

- State: ok
- Note: Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly.

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

- Updated: 2026-04-07T06:32:27.335Z
- Branch: task/202604070608-BBH3YS/findings-append-command
- Head: 5a84fc42e65e

```text
No changes detected.
```

</details>
