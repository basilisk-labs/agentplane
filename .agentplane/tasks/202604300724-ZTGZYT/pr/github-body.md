## Summary

Restore release agent and policy parity

Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.

## Scope

- In scope: Make release hygiene pass by reconciling generated project agent and policy mirrors with canonical framework prompt assets after the fragmented prompt migration. Scope is limited to sync output and any minimal follow-up needed for agents:check.
- Out of scope: unrelated refactors not required for "Restore release agent and policy parity".

## Verification

- State: ok
- Note: Verified: current clean HEAD is ready for PR publication after sync and verification metadata refresh.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
