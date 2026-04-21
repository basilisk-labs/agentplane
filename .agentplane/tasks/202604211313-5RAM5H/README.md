---
id: "202604211313-5RAM5H"
title: "Bundle agentplane CLI entry with tsup"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211313-99AH4A"
tags:
  - "build"
  - "cli"
  - "perf"
verify:
  - "bun run bench:cli:cold"
  - "bun run build"
  - "bun run release:check"
  - "bun run test:project -- critical"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:15.848Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:13:14.918Z"
doc_updated_by: "PLANNER"
description: "Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper."
sections:
  Summary: |-
    Bundle agentplane CLI entry with tsup
    
    Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
  Scope: |-
    - In scope: Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
    - Out of scope: unrelated refactors not required for "Bundle agentplane CLI entry with tsup".
  Plan: "Scope: reduce CLI cold-path module loading. Steps: 1. Add tsup/esbuild config for agentplane CLI dist/cli.js. 2. Keep @agentplaneorg/core and @agentplaneorg/recipes external unless measurements show a safe alternative. 3. Preserve dist-guard and runtime-watch wrapper behavior in bin/agentplane.js. 4. Compare cold-start baseline before/after. Acceptance: critical CLI E2E passes; release check passes; cold-path result is recorded."
  Verify Steps: |-
    1. Review the requested outcome for "Bundle agentplane CLI entry with tsup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Bundle agentplane CLI entry with tsup

Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.

## Scope

- In scope: Prototype and adopt a bundled agentplane CLI entry while keeping bin/agentplane.js as the runtime/watch wrapper.
- Out of scope: unrelated refactors not required for "Bundle agentplane CLI entry with tsup".

## Plan

Scope: reduce CLI cold-path module loading. Steps: 1. Add tsup/esbuild config for agentplane CLI dist/cli.js. 2. Keep @agentplaneorg/core and @agentplaneorg/recipes external unless measurements show a safe alternative. 3. Preserve dist-guard and runtime-watch wrapper behavior in bin/agentplane.js. 4. Compare cold-start baseline before/after. Acceptance: critical CLI E2E passes; release check passes; cold-path result is recorded.

## Verify Steps

1. Review the requested outcome for "Bundle agentplane CLI entry with tsup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
