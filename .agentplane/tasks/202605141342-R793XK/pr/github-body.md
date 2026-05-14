Task: `202605141342-R793XK`
Title: Add SGR schema for context extraction
Canonical task record: `.agentplane/tasks/202605141342-R793XK/README.md`

## Summary

Add SGR schema for context extraction

Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.

## Scope

- In scope: Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.
- Out of scope: unrelated refactors not required for "Add SGR schema for context extraction".

## Verification

- State: ok
- Note:

```text
Verified: context extraction SGR contract is now consumed by the task-history CURATOR extraction
prompt with a validated context_extraction v1 example and source_refs requirement. Checks passed
after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run
--filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node
.agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation
warnings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T15:06:07.475Z
- Branch: task/202605141342-R793XK/sgr-reliability-schemas
- Head: 2e5dda6ea358

```text
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 .agentplane/tasks/202605141343-89PDXP/README.md    | 187 ++++++++
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 .agentplane/tasks/202605141343-VEKAEE/README.md    | 187 ++++++++
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 packages/agentplane/src/blueprints/explain.ts      |  40 ++
 packages/agentplane/src/blueprints/model.ts        |   3 +
 packages/agentplane/src/blueprints/sgr-decision.ts |   1 +
 .../src/commands/evaluator/evaluator.command.ts    |   1 +
 .../src/context/harvest-tasks-extraction.ts        |  33 ++
 packages/agentplane/src/context/sgr-extraction.ts  |   4 +
 packages/agentplane/src/evaluators/catalog.ts      |  23 +
 packages/agentplane/src/evaluators/sgr-result.ts   |   1 +
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 169 +++++++
 packages/agentplane/src/runtime/sgr/contracts.ts   | 396 +++++++++++++++
 packages/agentplane/src/runtime/sgr/index.ts       |   9 +
 16 files changed, 2656 insertions(+)
```

</details>
