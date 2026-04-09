## Summary

Infer default branch_pr base when pin is absent

Let branch_pr base resolution fall back to the repository default branch so finish and related base-only commands remain runnable in fresh or isolated checkouts where agentplane.baseBranch has not been pinned yet.

## Scope

- In scope: Let branch_pr base resolution fall back to the repository default branch so finish and related base-only commands remain runnable in fresh or isolated checkouts where agentplane.baseBranch has not been pinned yet.
- Out of scope: unrelated refactors not required for "Infer default branch_pr base when pin is absent".

## Verification

### Plan

1. Reproduce branch_pr base resolution in a fresh checkout on main with no pinned base branch. Expected: finish and other base-only commands can still resolve the effective base. 2. Run focused tests for base branch resolution and branch_pr finish gating. Expected: explicit pins still win, but the repository default branch covers fresh-checkout cases. 3. Verify no direct-mode behavior regresses while branch_pr fresh-checkout closure stays runnable.

### Current Status

- State: ok
- Note: Command: bun x prettier --check packages/core/src/git/base-branch.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts
Result: pass
Evidence: prettier matched after formatting the new regression tests.
Scope: base-branch fallback and lifecycle regression fixtures.

Command: bun x eslint packages/core/src/git/base-branch.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts
Result: pass
Evidence: eslint exited 0 for the touched base-branch and lifecycle files.
Scope: branch_pr base resolution fallback implementation and tests.

Command: bun x vitest run packages/core/src/git/base-branch.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts
Result: pass
Evidence: 38/38 tests passed, including fresh-checkout finish on main without branch base pin when origin HEAD resolves main.
Scope: core base resolution and branch_pr finish gating.

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

- Updated: 2026-04-09T15:44:50.112Z
- Branch: task/202604091534-H5N1BV/base-branch-fallback
- Head: c0499bff93a3

```text
No changes detected.
```

</details>
