# PR Review

Created: 2026-04-07T09:19:05.673Z
Branch: task/202604070912-WV9YHM/sync-incident-assets

## Summary

Sync incident template assets when incidents registry mutates

When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.

## Scope

- In scope: When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.
- Out of scope: unrelated refactors not required for "Sync incident template assets when incidents registry mutates".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: incident promotion paths still pass and the framework-checkout regression for synced incident assets is covered.
2. Run `bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: touched implementation and regression coverage stay lint-clean.
3. Run `bun run agents:check`. Expected: after an incident-registry mutation path updates `.agentplane/policy/incidents.md`, the canonical asset copy under `packages/agentplane/assets/policy/incidents.md` remains in sync and the check passes.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: 22 pass, 0 fail including hosted-close regression and policy allowlist coverage. Scope: incident promotion writer, hosted-close closure path, protected-path policy classification. Command: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: no lint errors. Scope: touched implementation and tests. Command: bun run agents:check; Result: pass; Evidence: agents templates OK. Scope: target/canonical policy sync contract in framework checkout.

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

- Updated: 2026-04-07T09:19:05.673Z
- Branch: task/202604070912-WV9YHM/sync-incident-assets
- Head: 498565593001

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
