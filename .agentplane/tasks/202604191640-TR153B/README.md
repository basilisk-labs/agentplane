---
id: "202604191640-TR153B"
title: "Introduce structured core logger for CLI output"
result_summary: "core logger introduced and wired into cli output"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "logging"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T19:52:16.512Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T19:54:19.441Z"
  updated_by: "CODER"
  note: "Added a minimal core logger with text/json modes, routed cli/output.ts through it, and preserved the default human-readable output contract while adding NDJSON coverage."
commit:
  hash: "c12efb1de7f951b10edb4bc062fc9f051f4f5a89"
  message: "♻️ TR153B task: add core logger for cli output"
comments:
  -
    author: "CODER"
    body: "Start: defining a minimal core logger that can preserve existing human-readable CLI output while enabling an opt-in structured json mode through cli/output.ts."
  -
    author: "CODER"
    body: "Verified: cli output now uses the core logger backend, default text output stays stable, and json mode is available through AGENTPLANE_LOG=json."
events:
  -
    type: "status"
    at: "2026-04-19T19:52:16.592Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: defining a minimal core logger that can preserve existing human-readable CLI output while enabling an opt-in structured json mode through cli/output.ts."
  -
    type: "verify"
    at: "2026-04-19T19:54:19.441Z"
    author: "CODER"
    state: "ok"
    note: "Added a minimal core logger with text/json modes, routed cli/output.ts through it, and preserved the default human-readable output contract while adding NDJSON coverage."
  -
    type: "status"
    at: "2026-04-19T19:54:19.482Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: cli output now uses the core logger backend, default text output stays stable, and json mode is available through AGENTPLANE_LOG=json."
doc_version: 3
doc_updated_at: "2026-04-19T19:54:19.486Z"
doc_updated_by: "CODER"
description: "Epic B′ and H′. Add a minimal logger in core and route CLI output through it with optional structured mode."
sections:
  Summary: |-
    Introduce structured core logger for CLI output
    
    Epic B′ and H′. Add a minimal logger in core and route CLI output through it with optional structured mode.
  Scope: |-
    - In scope: Epic B′ and H′. Add a minimal logger in core and route CLI output through it with optional structured mode.
    - Out of scope: unrelated refactors not required for "Introduce structured core logger for CLI output".
  Plan: |-
    1. Implement the change for "Introduce structured core logger for CLI output".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T19:54:19.441Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a minimal core logger with text/json modes, routed cli/output.ts through it, and preserved the default human-readable output contract while adding NDJSON coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T19:52:16.623Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce structured core logger for CLI output

Epic B′ and H′. Add a minimal logger in core and route CLI output through it with optional structured mode.

## Scope

- In scope: Epic B′ and H′. Add a minimal logger in core and route CLI output through it with optional structured mode.
- Out of scope: unrelated refactors not required for "Introduce structured core logger for CLI output".

## Plan

1. Implement the change for "Introduce structured core logger for CLI output".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T19:54:19.441Z — VERIFY — ok

By: CODER

Note: Added a minimal core logger with text/json modes, routed cli/output.ts through it, and preserved the default human-readable output contract while adding NDJSON coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T19:52:16.623Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
