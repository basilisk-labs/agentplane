# PR Review

Created: 2026-05-06T10:11:17.521Z

## Task

- Task: `202605060915-Y5D85M`
- Title: Normalize recipe blueprint hints v2
- Status: DOING
- Branch: `task/202605060915-Y5D85M/blueprint-recipes`
- Canonical task record: `.agentplane/tasks/202605060915-Y5D85M/README.md`

## Verification

- State: ok
- Note: Verified: recipe blueprint hints now normalize to a v2 provenance-bearing contract.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T10:11:17.521Z
- Branch: task/202605060915-Y5D85M/blueprint-recipes
- Head: 0be0fd6e4c4e

```text
 .agentplane/tasks/202605060915-0EDRBK/README.md    | 154 +++++++
 .agentplane/tasks/202605060915-3NBTGG/README.md    |  97 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
 .agentplane/tasks/202605060915-6BWQ0X/README.md    |  93 ++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++++++
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
 .../agentplane/src/commands/task/run-output.ts     |   3 +
 .../src/commands/task/run-show.command.ts          |  12 +
 packages/agentplane/src/commands/task/start.ts     |   6 +
 .../src/commands/task/start.unit.test.ts           |  23 +
 .../src/commands/task/verify-record-execute.ts     |  39 +-
 .../src/commands/task/verify-record.unit.test.ts   |   2 +
 .../src/commands/task/verify-show.command.ts       |  16 +
 packages/agentplane/src/runner/run-repository.ts   |   8 +-
 .../agentplane/src/runner/task-run-paths.test.ts   |   6 +
 packages/agentplane/src/runner/task-run-paths.ts   |   4 +
 packages/agentplane/src/runner/types/context.ts    |   2 +
 .../src/runner/usecases/task-run-blueprint.test.ts |  69 +++
 .../agentplane/src/runner/usecases/task-run.ts     |  60 ++-
 packages/testkit/src/runner.ts                     |   2 +
 68 files changed, 8391 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
