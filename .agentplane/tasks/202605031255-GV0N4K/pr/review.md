# PR Review

Created: 2026-05-03T13:01:45.805Z
Branch: task/202605031255-GV0N4K/workflow-md-v2-source-contract

## Summary

Define WORKFLOW.md v2 canonical source contract

Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.

## Scope

- In scope: Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.
- Out of scope: unrelated refactors not required for "Define WORKFLOW.md v2 canonical source contract".

## Verification

### Plan

1. Review the requested outcome for "Define WORKFLOW.md v2 canonical source contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: pending
- Note: Not recorded yet.

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

- Updated: 2026-05-03T13:01:45.805Z
- Branch: task/202605031255-GV0N4K/workflow-md-v2-source-contract
- Head: cdba98debdf1

```text
 .agentplane/tasks/202605031255-92K2Q0/README.md | 94 ++++++++++++++++++++++++
 .agentplane/tasks/202605031255-E1YFBV/README.md | 94 ++++++++++++++++++++++++
 .agentplane/tasks/202605031255-H9WWA0/README.md | 91 +++++++++++++++++++++++
 .agentplane/tasks/202605031255-TWKAW3/README.md | 94 ++++++++++++++++++++++++
 .agentplane/tasks/202605031255-XM1W31/README.md | 94 ++++++++++++++++++++++++
 .agentplane/tasks/202605031256-2HEMDS/README.md | 97 +++++++++++++++++++++++++
 .agentplane/tasks/202605031256-758Q7Z/README.md | 93 ++++++++++++++++++++++++
 7 files changed, 657 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
