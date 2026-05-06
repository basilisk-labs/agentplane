---
id: "202605060826-VY5AKF"
title: "Document trusted local blueprint selection"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:27:12.134Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T08:36:18.554Z"
  updated_by: "DOCS"
  note: "Blueprint documentation now describes trusted project-local config, explicit-only selection, recipe interaction, and CLI surfaces."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document trusted project-local blueprint selection after CLI behavior lands."
events:
  -
    type: "status"
    at: "2026-05-06T08:27:29.504Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document trusted project-local blueprint selection after CLI behavior lands."
  -
    type: "verify"
    at: "2026-05-06T08:36:18.554Z"
    author: "DOCS"
    state: "ok"
    note: "Blueprint documentation now describes trusted project-local config, explicit-only selection, recipe interaction, and CLI surfaces."
doc_version: 3
doc_updated_at: "2026-05-06T08:36:18.559Z"
doc_updated_by: "DOCS"
description: "Document opt-in project-local blueprint selection, trust boundaries, and recipe interaction constraints for implementation users."
sections:
  Summary: |-
    Document trusted local blueprint selection
    
    Document opt-in project-local blueprint selection, trust boundaries, and recipe interaction constraints for implementation users.
  Scope: |-
    - In scope: Document opt-in project-local blueprint selection, trust boundaries, and recipe interaction constraints for implementation users.
    - Out of scope: unrelated refactors not required for "Document trusted local blueprint selection".
  Plan: "After 97XHD3, update developer and CLI documentation for the trusted-local blueprint selection contract, including opt-in config, explicit-only selection, recipe hint boundaries, and safety constraints."
  Verify Steps: |-
    1. Review the requested outcome for "Document trusted local blueprint selection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T08:36:18.554Z — VERIFY — ok
    
    By: DOCS
    
    Note: Blueprint documentation now describes trusted project-local config, explicit-only selection, recipe interaction, and CLI surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:27:29.504Z, excerpt_hash=sha256:e560f80bb0080469de83ec07f9525d63beff4e3bf846485818b37e898e57fd5a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
