## Summary

AP-13: Split task query prepare tests

Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.

## Scope

- In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
- Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".

## Verification

- State: ok
- Note: Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T11:26:23.732Z
- Branch: task/202605010645-JH4RV4/task-query-prepare-test-split
- Head: ce762aa1008a

```text
No changes detected.
```

</details>
