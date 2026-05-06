Task: `202605060915-N929BE`
Title: Merge blueprint evidence into verify-show
Canonical task record: `.agentplane/tasks/202605060915-N929BE/README.md`

## Summary

Merge blueprint evidence into verify-show

Extend task verify-show so it combines README Verify Steps with resolved blueprint required evidence while keeping non-code routes lightweight.

## Scope

- In scope: Extend task verify-show so it combines README Verify Steps with resolved blueprint required evidence while keeping non-code routes lightweight.
- Out of scope: unrelated refactors not required for "Merge blueprint evidence into verify-show".

## Verification

- State: ok
- Note: Merged persisted blueprint snapshot evidence into verify-show. Verification passed: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js task verify-show 202605060915-N929BE.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T09:40:26.331Z
- Branch: task/202605060915-N929BE/blueprint-evidence
- Head: e7213dda10b2

```text
 .agentplane/tasks/202605060915-0EDRBK/README.md    | 154 +++++++
 .agentplane/tasks/202605060915-3NBTGG/README.md    |  97 ++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 499 +++++++++++++++++++++
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
 packages/agentplane/src/blueprints/index.ts        |  13 +
 packages/agentplane/src/blueprints/model.ts        |  70 +++
 .../agentplane/src/blueprints/snapshot.test.ts     | 137 ++++++
 packages/agentplane/src/blueprints/snapshot.ts     | 296 ++++++++++++
 .../src/cli/run-cli.core.blueprint.test.ts         | 108 +++++
 .../cli/run-cli.core.tasks.query-listing.test.ts   |   7 +
 .../src/cli/run-cli/command-catalog/project.ts     |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |   8 +
 .../src/commands/blueprint/blueprint.command.ts    | 124 +++++
 .../commands/blueprint/snapshot-artifact.test.ts   | 116 +++++
 .../src/commands/blueprint/snapshot-artifact.ts    | 228 ++++++++++
 packages/agentplane/src/commands/task/start.ts     |   6 +
 .../src/commands/task/start.unit.test.ts           |  23 +
 .../src/commands/task/verify-show.command.ts       |  16 +
 28 files changed, 3276 insertions(+)
```

</details>
