---
id: "202605051844-WCPBCX"
title: "Update roadmap for blueprint and cloud backend layer"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "roadmap"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:44:47.945Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T18:48:21.185Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: ROADMAP.md and roadmap blog update. Links: ROADMAP.md, website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx. Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 and warnings=4 for pre-existing global-in-framework/hook shim runtime state. Scope: repository policy/runtime health after docs-only change. Links: task README. Command: bunx prettier --check ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed roadmap docs. Links: changed docs. Command: git diff --check -- ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: no whitespace errors. Scope: changed roadmap docs. Links: changed docs."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update the roadmap release sequence so v0.5 covers the blueprint layer and cloud backend sync contour, while runner and evaluation work move to later releases."
events:
  -
    type: "status"
    at: "2026-05-05T18:45:07.174Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update the roadmap release sequence so v0.5 covers the blueprint layer and cloud backend sync contour, while runner and evaluation work move to later releases."
  -
    type: "verify"
    at: "2026-05-05T18:48:21.185Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: ROADMAP.md and roadmap blog update. Links: ROADMAP.md, website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx. Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 and warnings=4 for pre-existing global-in-framework/hook shim runtime state. Scope: repository policy/runtime health after docs-only change. Links: task README. Command: bunx prettier --check ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed roadmap docs. Links: changed docs. Command: git diff --check -- ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: no whitespace errors. Scope: changed roadmap docs. Links: changed docs."
doc_version: 3
doc_updated_at: "2026-05-05T18:48:21.226Z"
doc_updated_by: "DOCS"
description: "Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases."
sections:
  Summary: |-
    Update roadmap for blueprint and cloud backend layer
    
    Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.
  Scope: |-
    - In scope: Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.
    - Out of scope: unrelated refactors not required for "Update roadmap for blueprint and cloud backend layer".
  Plan: "1. Start a branch_pr worktree for the docs task. 2. Update ROADMAP.md to make v0.5 the blueprint layer and cloud backend selection/sync contour. 3. Move AgentPlane Runner to v0.6 and evaluation/recursive improvement to v0.7. 4. Keep the change docs-only and verify with policy routing, doctor, formatting, and diff checks."
  Verify Steps: |-
    1. Review the requested outcome for "Update roadmap for blueprint and cloud backend layer". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T18:48:21.185Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: ROADMAP.md and roadmap blog update. Links: ROADMAP.md, website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx. Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 and warnings=4 for pre-existing global-in-framework/hook shim runtime state. Scope: repository policy/runtime health after docs-only change. Links: task README. Command: bunx prettier --check ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed roadmap docs. Links: changed docs. Command: git diff --check -- ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: no whitespace errors. Scope: changed roadmap docs. Links: changed docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:45:07.174Z, excerpt_hash=sha256:3f7bf0161f73cf4517ab2daad4136f55455ac5a8b5dfda552a98d765b3ce1764
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Update roadmap for blueprint and cloud backend layer

Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.

## Scope

- In scope: Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.
- Out of scope: unrelated refactors not required for "Update roadmap for blueprint and cloud backend layer".

## Plan

1. Start a branch_pr worktree for the docs task. 2. Update ROADMAP.md to make v0.5 the blueprint layer and cloud backend selection/sync contour. 3. Move AgentPlane Runner to v0.6 and evaluation/recursive improvement to v0.7. 4. Keep the change docs-only and verify with policy routing, doctor, formatting, and diff checks.

## Verify Steps

1. Review the requested outcome for "Update roadmap for blueprint and cloud backend layer". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T18:48:21.185Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: ROADMAP.md and roadmap blog update. Links: ROADMAP.md, website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx. Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 and warnings=4 for pre-existing global-in-framework/hook shim runtime state. Scope: repository policy/runtime health after docs-only change. Links: task README. Command: bunx prettier --check ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed roadmap docs. Links: changed docs. Command: git diff --check -- ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: no whitespace errors. Scope: changed roadmap docs. Links: changed docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:45:07.174Z, excerpt_hash=sha256:3f7bf0161f73cf4517ab2daad4136f55455ac5a8b5dfda552a98d765b3ce1764

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
