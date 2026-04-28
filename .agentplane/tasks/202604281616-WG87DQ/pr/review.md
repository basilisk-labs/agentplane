# PR Review

Created: 2026-04-28T16:17:24.671Z
Branch: task/202604281616-WG87DQ/close-verification-reconcile

## Summary

Harden branch_pr close and verification reconciliation

Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.

## Scope

- In scope: Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
- Out of scope: unrelated refactors not required for "Harden branch_pr close and verification reconciliation".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.

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

- Updated: 2026-04-28T16:28:20.464Z
- Branch: task/202604281616-WG87DQ/close-verification-reconcile
- Head: b07c53a21661

```text
 .../cli/run-cli.core.task-hosted-close-pr.test.ts  | 204 ++++++++++++++++++++-
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  31 +++-
 .../src/commands/task/hosted-close-pr.execute.ts   |  31 ++++
 .../src/commands/task/hosted-close-pr.report.ts    |  12 ++
 .../src/commands/task/hosted-close-pr.types.ts     |   6 +
 scripts/wait-remote-pr-checks.mjs                  |  16 +-
 6 files changed, 295 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
