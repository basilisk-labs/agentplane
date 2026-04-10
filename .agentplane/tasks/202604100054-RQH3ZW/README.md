---
id: "202604100054-RQH3ZW"
title: "Keep incident promotion formatted and synced without manual follow-up"
result_summary: "integrate: squash task/202604100054-RQH3ZW/incident-promotion-hygiene"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:55:39.313Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T01:04:16.416Z"
  updated_by: "CODER"
  note: "bootstrap: bun run framework:dev:bootstrap; vitest: bun x vitest run packages/agentplane/src/commands/incidents/shared.test.ts; eslint: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/shared.test.ts"
commit:
  hash: "7a5121335ab9751074db1976d401bdb08f0e0582"
  message: "🎨 RQH3ZW task: format incident promotion test"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100054-RQH3ZW/pr."
events:
  -
    type: "verify"
    at: "2026-04-10T01:04:16.416Z"
    author: "CODER"
    state: "ok"
    note: "bootstrap: bun run framework:dev:bootstrap; vitest: bun x vitest run packages/agentplane/src/commands/incidents/shared.test.ts; eslint: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/shared.test.ts"
  -
    type: "status"
    at: "2026-04-10T01:22:06.971Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100054-RQH3ZW/pr."
doc_version: 3
doc_updated_at: "2026-04-10T01:22:06.973Z"
doc_updated_by: "INTEGRATOR"
description: "Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation."
sections:
  Summary: |-
    Keep incident promotion formatted and synced without manual follow-up
    
    Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
  Scope: |-
    - In scope: Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
    - Out of scope: unrelated refactors not required for "Keep incident promotion formatted and synced without manual follow-up".
  Plan: |-
    1. Reproduce incident promotion leaving incidents registries unsynced or unformatted.
    2. Make promotion update canonical and mirrored registry files in a hook-clean state.
    3. Add regression coverage that no manual prettier or agents:sync follow-up is needed.
    4. Verify with targeted tests and task lifecycle smoke checks.
  Verify Steps: |-
    1. Run the incident-promotion regression that updates the registry mirror. Expected: both registry paths end in a hook-clean state with no manual remediation step.
    2. Run formatting/template-sync validation on the touched incidents files. Expected: no `prettier` or `agents:sync` failure remains after the promotion path itself.
    3. Inspect canonical and mirrored incidents files. Expected: they remain synchronized after a single promotion operation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T01:04:16.416Z — VERIFY — ok
    
    By: CODER
    
    Note: bootstrap: bun run framework:dev:bootstrap; vitest: bun x vitest run packages/agentplane/src/commands/incidents/shared.test.ts; eslint: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/shared.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:54:48.657Z, excerpt_hash=sha256:ca63227b5323e5657a44836f0ada605dd7481c7d93416b1a77bb57265df6f196
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Keep incident promotion formatted and synced without manual follow-up

Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.

## Scope

- In scope: Make incident promotion update canonical and mirrored incidents registries in a format- and sync-safe way so later hooks do not require manual prettier or agents:sync remediation.
- Out of scope: unrelated refactors not required for "Keep incident promotion formatted and synced without manual follow-up".

## Plan

1. Reproduce incident promotion leaving incidents registries unsynced or unformatted.
2. Make promotion update canonical and mirrored registry files in a hook-clean state.
3. Add regression coverage that no manual prettier or agents:sync follow-up is needed.
4. Verify with targeted tests and task lifecycle smoke checks.

## Verify Steps

1. Run the incident-promotion regression that updates the registry mirror. Expected: both registry paths end in a hook-clean state with no manual remediation step.
2. Run formatting/template-sync validation on the touched incidents files. Expected: no `prettier` or `agents:sync` failure remains after the promotion path itself.
3. Inspect canonical and mirrored incidents files. Expected: they remain synchronized after a single promotion operation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T01:04:16.416Z — VERIFY — ok

By: CODER

Note: bootstrap: bun run framework:dev:bootstrap; vitest: bun x vitest run packages/agentplane/src/commands/incidents/shared.test.ts; eslint: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/incidents/shared.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:54:48.657Z, excerpt_hash=sha256:ca63227b5323e5657a44836f0ada605dd7481c7d93416b1a77bb57265df6f196

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
