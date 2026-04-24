---
id: "202604241137-PT2V56"
title: "v0.3 freeze G2: accept ADR for v0.3 surface freeze"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604241137-DFNX5S"
tags:
  - "adr"
  - "docs"
  - "v0.3"
verify:
  - "rg -n 'Accepted|0\\.3|0\\.4' docs/adr/0011-v0.3-surface-freeze.md"
  - "test -f docs/adr/0011-v0.3-surface-freeze.md"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T13:54:02.075Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T13:55:43.933Z"
  updated_by: "DOCS"
  note: "Verified G2: ADR 0011 exists, contains Accepted plus 0.3/0.4/FREEZE.v0.3.md markers, ADR README index references it, policy routing passes, doctor passes, format:check passes, and git diff --check passes."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Adding ADR 0011 for the accepted v0.3 surface freeze decision, scoped to docs only, then validating ADR markers, routing, doctor, formatting, and diff cleanliness."
events:
  -
    type: "status"
    at: "2026-04-24T13:54:09.833Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding ADR 0011 for the accepted v0.3 surface freeze decision, scoped to docs only, then validating ADR markers, routing, doctor, formatting, and diff cleanliness."
  -
    type: "verify"
    at: "2026-04-24T13:55:43.933Z"
    author: "DOCS"
    state: "ok"
    note: "Verified G2: ADR 0011 exists, contains Accepted plus 0.3/0.4/FREEZE.v0.3.md markers, ADR README index references it, policy routing passes, doctor passes, format:check passes, and git diff --check passes."
doc_version: 3
doc_updated_at: "2026-04-24T13:55:43.962Z"
doc_updated_by: "DOCS"
description: "Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4."
sections:
  Summary: |-
    v0.3 freeze G2: accept ADR for v0.3 surface freeze
    
    Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
  Scope: |-
    - In scope: Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
    - Out of scope: unrelated refactors not required for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".
  Plan: |-
    1. Add docs/adr/0011-v0.3-surface-freeze.md with Status Accepted, date 2026-04-24, context from FREEZE.v0.3.md, frozen 0.3.x surfaces, allowed internal changes, and v0.4 migration pointer.
    2. Keep the change docs-only: no release state, version, task graph, or policy mutation.
    3. Verify the ADR exists and contains Accepted/0.3/0.4 markers, then run routing, doctor, format, and diff checks.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze G2: accept ADR for v0.3 surface freeze". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:55:43.933Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified G2: ADR 0011 exists, contains Accepted plus 0.3/0.4/FREEZE.v0.3.md markers, ADR README index references it, policy routing passes, doctor passes, format:check passes, and git diff --check passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:54:09.870Z, excerpt_hash=sha256:56349c869c80a633f7c77efb157ce56e1f0d82e838b20bdb58b1f40feec14a88
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze G2: accept ADR for v0.3 surface freeze

Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.

## Scope

- In scope: Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
- Out of scope: unrelated refactors not required for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".

## Plan

1. Add docs/adr/0011-v0.3-surface-freeze.md with Status Accepted, date 2026-04-24, context from FREEZE.v0.3.md, frozen 0.3.x surfaces, allowed internal changes, and v0.4 migration pointer.
2. Keep the change docs-only: no release state, version, task graph, or policy mutation.
3. Verify the ADR exists and contains Accepted/0.3/0.4 markers, then run routing, doctor, format, and diff checks.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze G2: accept ADR for v0.3 surface freeze". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:55:43.933Z — VERIFY — ok

By: DOCS

Note: Verified G2: ADR 0011 exists, contains Accepted plus 0.3/0.4/FREEZE.v0.3.md markers, ADR README index references it, policy routing passes, doctor passes, format:check passes, and git diff --check passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:54:09.870Z, excerpt_hash=sha256:56349c869c80a633f7c77efb157ce56e1f0d82e838b20bdb58b1f40feec14a88

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
