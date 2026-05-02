# PR Review

Created: 2026-05-02T22:20:39.345Z
Branch: task/202605022153-93GVV1/git-message-format

## Summary

Unify git commit and PR message format

Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.

## Scope

- In scope: Fix commit and PR message generators for single canonical format in local and branch_pr modes with emoji by change type, task suffix and task context.
- Out of scope: unrelated refactors not required for "Unify git commit and PR message format".

## Verification

### Plan

1. Review the requested outcome for "Unify git commit and PR message format". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Command: agentplane task verify-show 202605022153-93GVV1; Result: pass; Evidence: verify checklist displayed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 23 tests passed. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Command: agentplane preflight --json; Result: pass with expected dirty-worktree/task-artifact warnings; Evidence: message_format_guard ok.

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

- Updated: 2026-05-02T22:26:31.321Z
- Branch: task/202605022153-93GVV1/git-message-format
- Head: f6ab081f9613

```text
 docs/recipes-inventory.json                        |  2 +-
 .../cli/prepare-hosted-task-closure-script.test.ts |  4 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts | 40 +++++++++++++++
 .../cli/run-cli.core.task-hosted-close-pr.test.ts  |  4 +-
 .../cli/run-cli/commands/core/preflight-render.ts  |  1 +
 .../cli/run-cli/commands/core/preflight-report.ts  | 60 ++++++++++++++++++++++
 .../commands/pr/integrate/internal/merge.test.ts   | 22 ++------
 .../src/commands/pr/integrate/internal/merge.ts    | 28 ++++------
 .../commands/pr/internal/pr-artifact-snapshot.ts   |  8 ++-
 .../commands/pr/internal/review-template.test.ts   | 56 ++++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    | 43 +++++++++++++++-
 .../src/commands/task/hosted-close-pr.execute.ts   |  5 +-
 scripts/prepare-hosted-task-closure.mjs            |  7 ++-
 13 files changed, 235 insertions(+), 45 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
