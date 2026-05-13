# PR Review

Created: 2026-05-13T16:36:18.870Z

## Task

- Task: `202605131635-W0735P`
- Title: Align branch_pr command order guidance
- Status: DOING
- Branch: `task/202605131635-W0735P/command-order-guidance`
- Canonical task record: `.agentplane/tasks/202605131635-W0735P/README.md`

## Verification

- State: ok
- Note: Fixed pre-push lint blockers in lifecycle parity additions: typed PR-open assertions, explicit index check, and ESLint TS project coverage for scripts/**/*.ts. Rechecked lint:core, workflows:command-check, focused lifecycle Vitest, and typecheck.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:39:15.792Z
- Branch: task/202605131635-W0735P/command-order-guidance
- Head: 0a1ca86a4f8d

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  10 +-
 docs/user/branching-and-pr-artifacts.mdx           |   9 +-
 docs/user/commands.mdx                             |  16 +-
 docs/user/task-lifecycle.mdx                       |  28 +-
 docs/user/workflow.mdx                             |   9 +-
 docs/workflow-guides/branch-pr.mdx                 |   3 +-
 package.json                                       |   4 +-
 packages/agentplane/assets/AGENTS.md               |   8 +-
 .../agentplane/src/blueprints/builtin-routes.ts    |  55 +--
 packages/agentplane/src/blueprints/builtins.ts     |  27 +-
 .../agentplane/src/blueprints/validate.test.ts     |   8 +
 packages/agentplane/src/cli/command-guide.test.ts  |   1 +
 packages/agentplane/src/cli/command-guide.ts       |   1 +
 .../src/shared/builtin-assets.generated.ts         |   6 +-
 .../src/workflow-lifecycle/contract.test.ts        |  39 ++
 .../agentplane/src/workflow-lifecycle/contract.ts  | 275 +++++++++++
 .../src/workflow-lifecycle/parity-check.test.ts    |  55 +++
 .../src/workflow-lifecycle/parity-check.ts         | 207 ++++++++
 scripts/README.md                                  |   4 +-
 scripts/checks/check-lifecycle-parity.ts           |  14 +
 21 files changed, 1202 insertions(+), 104 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
