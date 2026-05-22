Task: `202605221726-8SA692`
Title: Add combined hosted lifecycle status report
Canonical task record: `.agentplane/tasks/202605221726-8SA692/README.md`

## Summary

Add combined hosted lifecycle status report

Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.

## Scope

- In scope: Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
- Out of scope: unrelated refactors not required for "Add combined hosted lifecycle status report".

## Verification

- State: ok
- Note:

```text
Evaluator check: combined report extends the existing branch_pr flow surface without adding a second
lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and
local queue/handoff evidence remains visible.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:15:03.831Z
- Branch: task/202605221726-8SA692/hosted-lifecycle-status-report
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  57 ++++++++
 packages/agentplane/src/commands/pr/flow-status.ts | 162 +++++++++++++++++++++
 2 files changed, 219 insertions(+)
```

</details>
