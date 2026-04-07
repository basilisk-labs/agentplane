# PR Review

Created: 2026-04-07T00:36:58.078Z
Branch: task/202604062308-KMTE4J/incident-promotion-diagnostics

## Summary

Explain incident promotion no-op when findings are not promotable

Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.

## Scope

- In scope: Make lifecycle and incidents commands explain why incidents.md stays unchanged when Findings contain no promotable external incident candidates, so operators can distinguish no-op, bad markers, and real write failures.
- Out of scope: unrelated refactors not required for "Explain incident promotion no-op when findings are not promotable".

## Verification

### Plan

1. Run focused CLI/runtime tests for incident collection and lifecycle output. Expected: when Findings lack promotable external incident candidates, commands explain why the registry stayed unchanged instead of only printing a generic no-op.
2. Run a targeted command-path reproduction with a task README that has plain Findings but no `Fixability: external` or `IncidentExternal`. Expected: the operator-facing output distinguishes missing promotable markers from a write failure.
3. Run eslint on the touched incidents/lifecycle source and tests. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Added explicit no-op diagnostics when Findings has plain text but no structured incident blocks; focused vitest passed (resolve, incidents CLI, finish, integrate finalize) and eslint passed on all touched files.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T00:41:18.784Z
- Branch: task/202604062308-KMTE4J/incident-promotion-diagnostics
- Head: 9080e45e62f8

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
