# PR Review

Created: 2026-05-02T18:43:04.382Z
Branch: task/202605021842-PCRBTQ/evaluator-agent-profile

## Summary

Add evaluator agent profile and recursive planning contract

Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.

## Scope

- In scope: Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.
- Out of scope: unrelated refactors not required for "Add evaluator agent profile and recursive planning contract".

## Verification

### Plan

- Run `bun run agents:check` to verify generated agent mirrors match bundled profiles.
- Run `node .agentplane/policy/check-routing.mjs` for policy routing sanity after prompt-surface edits.
- Run `agentplane doctor` for repository diagnostics.

### Current Status

- State: ok
- Note: Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only).

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T18:46:30.750Z
- Branch: task/202605021842-PCRBTQ/evaluator-agent-profile
- Head: 92d229987207

```text
 .agentplane/agents/EVALUATOR.json                  | 26 ++++++++++++++++++++++
 .agentplane/agents/PLANNER.json                    | 14 ++++++------
 packages/agentplane/assets/agents/EVALUATOR.json   | 26 ++++++++++++++++++++++
 packages/agentplane/assets/agents/PLANNER.json     | 14 ++++++------
 packages/agentplane/assets/framework.manifest.json |  7 ++++++
 5 files changed, 73 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
