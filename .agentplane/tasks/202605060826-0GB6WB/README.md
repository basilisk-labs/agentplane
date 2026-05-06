---
id: "202605060826-0GB6WB"
title: "Resolve trusted project-local blueprints explicitly"
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
  - "resolver"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:27:11.564Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T08:36:07.004Z"
  updated_by: "CODER"
  note: "Resolver now includes only explicitly trusted project-local blueprints and rejects untrusted ids."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement explicit trusted project-local blueprint resolver selection after the config gate."
events:
  -
    type: "status"
    at: "2026-05-06T08:27:29.168Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement explicit trusted project-local blueprint resolver selection after the config gate."
  -
    type: "verify"
    at: "2026-05-06T08:36:07.004Z"
    author: "CODER"
    state: "ok"
    note: "Resolver now includes only explicitly trusted project-local blueprints and rejects untrusted ids."
doc_version: 3
doc_updated_at: "2026-05-06T08:36:07.009Z"
doc_updated_by: "CODER"
description: "Allow resolver/explain to use project-local blueprints only when trusted config enables them and the task explicitly requests a compatible id."
sections:
  Summary: |-
    Resolve trusted project-local blueprints explicitly
    
    Allow resolver/explain to use project-local blueprints only when trusted config enables them and the task explicitly requests a compatible id.
  Scope: |-
    - In scope: Allow resolver/explain to use project-local blueprints only when trusted config enables them and the task explicitly requests a compatible id.
    - Out of scope: unrelated refactors not required for "Resolve trusted project-local blueprints explicitly".
  Plan: "After FZ9FV6, extend resolver/explain plumbing so project-local blueprints are selectable only when trusted config enables them and an explicit blueprint id or recipe preferred_blueprint requests a compatible local id. Built-in default selection remains unchanged."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T08:36:07.004Z — VERIFY — ok
    
    By: CODER
    
    Note: Resolver now includes only explicitly trusted project-local blueprints and rejects untrusted ids.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:27:29.168Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
