Task: `202609071655-XKV80D`
Title: Accept report-only WorkItem results without requiring source-code changes
Canonical task record: `.agentplane/tasks/202609071655-XKV80D/README.md`

## Summary

Accept report-only WorkItem results without requiring source-code changes

User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.

## Scope

- In scope: User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.
- Out of scope: unrelated refactors not required for "Accept report-only WorkItem results without requiring source-code changes".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T17:30:12.031Z
- Branch: task/202609071655-XKV80D/accept-report-only-workitem-results-without-requ
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts |   4 +-
 .../external-agent-implementation-authority.ts     |  41 ++-
 .../task/external-agent-report-result.test.ts      | 380 +++++++++++++++++++++
 .../commands/task/external-agent-report-result.ts  |  88 +++++
 4 files changed, 491 insertions(+), 22 deletions(-)
```

</details>
