---
id: "202605061515-EPEVHQ"
title: "Document blueprint task selection examples"
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
  updated_at: "2026-05-06T15:16:45.189Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T15:25:42.779Z"
  updated_by: "DOCS"
  note: "Verified: developer blueprint documentation now includes CLI route inspection examples and generated CLI reference is fresh."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Document blueprint selection and inspection examples inside the approved blueprint discoverability batch."
events:
  -
    type: "status"
    at: "2026-05-06T15:17:21.396Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Document blueprint selection and inspection examples inside the approved blueprint discoverability batch."
  -
    type: "verify"
    at: "2026-05-06T15:25:42.779Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: developer blueprint documentation now includes CLI route inspection examples and generated CLI reference is fresh."
doc_version: 3
doc_updated_at: "2026-05-06T15:25:42.797Z"
doc_updated_by: "DOCS"
description: "Add practical documentation that shows how tasks choose blueprints and how users can inspect route selection."
sections:
  Summary: |-
    Document blueprint task selection examples
    
    Add practical documentation that shows how tasks choose blueprints and how users can inspect route selection.
  Scope: |-
    - In scope: Add practical documentation that shows how tasks choose blueprints and how users can inspect route selection.
    - Out of scope: unrelated refactors not required for "Document blueprint task selection examples".
  Plan: "Document practical blueprint selection and inspection examples. Scope: add/update user/developer docs showing built-in routes, common explain examples for analysis/content/code/release, and how to inspect task snapshots. Depends on the CLI surfaces from 202605061515-2W42MM. Verification: docs links exist, docs checks/generation if touched, doctor, diff check."
  Verify Steps: |-
    1. Review the requested outcome for "Document blueprint task selection examples". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T15:25:42.779Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: developer blueprint documentation now includes CLI route inspection examples and generated CLI reference is fresh.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T15:17:21.396Z, excerpt_hash=sha256:5bb61343fcd9c54437b566ad6dacb55e2df0a1c7f5147da865534dd215124488
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061515-2W42MM-blueprint-discoverability/.agentplane/tasks/202605061515-EPEVHQ/blueprint/resolved-snapshot.json
    - old_digest: 363b864d93d83941abf67aa2e9210162caf21b467c2f555ea47198eaad02982f
    - current_digest: 363b864d93d83941abf67aa2e9210162caf21b467c2f555ea47198eaad02982f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061515-EPEVHQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
