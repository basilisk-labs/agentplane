## Summary

Short-circuit pre-commit after failed checks stage

The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.

## Scope

- In scope: The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.
- Out of scope: unrelated refactors not required for "Short-circuit pre-commit after failed checks stage".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts`. Expected: the pre-commit orchestration proves that a failed checks stage stops the pipeline before `test-fast`.
2. Run `bun x eslint scripts/run-pre-commit-hook.mjs`. Expected: the updated hook orchestration stays lint-clean.
3. Review `lefthook.yml` and the touched script behavior together. Expected: there is a single fail-fast pre-commit path where `test-fast` only runs after successful checks.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: 3 pass, 0 fail covering missing tools, failed prettier short-circuit, and test-fast invocation only after successful checks. Scope: pre-commit orchestration script. Command: bun x eslint scripts/run-pre-commit-hook.mjs packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: no lint errors. Scope: touched script and regression test. Command: review lefthook.yml and run-pre-commit-hook.mjs together; Result: pass; Evidence: pre-commit now exposes a single checks entry and the script invokes test-fast only after checks succeed. Scope: hook orchestration contract.

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

- Updated: 2026-04-07T09:29:57.745Z
- Branch: task/202604070912-5TKNV6/fail-fast-pre-commit
- Head: 498565593001

```text
No changes detected.
```

</details>
