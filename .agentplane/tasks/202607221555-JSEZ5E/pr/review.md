# PR Review

Created: 2026-07-22T15:56:49.832Z

## Task

- Task: `202607221555-JSEZ5E`
- Title: Delegate semantic entity reconciliation to the context executor
- Status: DOING
- Branch: `task/202607221555-JSEZ5E/delegate-semantic-entity-reconciliation-to-the-c`
- Canonical task record: `.agentplane/tasks/202607221555-JSEZ5E/README.md`

## Verification

- State: ok
- Note: Verified current implementation HEAD 3f02dab0bdaf: focused 119/119, complete fast suite 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic reconciliation E2E passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T15:56:49.832Z
- Branch: task/202607221555-JSEZ5E/delegate-semantic-entity-reconciliation-to-the-c
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/CURATOR.json                    |   8 +-
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .agentplane/tasks/202607221344-D9JTEY/README.md    |  18 +--
 .../tasks/202607221344-D9JTEY/pr/diffstat.txt      |   3 +-
 .../tasks/202607221344-D9JTEY/pr/github-body.md    |   3 +-
 .agentplane/tasks/202607221344-D9JTEY/pr/meta.json |   2 +-
 .agentplane/tasks/202607221344-D9JTEY/pr/review.md |   3 +-
 .../evaluator-opinion.md                           |  19 +++
 .../evaluator-prompt.md                            |  74 ++++++++++
 .../quality-report.json                            |  23 +++
 docs/context/agent-guide.mdx                       |  22 +++
 docs/context/modes.mdx                             |  18 ++-
 docs/context/review.mdx                            |   4 +
 packages/agentplane/assets/agents/CURATOR.json     |   8 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 .../src/blueprints/context-maximum-assimilation.ts |  24 +++
 .../commands/context/extraction-apply.unit.test.ts |  30 ++++
 .../src/commands/context/release-readiness.test.ts |  20 ++-
 .../verify-task.maximum-assimilation.test.ts       |  22 ++-
 .../verify-task.maximum-assimilation.unit.test.ts  |  22 ++-
 packages/agentplane/src/commands/task/new.ts       |   9 +-
 .../src/context/extraction-writer.test.ts          |  69 +++++++++
 .../agentplane/src/context/extraction-writer.ts    |  20 +++
 .../src/context/ingest-task-pack.test.ts           |  86 ++++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     | 162 ++++++++++++++++++++-
 .../agentplane/src/context/ingest-task-prompt.ts   |  26 ++--
 packages/agentplane/src/context/ingest-task.ts     |  39 ++++-
 ...imilation-artifacts-validation-ontology.test.ts |  86 +++++++++++
 ...m-assimilation-artifacts-validation-ontology.ts |  71 ++++++++-
 .../src/runtime/sgr/context-extraction-contract.ts |  41 +++++-
 .../src/runtime/sgr/context-extraction-payloads.ts |  80 ++++++++--
 .../agentplane/src/runtime/sgr/contract-types.ts   |  20 ++-
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 104 +++++++++++++
 33 files changed, 1062 insertions(+), 78 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
