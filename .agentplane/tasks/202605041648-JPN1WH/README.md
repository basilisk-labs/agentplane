---
id: "202605041648-JPN1WH"
title: "Fix docs site SSG route conflicts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T16:48:53.661Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T16:55:45.968Z"
  updated_by: "CODER"
  note: "Command: bun run docs:site:build. Result: pass. Evidence: Docusaurus compiled client/server and generated static files in website/build; the duplicate / and /blog/ SSG failure no longer reproduces on current origin/main. Scope: public docs site SSG route generation. Command: bun run docs:site:typecheck. Result: pass. Evidence: tsc exited 0. Scope: website TypeScript page/theme code. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy routing. Command: agentplane doctor. Result: pass with warning. Evidence: doctor OK, warning only reports unrelated 202605041618-E011A7 branch_pr closure drift. Scope: workflow health."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce and fix the existing docs site SSG route conflict for / and /blog/ in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-04T16:53:16.135Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and fix the existing docs site SSG route conflict for / and /blog/ in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-04T16:55:45.968Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:site:build. Result: pass. Evidence: Docusaurus compiled client/server and generated static files in website/build; the duplicate / and /blog/ SSG failure no longer reproduces on current origin/main. Scope: public docs site SSG route generation. Command: bun run docs:site:typecheck. Result: pass. Evidence: tsc exited 0. Scope: website TypeScript page/theme code. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy routing. Command: agentplane doctor. Result: pass with warning. Evidence: doctor OK, warning only reports unrelated 202605041618-E011A7 branch_pr closure drift. Scope: workflow health."
doc_version: 3
doc_updated_at: "2026-05-04T16:55:45.977Z"
doc_updated_by: "CODER"
description: "Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete."
sections:
  Summary: |-
    Fix docs site SSG route conflicts
    
    Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.
  Scope: |-
    - In scope: Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.
    - Out of scope: unrelated refactors not required for "Fix docs site SSG route conflicts".
  Plan: "1. Reproduce the docs SSG failure in a task worktree and identify the duplicate route/default-export source for / and /blog/. 2. Apply the smallest routing/page fix in the website/docs surface without changing unrelated content or assets. 3. Verify with docs site build plus targeted type/lint/policy checks. 4. Publish through branch_pr and close the task after hosted checks pass."
  Verify Steps: |-
    1. Review the requested outcome for "Fix docs site SSG route conflicts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T16:55:45.968Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run docs:site:build. Result: pass. Evidence: Docusaurus compiled client/server and generated static files in website/build; the duplicate / and /blog/ SSG failure no longer reproduces on current origin/main. Scope: public docs site SSG route generation. Command: bun run docs:site:typecheck. Result: pass. Evidence: tsc exited 0. Scope: website TypeScript page/theme code. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy routing. Command: agentplane doctor. Result: pass with warning. Evidence: doctor OK, warning only reports unrelated 202605041618-E011A7 branch_pr closure drift. Scope: workflow health.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:53:16.135Z, excerpt_hash=sha256:dbc34095b3020ca1ead84d78bf6502c29222205b556f30a5fa4a1e950c9186b9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix docs site SSG route conflicts

Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.

## Scope

- In scope: Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.
- Out of scope: unrelated refactors not required for "Fix docs site SSG route conflicts".

## Plan

1. Reproduce the docs SSG failure in a task worktree and identify the duplicate route/default-export source for / and /blog/. 2. Apply the smallest routing/page fix in the website/docs surface without changing unrelated content or assets. 3. Verify with docs site build plus targeted type/lint/policy checks. 4. Publish through branch_pr and close the task after hosted checks pass.

## Verify Steps

1. Review the requested outcome for "Fix docs site SSG route conflicts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T16:55:45.968Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:site:build. Result: pass. Evidence: Docusaurus compiled client/server and generated static files in website/build; the duplicate / and /blog/ SSG failure no longer reproduces on current origin/main. Scope: public docs site SSG route generation. Command: bun run docs:site:typecheck. Result: pass. Evidence: tsc exited 0. Scope: website TypeScript page/theme code. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy routing. Command: agentplane doctor. Result: pass with warning. Evidence: doctor OK, warning only reports unrelated 202605041618-E011A7 branch_pr closure drift. Scope: workflow health.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:53:16.135Z, excerpt_hash=sha256:dbc34095b3020ca1ead84d78bf6502c29222205b556f30a5fa4a1e950c9186b9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
