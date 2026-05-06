Task: `202605060826-FZ9FV6`
Title: Add trusted project-local blueprint config
Canonical task record: `.agentplane/tasks/202605060826-FZ9FV6/README.md`

## Summary

Add trusted project-local blueprint config

Define and validate an opt-in .agentplane/blueprints/config.json trust gate for project-local blueprint selection.

## Scope

- In scope: Define and validate an opt-in .agentplane/blueprints/config.json trust gate for project-local blueprint selection.
- Out of scope: unrelated refactors not required for "Add trusted project-local blueprint config".

## Verification

- State: ok
- Note: Trusted project-local blueprint config implemented and validated.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T08:45:45.560Z
- Branch: task/202605060826-FZ9FV6/trusted-local-blueprints
- Head: c2e2e3325b69

```text
 .agentplane/tasks/202605060826-0GB6WB/README.md    |  78 +++++++
 .agentplane/tasks/202605060826-97XHD3/README.md    |  78 +++++++
 .agentplane/tasks/202605060826-VY5AKF/README.md    |  77 +++++++
 docs/developer/blueprints.mdx                      |  81 +++++--
 docs/user/cli-reference.generated.mdx              |   1 +
 packages/agentplane/src/blueprints/index.ts        |   8 +
 .../agentplane/src/blueprints/project-local.ts     | 237 ++++++++++++++++++++-
 packages/agentplane/src/blueprints/resolve.ts      |   4 +
 .../src/cli/run-cli.core.blueprint.test.ts         | 150 +++++++++++++
 .../src/commands/blueprint/blueprint.command.ts    |  86 ++++++--
 .../agentplane/src/commands/doctor.fast.test.ts    |  23 ++
 .../agentplane/src/commands/doctor/blueprints.ts   |  26 ++-
 12 files changed, 806 insertions(+), 43 deletions(-)
```

</details>
