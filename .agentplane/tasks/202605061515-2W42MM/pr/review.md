# PR Review

Created: 2026-05-06T15:17:11.157Z

## Task

- Task: `202605061515-2W42MM`
- Title: Expose blueprint discoverability in CLI
- Status: DOING
- Branch: `task/202605061515-2W42MM/blueprint-discoverability`
- Canonical task record: `.agentplane/tasks/202605061515-2W42MM/README.md`

## Verification

- State: ok
- Note: Verified: blueprint examples command, quickstart hint, CLI docs generation, targeted tests, typecheck, doctor, routing, release gate, and diff check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T15:27:38.922Z
- Branch: task/202605061515-2W42MM/blueprint-discoverability
- Head: a2bdf69b7a18

```text
 .../blueprint/resolved-snapshot.json               | 498 +++++++++++++++++++++
 .agentplane/tasks/202605061515-EPEVHQ/README.md    |  87 ++++
 .../blueprint/resolved-snapshot.json               | 342 ++++++++++++++
 .agentplane/tasks/202605061515-WJWM2W/README.md    |  88 ++++
 .../blueprint/resolved-snapshot.json               | 401 +++++++++++++++++
 docs/developer/blueprints.mdx                      |  37 ++
 docs/user/cli-reference.generated.mdx              |  37 +-
 packages/agentplane/src/cli/command-guide.ts       |   1 +
 .../src/cli/run-cli.core.blueprint.test.ts         |  14 +
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   2 +
 .../src/commands/blueprint/blueprint.command.ts    |  67 +++
 .../src/commands/blueprint/blueprint.specs.ts      |  25 +-
 .../release/check-release-version-script.test.ts   |  15 +
 scripts/check-release-version.mjs                  |   8 +-
 15 files changed, 1620 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
