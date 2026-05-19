---
id: "202605190828-MDXT5W"
title: "Repair website star gateway and docs IA"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  updated_at: "2026-05-19T08:29:01.313Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T11:35:08.349Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: PR #3925 head 40819d9f has successful GitHub Docs CI, Core CI test/test-windows, CodeQL, Dependency Review, and local verification recorded by CODER; scoped CodeQL smoke-script alert was fixed and rechecked."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T11:35:08.349Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: PR #3925 head 40819d9f has successful GitHub Docs CI, Core CI test/test-windows, CodeQL, Dependency Review, and local verification recorded by CODER; scoped CodeQL smoke-script alert was fixed and rechecked."
  evaluated_sha: "40819d9f1304b519e10a2a90eae727a7234597c6"
  blueprint_digest: "b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889"
  evidence_refs:
    - ".agentplane/tasks/202605190828-MDXT5W/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-MDXT5W-site-star-docs-ia/.agentplane/tasks/202605190828-MDXT5W/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved website and docs IA repair in the dedicated branch_pr worktree, preserving the user's update that only the navbar uses the GitHub Buttons Star control while hero and other CTAs link to GitHub without duplicating Star buttons."
events:
  -
    type: "status"
    at: "2026-05-19T08:30:09.571Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved website and docs IA repair in the dedicated branch_pr worktree, preserving the user's update that only the navbar uses the GitHub Buttons Star control while hero and other CTAs link to GitHub without duplicating Star buttons."
  -
    type: "verify"
    at: "2026-05-19T08:45:20.473Z"
    author: "CODER"
    state: "ok"
    note: "Verified website star gateway and docs IA repair in local branch_pr worktree: typecheck, content check, Docusaurus build, local site smoke, link check, policy routing, doctor, and browser QA passed with the only external caveat that GitHub Buttons iframe did not load in the local browser environment so the navbar falls back to a single visible Star link while still loading buttons.github.io."
  -
    type: "verify"
    at: "2026-05-19T11:35:08.349Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: PR #3925 head 40819d9f has successful GitHub Docs CI, Core CI test/test-windows, CodeQL, Dependency Review, and local verification recorded by CODER; scoped CodeQL smoke-script alert was fixed and rechecked."
doc_version: 3
doc_updated_at: "2026-05-19T11:35:08.367Z"
doc_updated_by: "CODER"
description: "Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage."
sections:
  Summary: |-
    Repair website star gateway and docs IA

    Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.
  Scope: |-
    - In scope: Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.
    - Out of scope: unrelated refactors not required for "Repair website star gateway and docs IA".
  Plan: "Scope: repair public website and docs IA after live audit. Plan: (1) update nav and homepage CTA/copy/proof/artifact sections around reviewable Git evidence and GitHub star conversion; (2) centralize homepage routes/proof constants and copyable install behavior; (3) clean public docs/sidebar by removing internal planning pages from public navigation, canonicalize ACR route with redirects, and rewrite docs root/quickstart/examples as guided onboarding surfaces; (4) add Docusaurus client redirects and site smoke script/package scripts for stale nav/internal text regression coverage; (5) verify with targeted stale-text searches, website build/smoke checks, policy routing, doctor, and task verification. Re-approval triggers: changes outside website/, docs public content/sidebar/config, package scripts, or task artifacts; network/deploy actions beyond read/build checks; skipping mandatory verification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair website star gateway and docs IA". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair website star gateway and docs IA". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T08:45:20.473Z — VERIFY — ok

    By: CODER

    Note: Verified website star gateway and docs IA repair in local branch_pr worktree: typecheck, content check, Docusaurus build, local site smoke, link check, policy routing, doctor, and browser QA passed with the only external caveat that GitHub Buttons iframe did not load in the local browser environment so the navbar falls back to a single visible Star link while still loading buttons.github.io.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:30:09.571Z, excerpt_hash=sha256:bae1c3ce0faeff2b1a0a4d48ce37055e29f008cef96b9dedd9b220bd2d8c0fb2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-MDXT5W-site-star-docs-ia/.agentplane/tasks/202605190828-MDXT5W/blueprint/resolved-snapshot.json
    - old_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
    - current_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190828-MDXT5W

    ### 2026-05-19T11:35:08.349Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: PR #3925 head 40819d9f has successful GitHub Docs CI, Core CI test/test-windows, CodeQL, Dependency Review, and local verification recorded by CODER; scoped CodeQL smoke-script alert was fixed and rechecked.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:45:20.530Z, excerpt_hash=sha256:bae1c3ce0faeff2b1a0a4d48ce37055e29f008cef96b9dedd9b220bd2d8c0fb2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-MDXT5W-site-star-docs-ia/.agentplane/tasks/202605190828-MDXT5W/blueprint/resolved-snapshot.json
    - old_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
    - current_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190828-MDXT5W

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: cd website && bun run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: website TypeScript and Docusaurus custom components.\nCommand: cd website && bun run build | Result: pass | Evidence: Generated static files in build | Scope: full website/docs static build.\nCommand: cd website && BASE_URL=http://localhost:3000 bun run smoke:site | Result: pass | Evidence: ok checked 8 routes and 4 redirects | Scope: homepage/docs/examples/blog routes plus legacy redirect pages.\nCommand: cd website && bun run check-links | Result: pass | Evidence: internal links ok; O'Reilly critical external returned 403 warning only | Scope: docs/site internal route checks.\nCommand: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing gate.\nCommand: ap doctor | Result: pass | Evidence: doctor OK, errors=0 warnings=0 | Scope: AgentPlane workflow/runtime health.\nCommand: Browser QA at http://localhost:3000/ | Result: pass | Evidence: nav has one Star occurrence, buttons.github.io script present, hero link is Open GitHub, reviewable Git copy present, View GitHub absent | Scope: visible navbar/hero behavior.
      Impact: Public site now presents reviewable Git evidence, keeps only one Star control in the navbar, removes internal planning pages from public navigation, and adds route smoke coverage for stale docs regressions.
      Resolution: Keep production deploy clean and purge CDN/static cache separately; this task changes source/build behavior but does not perform live provider cache invalidation.
