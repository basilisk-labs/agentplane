Task: `202605060730-B55DQR`
Title: Add project-local blueprint scaffold command

## Summary

Add project-local blueprint scaffold command

Add a safe blueprint scaffold command that writes a local JSON template for project authors without registering or executing the custom blueprint.

## Scope

- In scope: Add a safe blueprint scaffold command that writes a local JSON template for project authors without registering or executing the custom blueprint.
- Out of scope: unrelated refactors not required for "Add project-local blueprint scaffold command".

## Verification

- State: ok
- Note: Verified: scaffold command creates project-local blueprint JSON without enabling execution; focused tests and ci:local:fast passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T07:47:49.435Z
- Branch: task/202605060730-B55DQR/local-blueprint-authoring
- Head: a9f142c37f71

```text
 .agentplane/tasks/202605060730-PW6S0R/README.md    | 118 +++++++++
 .agentplane/tasks/202605060730-Y7T26J/README.md    | 118 +++++++++
 .agentplane/tasks/202605060731-GK1JRH/README.md    | 118 +++++++++
 docs/developer/blueprints.mdx                      |  78 ++++--
 docs/user/cli-reference.generated.mdx              |  62 ++++-
 packages/agentplane/src/blueprints/index.ts        |  15 ++
 .../agentplane/src/blueprints/project-local.ts     | 216 ++++++++++++++++
 .../src/cli/run-cli.core.blueprint.test.ts         |  66 ++++-
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   2 +
 .../src/commands/blueprint/blueprint.command.ts    | 285 ++++++++++++++++-----
 .../agentplane/src/commands/doctor.fast.test.ts    |  19 ++
 packages/agentplane/src/commands/doctor.run.ts     |   3 +
 .../agentplane/src/commands/doctor/blueprints.ts   |  15 ++
 14 files changed, 1031 insertions(+), 87 deletions(-)
```

</details>
