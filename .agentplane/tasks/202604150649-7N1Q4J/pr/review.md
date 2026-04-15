# PR Review

Created: 2026-04-15T07:00:56.698Z
Branch: task/202604150649-7N1Q4J/exact-sha-release-recovery

## Summary

Enable exact-sha release recovery and block skipped patch planning

Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.

## Scope

- In scope: Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
- Out of scope: unrelated refactors not required for "Enable exact-sha release recovery and block skipped patch planning".

## Verification

### Plan

1. Review the requested outcome for "Enable exact-sha release recovery and block skipped patch planning". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation.

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

- Updated: 2026-04-15T07:00:56.698Z
- Branch: task/202604150649-7N1Q4J/exact-sha-release-recovery
- Head: e10800464e2b

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
