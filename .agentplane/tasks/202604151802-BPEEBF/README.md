---
id: "202604151802-BPEEBF"
title: "Prefer exact release-ready alias over generic artifact"
result_summary: "Merged via PR #327."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T18:03:34.695Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T18:05:33.489Z"
  updated_by: "CODER"
  note: "Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run."
commit:
  hash: "0b2aec4ba0d1c7642e9d3228322394fd1ebca6d3"
  message: "release: Prefer exact release-ready alias over generic artifact (BPEEBF) (#327)"
comments:
  -
    author: "CODER"
    body: "Start: prefer exact release-ready alias over the generic artifact on the selected exact-SHA run, add the minimal same-sha dual-artifact regression test, then replay the protected-main publish path for v0.3.12."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #327 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T18:04:18.393Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prefer exact release-ready alias over the generic artifact on the selected exact-SHA run, add the minimal same-sha dual-artifact regression test, then replay the protected-main publish path for v0.3.12."
  -
    type: "verify"
    at: "2026-04-15T18:05:33.489Z"
    author: "CODER"
    state: "ok"
    note: "Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run."
  -
    type: "status"
    at: "2026-04-15T18:12:44.829Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #327 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T18:12:44.834Z"
doc_updated_by: "INTEGRATOR"
description: "Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload."
sections:
  Summary: |-
    Prefer exact release-ready alias over generic artifact
    
    Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.
  Scope: |-
    - In scope: Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.
    - Out of scope: unrelated refactors not required for "Prefer exact release-ready alias over generic artifact".
  Plan: |-
    1. Change release-ready artifact selection to prefer release-ready-<sha> over the generic release-ready artifact whenever both are present for the selected exact-SHA run -> verify: resolver fixture with both artifacts returns the alias artifact name.
    2. Keep the publish workflow contract unchanged and add only the minimal resolver regression coverage required for the same-sha dual-artifact case -> verify: targeted vitest for resolve-release-ready-source passes.
    3. Replay the protected-main publish path for v0.3.12 after landing the fix -> verify: publish.yml succeeds, remote tag v0.3.12 exists, npm shows 0.3.12 for both packages.
  Verify Steps: |-
    1. Review the requested outcome for "Prefer exact release-ready alias over generic artifact". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T18:05:33.489Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T18:04:18.414Z, excerpt_hash=sha256:d6fe74b7f654b551c2a1c6a24ec97ab35b289fe097ce203610c8adacb2ae95f5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prefer exact release-ready alias over generic artifact

Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.

## Scope

- In scope: Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.
- Out of scope: unrelated refactors not required for "Prefer exact release-ready alias over generic artifact".

## Plan

1. Change release-ready artifact selection to prefer release-ready-<sha> over the generic release-ready artifact whenever both are present for the selected exact-SHA run -> verify: resolver fixture with both artifacts returns the alias artifact name.
2. Keep the publish workflow contract unchanged and add only the minimal resolver regression coverage required for the same-sha dual-artifact case -> verify: targeted vitest for resolve-release-ready-source passes.
3. Replay the protected-main publish path for v0.3.12 after landing the fix -> verify: publish.yml succeeds, remote tag v0.3.12 exists, npm shows 0.3.12 for both packages.

## Verify Steps

1. Review the requested outcome for "Prefer exact release-ready alias over generic artifact". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T18:05:33.489Z — VERIFY — ok

By: CODER

Note: Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T18:04:18.414Z, excerpt_hash=sha256:d6fe74b7f654b551c2a1c6a24ec97ab35b289fe097ce203610c8adacb2ae95f5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
