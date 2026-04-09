# PR Review

Created: 2026-04-09T13:11:17.142Z
Branch: task/202604091257-PJQH29/internal-incident-promotion

## Summary

Allow explicit internal incident findings to promote into incidents.md

Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.

## Scope

- In scope: Extend incidents collection so explicitly marked internal or repository-fixable workflow findings can promote into the shared incidents registry without manual incidents.md edits.
- Out of scope: unrelated refactors not required for "Allow explicit internal incident findings to promote into incidents.md".

## Verification

### Plan

1. Run focused incidents tests for parsing and collection paths. Expected: explicit internal/promoted findings are accepted, while plain local-only findings remain task-local.
2. Run incidents collect/verify regression covering an internal candidate. Expected: incidents registry updates without requiring Fixability: external.
3. Run policy routing and relevant lint/tests. Expected: incidents policy assets and runtime behavior stay aligned.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/run-cli.core.incidents.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/types.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/findings-add.command.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts && node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: incidents tests passed, eslint clean, routing check OK. Scope: repo-fixable incident promotion and incidents policy/runtime alignment.

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

- Updated: 2026-04-09T13:28:56.872Z
- Branch: task/202604091257-PJQH29/internal-incident-promotion
- Head: 9312f3687b8b

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
