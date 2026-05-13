Task: `202605131635-W0735P`
Title: Align branch_pr command order guidance
Canonical task record: `.agentplane/tasks/202605131635-W0735P/README.md`

## Summary

Align branch_pr command order guidance

Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.

## Scope

- In scope: Fix branch_pr command-order drift across gateway docs, quickstart guidance, and blueprint routes; leave cleanup command references out of scope per user request.
- Out of scope: unrelated refactors not required for "Align branch_pr command order guidance".

## Verification

- State: ok
- Note: Command-order guidance aligned and focused checks passed: policy routing OK, doctor OK, focused command-guide/blueprint/policy-routing tests passed, builtin assets fresh, formatting passed, blueprint snapshot current.
- Canonical workflow state lives in the task README.

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
