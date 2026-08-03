---
id: "202608021535-CNQKXP"
title: "Add compatibility retirement inventory and doctor legacy"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "doctor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T18:25:57.298Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T18:26:18.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T18:26:18.257Z"
doc_updated_by: "CODER"
description: "Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations."
sections:
  Summary: |-
    Add compatibility retirement inventory and doctor legacy

    Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
  Scope: |-
    - In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
    - Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".
  Plan: |-
    1. Inventory every production compatibility and migration adapter in AgentPlane and core, assign a stable identifier, owner surface, introduced_in, deprecated_in, remove_in, migration_command, and deterministic usage_probe, and classify entries that cannot yet have a removal version.
    2. Add a packaged machine-readable manifest plus schema and validation so missing fields, duplicate identifiers, invalid semver windows, stale file references, and unknown probes fail deterministic checks.
    3. Add agentplane doctor legacy --json and human rendering that executes the registered probes, reports used, unused, unknown, or blocked status with exact evidence, and never deletes or migrates state.
    4. Move legacy protected-conflict adoption discovery under the advanced repair namespace while retaining the old command only as a hidden compatibility alias with deprecation guidance and unchanged authority/evidence behavior.
    5. Document the retirement policy and migration window, add current/legacy/malformed/probe-failure/package-smoke fixtures, then run compatibility, help-surface, critical, full fast, and repository contract gates before independent evaluation.
  Verify Steps: |-
    1. Run the compatibility-manifest schema and inventory tests. Expected: every registered production adapter has one unique manifest entry; semver windows, source paths, migration commands, and usage probes validate; malformed or stale entries fail closed.
    2. Run focused doctor legacy fixtures in human and JSON modes. Expected: current, used legacy, unused legacy, unavailable probe, and mixed states produce stable typed output without mutation; every finding names evidence and a migration command.
    3. Run command catalog/help and legacy conflict recovery tests. Expected: the default 11-operation help remains unchanged, repair exposes the advanced legacy-adoption path, the old command is hidden/deprecated, and authority plus recovery receipts remain byte-compatible.
    4. Build and inspect the publishable AgentPlane package. Expected: the manifest and required runtime files are shipped and doctor legacy works from the packed CLI fixture.
    5. Run bun run typecheck, bun run ci:contract, bun run test:critical, bun run test:fast, bun run knip:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: all maintained gates pass with no compatibility-baseline or trust-boundary growth.
    6. Generate and verify task evidence, then obtain an independent EVALUATOR pass against the exact implementation SHA.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "503e1a531103ef41ff3ef404fd55fbe442220e26"
    version: 1
id_source: "generated"
---
## Summary

Add compatibility retirement inventory and doctor legacy

Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.

## Scope

- In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
- Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".

## Plan

1. Inventory every production compatibility and migration adapter in AgentPlane and core, assign a stable identifier, owner surface, introduced_in, deprecated_in, remove_in, migration_command, and deterministic usage_probe, and classify entries that cannot yet have a removal version.
2. Add a packaged machine-readable manifest plus schema and validation so missing fields, duplicate identifiers, invalid semver windows, stale file references, and unknown probes fail deterministic checks.
3. Add agentplane doctor legacy --json and human rendering that executes the registered probes, reports used, unused, unknown, or blocked status with exact evidence, and never deletes or migrates state.
4. Move legacy protected-conflict adoption discovery under the advanced repair namespace while retaining the old command only as a hidden compatibility alias with deprecation guidance and unchanged authority/evidence behavior.
5. Document the retirement policy and migration window, add current/legacy/malformed/probe-failure/package-smoke fixtures, then run compatibility, help-surface, critical, full fast, and repository contract gates before independent evaluation.

## Verify Steps

1. Run the compatibility-manifest schema and inventory tests. Expected: every registered production adapter has one unique manifest entry; semver windows, source paths, migration commands, and usage probes validate; malformed or stale entries fail closed.
2. Run focused doctor legacy fixtures in human and JSON modes. Expected: current, used legacy, unused legacy, unavailable probe, and mixed states produce stable typed output without mutation; every finding names evidence and a migration command.
3. Run command catalog/help and legacy conflict recovery tests. Expected: the default 11-operation help remains unchanged, repair exposes the advanced legacy-adoption path, the old command is hidden/deprecated, and authority plus recovery receipts remain byte-compatible.
4. Build and inspect the publishable AgentPlane package. Expected: the manifest and required runtime files are shipped and doctor legacy works from the packed CLI fixture.
5. Run bun run typecheck, bun run ci:contract, bun run test:critical, bun run test:fast, bun run knip:check, bun run hotspots:check, and node .agentplane/policy/check-routing.mjs. Expected: all maintained gates pass with no compatibility-baseline or trust-boundary growth.
6. Generate and verify task evidence, then obtain an independent EVALUATOR pass against the exact implementation SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
