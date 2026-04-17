# PR Review

Created: 2026-04-17T15:13:35.592Z
Branch: task/202604171510-8338XT/testkit-facade

## Summary

Expose CLI harness via @agentplane/testkit facade

Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.

## Scope

- In scope: Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
- Out of scope: unrelated refactors not required for "Expose CLI harness via @agentplane/testkit facade".

## Verification

### Plan

1. Run `bun run test:testkit`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade.

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

- Updated: 2026-04-17T15:13:35.592Z
- Branch: task/202604171510-8338XT/testkit-facade
- Head: b0c53c8aae1a

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
