# PR Review

Created: 2026-04-29T19:19:14.656Z
Branch: task/202604291531-864BKX/prompt-graph-diagnostics

## Summary

Add prompt graph diagnostics and drift checks

Expose prompt graph diagnostics and drift detection through doctor/explain-style surfaces so operators can see compiled modules, source provenance, repo overrides, recipe mutations, and stale generated prompt artifacts.

## Scope

- In scope: diagnostics for prompt graph composition, source provenance, active recipe mutations, and generated artifact drift.
- In scope: doctor/runtime explain surfaces that help agents decide whether init/upgrade/prompt artifacts need refresh.
- Out of scope: auto-fixing drift or publishing remote checks.

## Verification

### Plan

1. Run `bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Prompt graph diagnostics are exposed through runtime explain and doctor drift checks; declared verification passed.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert diagnostic command changes and keep compiler behavior intact.
- Confirm `agentplane doctor` returns to previous output with no prompt graph section.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:30:20.444Z
- Branch: task/202604291531-864BKX/prompt-graph-diagnostics
- Head: e030c46467a2

```text
 .../src/commands/doctor.command.runtime.test.ts    |  36 +++
 packages/agentplane/src/commands/doctor.run.ts     |   2 +
 .../agentplane/src/commands/doctor/prompt-graph.ts | 120 +++++++++
 .../src/commands/runtime.command.test.ts           |  93 +++++++
 .../agentplane/src/commands/runtime.command.ts     |  36 ++-
 .../commands/shared/prompt-graph-diagnostics.ts    | 292 +++++++++++++++++++++
 6 files changed, 571 insertions(+), 8 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
