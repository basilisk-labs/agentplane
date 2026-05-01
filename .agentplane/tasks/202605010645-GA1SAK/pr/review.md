# PR Review

Created: 2026-05-01T11:02:36.968Z
Branch: task/202605010645-GA1SAK/pr-open-flow-test-split

## Summary

AP-12: Split PR open flow tests

Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.

## Scope

- In scope: Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.
- Out of scope: unrelated refactors not required for "AP-12: Split PR open flow tests".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green.

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

- Updated: 2026-05-01T11:18:41.474Z
- Branch: task/202605010645-GA1SAK/pr-open-flow-test-split
- Head: bcbc33fefad1

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |  15 +-
 .../run-cli.core.pr-flow.pr-open.artifacts.test.ts | 213 ++++++++
 ...ts => run-cli.core.pr-flow.pr-open.git.test.ts} | 548 +--------------------
 .../run-cli.core.pr-flow.pr-open.network.test.ts   | 351 +++++++++++++
 ...run-cli.core.pr-flow.pr-open.validation.test.ts | 173 +++++++
 scripts/oversized-test-baseline.json               |   8 +-
 6 files changed, 752 insertions(+), 556 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
