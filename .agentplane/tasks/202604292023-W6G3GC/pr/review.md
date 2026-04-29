# PR Review

Created: 2026-04-29T21:04:10.950Z
Branch: task/202604292023-W6G3GC/markdown-prompt-fragments

## Summary

Migrate markdown prompt assets to named fragments

Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.

## Scope

- In scope: Add stable named fragment markers to AGENTS.md, RUNNER.md, and bundled policy markdown modules, preserving rendered prompt text while making each logical section addressable for replacement or disabling.
- Out of scope: unrelated refactors not required for "Migrate markdown prompt assets to named fragments".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified markdown prompt fragments render without marker comments.

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

- Updated: 2026-04-29T21:04:10.950Z
- Branch: task/202604292023-W6G3GC/markdown-prompt-fragments
- Head: dafd59fb9348

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
