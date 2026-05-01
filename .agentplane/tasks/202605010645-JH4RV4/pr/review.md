# PR Review

Created: 2026-05-01T11:26:23.732Z
Branch: task/202605010645-JH4RV4/task-query-prepare-test-split

## Summary

AP-13: Split task query prepare tests

Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.

## Scope

- In scope: Reduce the failing task query/prepare oversized test by moving repeated fixtures into testkit task-query helpers.
- Out of scope: unrelated refactors not required for "AP-13: Split task query prepare tests".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: split task run/query tests and oversized guard pass.
2. Run route/inventory checks for the split test files. Expected: routing still includes task query suites in the cli-core route.
3. Run typecheck, lint, formatting/diff checks, bootstrap, doctor, and policy routing. Expected: all pass with no unintended tracked changes.

### Current Status

- State: ok
- Note: Verified split task query prepare tests before merge request. Commands passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000 (6 files, 19 tests, oversized baseline OK); bun run vitest:projects:check; bun run typecheck; bun run lint:core; bun run format:check; git diff --check; bun run policy:routing:check; agentplane doctor; bun run framework:dev:bootstrap. Scope remains test split plus oversized baseline update.

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

- Updated: 2026-05-01T11:39:11.709Z
- Branch: task/202605010645-JH4RV4/task-query-prepare-test-split
- Head: 3167cbe56a76

```text
 ...run-cli.core.tasks.query-run-inspection.test.ts |  371 +++++
 .../run-cli.core.tasks.query-run-prepare.test.ts   | 1521 ++++++++------------
 scripts/oversized-test-baseline.json               |    9 +-
 3 files changed, 960 insertions(+), 941 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
