# PR Review

Created: 2026-05-08T18:29:51.044Z

## Task

- Task: `202605081826-S5X1S7`
- Title: Stabilize CLI cold-start pre-push benchmark
- Status: DOING
- Branch: `task/202605081826-S5X1S7/cold-benchmark-stability`
- Canonical task record: `.agentplane/tasks/202605081826-S5X1S7/README.md`

## Verification

- State: ok
- Note: Implemented bounded pre-push cold-start smoke gate. Evidence: focused Vitest suite passed for benchmark scripts, schema acceptance, and task backend; bench:cli:cold:check passed with fixture local-basic, runs=1, warmups=0, attempts=1, timeout=10000ms, smoke thresholds quickstart=5000 task_list=10000 task_search=6000 task_next=3000 preflight_quick=6000; schemas:check and docs:scripts:check passed; @agentplaneorg/core and agentplane typecheck passed; policy routing and doctor passed after rebase.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T20:07:05.548Z
- Branch: task/202605081826-S5X1S7/cold-benchmark-stability
- Head: fe5d78e6d84b

```text
 .../blueprint/resolved-snapshot.json               | 538 +++++++++++++++++++++
 docs/index.mdx                                     |  16 +
 docs/user/cli-reference.generated.mdx              | 111 ++++-
 docs/user/setup.mdx                                |  22 +-
 package.json                                       |   2 +-
 .../src/blueprints/builtins-specialized.ts         | 444 +++++++++++++++++
 packages/agentplane/src/blueprints/builtins.ts     | 271 +----------
 packages/agentplane/src/blueprints/resolve.ts      |   2 +-
 .../src/cli/check-cli-cold-baseline-script.test.ts |  37 ++
 .../src/cli/measure-cli-cold-path-script.test.ts   |  60 +++
 .../src/commands/hooks/run.commit-msg.ts           |   3 +
 .../src/commands/hooks/run.pre-commit.ts           |   3 +
 .../src/commands/integrate-queue.command.ts        |  43 +-
 .../src/commands/pr/integrate/queue-state.ts       |  20 +-
 .../schemas/task-readme-frontmatter.schema.json    |   3 +
 packages/core/schemas/tasks-export.schema.json     |   3 +
 packages/core/src/commit/commit-policy.ts          |   3 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   3 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  43 ++
 .../schemas/task-readme-frontmatter.schema.json    |   3 +
 packages/spec/schemas/tasks-export.schema.json     |   3 +
 schemas/task-readme-frontmatter.schema.json        |   3 +
 schemas/tasks-export.schema.json                   |   3 +
 scripts/README.md                                  |  18 +-
 scripts/baselines/cli-cold-path-smoke.json         |  39 ++
 scripts/check-cli-cold-baseline.mjs                | 109 ++++-
 scripts/cli-benchmark-runner.mjs                   |  39 +-
 website/docusaurus.config.ts                       |   6 +
 website/sidebars.ts                                |   6 +-
 29 files changed, 1517 insertions(+), 339 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
