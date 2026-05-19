# PR Review

Created: 2026-05-19T17:04:03.241Z

## Task

- Task: `202605191703-PYJMMV`
- Title: Make maximum assimilation source-shaped and Obsidian-compatible
- Status: DOING
- Branch: `task/202605191703-PYJMMV/max-assimilation-obsidian`
- Canonical task record: `.agentplane/tasks/202605191703-PYJMMV/README.md`

## Verification

- State: ok
- Note: Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T17:28:46.796Z
- Branch: task/202605191703-PYJMMV/max-assimilation-obsidian
- Head: ca91c80c5dea

```text
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .../blueprint/resolved-snapshot.json               | 574 +++++++++++++++++++++
 docs/user/local-context.mdx                        |  18 +
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 packages/agentplane/src/blueprints/builtins.ts     |  31 ++
 .../agentplane/src/blueprints/validate.test.ts     |   6 +
 packages/agentplane/src/commands/context/init.ts   |  17 +
 .../src/commands/context/release-readiness.test.ts |  81 ++-
 packages/agentplane/src/context/ingest-task.ts     |  23 +-
 packages/agentplane/src/context/ingest.ts          |  12 +-
 .../src/shared/builtin-assets.generated.ts         |  10 +-
 11 files changed, 759 insertions(+), 17 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
