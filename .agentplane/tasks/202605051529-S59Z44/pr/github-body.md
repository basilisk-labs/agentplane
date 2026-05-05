Task: `202605051529-S59Z44`
Title: Commit automatic ACR artifacts on finish

## Summary

Commit automatic ACR artifacts on finish

Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.

## Scope

- In scope: Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.
- Out of scope: unrelated refactors not required for "Commit automatic ACR artifacts on finish".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 19 tests passed. Scope: finish validation and ACR refresh status invalidation. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: 4 tests passed and hosted-close now asserts tracked acr.json. Scope: hosted close lifecycle. Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 6 tests passed. Scope: integrate finalization ACR refresh handoff. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: eslint/prettier/git diff --check/check-routing/doctor. Result: pass. Evidence: lint clean, Prettier matched, policy routing OK, doctor OK with 0 errors and 0 warnings. Scope: touched files and repo policy health.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T15:29:48.806Z
- Branch: task/202605051529-S59Z44/commit-auto-acr-artifacts
- Head: 767230d19ff1

```text
No changes detected.
```

</details>
