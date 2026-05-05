# PR Review

Created: 2026-05-05T13:54:34.142Z
Branch: task/202605051354-F8D9YX/legacy-config-upgrade-commit

## Summary

Fix upgrade commit for legacy config removal

Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.

## Scope

- In scope: Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.
- Out of scope: unrelated refactors not required for "Fix upgrade commit for legacy config removal".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration.

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

- Updated: 2026-05-05T13:58:55.335Z
- Branch: task/202605051354-F8D9YX/legacy-config-upgrade-commit
- Head: cf196ded4301

```text
 .../src/cli/run-cli.core.upgrade.test.ts           | 51 ++++++++++++++++++++++
 packages/agentplane/src/commands/upgrade.ts        | 17 ++++++++
 2 files changed, 68 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
