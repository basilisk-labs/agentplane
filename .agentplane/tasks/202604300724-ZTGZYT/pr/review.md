# PR Review

Created: 2026-04-30T07:28:07.928Z
Branch: task/202604300724-ZTGZYT/release-parity-sync

## Summary

Restore release agent and policy parity

Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.

## Scope

- In scope: Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.
- Out of scope: unrelated refactors not required for "Restore release agent and policy parity".

## Verification

### Plan

1. Review the requested outcome for "Restore release agent and policy parity". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: release agent/policy mirrors are synchronized with canonical prompt assets; agents check, policy routing, diff check, framework bootstrap, and doctor passed.

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

- Updated: 2026-04-30T07:30:17.186Z
- Branch: task/202604300724-ZTGZYT/release-parity-sync
- Head: 8ad6e1085525

```text
 .agentplane/agents/CODER.json                    | 138 ++++++++++++++++----
 .agentplane/agents/CREATOR.json                  |  90 +++++++++++---
 .agentplane/agents/DOCS.json                     |  96 +++++++++++---
 .agentplane/agents/INTEGRATOR.json               | 108 +++++++++++++---
 .agentplane/agents/ORCHESTRATOR.json             | 152 +++++++++++++++++++----
 .agentplane/agents/PLANNER.json                  | 144 +++++++++++++++++----
 .agentplane/agents/REDMINE.json                  |  96 +++++++++++---
 .agentplane/agents/REVIEWER.json                 |  86 ++++++++++---
 .agentplane/agents/SKILL_EXTRACTOR.json          | 108 +++++++++++++---
 .agentplane/agents/TESTER.json                   | 108 +++++++++++++---
 .agentplane/agents/UPDATER.json                  |  78 ++++++++++--
 .agentplane/agents/UPGRADER.json                 | 108 +++++++++++++---
 .agentplane/policy/dod.code.md                   |   6 +
 .agentplane/policy/dod.core.md                   |   6 +
 .agentplane/policy/dod.docs.md                   |   8 ++
 .agentplane/policy/examples/migration-note.md    |   2 +
 .agentplane/policy/examples/pr-note.md           |   8 ++
 .agentplane/policy/examples/unit-test-pattern.md |   2 +
 .agentplane/policy/governance.md                 |  12 ++
 .agentplane/policy/incidents.md                  |   2 +
 .agentplane/policy/security.must.md              |   2 +
 .agentplane/policy/workflow.branch_pr.md         |   8 ++
 .agentplane/policy/workflow.direct.md            |  10 ++
 .agentplane/policy/workflow.md                   |   2 +
 .agentplane/policy/workflow.release.md           |   8 ++
 .agentplane/policy/workflow.upgrade.md           |   6 +
 .agentplane/tasks/202604300725-3CY7TE/README.md  | 113 +++++++++++++++++
 .agentplane/tasks/202604300725-SS9694/README.md  | 100 +++++++++++++++
 .agentplane/tasks/202604300725-T0M8X3/README.md  | 110 ++++++++++++++++
 .agentplane/tasks/202604300726-7FFNYW/README.md  | 136 ++++++++++++++++++++
 30 files changed, 1635 insertions(+), 218 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
