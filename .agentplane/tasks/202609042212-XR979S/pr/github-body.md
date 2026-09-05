Task: `202609042212-XR979S`
Title: Repair pre-merge DONE task rework blocker persistence and resume ZVX69C
Canonical task record: `.agentplane/tasks/202609042212-XR979S/README.md`

## Summary

Repair pre-merge DONE task rework blocker persistence and resume ZVX69C

Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.

## Scope

- In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.
- Out of scope: unrelated refactors not required for "Repair pre-merge DONE task rework blocker persistence and resume ZVX69C".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T22:56:14.024Z
- Branch: task/202609042212-XR979S/repair-pre-merge-done-task-rework-blocker-persis
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.task-advance.blocked-result.test.ts |  89 ++++++++++++++++-
 .../commands/task/external-agent-blocked-result.ts |  12 ++-
 .../src/commands/task/set-status.unit.test.ts      | 109 ++++++++++++---------
 .../task/shared/workflow-transition-service.ts     |  15 +++
 4 files changed, 177 insertions(+), 48 deletions(-)
```

</details>
