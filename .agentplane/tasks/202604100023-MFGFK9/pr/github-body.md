## Summary

Expose task artifact drift in preflight when tracked status looks clean

Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.

## Scope

- In scope: Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
- Out of scope: unrelated refactors not required for "Expose task artifact drift in preflight when tracked status looks clean".

## Verification

### Plan

1. Create or simulate untracked task-artifact files under .agentplane/tasks for a different task id and run `agentplane preflight --json --mode quick`. Expected: the JSON report surfaces task artifact drift explicitly, including the affected task ids or paths.
2. Run `agentplane preflight` in text mode under the same drift scenario. Expected: the human-readable output points to the task artifact drift and recommends `git status --short --untracked-files=all -- .agentplane/tasks`.
3. Run the targeted CLI test file(s) covering preflight readiness. Expected: the new drift case and the clean case both pass without regressions.

### Current Status

- State: ok
- Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts and bun x eslint packages/agentplane/src/cli/run-cli/commands/core/preflight.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passed; preflight now surfaces task artifact drift explicitly while preserving tracked-only clean semantics.

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

- Updated: 2026-04-10T00:27:58.173Z
- Branch: task/202604100023-MFGFK9/preflight-task-drift
- Head: d7188b41dcff

```text
No changes detected.
```

</details>
