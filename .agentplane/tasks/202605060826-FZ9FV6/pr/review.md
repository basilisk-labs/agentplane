# PR Review

Created: 2026-05-06T08:37:30.269Z

## Task

- Task: `202605060826-FZ9FV6`
- Title: Add trusted project-local blueprint config
- Status: DOING
- Branch: `task/202605060826-FZ9FV6/trusted-local-blueprints`
- Canonical task record: `.agentplane/tasks/202605060826-FZ9FV6/README.md`

## Verification

- State: ok
- Note: Trusted project-local blueprint config implemented and validated.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T08:37:30.269Z
- Branch: task/202605060826-FZ9FV6/trusted-local-blueprints
- Head: eb898d64fdf6

```text
 .agentplane/tasks/202605060826-0GB6WB/README.md    |  78 +++++++
 .agentplane/tasks/202605060826-97XHD3/README.md    |  78 +++++++
 .agentplane/tasks/202605060826-VY5AKF/README.md    |  77 +++++++
 docs/developer/blueprints.mdx                      |  81 ++++++--
 docs/user/cli-reference.generated.mdx              |   1 +
 packages/agentplane/src/blueprints/index.ts        |   8 +
 .../agentplane/src/blueprints/project-local.ts     | 228 ++++++++++++++++++++-
 packages/agentplane/src/blueprints/resolve.ts      |   4 +
 .../src/cli/run-cli.core.blueprint.test.ts         | 110 ++++++++++
 .../src/commands/blueprint/blueprint.command.ts    |  86 ++++++--
 .../agentplane/src/commands/doctor/blueprints.ts   |  25 ++-
 11 files changed, 734 insertions(+), 42 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
