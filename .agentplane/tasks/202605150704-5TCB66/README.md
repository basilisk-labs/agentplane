---
id: "202605150704-5TCB66"
title: "Geist typography and website/blog layout refresh"
result_summary: "Merged via PR #3785."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T07:04:30.515Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-15T07:09:15.404Z"
  updated_by: "CODER"
  note: "Implemented Geist typography, basilisk-like floating navbar behavior, Product surfaces accordion, expanded spacing, and blog landing redesign in homepage style. Verified with prettier on changed files and website production build (docusaurus build)."
  attempts: 0
commit:
  hash: "2e34f9cc9d107f3300e882be73b28fcfe60026f3"
  message: "Merge pull request #3785 from basilisk-labs/task/202605150704-5TCB66/geist-navbar-accordion-blog"
comments:
  -
    author: "CODER"
    body: "Start: implementing Geist typography, basilisk-style navbar behavior, Product surfaces accordion conversion, spacing increases, and blog landing redesign with verification via formatting and website build."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3785 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-15T07:04:31.383Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing Geist typography, basilisk-style navbar behavior, Product surfaces accordion conversion, spacing increases, and blog landing redesign with verification via formatting and website build."
  -
    type: "verify"
    at: "2026-05-15T07:09:15.404Z"
    author: "CODER"
    state: "ok"
    note: "Implemented Geist typography, basilisk-like floating navbar behavior, Product surfaces accordion, expanded spacing, and blog landing redesign in homepage style. Verified with prettier on changed files and website production build (docusaurus build)."
  -
    type: "status"
    at: "2026-05-17T06:12:25.621Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3785 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T06:12:25.627Z"
doc_updated_by: "INTEGRATOR"
description: "Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language."
sections:
  Summary: |-
    Geist typography and website/blog layout refresh
    
    Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.
  Scope: |-
    - In scope: Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.
    - Out of scope: unrelated refactors not required for "Geist typography and website/blog layout refresh".
  Plan: "1) Switch website typography tokens and imports to Geist (sans + mono) across home/blog/navbar surfaces. 2) Align navbar behavior with basilisk-labs.com pattern (floating/scrolled state, compact interaction styling) without introducing heavy effects. 3) Replace Product surfaces card grid entry point with an accordion that reveals section details progressively. 4) Increase spacing/padding/gaps to add visual air on home and blog while preserving responsive breakpoints. 5) Redesign blog index page styles to share home visual language (grid, neutral surfaces, restrained accents). 6) Run format checks and website build."
  Verify Steps: |-
    PLANNER fallback scaffold for "Geist typography and website/blog layout refresh". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Geist typography and website/blog layout refresh". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-15T07:09:15.404Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented Geist typography, basilisk-like floating navbar behavior, Product surfaces accordion, expanded spacing, and blog landing redesign in homepage style. Verified with prettier on changed files and website production build (docusaurus build).
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T07:04:31.383Z, excerpt_hash=sha256:3b5eee183a59dedc5e9869487432b7e16aa15732d08b308a8bc8069ffb431605
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150704-5TCB66-geist-navbar-accordion-blog/.agentplane/tasks/202605150704-5TCB66/blueprint/resolved-snapshot.json
    - old_digest: ad8b8e15a80384a2bdf10fbd606da76c5a75f41fa5a258bd1883c937f3269d91
    - current_digest: ad8b8e15a80384a2bdf10fbd606da76c5a75f41fa5a258bd1883c937f3269d91
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605150704-5TCB66
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Geist typography and website/blog layout refresh

Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.

## Scope

- In scope: Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.
- Out of scope: unrelated refactors not required for "Geist typography and website/blog layout refresh".

## Plan

1) Switch website typography tokens and imports to Geist (sans + mono) across home/blog/navbar surfaces. 2) Align navbar behavior with basilisk-labs.com pattern (floating/scrolled state, compact interaction styling) without introducing heavy effects. 3) Replace Product surfaces card grid entry point with an accordion that reveals section details progressively. 4) Increase spacing/padding/gaps to add visual air on home and blog while preserving responsive breakpoints. 5) Redesign blog index page styles to share home visual language (grid, neutral surfaces, restrained accents). 6) Run format checks and website build.

## Verify Steps

PLANNER fallback scaffold for "Geist typography and website/blog layout refresh". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Geist typography and website/blog layout refresh". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-15T07:09:15.404Z — VERIFY — ok

By: CODER

Note: Implemented Geist typography, basilisk-like floating navbar behavior, Product surfaces accordion, expanded spacing, and blog landing redesign in homepage style. Verified with prettier on changed files and website production build (docusaurus build).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T07:04:31.383Z, excerpt_hash=sha256:3b5eee183a59dedc5e9869487432b7e16aa15732d08b308a8bc8069ffb431605

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150704-5TCB66-geist-navbar-accordion-blog/.agentplane/tasks/202605150704-5TCB66/blueprint/resolved-snapshot.json
- old_digest: ad8b8e15a80384a2bdf10fbd606da76c5a75f41fa5a258bd1883c937f3269d91
- current_digest: ad8b8e15a80384a2bdf10fbd606da76c5a75f41fa5a258bd1883c937f3269d91
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605150704-5TCB66

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
