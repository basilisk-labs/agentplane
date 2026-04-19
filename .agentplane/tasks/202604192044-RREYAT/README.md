---
id: "202604192044-RREYAT"
title: "Harden direct finish against unrelated active task dirtiness"
result_summary: "direct close-tail dirt policy is config-backed and tolerant only for other active task READMEs; init exposes both tolerant and strict modes; execa git-commit failures map back to structured commit diagnostics"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-19T21:00:59.485Z"
  updated_by: "CODER"
  note: "Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping."
commit:
  hash: "f8760a4601fe5ea1dc32f654ebb7902a0116594f"
  message: "🛠️ RREYAT task: harden direct close-tail dirt policy"
comments:
  -
    author: "CODER"
    body: "Start: implement a config-backed direct close-tail dirt policy, tighten finish/commit preflight around active task READMEs, and fix adjacent workflow reporting defects discovered during B-prime."
  -
    author: "CODER"
    body: "Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping."
events:
  -
    type: "status"
    at: "2026-04-19T20:45:59.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a config-backed direct close-tail dirt policy, tighten finish/commit preflight around active task READMEs, and fix adjacent workflow reporting defects discovered during B-prime."
  -
    type: "verify"
    at: "2026-04-19T21:00:59.485Z"
    author: "CODER"
    state: "ok"
    note: "Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping."
  -
    type: "status"
    at: "2026-04-19T21:00:59.510Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping."
doc_version: 3
doc_updated_at: "2026-04-19T21:00:59.512Z"
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
    ### 2026-04-19T21:00:59.485Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T20:45:59.474Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-04-19T21:00:59.485Z — VERIFY — ok

By: CODER

Note: Verified: config schema tests, guard unit tests, real CLI close-flow regression, init CLI regression, core/agentplane typecheck, core/agentplane build, schemas:check, and framework bootstrap all passed after introducing the direct close dirt policy and restoring structured git-commit failure mapping.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T20:45:59.474Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
