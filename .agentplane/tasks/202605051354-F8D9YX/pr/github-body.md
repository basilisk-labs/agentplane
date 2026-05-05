Task: `202605051354-F8D9YX`
Title: Fix upgrade commit for legacy config removal

## Summary

Fix upgrade commit for legacy config removal

Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.

## Scope

- In scope: Ensure auto upgrade commits the removal of tracked legacy .agentplane/config.json when migrating repositories to WORKFLOW.md-only state, leaving a clean tracked tree after the upgrade commit.
- Out of scope: unrelated refactors not required for "Fix upgrade commit for legacy config removal".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade commits tracked legacy config removal'. Result: pass. Evidence: 1 test passed, 12 skipped; regression verifies tracked legacy config deletion is committed and tree is clean. Scope: upgrade migration from config.json to WORKFLOW.md. Command: bunx eslint packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: no lint output. Scope: touched implementation and test files. Command: bun run --filter=@agentplaneorg/recipes build && bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Evidence: typecheck completed after building recipe declarations. Scope: agentplane package type surface. Command: node .agentplane/policy/check-routing.mjs && git diff --check && bun run framework:dev:bootstrap && ./.agentplane/bin/agentplane doctor. Result: pass. Evidence: policy routing OK; diff whitespace clean; repo-local runtime ready; doctor OK. Scope: policy/runtime integration.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
