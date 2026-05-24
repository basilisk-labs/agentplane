Task: `202605240708-K9R164`
Title: Fix recent branch_pr issue candidates
Canonical task record: `.agentplane/tasks/202605240708-K9R164/README.md`

## Summary

Fix recent branch_pr issue candidates

Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.

## Scope

- In scope: Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.
- Out of scope: unrelated refactors not required for "Fix recent branch_pr issue candidates".

## Verification

- State: ok
- Note:

```text
Verified: Quality gate rerun after moving regression tests out of oversized files. Command: bun run
hotspots:check; Result: pass; Evidence: oversized test baseline OK with 11 entries and 12568 total
lines. Command: git diff --stat HEAD; Result: pass; Evidence: runtime changes unchanged; regression
tests now live in non-oversized target files. Scope: CI failure recovery for PR #4127.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T07:11:46.100Z
- Branch: task/202605240708-K9R164/fix-recent-branch-pr-issue-candidates
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/EVALUATOR.json                  |  12 +-
 .agentplane/evaluators/recovery-context.md         |   8 +-
 .agentplane/tasks/202605232011-MAW1PK/README.md    | 197 +++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../tasks/202605232011-MAW1PK/pr/diffstat.txt      |  13 +
 .../tasks/202605232011-MAW1PK/pr/github-body.md    |  51 ++
 .../tasks/202605232011-MAW1PK/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605232011-MAW1PK/pr/meta.json |  20 +
 .agentplane/tasks/202605232011-MAW1PK/pr/review.md |  48 ++
 .../evaluator-opinion.md                           |  28 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  36 ++
 docs/user/cli-reference.generated.mdx              |  32 ++
 docs/user/commands.mdx                             |  14 +-
 packages/agentplane/assets/AGENTS.md               |   3 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |  12 +-
 .../assets/evaluators/recovery-context.md          |   8 +-
 .../backends/task-backend.local-handoff.test.ts    |  56 ++
 .../backends/task-backend/local-backend-read.ts    |  16 +-
 packages/agentplane/src/blueprints/builtins.ts     |   2 +-
 .../agentplane/src/blueprints/validate.test.ts     |   2 +-
 .../src/cli/release-critical-lifecycle.test.ts     |  14 +-
 .../run-cli.core.pr-flow.pr-open.artifacts.test.ts | 101 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../evaluator/evaluator-run.command.test.ts        | 142 +++++
 .../src/commands/evaluator/evaluator.command.ts    | 333 +++++++++++-
 .../src/commands/evaluator/evaluator.spec.ts       | 140 ++++-
 .../src/commands/pr/integrate/cmd.test.ts          |  84 +++
 .../pr/integrate/internal/github-pr-merge.ts       |  49 +-
 .../commands/pr/integrate/internal/prepare.test.ts |   7 +-
 .../src/commands/pr/internal/auto-commit.ts        |  48 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   4 +-
 .../src/commands/task/finish.state.unit.test.ts    |   4 +-
 .../commands/task/finish.validation.unit.test.ts   |   7 +-
 .../src/commands/task/quality-review-gate.ts       |  30 +-
 .../commands/task/quality-review-gate.unit.test.ts |  55 +-
 packages/agentplane/src/commands/workflow.test.ts  |  30 +-
 .../src/commands/workflow.verify-hooks.test.ts     |  30 +-
 packages/agentplane/src/context/ingest-task.ts     |   2 +-
 .../agentplane/src/workflow-lifecycle/contract.ts  |  16 +-
 packages/testkit/src/cli-harness.ts                |  15 +
 41 files changed, 2220 insertions(+), 98 deletions(-)
```

</details>
