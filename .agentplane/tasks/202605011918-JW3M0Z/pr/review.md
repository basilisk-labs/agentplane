# PR Review

Created: 2026-05-01T19:18:47.834Z
Branch: task/202605011918-JW3M0Z/standardize-pr-titles

## Summary

Standardize release PR titles and messages

Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.

## Scope

- In scope: Make branch_pr and hosted-close PR titles/messages use one readable canonical format before publishing v0.4.1.
- Out of scope: unrelated refactors not required for "Standardize release PR titles and messages".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Passed targeted PR-title, hosted-close, release-evidence, workflow-contract, lint, routing, bootstrap, and doctor checks.

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

- Updated: 2026-05-01T19:25:13.455Z
- Branch: task/202605011918-JW3M0Z/standardize-pr-titles
- Head: 4952e94907c1

```text
 .github/workflows/publish.yml                      |  4 +--
 .../cli/prepare-hosted-task-closure-script.test.ts |  7 +++-
 .../cli/run-cli.core.pr-flow.pr-lifecycle.test.ts  |  2 +-
 .../run-cli.core.pr-flow.pr-open.artifacts.test.ts |  4 +--
 .../cli/run-cli.core.task-hosted-close-pr.test.ts  |  4 +++
 .../src/commands/pr/internal/review-template.ts    | 23 +++----------
 .../release/release-task-evidence-script.test.ts   |  4 ++-
 .../src/commands/task/hosted-close-pr.execute.ts   | 30 ++++++++++++-----
 .../src/commands/task/hosted-close-pr.precheck.ts  |  1 +
 .../src/commands/task/hosted-close-pr.types.ts     |  1 +
 scripts/prepare-hosted-task-closure.mjs            | 39 +++++++++++++++++++---
 scripts/release-task-evidence.mjs                  | 22 ++++++++----
 12 files changed, 94 insertions(+), 47 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
