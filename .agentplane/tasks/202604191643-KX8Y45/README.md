---
id: "202604191643-KX8Y45"
title: "Unify CLI error rendering and guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "errors"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T11:17:16.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Consolidating CLI error mapping and rendering into one central pipeline while preserving the existing text and JSON error output contract."
events:
  -
    type: "status"
    at: "2026-04-20T11:17:23.539Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Consolidating CLI error mapping and rendering into one central pipeline while preserving the existing text and JSON error output contract."
doc_version: 3
doc_updated_at: "2026-04-20T11:17:23.624Z"
doc_updated_by: "CODER"
description: "Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests."
sections:
  Summary: |-
    Unify CLI error rendering and guidance
    
    Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
  Scope: |-
    - In scope: Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
    - Out of scope: unrelated refactors not required for "Unify CLI error rendering and guidance".
  Plan: |-
    1. Move CLI error guidance/rendering out of run-cli/error-guidance.ts into the central cli/error-map.ts module alongside mapCoreError/mapBackendError.
    2. Keep the public rendering contract stable by preserving writeError output for text and JSON modes.
    3. Move resolveAgentplaneHome to update-warning.ts because it is update-cache plumbing, not error rendering.
    4. Delete the legacy error-guidance module and update imports.
    5. Add focused tests for writeError text/JSON guidance and run existing CLI error tests, lint, typecheck, and format.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Unify CLI error rendering and guidance

Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.

## Scope

- In scope: Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
- Out of scope: unrelated refactors not required for "Unify CLI error rendering and guidance".

## Plan

1. Move CLI error guidance/rendering out of run-cli/error-guidance.ts into the central cli/error-map.ts module alongside mapCoreError/mapBackendError.
2. Keep the public rendering contract stable by preserving writeError output for text and JSON modes.
3. Move resolveAgentplaneHome to update-warning.ts because it is update-cache plumbing, not error rendering.
4. Delete the legacy error-guidance module and update imports.
5. Add focused tests for writeError text/JSON guidance and run existing CLI error tests, lint, typecheck, and format.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
