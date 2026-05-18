# PR Review

Created: 2026-05-18T11:30:53.872Z

## Task

- Task: `202605181130-ECS6JB`
- Title: Install context policy module during context init
- Status: DOING
- Branch: `task/202605181130-ECS6JB/context-policy-module`
- Canonical task record: `.agentplane/tasks/202605181130-ECS6JB/README.md`

## Verification

- State: ok
- Note: Implemented context.must policy module and wired it into generated AGENTS load rules for context work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed; eslint target passed; prettier check passed; repo-local clean temp context init installs context.must and context check passes.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T11:42:54.707Z
- Branch: task/202605181130-ECS6JB/context-policy-module
- Head: d141963b8027

```text
 .agentplane/policy/context.must.md                 |  67 +++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 packages/agentplane/assets/AGENTS.md               |   6 +-
 packages/agentplane/assets/policy/context.must.md  |  67 +++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  11 +
 .../src/shared/builtin-assets.generated.ts         |  16 +-
 6 files changed, 689 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
