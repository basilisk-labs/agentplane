# PR Review

Created: 2026-07-13T16:44:03.525Z

## Task

- Task: `202607131641-Z7NE99`
- Title: Align master and agent prompts with GPT-5.6 guidance
- Status: DOING
- Branch: `task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid`
- Canonical task record: `.agentplane/tasks/202607131641-Z7NE99/README.md`

## Verification

- State: ok
- Note: Rework passed: Knip baseline 555/555, typecheck, and 24 targeted prompt tests are green after keeping GPT-5.6 diagnostic types internal.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-13T17:15:20.048Z
- Branch: task/202607131641-Z7NE99/align-master-and-agent-prompts-with-gpt-5-6-guid
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/CODER.json                      |   2 +-
 .agentplane/agents/CREATOR.json                    |   2 +-
 .agentplane/agents/CURATOR.json                    |   2 +-
 .agentplane/agents/DOCS.json                       |   2 +-
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .agentplane/agents/EXTRACTOR.json                  |   2 +-
 .agentplane/agents/INTAKE.json                     |   2 +-
 .agentplane/agents/INTEGRATOR.json                 |   2 +-
 .agentplane/agents/ORCHESTRATOR.json               |   2 +-
 .agentplane/agents/PLANNER.json                    |   2 +-
 .agentplane/agents/REDMINE.json                    |   2 +-
 .agentplane/agents/REVIEWER.json                   |   2 +-
 .agentplane/agents/TESTER.json                     |   2 +-
 .agentplane/agents/UPDATER.json                    |   2 +-
 .agentplane/agents/UPGRADER.json                   |   2 +-
 .agentplane/tasks/202607111438-5DXKKR/README.md    |  23 +++-
 .agentplane/tasks/202607111438-5DXKKR/pr/meta.json |   9 +-
 docs/developer/modular-prompt-assembly.mdx         |  16 ++-
 packages/agentplane/assets/AGENTS.md               |  11 +-
 packages/agentplane/assets/agents/CODER.json       |   2 +-
 packages/agentplane/assets/agents/CREATOR.json     |   2 +-
 packages/agentplane/assets/agents/CURATOR.json     |   2 +-
 packages/agentplane/assets/agents/DOCS.json        |   2 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 packages/agentplane/assets/agents/EXTRACTOR.json   |   2 +-
 packages/agentplane/assets/agents/INTAKE.json      |   2 +-
 packages/agentplane/assets/agents/INTEGRATOR.json  |   2 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |   2 +-
 packages/agentplane/assets/agents/PLANNER.json     |   2 +-
 packages/agentplane/assets/agents/REDMINE.json     |   2 +-
 packages/agentplane/assets/agents/REVIEWER.json    |   2 +-
 packages/agentplane/assets/agents/TESTER.json      |   2 +-
 packages/agentplane/assets/agents/UPDATER.json     |   2 +-
 packages/agentplane/assets/agents/UPGRADER.json    |   2 +-
 .../src/runtime/prompt-modules/gpt55-contract.ts   |   4 +-
 .../runtime/prompt-modules/gpt56-contract.test.ts  | 119 +++++++++++++++++++++
 .../src/runtime/prompt-modules/gpt56-contract.ts   |  78 ++++++++++++++
 .../agentplane/src/runtime/prompt-modules/index.ts |   1 +
 38 files changed, 273 insertions(+), 48 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
