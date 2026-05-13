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
- Note: Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:52:21.004Z
- Branch: task/202605131635-W0735P/command-order-guidance
- Head: fee1648ddde0

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |   4 +-
 docs/user/branching-and-pr-artifacts.mdx           |   9 +-
 docs/user/commands.mdx                             |  16 +-
 docs/user/task-lifecycle.mdx                       |  28 +-
 docs/user/workflow.mdx                             |   9 +-
 docs/workflow-guides/branch-pr.mdx                 |   3 +-
 packages/agentplane/assets/AGENTS.md               |   8 +-
 .../agentplane/src/blueprints/builtin-routes.ts    |   2 +-
 packages/agentplane/src/blueprints/builtins.ts     |   1 +
 .../agentplane/src/blueprints/validate.test.ts     |   8 +
 packages/agentplane/src/cli/command-guide.test.ts  |   1 +
 packages/agentplane/src/cli/command-guide.ts       |   1 +
 .../src/shared/builtin-assets.generated.ts         |   6 +-
 14 files changed, 583 insertions(+), 40 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
