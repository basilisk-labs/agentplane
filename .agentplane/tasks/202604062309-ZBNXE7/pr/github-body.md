## Summary

Expose skipped incident findings in lifecycle diagnostics

Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.

## Scope

- In scope: Differentiate no external incidents from structured findings that were parsed but not promotable, and surface that distinction in incidents collection and lifecycle output.
- Out of scope: unrelated refactors not required for "Expose skipped incident findings in lifecycle diagnostics".

## Verification

### Plan

1. Run focused incidents runtime and CLI tests covering parsed-but-not-promotable findings. Expected: the plan distinguishes empty findings from skipped candidates and the new output is asserted.
2. Run eslint on the touched incidents and lifecycle command files. Expected: no lint errors in touched scope.
3. Review lifecycle output for the new diagnostics path. Expected: commands explicitly report skipped structured findings instead of collapsing everything into the same no-op message.

### Current Status

- State: ok
- Note: Focused incidents diagnostics coverage passed after worktree bootstrap: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/runtime/incidents/index.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/collect.command.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts. Result: pass. Evidence: empty incident findings now differ from skipped structured findings, and lifecycle diagnostics surface the distinction without changing promotion semantics.

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

- Updated: 2026-04-06T23:18:14.266Z
- Branch: task/202604062309-ZBNXE7/incident-diagnostics
- Head: 61ce80966f00

```text
No changes detected.
```

</details>
