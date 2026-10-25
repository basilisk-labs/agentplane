Task: `202610250310-T2T2V1`
Title: Authenticate repository-policy scope replans after approved scope requests
Canonical task record: `.agentplane/tasks/202610250310-T2T2V1/README.md`

## Summary

Authenticate repository-policy scope replans after approved scope requests

For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.

## Scope

- In scope: For release 0.7.13, fix canonical rework evidence lookup after a USER-approved scope extension when the revised Plan is automatically approved by repository policy. Retain exact USER scope grant, historical blocked result, proposal/approval receipts, authority and scope ceiling checks. Support both explicit USER and repository-policy SYSTEM Plan approval without weakening fail-closed behavior. Add focused core and native external-agent regressions. No Factory-specific adapter or manual journal edits.
- Out of scope: unrelated refactors not required for "Authenticate repository-policy scope replans after approved scope requests".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T03:39:57.920Z
- Branch: task/202610250310-T2T2V1/authenticate-repository-policy-scope-replans-aft
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-scope-request.test.ts | 32 ++++++++------
 .../tasks/task-kernel/replan-work-items.test.ts    | 50 +++++++++++++++++++---
 .../src/tasks/task-kernel/replan-work-items.ts     | 19 ++++++--
 3 files changed, 80 insertions(+), 21 deletions(-)
```

</details>
