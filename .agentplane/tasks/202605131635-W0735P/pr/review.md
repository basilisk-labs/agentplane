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
- Note: Expanded lifecycle contract work verified: workflow lifecycle parity checker passes in workflows:command-check, focused Vitest passes, typecheck passes, policy routing OK, doctor OK, builtin assets fresh, formatting passed, verify-show current.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:13:09.794Z
- Branch: task/202605131635-W0735P/command-order-guidance
- Head: 347e1d3317f3

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
 scripts/checks/check-lifecycle-parity.ts           |  14 +
 20 files changed, 1200 insertions(+), 102 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
