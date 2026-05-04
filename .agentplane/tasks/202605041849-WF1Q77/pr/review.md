# PR Review

Created: 2026-05-04T18:55:16.828Z
Branch: task/202605041849-WF1Q77/teaching-diagnostics

## Summary

Make diagnostics teach remediation

Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.

## Scope

- In scope: Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.
- Out of scope: unrelated refactors not required for "Make diagnostics teach remediation".

## Verification

### Plan

1. Run focused tests for the shared diagnostic remediation contract and each touched integration point. Expected: tests assert code, why, fix, safe command, and stop condition render in agent-facing output without dropping existing diagnostic codes.
2. Run bun run typecheck. Expected: TypeScript passes for changed diagnostic surfaces.
3. Run git diff --check. Expected: no whitespace or patch-format issues.
4. Run bun run framework:dev:bootstrap, or record a concrete pre-existing bootstrap blocker if the local dependency layout remains outside this task's fix. Expected: repo-local runtime can rebuild and explain itself.
5. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both complete, and any diagnostic failure includes actionable remediation fields.

### Current Status

- State: ok
- Note: Focused remediation diagnostics implementation verified: ACR, workflow doctor, policy routing, and framework runtime dependency surfaces now emit or preserve actionable code, why, fix, safe command, and stop condition guidance with regression coverage.

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

- Updated: 2026-05-04T19:05:07.465Z
- Branch: task/202605041849-WF1Q77/teaching-diagnostics
- Head: 50405bd32810

```text
 .../agentplane/assets/policy/check-routing.mjs     | 46 ++++++++++-
 packages/agentplane/bin/agentplane.js              |  7 +-
 .../src/agents/policy-routing-check.test.ts        | 50 ++++++++++++
 packages/agentplane/src/cli/error-map.ts           | 15 ++++
 .../agentplane/src/cli/stale-dist-readonly.test.ts | 66 +++++++++++++++-
 .../src/commands/acr/acr.command.test.ts           | 13 ++++
 .../agentplane/src/commands/acr/acr.command.ts     | 77 +++++++++++++++++++
 .../agentplane/src/commands/doctor/workflow.ts     |  5 +-
 .../agentplane/src/commands/shared/diagnostics.ts  | 35 +++++++++
 .../src/shared/diagnostic-remediation.ts           | 17 +++++
 packages/agentplane/src/shared/errors.ts           | 16 ++++
 packages/agentplane/src/workflow-runtime/types.ts  |  7 ++
 .../src/workflow-runtime/validate.test.ts          |  7 ++
 .../src/workflow-runtime/validation-helpers.ts     | 88 +++++++++++++++++++++-
 14 files changed, 442 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
