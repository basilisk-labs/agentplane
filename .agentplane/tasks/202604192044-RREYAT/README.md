---
id: "202604192044-RREYAT"
title: "Harden direct finish against unrelated active task dirtiness"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T20:45:57.819Z"
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
    body: "Start: implement a config-backed direct close-tail dirt policy, tighten finish/commit preflight around active task READMEs, and fix adjacent workflow reporting defects discovered during B-prime."
events:
  -
    type: "status"
    at: "2026-04-19T20:45:59.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a config-backed direct close-tail dirt policy, tighten finish/commit preflight around active task READMEs, and fix adjacent workflow reporting defects discovered during B-prime."
doc_version: 3
doc_updated_at: "2026-04-19T20:45:59.474Z"
doc_updated_by: "CODER"
description: "Current epic follow-up. Let finish/close in direct mode succeed when tracked dirt comes only from other active task READMEs; add explicit initialization/config behavior for close-commit dirtiness handling and fix surfaced workflow defects discovered during B′."
sections:
  Summary: |-
    Harden direct finish against unrelated active task dirtiness
    
    Current epic follow-up. Let finish/close in direct mode succeed when tracked dirt comes only from other active task READMEs; add explicit initialization/config behavior for close-commit dirtiness handling and fix surfaced workflow defects discovered during B′.
  Scope: |-
    - In scope: Current epic follow-up. Let finish/close in direct mode succeed when tracked dirt comes only from other active task READMEs; add explicit initialization/config behavior for close-commit dirtiness handling and fix surfaced workflow defects discovered during B′.
    - Out of scope: unrelated refactors not required for "Harden direct finish against unrelated active task dirtiness".
  Plan: "1. Add explicit direct close-dirt policy in config and init surfaces with documented modes for strict blocking vs tolerating other active task READMEs. 2. Refactor direct finish/close preflight to classify tracked dirt and allow only the configured safe subset instead of requiring a globally clean tracked tree. 3. Fix surfaced workflow UX defects in the same path, including commit output that hides the primary task commit behind the auto artifact-refresh commit. 4. Verify with focused unit/CLI tests covering strict mode, tolerant mode, init parsing, and commit reporting."
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

Harden direct finish against unrelated active task dirtiness

Current epic follow-up. Let finish/close in direct mode succeed when tracked dirt comes only from other active task READMEs; add explicit initialization/config behavior for close-commit dirtiness handling and fix surfaced workflow defects discovered during B′.

## Scope

- In scope: Current epic follow-up. Let finish/close in direct mode succeed when tracked dirt comes only from other active task READMEs; add explicit initialization/config behavior for close-commit dirtiness handling and fix surfaced workflow defects discovered during B′.
- Out of scope: unrelated refactors not required for "Harden direct finish against unrelated active task dirtiness".

## Plan

1. Add explicit direct close-dirt policy in config and init surfaces with documented modes for strict blocking vs tolerating other active task READMEs. 2. Refactor direct finish/close preflight to classify tracked dirt and allow only the configured safe subset instead of requiring a globally clean tracked tree. 3. Fix surfaced workflow UX defects in the same path, including commit output that hides the primary task commit behind the auto artifact-refresh commit. 4. Verify with focused unit/CLI tests covering strict mode, tolerant mode, init parsing, and commit reporting.

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
