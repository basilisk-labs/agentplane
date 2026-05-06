---
id: "202605060826-97XHD3"
title: "Surface trusted blueprint selection in CLI and doctor"
result_summary: "Trusted blueprint CLI and doctor surfaces merged via PR #963."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "cli"
  - "doctor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:27:11.848Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T08:36:07.395Z"
  updated_by: "CODER"
  note: "CLI and doctor surfaces report trust config state and trusted selection behavior."
commit:
  hash: "dbfb872a8a2cf8ecae6099b3ddae4e0bc54dff8a"
  message: "Merge pull request #963 from basilisk-labs/task/202605060826-FZ9FV6/trusted-local-blueprints"
comments:
  -
    author: "CODER"
    body: "Start: surface trusted local blueprint decisions in CLI and doctor after resolver support."
  -
    author: "INTEGRATOR"
    body: "Verified: trusted blueprint CLI and doctor surfaces merged through PR #963 with green hosted checks."
events:
  -
    type: "status"
    at: "2026-05-06T08:27:29.335Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: surface trusted local blueprint decisions in CLI and doctor after resolver support."
  -
    type: "verify"
    at: "2026-05-06T08:36:07.395Z"
    author: "CODER"
    state: "ok"
    note: "CLI and doctor surfaces report trust config state and trusted selection behavior."
  -
    type: "status"
    at: "2026-05-06T08:55:46.141Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: trusted blueprint CLI and doctor surfaces merged through PR #963 with green hosted checks."
doc_version: 3
doc_updated_at: "2026-05-06T08:55:46.141Z"
doc_updated_by: "INTEGRATOR"
description: "Make blueprint list/explain/validate and doctor expose trusted local blueprint selection decisions and invalid trust config failures."
sections:
  Summary: |-
    Surface trusted blueprint selection in CLI and doctor
    
    Make blueprint list/explain/validate and doctor expose trusted local blueprint selection decisions and invalid trust config failures.
  Scope: |-
    - In scope: Make blueprint list/explain/validate and doctor expose trusted local blueprint selection decisions and invalid trust config failures.
    - Out of scope: unrelated refactors not required for "Surface trusted blueprint selection in CLI and doctor".
  Plan: "After 0GB6WB, surface trusted local selection through blueprint CLI and doctor: list/explain should report trusted local source and reasons, validate/doctor should reject invalid trust config or invalid trusted local registries without enabling execution."
  Verify Steps: |-
    1. Review the requested outcome for "Surface trusted blueprint selection in CLI and doctor". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T08:36:07.395Z — VERIFY — ok
    
    By: CODER
    
    Note: CLI and doctor surfaces report trust config state and trusted selection behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:27:29.335Z, excerpt_hash=sha256:668346bb0205eb89c221610eeaf9fe062a78377c450b0eeeae203035bb4edbdf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
