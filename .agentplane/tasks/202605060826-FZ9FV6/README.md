---
id: "202605060826-FZ9FV6"
title: "Add trusted project-local blueprint config"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:27:11.268Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T08:36:05.812Z"
  updated_by: "CODER"
  note: "Trusted project-local blueprint config implemented and validated."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement trusted project-local blueprint config in the shared batch worktree."
events:
  -
    type: "status"
    at: "2026-05-06T08:27:27.404Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement trusted project-local blueprint config in the shared batch worktree."
  -
    type: "verify"
    at: "2026-05-06T08:36:05.812Z"
    author: "CODER"
    state: "ok"
    note: "Trusted project-local blueprint config implemented and validated."
doc_version: 3
doc_updated_at: "2026-05-06T08:36:05.816Z"
doc_updated_by: "CODER"
description: "Define and validate an opt-in .agentplane/blueprints/config.json trust gate for project-local blueprint selection."
sections:
  Summary: |-
    Add trusted project-local blueprint config
    
    Define and validate an opt-in .agentplane/blueprints/config.json trust gate for project-local blueprint selection.
  Scope: |-
    - In scope: Define and validate an opt-in .agentplane/blueprints/config.json trust gate for project-local blueprint selection.
    - Out of scope: unrelated refactors not required for "Add trusted project-local blueprint config".
  Plan: "Implement the trust gate for project-local blueprints. Add a typed config model/parser for .agentplane/blueprints/config.json with default disabled behavior, allowed_ids validation, no built-in shadowing, and focused tests."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T08:36:05.812Z — VERIFY — ok
    
    By: CODER
    
    Note: Trusted project-local blueprint config implemented and validated.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:27:27.404Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
