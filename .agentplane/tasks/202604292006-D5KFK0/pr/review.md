# PR Review

Created: 2026-04-29T20:07:04.853Z
Branch: task/202604292006-D5KFK0/incident-findings-hardening

## Summary

Harden incident findings and release evidence diagnostics

Finish the interrupted incident findings hardening scope: prevent successful closure notes from being promoted as incidents, add scoped release/hosted-close evidence audit support, preserve the active incident registry against current main, and add regression coverage for release-mode git config pollution diagnostics.

## Scope

- In scope: Finish the interrupted incident findings hardening scope: prevent successful closure notes from being promoted as incidents, add scoped release/hosted-close evidence audit support, preserve the active incident registry against current main, and add regression coverage for release-mode git config pollution diagnostics.
- Out of scope: unrelated refactors not required for "Harden incident findings and release evidence diagnostics".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Incident findings hardening and release evidence diagnostics are implemented; declared verification passed.

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

- Updated: 2026-04-29T20:10:27.281Z
- Branch: task/202604292006-D5KFK0/incident-findings-hardening
- Head: 638426d5bbaa

```text
 .agentplane/policy/incidents.md                    |  24 +----
 docs/developer/incident-archive.mdx                |   8 ++
 packages/agentplane/assets/policy/incidents.md     |  24 +----
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  34 ++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  |  13 +++
 .../release/release-task-evidence-script.test.ts   |  87 ++++++++++++++--
 .../src/runtime/incidents/plan-strategy.ts         |  44 ++++++--
 .../src/runtime/incidents/resolve.test.ts          |  32 +++++-
 packages/agentplane/src/runtime/incidents/types.ts |   2 +-
 scripts/release-task-evidence.mjs                  | 115 ++++++++++++++++++++-
 scripts/run-pre-push-hook.mjs                      |  21 ++++
 11 files changed, 341 insertions(+), 63 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
