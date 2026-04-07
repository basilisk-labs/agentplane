## Summary

Repair incident registry parsing, dedupe, and budget enforcement

Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.

## Scope

- In scope: Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.
- Out of scope: unrelated refactors not required for "Repair incident registry parsing, dedupe, and budget enforcement".

## Verification

### Plan

1. Run focused incidents tests. Expected: parser reads compact incidents.md entries and duplicate promotions do not reuse IDs.
2. Run policy routing check. Expected: .agentplane/policy/incidents.md and the mirrored asset stay within budget and check-routing passes.
3. Run focused lint on touched incidents files. Expected: incidents collection and registry writer paths lint cleanly.

### Current Status

- State: ok
- Note: Refreshed verification after source commit and pr open. Checks: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs. Evidence: current HEAD matches repaired incident registry parsing, dedupe, and budget guard.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T20:19:21.134Z
- Branch: task/202604071954-90V7J2/incident-registry-correctness
- Head: c54414324e55

```text
 .agentplane/policy/incidents.md                    |  14 ---
 .agentplane/tasks/202604071954-90V7J2/README.md    | 118 ++++++++++++++++++
 packages/agentplane/assets/policy/incidents.md     |  14 ---
 .../src/cli/run-cli.core.incidents.test.ts         | 109 +++++++++++++++++
 .../agentplane/src/commands/incidents/shared.ts    |  17 +++
 .../src/runtime/incidents/resolve.test.ts          | 136 +++++++++++++++++++++
 .../agentplane/src/runtime/incidents/resolve.ts    | 134 +++++++++++++++++---
 7 files changed, 497 insertions(+), 45 deletions(-)
```

</details>
