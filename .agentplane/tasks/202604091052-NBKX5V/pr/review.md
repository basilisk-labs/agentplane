# PR Review

Created: 2026-04-09T11:00:58.818Z
Branch: task/202604091052-NBKX5V/incident-locality-ux

## Summary

Explain branch_pr incident collection locality and promotion requirements

Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.

## Scope

- In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
- Out of scope: unrelated workflow refactors or changes to the incident registry data model.

## Verification

### Plan

1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: focused findings/incidents/branch_pr verify tests passed, including the new branch_pr locality case, and eslint exited 0 after narrowing generic messages to current checkout while keeping branch_pr-specific guidance in verify. Scope: incident promotion UX, findings add messaging, branch_pr verify locality explanation.

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

- Updated: 2026-04-09T11:08:29.684Z
- Branch: task/202604091052-NBKX5V/incident-locality-ux
- Head: b5a20bc8804f

```text
 .agentplane/tasks/202604091052-8TZCF0/README.md    |  86 +++++++++++++++
 .agentplane/tasks/202604091052-NBKX5V/README.md    | 119 +++++++++++++++++++++
 .../tasks/202604091052-NBKX5V/pr/diffstat.txt      |   0
 .../tasks/202604091052-NBKX5V/pr/github-body.md    |  50 +++++++++
 .../tasks/202604091052-NBKX5V/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091052-NBKX5V/pr/meta.json |  14 +++
 .../tasks/202604091052-NBKX5V/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091052-NBKX5V/pr/review.md |  57 ++++++++++
 .../tasks/202604091052-NBKX5V/pr/verify.log        |   0
 .../src/cli/run-cli.core.tasks.findings.test.ts    |   1 +
 .../agentplane/src/commands/incidents/shared.ts    |   4 +-
 packages/agentplane/src/commands/task/findings.ts  |   4 +-
 .../agentplane/src/commands/task/verify-record.ts  |   8 ++
 13 files changed, 340 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
