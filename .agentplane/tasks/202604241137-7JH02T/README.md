---
id: "202604241137-7JH02T"
title: "v0.3 hygiene H2: decide bin d.ts packaging treatment"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-H753HG"
tags:
  - "build"
  - "cleanup"
  - "v0.3"
verify:
  - "find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print"
  - "npm pack --dry-run --ignore-scripts"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:37:42.305Z"
doc_updated_by: "CODER"
description: "Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions."
sections:
  Summary: |-
    v0.3 hygiene H2: decide bin d.ts packaging treatment
    
    Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
  Scope: |-
    - In scope: Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H2: decide bin d.ts packaging treatment".
  Plan: |-
    1. Implement the change for "v0.3 hygiene H2: decide bin d.ts packaging treatment".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H2: decide bin d.ts packaging treatment". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 hygiene H2: decide bin d.ts packaging treatment

Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.

## Scope

- In scope: Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H2: decide bin d.ts packaging treatment".

## Plan

1. Implement the change for "v0.3 hygiene H2: decide bin d.ts packaging treatment".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H2: decide bin d.ts packaging treatment". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
