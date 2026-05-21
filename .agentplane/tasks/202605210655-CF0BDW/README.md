---
id: "202605210655-CF0BDW"
title: "Align website design source and docs routing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T06:55:43.157Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T07:11:45.397Z"
  updated_by: "CODER"
  note: "Updated website design contract to current Geist/orange/compact-radius language, verified docs IA, links, browser navigation, typecheck, build, smoke, policy routing, and ap doctor."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Updating the website design source, compact radius tokens, release proof metadata, and verifying docs/sidebar routes from the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-21T06:55:57.026Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating the website design source, compact radius tokens, release proof metadata, and verifying docs/sidebar routes from the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-21T07:11:45.397Z"
    author: "CODER"
    state: "ok"
    note: "Updated website design contract to current Geist/orange/compact-radius language, verified docs IA, links, browser navigation, typecheck, build, smoke, policy routing, and ap doctor."
doc_version: 3
doc_updated_at: "2026-05-21T07:11:45.430Z"
doc_updated_by: "CODER"
description: "Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly."
sections:
  Summary: |-
    Align website design source and docs routing

    Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.
  Scope: |-
    - In scope: Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.
    - Out of scope: unrelated refactors not required for "Align website design source and docs routing".
  Plan: |-
    1. Inspect current website CSS, Docusaurus config, sidebar/docs route generation, and DESIGN.md source.
    2. Update marketing/docs/website/DESIGN.md to codify the current Geist/Geist Mono, orange accent, 2-4px max surface radius, and floating glass navbar behavior.
    3. Adjust website CSS tokens so general radii stay within the requested 2-4px range while preserving pills for nav/secondary controls.
    4. Update stale homepage release proof to v0.6.4.
    5. Verify docs route behavior, sidebar links, link checks, build/typecheck/design checks, and browser smoke on local and production routes.
  Verify Steps: |-
    PLANNER fallback scaffold for "Align website design source and docs routing". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align website design source and docs routing". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T07:11:45.397Z — VERIFY — ok

    By: CODER

    Note: Updated website design contract to current Geist/orange/compact-radius language, verified docs IA, links, browser navigation, typecheck, build, smoke, policy routing, and ap doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:55:57.026Z, excerpt_hash=sha256:da49b220f959b0b9a4f3062e92f9f23dab6b1c3e2ac0a2c55c5f0094c68e62c7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210655-CF0BDW-website-design-routing/.agentplane/tasks/202605210655-CF0BDW/blueprint/resolved-snapshot.json
    - old_digest: b40a530c3553b008c48459c5c4f78308d0028612761a60aa198451d7058e9b50
    - current_digest: b40a530c3553b008c48459c5c4f78308d0028612761a60aa198451d7058e9b50
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210655-CF0BDW

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align website design source and docs routing

Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.

## Scope

- In scope: Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.
- Out of scope: unrelated refactors not required for "Align website design source and docs routing".

## Plan

1. Inspect current website CSS, Docusaurus config, sidebar/docs route generation, and DESIGN.md source.
2. Update marketing/docs/website/DESIGN.md to codify the current Geist/Geist Mono, orange accent, 2-4px max surface radius, and floating glass navbar behavior.
3. Adjust website CSS tokens so general radii stay within the requested 2-4px range while preserving pills for nav/secondary controls.
4. Update stale homepage release proof to v0.6.4.
5. Verify docs route behavior, sidebar links, link checks, build/typecheck/design checks, and browser smoke on local and production routes.

## Verify Steps

PLANNER fallback scaffold for "Align website design source and docs routing". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align website design source and docs routing". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T07:11:45.397Z — VERIFY — ok

By: CODER

Note: Updated website design contract to current Geist/orange/compact-radius language, verified docs IA, links, browser navigation, typecheck, build, smoke, policy routing, and ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:55:57.026Z, excerpt_hash=sha256:da49b220f959b0b9a4f3062e92f9f23dab6b1c3e2ac0a2c55c5f0094c68e62c7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210655-CF0BDW-website-design-routing/.agentplane/tasks/202605210655-CF0BDW/blueprint/resolved-snapshot.json
- old_digest: b40a530c3553b008c48459c5c4f78308d0028612761a60aa198451d7058e9b50
- current_digest: b40a530c3553b008c48459c5c4f78308d0028612761a60aa198451d7058e9b50
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210655-CF0BDW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
