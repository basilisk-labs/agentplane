## Summary

Keep incident promotion formatted and synced without manual follow-up

Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.

## Scope

- In scope: Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
- Out of scope: unrelated refactors not required for "Keep incident promotion formatted and synced without manual follow-up".

## Verification

### Plan

1. Run the incident-promotion regression that updates the registry mirror. Expected: both registry paths end in a hook-clean state with no manual remediation step.
2. Run formatting/template-sync validation on the touched incidents files. Expected: no `prettier` or `agents:sync` failure remains after the promotion path itself.
3. Inspect canonical and mirrored incidents files. Expected: they remain synchronized after a single promotion operation.

### Current Status

- State: ok
- Note: bootstrap: bun run framework:dev:bootstrap; vitest: bun x vitest run packages/agentplane/src/commands/incidents/shared.test.ts; eslint: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/shared.test.ts

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

- Updated: 2026-04-10T01:04:16.435Z
- Branch: task/202604100054-RQH3ZW/incident-promotion-hygiene
- Head: d809f42327b9

```text
 .agentplane/tasks/202604100054-RQH3ZW/README.md    |  92 +++++++++++++++
 .../src/commands/incidents/shared.test.ts          | 130 +++++++++++++++++++++
 .../agentplane/src/commands/incidents/shared.ts    |  18 ++-
 3 files changed, 238 insertions(+), 2 deletions(-)
```

</details>
