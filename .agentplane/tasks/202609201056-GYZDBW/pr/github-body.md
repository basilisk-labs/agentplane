Task: `202609201056-GYZDBW`
Title: Isolate canonical hosted-close regression
Canonical task record: `.agentplane/tasks/202609201056-GYZDBW/README.md`

## Summary

Isolate canonical hosted-close regression

Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.

## Scope

- In scope: Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
- Out of scope: unrelated refactors not required for "Isolate canonical hosted-close regression".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T11:09:20.160Z
- Branch: task/202609201056-GYZDBW/canonical-gyzdbw
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.task-hosted-close-canonical.test.ts | 148 +++++++++++++++++++++
 .../src/commands/task/hosted-close.command.ts      |   7 +
 2 files changed, 155 insertions(+)
```

</details>
