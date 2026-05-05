---
id: "202605051735-RATKYP"
title: "Document cloud backend model"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T17:35:27.168Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T17:39:48.371Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass with pre-existing runtime/hook warnings only; Evidence: doctor OK, errors=0 warnings=4 info=7. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Additional check: rg forbidden pricing/enterprise terms in touched AgentPlane docs; Result: pass, no matches. Skipped: bun run docs:site:typecheck completed with dependency/tsconfig resolution failures in website workspace before docs-specific validation; Risk: sidebar type-level validation not proven by that command; Mitigation: docs:ia:check and policy routing passed, and generated JS artifacts from the failed command were removed."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Documenting the neutral local/cloud backend model, cloud connection mechanics, and the atomic public AgentPlane integration plan in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-05T17:35:39.318Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Documenting the neutral local/cloud backend model, cloud connection mechanics, and the atomic public AgentPlane integration plan in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-05T17:39:48.371Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass with pre-existing runtime/hook warnings only; Evidence: doctor OK, errors=0 warnings=4 info=7. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Additional check: rg forbidden pricing/enterprise terms in touched AgentPlane docs; Result: pass, no matches. Skipped: bun run docs:site:typecheck completed with dependency/tsconfig resolution failures in website workspace before docs-specific validation; Risk: sidebar type-level validation not proven by that command; Mitigation: docs:ia:check and policy routing passed, and generated JS artifacts from the failed command were removed."
doc_version: 3
doc_updated_at: "2026-05-05T17:39:48.378Z"
doc_updated_by: "DOCS"
description: "Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane."
sections:
  Summary: |-
    Document cloud backend model
    
    Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.
  Scope: |-
    - In scope: Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.
    - Out of scope: unrelated refactors not required for "Document cloud backend model".
  Plan: "1. Add a user-facing cloud backend page that describes local and cloud as neutral backend choices and explains the connect/sync mechanics. 2. Update backend overview, tasks/backends, setup, commands, and docs navigation so the new page is discoverable without describing pricing or enterprise packaging. 3. Add an implementation plan page that breaks public AgentPlane cloud-backend integration into atomic code/doc tasks. 4. Verify docs routing, policy routing, and repository health."
  Verify Steps: |-
    1. Review the requested outcome for "Document cloud backend model". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T17:39:48.371Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass with pre-existing runtime/hook warnings only; Evidence: doctor OK, errors=0 warnings=4 info=7. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Additional check: rg forbidden pricing/enterprise terms in touched AgentPlane docs; Result: pass, no matches. Skipped: bun run docs:site:typecheck completed with dependency/tsconfig resolution failures in website workspace before docs-specific validation; Risk: sidebar type-level validation not proven by that command; Mitigation: docs:ia:check and policy routing passed, and generated JS artifacts from the failed command were removed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T17:35:39.318Z, excerpt_hash=sha256:7a6145e938f35d1146308cb5b9bd47636bc4b82ab6f634417085cb0f65b9da50
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document cloud backend model

Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.

## Scope

- In scope: Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.
- Out of scope: unrelated refactors not required for "Document cloud backend model".

## Plan

1. Add a user-facing cloud backend page that describes local and cloud as neutral backend choices and explains the connect/sync mechanics. 2. Update backend overview, tasks/backends, setup, commands, and docs navigation so the new page is discoverable without describing pricing or enterprise packaging. 3. Add an implementation plan page that breaks public AgentPlane cloud-backend integration into atomic code/doc tasks. 4. Verify docs routing, policy routing, and repository health.

## Verify Steps

1. Review the requested outcome for "Document cloud backend model". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T17:39:48.371Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass with pre-existing runtime/hook warnings only; Evidence: doctor OK, errors=0 warnings=4 info=7. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Additional check: rg forbidden pricing/enterprise terms in touched AgentPlane docs; Result: pass, no matches. Skipped: bun run docs:site:typecheck completed with dependency/tsconfig resolution failures in website workspace before docs-specific validation; Risk: sidebar type-level validation not proven by that command; Mitigation: docs:ia:check and policy routing passed, and generated JS artifacts from the failed command were removed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T17:35:39.318Z, excerpt_hash=sha256:7a6145e938f35d1146308cb5b9bd47636bc4b82ab6f634417085cb0f65b9da50

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
