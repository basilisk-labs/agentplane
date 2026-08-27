Task: `202608241454-4JK4MP`
Title: Allow replacement after a rejected external-agent result
Canonical task record: `.agentplane/tasks/202608241454-4JK4MP/README.md`

## Summary

Allow replacement after a rejected external-agent result

Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.

## Scope

- In scope: Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.
- Out of scope: unrelated refactors not required for "Allow replacement after a rejected external-agent result".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-24T15:04:21.249Z
- Branch: task/202608241454-4JK4MP/allow-replacement-after-a-rejected-external-agen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 38 +++++++---
 ...un-cli.core.task-advance.blocked-result.test.ts | 82 ++++++++++++++++++++++
 .../src/commands/task/external-agent-supervisor.ts | 71 +++++++++++++++++--
 3 files changed, 176 insertions(+), 15 deletions(-)
```

</details>
