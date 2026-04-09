# PR Review

Created: 2026-04-09T15:07:25.340Z
Branch: task/202604091444-NS0RG8/repair-legacy-lefthook

## Summary

Repair legacy lefthook installs during framework bootstrap

Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.

## Scope

- In scope: Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.
- Out of scope: unrelated refactors not required for "Repair legacy lefthook installs during framework bootstrap".

## Verification

### Plan

1. Reproduce a checkout with legacy lefthook-generated git hooks. Expected: the improved bootstrap or hook repair path detects and replaces them with agentplane-managed hooks. 2. Run focused hook/bootstrap tests. Expected: fresh worktrees end with deterministic managed hooks instead of external lefthook shims. 3. Run relevant lint/tests. Expected: hook install and bootstrap flows remain valid for existing managed-checkout users.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: 7/7 tests passed, including legacy lefthook repair coverage.
Scope: framework bootstrap and hook repair flow.

Command: bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: bootstrap script and regression tests.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: core + agentplane builds completed, legacy hooks repaired, and runtime explain reported repo-local runtime ready.
Scope: end-to-end bootstrap behavior in a framework worktree.

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

- Updated: 2026-04-09T15:09:00.074Z
- Branch: task/202604091444-NS0RG8/repair-legacy-lefthook
- Head: 437bd1e0099a

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
