---
id: "202604092105-DBE1JB"
title: "Make integrate commit path tolerate expected stale-dist during base-side squash"
result_summary: "Merged via PR #229."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T21:05:48.674Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T21:36:19.110Z"
  updated_by: "INTEGRATOR"
  note: "Focused integrate and stale-dist regression checks passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned stale-dist bypass."
commit:
  hash: "d9e603cd42c5b2a52a6fd4e83e7601d41d86555c"
  message: "🐛 DBE1JB fix: scope stale-dist bypass to integrate commits (#229)"
comments:
  -
    author: "CODER"
    body: "Start: reproducing the base-side integrate stale-dist failure and narrowing the minimum safe override boundary."
  -
    author: "INTEGRATOR"
    body: "Verified: targeted integrate/stale-dist tests passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned bypass."
events:
  -
    type: "status"
    at: "2026-04-09T21:06:02.815Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the base-side integrate stale-dist failure and narrowing the minimum safe override boundary."
  -
    type: "verify"
    at: "2026-04-09T21:36:19.110Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Focused integrate and stale-dist regression checks passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned stale-dist bypass."
  -
    type: "status"
    at: "2026-04-09T21:36:52.650Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted integrate/stale-dist tests passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned bypass."
doc_version: 3
doc_updated_at: "2026-04-09T21:36:52.650Z"
doc_updated_by: "INTEGRATOR"
description: "agentplane integrate on base main currently fails when its own squash-commit path touches watched runtime files and the stale-dist guard blocks the internal git commit. Make the integrate-owned commit path deterministic without weakening normal stale-dist enforcement for regular commands."
sections:
  Summary: |-
    Make integrate commit path tolerate expected stale-dist during base-side squash
    
    agentplane integrate on base main currently fails when its own squash-commit path touches watched runtime files and the stale-dist guard blocks the internal git commit. Make the integrate-owned commit path deterministic without weakening normal stale-dist enforcement for regular commands.
  Scope: |-
    - In scope: agentplane integrate on base main currently fails when its own squash-commit path touches watched runtime files and the stale-dist guard blocks the internal git commit. Make the integrate-owned commit path deterministic without weakening normal stale-dist enforcement for regular commands.
    - Out of scope: unrelated refactors not required for "Make integrate commit path tolerate expected stale-dist during base-side squash".
  Plan: "1. Reproduce the integrate stale-dist failure against the current base-side squash path and isolate the smallest safe override boundary. 2. Change the integrate-owned commit path so only the internal commit operation can bypass stale-dist when the command itself is materializing the approved diff on base. 3. Add focused regression coverage proving integrate succeeds while ordinary stale-dist enforcement remains unchanged elsewhere."
  Verify Steps: "1. Reproduce the base-side integrate path on a fixture where watched runtime files are part of the task diff. Expected: integrate no longer fails only because its own squash commit temporarily makes the checkout look stale. 2. Verify ordinary stale-dist enforcement still blocks unrelated strict mutating commands outside the integrate-owned commit path. Expected: no broad weakening of the guard. 3. Run focused integrate and stale-dist regression tests. Expected: the new path is covered and existing stale-dist contracts stay green."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T21:36:19.110Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Focused integrate and stale-dist regression checks passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned stale-dist bypass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T21:06:02.821Z, excerpt_hash=sha256:44e37a342deafb8bf7e5906b1daf74c23378141467fb3d630162ef6c7177091b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make integrate commit path tolerate expected stale-dist during base-side squash

agentplane integrate on base main currently fails when its own squash-commit path touches watched runtime files and the stale-dist guard blocks the internal git commit. Make the integrate-owned commit path deterministic without weakening normal stale-dist enforcement for regular commands.

## Scope

- In scope: agentplane integrate on base main currently fails when its own squash-commit path touches watched runtime files and the stale-dist guard blocks the internal git commit. Make the integrate-owned commit path deterministic without weakening normal stale-dist enforcement for regular commands.
- Out of scope: unrelated refactors not required for "Make integrate commit path tolerate expected stale-dist during base-side squash".

## Plan

1. Reproduce the integrate stale-dist failure against the current base-side squash path and isolate the smallest safe override boundary. 2. Change the integrate-owned commit path so only the internal commit operation can bypass stale-dist when the command itself is materializing the approved diff on base. 3. Add focused regression coverage proving integrate succeeds while ordinary stale-dist enforcement remains unchanged elsewhere.

## Verify Steps

1. Reproduce the base-side integrate path on a fixture where watched runtime files are part of the task diff. Expected: integrate no longer fails only because its own squash commit temporarily makes the checkout look stale. 2. Verify ordinary stale-dist enforcement still blocks unrelated strict mutating commands outside the integrate-owned commit path. Expected: no broad weakening of the guard. 3. Run focused integrate and stale-dist regression tests. Expected: the new path is covered and existing stale-dist contracts stay green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T21:36:19.110Z — VERIFY — ok

By: INTEGRATOR

Note: Focused integrate and stale-dist regression checks passed in the task branch, PR #229 merged on main, and the base runtime now includes the scoped integrate-owned stale-dist bypass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T21:06:02.821Z, excerpt_hash=sha256:44e37a342deafb8bf7e5906b1daf74c23378141467fb3d630162ef6c7177091b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
