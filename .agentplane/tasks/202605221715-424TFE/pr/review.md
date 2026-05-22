# PR Review

Created: 2026-05-22T17:37:22.403Z

## Task

- Task: `202605221715-424TFE`
- Title: Cache release prepublish proof by tree digest
- Status: DOING
- Branch: `task/202605221715-424TFE/release-pipeline-hardening`
- Canonical task record: `.agentplane/tasks/202605221715-424TFE/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed: PR #4022 has one implementation commit, task worktree pr check passed, local ci:contract/doctor/targeted checks passed, and GitHub hosted checks are green including Core CI, Docs CI, Workflows Lint, CodeQL, PR verification, Release-ready manifest, and test-windows.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T17:39:50.672Z
- Branch: task/202605221715-424TFE/release-pipeline-hardening
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/tasks/202605221715-2Z8PE2/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-2ZJNQP/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-774JMV/README.md    | 140 ++++++++++++++++++++
 .agentplane/tasks/202605221715-A443Q7/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-BXB61C/README.md    | 140 ++++++++++++++++++++
 .agentplane/tasks/202605221715-E6HQJ1/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-FGG4Z3/README.md    | 140 ++++++++++++++++++++
 .agentplane/tasks/202605221715-GNCRV4/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-GPNZAR/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-JNCNXF/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-Q6QT2M/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221715-WTN8N7/README.md    | 140 ++++++++++++++++++++
 .agentplane/tasks/202605221716-ASHJ98/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221716-F9WJYZ/README.md    | 141 +++++++++++++++++++++
 .agentplane/tasks/202605221716-VZQX43/README.md    | 141 +++++++++++++++++++++
 .github/workflows/publish.yml                      |  32 ++++-
 docs/user/cli-reference.generated.mdx              |  12 +-
 package.json                                       |   4 +-
 packages/agentplane/src/commands/pr/check.ts       |   5 +-
 packages/agentplane/src/commands/pr/pr.command.ts  |   1 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  23 +++-
 .../commands/release/apply.preflight.publish.ts    |  69 +++++++++-
 .../release/check-release-parity-script.test.ts    |  27 ++++
 .../release/publish-workflow-contract.test.ts      |  13 ++
 .../release/task-registry-ready-script.test.ts     |  75 +++++++++++
 .../agentplane/src/commands/shared/pr-meta.test.ts |   2 -
 .../src/commands/shared/pr-meta/builders.ts        |   5 +-
 scripts/README.md                                  |  70 +++++-----
 scripts/checks/check-task-state.mjs                |  52 +++++++-
 scripts/checks/run-pre-push-hook.mjs               | 103 ++++++++++++++-
 scripts/lib/release-version-surfaces.mjs           |  24 ++++
 scripts/release/check-task-registry-ready.mjs      |  19 ++-
 scripts/release/manifest.mjs                       |   2 +-
 scripts/release/version-surfaces.json              |   6 +
 35 files changed, 2594 insertions(+), 63 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
