## Summary

Enable exact-sha release recovery and block skipped patch planning

Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.

## Scope

- In scope: Add Core CI workflow_dispatch support for exact release SHA recovery, make release-ready available for recovery runs, and make release planning stop when unpublished patch versions exist instead of skipping ahead.
- Out of scope: unrelated refactors not required for "Enable exact-sha release recovery and block skipped patch planning".

## Verification

- State: ok
- Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/plan.test.ts; bun run framework:dev:bootstrap; agentplane doctor. Result: pass. Evidence: 5 targeted tests passed, framework bootstrap rebuilt repo-local runtime, doctor returned OK. Scope: .github/workflows/ci.yml, release planner guard, release workflow documentation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T07:00:56.698Z
- Branch: task/202604150649-7N1Q4J/exact-sha-release-recovery
- Head: e10800464e2b

```text
No changes detected.
```

</details>