id_source: "generated"
---
## Summary

Repair website star gateway and docs IA

Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.

## Scope

- In scope: Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.
- Out of scope: unrelated refactors not required for "Repair website star gateway and docs IA".

## Plan

Scope: repair public website and docs IA after live audit. Plan: (1) update nav and homepage CTA/copy/proof/artifact sections around reviewable Git evidence and GitHub star conversion; (2) centralize homepage routes/proof constants and copyable install behavior; (3) clean public docs/sidebar by removing internal planning pages from public navigation, canonicalize ACR route with redirects, and rewrite docs root/quickstart/examples as guided onboarding surfaces; (4) add Docusaurus client redirects and site smoke script/package scripts for stale nav/internal text regression coverage; (5) verify with targeted stale-text searches, website build/smoke checks, policy routing, doctor, and task verification. Re-approval triggers: changes outside website/, docs public content/sidebar/config, package scripts, or task artifacts; network/deploy actions beyond read/build checks; skipping mandatory verification.

## Verify Steps

PLANNER fallback scaffold for "Repair website star gateway and docs IA". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair website star gateway and docs IA". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T08:45:20.473Z — VERIFY — ok

By: CODER

Note: Verified website star gateway and docs IA repair in local branch_pr worktree: typecheck, content check, Docusaurus build, local site smoke, link check, policy routing, doctor, and browser QA passed with the only external caveat that GitHub Buttons iframe did not load in the local browser environment so the navbar falls back to a single visible Star link while still loading buttons.github.io.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:30:09.571Z, excerpt_hash=sha256:bae1c3ce0faeff2b1a0a4d48ce37055e29f008cef96b9dedd9b220bd2d8c0fb2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-MDXT5W-site-star-docs-ia/.agentplane/tasks/202605190828-MDXT5W/blueprint/resolved-snapshot.json
- old_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
- current_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190828-MDXT5W

### 2026-05-19T11:35:08.349Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: PR #3925 head 40819d9f has successful GitHub Docs CI, Core CI test/test-windows, CodeQL, Dependency Review, and local verification recorded by CODER; scoped CodeQL smoke-script alert was fixed and rechecked.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T08:45:20.530Z, excerpt_hash=sha256:bae1c3ce0faeff2b1a0a4d48ce37055e29f008cef96b9dedd9b220bd2d8c0fb2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190828-MDXT5W-site-star-docs-ia/.agentplane/tasks/202605190828-MDXT5W/blueprint/resolved-snapshot.json
- old_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
- current_digest: b5fd3d8cfa020e2c1773f093e98dd48f0bdce1d74abea3bd8255800c47720889
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190828-MDXT5W

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: cd website && bun run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: website TypeScript and Docusaurus custom components.\nCommand: cd website && bun run build | Result: pass | Evidence: Generated static files in build | Scope: full website/docs static build.\nCommand: cd website && BASE_URL=http://localhost:3000 bun run smoke:site | Result: pass | Evidence: ok checked 8 routes and 4 redirects | Scope: homepage/docs/examples/blog routes plus legacy redirect pages.\nCommand: cd website && bun run check-links | Result: pass | Evidence: internal links ok; O'Reilly critical external returned 403 warning only | Scope: docs/site internal route checks.\nCommand: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: policy routing gate.\nCommand: ap doctor | Result: pass | Evidence: doctor OK, errors=0 warnings=0 | Scope: AgentPlane workflow/runtime health.\nCommand: Browser QA at http://localhost:3000/ | Result: pass | Evidence: nav has one Star occurrence, buttons.github.io script present, hero link is Open GitHub, reviewable Git copy present, View GitHub absent | Scope: visible navbar/hero behavior.
  Impact: Public site now presents reviewable Git evidence, keeps only one Star control in the navbar, removes internal planning pages from public navigation, and adds route smoke coverage for stale docs regressions.
  Resolution: Keep production deploy clean and purge CDN/static cache separately; this task changes source/build behavior but does not perform live provider cache invalidation.
