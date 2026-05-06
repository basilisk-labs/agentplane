Task: `202605060915-S7TK13`
Title: Version project-local blueprint trust config
Canonical task record: `.agentplane/tasks/202605060915-S7TK13/README.md`

## Summary

Version project-local blueprint trust config

Add explicit versioning and migration rules for project-local blueprint trust config so future v0.5 changes can evolve without ambiguous repository behavior.

## Scope

- In scope: Add explicit versioning and migration rules for project-local blueprint trust config so future v0.5 changes can evolve without ambiguous repository behavior.
- Out of scope: unrelated refactors not required for "Version project-local blueprint trust config".

## Verification

- State: ok
- Note: Project-local blueprint trust config is versioned with backward-compatible allowlist loading.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T10:32:31.110Z
- Branch: task/202605060915-S7TK13/blueprint-local-governance
- Head: b4a7b2c75075

```text
 .agentplane/tasks/202605060915-0EDRBK/README.md    | 154 +++++++
 .agentplane/tasks/202605060915-0VMVEA/README.md    |  90 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .../tasks/202605060915-0VMVEA/pr/diffstat.txt      |  89 ++++
 .../tasks/202605060915-0VMVEA/pr/github-body.md    | 121 +++++
 .../tasks/202605060915-0VMVEA/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-0VMVEA/pr/meta.json |  14 +
 .agentplane/tasks/202605060915-0VMVEA/pr/review.md | 124 +++++
 .agentplane/tasks/202605060915-1QCC5X/README.md    |  91 ++++
 .../blueprint/resolved-snapshot.json               | 500 +++++++++++++++++++++
 .agentplane/tasks/202605060915-3NBTGG/README.md    |  97 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-4C71K9/README.md    |  91 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-6BWQ0X/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-8S48JS/README.md    |  91 ++++
 .../blueprint/resolved-snapshot.json               | 500 +++++++++++++++++++++
 .agentplane/tasks/202605060915-BS04KY/README.md    |  94 ++++
 .../blueprint/resolved-snapshot.json               | 500 +++++++++++++++++++++
 .agentplane/tasks/202605060915-D6SFRB/README.md    | 104 +++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-GM5BTR/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-N3MJJ1/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .../tasks/202605060915-N3MJJ1/pr/diffstat.txt      |  47 ++
 .../tasks/202605060915-N3MJJ1/pr/github-body.md    |  79 ++++
 .../tasks/202605060915-N3MJJ1/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-N3MJJ1/pr/meta.json |  14 +
 .agentplane/tasks/202605060915-N3MJJ1/pr/review.md |  82 ++++
 .agentplane/tasks/202605060915-N929BE/README.md    |  94 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .../tasks/202605060915-N929BE/pr/diffstat.txt      |  29 ++
 .../tasks/202605060915-N929BE/pr/github-body.md    |  61 +++
 .../tasks/202605060915-N929BE/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-N929BE/pr/meta.json |  14 +
 .agentplane/tasks/202605060915-N929BE/pr/review.md |  64 +++
 .agentplane/tasks/202605060915-RKCVW1/README.md    |  94 ++++
 .../blueprint/resolved-snapshot.json               | 500 +++++++++++++++++++++
 .agentplane/tasks/202605060915-RQFY8Y/README.md    |  98 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-RT4DX5/README.md    |  90 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-S9S61F/README.md    |  91 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-SZVSYK/README.md    |  94 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-Y5D85M/README.md    |  92 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .../tasks/202605060915-Y5D85M/pr/diffstat.txt      |  69 +++
 .../tasks/202605060915-Y5D85M/pr/github-body.md    | 101 +++++
 .../tasks/202605060915-Y5D85M/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-Y5D85M/pr/meta.json |  14 +
 .agentplane/tasks/202605060915-Y5D85M/pr/review.md | 104 +++++
 .agentplane/tasks/202605060915-YN0VAQ/README.md    | 151 +++++++
 .../tasks/202605060915-YN0VAQ/pr/diffstat.txt      |   5 +
 .../tasks/202605060915-YN0VAQ/pr/github-body.md    |  40 ++
 .../tasks/202605060915-YN0VAQ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605060915-YN0VAQ/pr/meta.json |  14 +
 .../tasks/202605060915-YN0VAQ/pr/notes.jsonl       |   0
 .agentplane/tasks/202605060915-YN0VAQ/pr/review.md |  61 +++
 .../tasks/202605060915-YN0VAQ/pr/verify.log        |   0
 .agentplane/tasks/202605060915-ZHFA8V/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .../agentplane/src/blueprints/execution.test.ts    | 185 ++++++++
 packages/agentplane/src/blueprints/execution.ts    | 248 ++++++++++
 packages/agentplane/src/blueprints/explain.ts      |  19 +
 packages/agentplane/src/blueprints/index.ts        |  39 +-
 packages/agentplane/src/blueprints/model.ts        | 191 ++++++++
 .../agentplane/src/blueprints/recipe-hints.test.ts |  33 ++
 packages/agentplane/src/blueprints/recipe-hints.ts |   3 +
 packages/agentplane/src/blueprints/resolve.test.ts |  84 +++-
 packages/agentplane/src/blueprints/resolve.ts      |   4 +-
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
 .../agentplane/src/commands/task/run-output.ts     |   5 +
 .../src/commands/task/run-show.command.ts          |  20 +
 packages/agentplane/src/commands/task/start.ts     |   6 +
 .../src/commands/task/start.unit.test.ts           |  23 +
 .../src/commands/task/verify-record-execute.ts     |  39 +-
 .../src/commands/task/verify-record.unit.test.ts   |   2 +
 .../src/commands/task/verify-show.command.ts       |  16 +
 packages/agentplane/src/runner/run-repository.ts   |  18 +-
 .../agentplane/src/runner/task-run-paths.test.ts   |  14 +
 packages/agentplane/src/runner/task-run-paths.ts   |   8 +
 packages/agentplane/src/runner/types/context.ts    |   4 +
 .../usecases/scenario-materialize-task.test.ts     | 121 +++++
 .../src/runner/usecases/task-run-blueprint.test.ts |  69 +++
 .../agentplane/src/runner/usecases/task-run.ts     |  84 +++-
 .../testkit/src/cli-harness/recipe-archives.ts     |  11 +-
 packages/testkit/src/runner.ts                     |  17 +
 103 files changed, 14676 insertions(+), 19 deletions(-)
```

</details>
