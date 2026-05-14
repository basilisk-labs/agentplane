# PR Review

Created: 2026-05-14T13:45:49.767Z

## Task

- Task: `202605141342-R793XK`
- Title: Add SGR schema for context extraction
- Status: DOING
- Branch: `task/202605141342-R793XK/sgr-reliability-schemas`
- Canonical task record: `.agentplane/tasks/202605141342-R793XK/README.md`

## Verification

- State: ok
- Note: Verified: context extraction SGR contract requires source_refs, confidence, status, stale/conflict markers, and bounded output kinds. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T13:59:15.909Z
- Branch: task/202605141342-R793XK/sgr-reliability-schemas
- Head: 12c86decf172

```text
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 .agentplane/tasks/202605141343-89PDXP/README.md    | 143 ++++++
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 .agentplane/tasks/202605141343-VEKAEE/README.md    | 143 ++++++
 .../blueprint/resolved-snapshot.json               | 534 +++++++++++++++++++++
 packages/agentplane/src/blueprints/index.ts        |  14 +
 packages/agentplane/src/blueprints/sgr-decision.ts |  12 +
 packages/agentplane/src/context/sgr-extraction.ts  |  11 +
 packages/agentplane/src/evaluators/sgr-result.ts   |   9 +
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 169 +++++++
 packages/agentplane/src/runtime/sgr/contracts.ts   | 396 +++++++++++++++
 packages/agentplane/src/runtime/sgr/index.ts       |  24 +
 12 files changed, 2523 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
