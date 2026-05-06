Task: `202605060915-N3MJJ1`
Title: Embed resolved blueprint plan in runner bundle
Canonical task record: `.agentplane/tasks/202605060915-N3MJJ1/README.md`

## Summary

Embed resolved blueprint plan in runner bundle

Embed the resolved blueprint snapshot into runner bundle output as a compact execution contract for agents and external runners.

## Scope

- In scope: Embed the resolved blueprint snapshot into runner bundle output as a compact execution contract for agents and external runners.
- Out of scope: unrelated refactors not required for "Embed resolved blueprint plan in runner bundle".

## Verification

- State: ok
- Note: Verified: runner bundle now exposes a named blueprint plan artifact path and writes the embedded blueprint plan there during prepare.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T10:01:42.667Z
- Branch: task/202605060915-N3MJJ1/blueprint-runner-context
- Head: 3fab8a1567fd

```text
 .agentplane/tasks/202605060915-0EDRBK/README.md    | 154 +++++++
 .agentplane/tasks/202605060915-3NBTGG/README.md    |  97 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .agentplane/tasks/202605060915-6BWQ0X/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .agentplane/tasks/202605060915-D6SFRB/README.md    | 104 +++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .agentplane/tasks/202605060915-N929BE/README.md    |  94 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .../tasks/202605060915-N929BE/pr/diffstat.txt      |  29 ++
 .../tasks/202605060915-N929BE/pr/github-body.md    |  61 +++
 .../tasks/202605060915-N929BE/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-N929BE/pr/meta.json |  14 +
 .agentplane/tasks/202605060915-N929BE/pr/review.md |  64 +++
 .agentplane/tasks/202605060915-RQFY8Y/README.md    |  98 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .agentplane/tasks/202605060915-YN0VAQ/README.md    | 151 +++++++
 .../tasks/202605060915-YN0VAQ/pr/diffstat.txt      |   5 +
 .../tasks/202605060915-YN0VAQ/pr/github-body.md    |  40 ++
 .../tasks/202605060915-YN0VAQ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-YN0VAQ/pr/meta.json |  14 +
 .../tasks/202605060915-YN0VAQ/pr/notes.jsonl       |   0
 .agentplane/tasks/202605060915-YN0VAQ/pr/review.md |  61 +++
 .../tasks/202605060915-YN0VAQ/pr/verify.log        |   0
 .agentplane/tasks/202605060915-ZHFA8V/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 packages/agentplane/src/blueprints/index.ts        |  13 +
 packages/agentplane/src/blueprints/model.ts        |  70 +++
 .../agentplane/src/blueprints/snapshot.test.ts     | 137 ++++++
 packages/agentplane/src/blueprints/snapshot.ts     | 296 ++++++++++++
 .../src/cli/run-cli.core.blueprint.test.ts         | 108 +++++
 .../cli/run-cli.core.tasks.query-listing.test.ts   |   7 +
 .../src/cli/run-cli/command-catalog/project.ts     |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |   8 +
 .../agentplane/src/commands/acr/acr.command.ts     |  72 ++-
 .../src/commands/blueprint/blueprint.command.ts    | 124 +++++
 .../commands/blueprint/snapshot-artifact.test.ts   | 116 +++++
 .../src/commands/blueprint/snapshot-artifact.ts    | 261 +++++++++++
 .../src/commands/task/finish-blueprint-evidence.ts |  55 +++
 .../agentplane/src/commands/task/finish-execute.ts |   2 +
 .../commands/task/finish.validation.unit.test.ts   | 115 +++++
 packages/agentplane/src/commands/task/start.ts     |   6 +
 .../src/commands/task/start.unit.test.ts           |  23 +
 .../src/commands/task/verify-record-execute.ts     |  39 +-
 .../src/commands/task/verify-record.unit.test.ts   |   2 +
 .../src/commands/task/verify-show.command.ts       |  16 +
 46 files changed, 5637 insertions(+), 7 deletions(-)
```

</details>
