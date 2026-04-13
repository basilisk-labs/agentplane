# PR Review

Created: 2026-04-13T07:55:31.342Z
Branch: task/202604130750-E2J835/release-apply-branch-pr-safe

## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass on commit 209c5644f91c107a503f5c5e69b4410651dfa592. Evidence: 12/12 tests passed, including branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: committed release apply routing/reporting/tests for protected-main publication.

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

- Updated: 2026-04-13T08:10:24.546Z
- Branch: task/202604130750-E2J835/release-apply-branch-pr-safe
- Head: 209c5644f91c

```text
 .agentplane/tasks/202604130750-E2J835/README.md    | 120 +++++++++++++
 .../tasks/202604130750-E2J835/pr/diffstat.txt      |   0
 .../tasks/202604130750-E2J835/pr/github-body.md    |  50 ++++++
 .../tasks/202604130750-E2J835/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604130750-E2J835/pr/meta.json |  14 ++
 .../tasks/202604130750-E2J835/pr/notes.jsonl       |   0
 .agentplane/tasks/202604130750-E2J835/pr/review.md |  57 +++++++
 .../tasks/202604130750-E2J835/pr/verify.log        |   0
 .../src/commands/release/apply.command.ts          | 151 +++++++++++++++--
 .../src/commands/release/apply.reporting.ts        |  26 ++-
 .../agentplane/src/commands/release/apply.test.ts  | 187 +++++++++++++++++++++
 .../agentplane/src/commands/release/apply.types.ts |  12 +-
 12 files changed, 595 insertions(+), 23 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
