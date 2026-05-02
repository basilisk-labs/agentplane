Task: `202605021842-PCRBTQ`
Title: Add evaluator agent profile and recursive planning contract

## Summary

Add evaluator agent profile and recursive planning contract

Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.

## Scope

- In scope: Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.
- Out of scope: unrelated refactors not required for "Add evaluator agent profile and recursive planning contract".

## Verification

- State: ok
- Note: Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only).
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
