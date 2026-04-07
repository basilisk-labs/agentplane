## Summary

Skip broad pre-commit test-fast for artifact-only and docs-only staged changes

Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.

## Scope

- In scope: Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.
- Out of scope: unrelated refactors not required for "Skip broad pre-commit test-fast for artifact-only and docs-only staged changes".

## Verification

### Plan

1. Run focused tests for the staged-file selection or pre-commit decision path on an artifact-only or docs-only staged set. Expected: broad test-fast is skipped and the hook reports the skip reason.
2. Run focused tests for a code-bearing staged set. Expected: the hook still selects the broad test path instead of skipping it.
3. Run eslint on the touched hook or selection files and any new tests. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Focused vitest and eslint passed; pre-commit checks and narrowed test-fast gate passed on final HEAD 3977423a.

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

- Updated: 2026-04-07T05:11:56.708Z
- Branch: task/202604070443-T8F4ZZ/pre-commit-artifact-fast-path
- Head: 3977423a8d6f

```text
No changes detected.
```

</details>
