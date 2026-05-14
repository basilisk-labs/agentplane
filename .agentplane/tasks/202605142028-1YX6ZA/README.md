---
id: "202605142028-1YX6ZA"
title: "Remove duplicate Recipes navbar link"
result_summary: "Merged via PR #3768."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T20:28:44.336Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T20:30:11.950Z"
  updated_by: "CODER"
  note: "Verified duplicate Recipes navbar regression is fixed."
  attempts: 0
commit:
  hash: "ade30a3d61cb6541c17cbebc38ff5fcc8b1c995e"
  message: "Merge pull request #3768 from basilisk-labs/task/202605142028-1YX6ZA/fix-duplicate-recipes-nav"
comments:
  -
    author: "CODER"
    body: "Start: remove duplicate Recipes navbar link found during live production verification and keep the docs onboarding navbar check green."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3768 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T20:28:54.639Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove duplicate Recipes navbar link found during live production verification and keep the docs onboarding navbar check green."
  -
    type: "verify"
    at: "2026-05-14T20:30:11.950Z"
    author: "CODER"
    state: "ok"
    note: "Verified duplicate Recipes navbar regression is fixed."
  -
    type: "status"
    at: "2026-05-14T20:32:09.469Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3768 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T20:32:09.476Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations."
sections:
  Summary: |-
    Remove duplicate Recipes navbar link
    
    Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.
  Scope: |-
    - In scope: Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.
    - Out of scope: unrelated refactors not required for "Remove duplicate Recipes navbar link".
  Plan: "Remove the duplicate Recipes navbar entry from the Docusaurus config, verify the onboarding/nav check still passes, rebuild the website, and confirm live output after merge."
  Verify Steps: |-
    PLANNER fallback scaffold for "Remove duplicate Recipes navbar link". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Remove duplicate Recipes navbar link". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T20:30:11.950Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified duplicate Recipes navbar regression is fixed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:28:54.639Z, excerpt_hash=sha256:07f88178a180212d3784c2a3a979e9c2d9d3596c9e6a7ef7cf3041227ddcf7ed
    
    Details:
    
    Checks: bun run --cwd website check-content; bun run docs:onboarding:check; node .agentplane/policy/check-routing.mjs; bun run docs:site:build; built homepage grep confirms one Recipes navbar link.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142028-1YX6ZA-fix-duplicate-recipes-nav/.agentplane/tasks/202605142028-1YX6ZA/blueprint/resolved-snapshot.json
    - old_digest: b256277467bfc3d8cc9434a288eedc416a8900481e6550acaf9af6a2da8efec4
    - current_digest: b256277467bfc3d8cc9434a288eedc416a8900481e6550acaf9af6a2da8efec4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605142028-1YX6ZA
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove duplicate Recipes navbar link

Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.

## Scope

- In scope: Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.
- Out of scope: unrelated refactors not required for "Remove duplicate Recipes navbar link".

## Plan

Remove the duplicate Recipes navbar entry from the Docusaurus config, verify the onboarding/nav check still passes, rebuild the website, and confirm live output after merge.

## Verify Steps

PLANNER fallback scaffold for "Remove duplicate Recipes navbar link". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Remove duplicate Recipes navbar link". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T20:30:11.950Z — VERIFY — ok

By: CODER

Note: Verified duplicate Recipes navbar regression is fixed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:28:54.639Z, excerpt_hash=sha256:07f88178a180212d3784c2a3a979e9c2d9d3596c9e6a7ef7cf3041227ddcf7ed

Details:

Checks: bun run --cwd website check-content; bun run docs:onboarding:check; node .agentplane/policy/check-routing.mjs; bun run docs:site:build; built homepage grep confirms one Recipes navbar link.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142028-1YX6ZA-fix-duplicate-recipes-nav/.agentplane/tasks/202605142028-1YX6ZA/blueprint/resolved-snapshot.json
- old_digest: b256277467bfc3d8cc9434a288eedc416a8900481e6550acaf9af6a2da8efec4
- current_digest: b256277467bfc3d8cc9434a288eedc416a8900481e6550acaf9af6a2da8efec4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605142028-1YX6ZA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
