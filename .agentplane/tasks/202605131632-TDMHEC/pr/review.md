# PR Review

Created: 2026-05-13T16:33:56.982Z

## Task

- Task: `202605131632-TDMHEC`
- Title: Introduce bounded agentic classification and curation surfaces
- Status: DOING
- Branch: `task/202605131632-TDMHEC/agentic-classifiers`
- Canonical task record: `.agentplane/tasks/202605131632-TDMHEC/README.md`

## Verification

- State: ok
- Note: Final verification remains valid on implementation commit 662d86313. Checks previously run: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:59:01.052Z
- Branch: task/202605131632-TDMHEC/agentic-classifiers
- Head: 662d86313b2f

```text
 .agentplane/agents/CURATOR.json                    |  20 +-
 .../{SKILL_EXTRACTOR.json => EXTRACTOR.json}       |   2 +-
 .agentplane/agents/INTAKE.json                     |  25 +
 .agentplane/agents/PLANNER.json                    |  14 +-
 .agentplane/agents/REVIEWER.json                   |  16 +-
 .agentplane/agents/UPGRADER.json                   |   8 +-
 .../blueprint/resolved-snapshot.json               | 516 +++++++++++++++++++++
 docs/developer/architecture.mdx                    |   4 +-
 docs/developer/blueprints.mdx                      |  34 +-
 docs/developer/local-context.mdx                   |   4 +-
 docs/help/glossary.mdx                             |   2 +-
 docs/user/agents.mdx                               |  21 +-
 docs/user/cli-reference.generated.mdx              |  36 +-
 docs/user/commands.mdx                             |  11 +-
 docs/user/local-context.mdx                        |  24 +-
 packages/agentplane/assets/agents/CURATOR.json     |  20 +-
 .../{SKILL_EXTRACTOR.json => EXTRACTOR.json}       |   2 +-
 packages/agentplane/assets/agents/INTAKE.json      |  25 +
 packages/agentplane/assets/agents/PLANNER.json     |  14 +-
 packages/agentplane/assets/agents/REVIEWER.json    |  16 +-
 packages/agentplane/assets/agents/UPGRADER.json    |   8 +-
 packages/agentplane/assets/framework.manifest.json |  21 +-
 .../agentplane/src/blueprints/builtin-builder.ts   |   2 +-
 .../agentplane/src/blueprints/execution.test.ts    |   2 +-
 .../agentplane/src/blueprints/validate.test.ts     |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |   8 +-
 .../src/cli/run-cli.core.lifecycle.plan.test.ts    |   2 +-
 .../src/cli/run-cli.core.tasks.create.test.ts      |   4 +-
 .../cli/run-cli.core.tasks.scaffold-derive.test.ts |   4 +-
 .../src/commands/context/context.spec.ts           |  55 ++-
 .../src/commands/incidents/advise.command.ts       |   2 +-
 .../src/commands/incidents/collect.command.ts      |   2 +-
 .../src/commands/incidents/incidents.command.ts    |   6 +-
 .../commands/pr/internal/review-template.test.ts   |  26 ++
 .../src/commands/pr/internal/review-template.ts    |  24 +
 packages/agentplane/src/commands/task/derive.ts    |   2 +-
 .../agentplane/src/commands/task/doc-template.ts   |   6 +
 packages/agentplane/src/commands/task/new.ts       |   2 +-
 .../src/commands/upgrade.agent-mode.test.ts        |  11 +-
 .../agentplane/src/commands/upgrade.merge.test.ts  |  18 +-
 packages/agentplane/src/commands/upgrade.spec.ts   |   6 +-
 packages/agentplane/src/commands/upgrade.ts        |  11 +-
 packages/agentplane/src/commands/upgrade/apply.ts  |   1 -
 packages/agentplane/src/commands/upgrade/plan.ts   |   3 -
 packages/agentplane/src/commands/upgrade/report.ts |   8 +-
 packages/agentplane/src/commands/upgrade/types.ts  |   1 -
 .../src/context/harvest-tasks-artifacts.ts         |   7 +-
 .../src/context/harvest-tasks-extraction.ts        |   4 +-
 .../src/runtime/incidents/advice-strategy.ts       |   1 +
 .../src/runtime/incidents/plan-strategy.ts         |   1 +
 .../runtime/prompt-modules/gpt55-contract.test.ts  |   3 +-
 .../src/shared/builtin-assets.generated.ts         |  29 +-
 52 files changed, 887 insertions(+), 209 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
