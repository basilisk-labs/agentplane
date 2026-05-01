---
id: "202605010749-TD7XPM"
title: "Shorten launch homepage gateway"
status: "DOING"
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
  updated_at: "2026-05-01T07:49:54.693Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T08:14:40.607Z"
  updated_by: "CODER"
  note: "Homepage gateway implementation verified locally: diff whitespace, Prettier check, site typecheck, Docusaurus build, DESIGN.md guard, targeted homepage/config ESLint, and desktop/mobile Playwright render passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved short homepage gateway in the task worktree, limiting changes to homepage content/layout/styles and local verification."
events:
  -
    type: "status"
    at: "2026-05-01T07:50:11.588Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved short homepage gateway in the task worktree, limiting changes to homepage content/layout/styles and local verification."
  -
    type: "verify"
    at: "2026-05-01T08:14:40.607Z"
    author: "CODER"
    state: "ok"
    note: "Homepage gateway implementation verified locally: diff whitespace, Prettier check, site typecheck, Docusaurus build, DESIGN.md guard, targeted homepage/config ESLint, and desktop/mobile Playwright render passed."
doc_version: 3
doc_updated_at: "2026-05-01T08:14:40.616Z"
doc_updated_by: "CODER"
description: "Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA."
sections:
  Summary: |-
    Shorten launch homepage gateway
    
    Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.
  Scope: |-
    - In scope: Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.
    - Out of scope: unrelated refactors not required for "Shorten launch homepage gateway".
  Plan: |-
    1. Start a dedicated branch_pr worktree from current origin/main.
    2. Inspect DESIGN.md and current homepage component/data/CSS.
    3. Replace the homepage with the six-block launch gateway: header, hero, demo/proof, core workflow, repo-local artifacts, docs paths, final CTA.
    4. Keep install copy interactions, GitHub/Docs/Recipes CTAs, and responsive layout; remove long FAQ/workflow-mode/problem sections from the homepage.
    5. Run formatting/typecheck/website build/design validation and record verification evidence.
  Verify Steps: |-
    1. Run git diff --check. Expected: no whitespace errors.
    2. Run bunx prettier --check website/src/data/homepage-content.ts website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css website/docusaurus.config.ts website/src/theme/Root.tsx. Expected: all touched files use Prettier style.
    3. Run bun run docs:site:typecheck. Expected: TypeScript succeeds after website dependencies are available in the worktree.
    4. Run bun run docs:site:build. Expected: Docusaurus production build succeeds.
    5. Run bun run docs:site:check:design. Expected: DESIGN.md compliance check passes.
    6. Run targeted eslint on homepage/config files and inspect desktop/mobile Playwright render. Expected: homepage/config lint passes; GitHub and Docs CTAs plus copy command are visible in the hero.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T08:14:40.607Z — VERIFY — ok
    
    By: CODER
    
    Note: Homepage gateway implementation verified locally: diff whitespace, Prettier check, site typecheck, Docusaurus build, DESIGN.md guard, targeted homepage/config ESLint, and desktop/mobile Playwright render passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:14:07.611Z, excerpt_hash=sha256:5e28e5371c8da4088564374eb0b86db22ffbefc90fd729d4e2ae5b19dfccbae4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: git diff --check; bunx prettier --check touched homepage/header files; bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bunx eslint website/src/pages/index.tsx website/docusaurus.config.ts. Playwright confirmed desktop hero CTAs and mobile GitHub/header/hero CTAs. Clipboard readback was browser-permission denied after click, but the copy click handler executed.
      Impact: Homepage now reads as a short launch gateway instead of a long explainer; GitHub, docs, recipes, and install copy paths are prioritized.
      Resolution: Full bun run lint:website was not used as the required gate because it still reports existing swizzled Docusaurus theme typed-lint errors outside the homepage scope.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Shorten launch homepage gateway

Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.

## Scope

- In scope: Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.
- Out of scope: unrelated refactors not required for "Shorten launch homepage gateway".

## Plan

1. Start a dedicated branch_pr worktree from current origin/main.
2. Inspect DESIGN.md and current homepage component/data/CSS.
3. Replace the homepage with the six-block launch gateway: header, hero, demo/proof, core workflow, repo-local artifacts, docs paths, final CTA.
4. Keep install copy interactions, GitHub/Docs/Recipes CTAs, and responsive layout; remove long FAQ/workflow-mode/problem sections from the homepage.
5. Run formatting/typecheck/website build/design validation and record verification evidence.

## Verify Steps

1. Run git diff --check. Expected: no whitespace errors.
2. Run bunx prettier --check website/src/data/homepage-content.ts website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css website/docusaurus.config.ts website/src/theme/Root.tsx. Expected: all touched files use Prettier style.
3. Run bun run docs:site:typecheck. Expected: TypeScript succeeds after website dependencies are available in the worktree.
4. Run bun run docs:site:build. Expected: Docusaurus production build succeeds.
5. Run bun run docs:site:check:design. Expected: DESIGN.md compliance check passes.
6. Run targeted eslint on homepage/config files and inspect desktop/mobile Playwright render. Expected: homepage/config lint passes; GitHub and Docs CTAs plus copy command are visible in the hero.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T08:14:40.607Z — VERIFY — ok

By: CODER

Note: Homepage gateway implementation verified locally: diff whitespace, Prettier check, site typecheck, Docusaurus build, DESIGN.md guard, targeted homepage/config ESLint, and desktop/mobile Playwright render passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:14:07.611Z, excerpt_hash=sha256:5e28e5371c8da4088564374eb0b86db22ffbefc90fd729d4e2ae5b19dfccbae4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: git diff --check; bunx prettier --check touched homepage/header files; bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bunx eslint website/src/pages/index.tsx website/docusaurus.config.ts. Playwright confirmed desktop hero CTAs and mobile GitHub/header/hero CTAs. Clipboard readback was browser-permission denied after click, but the copy click handler executed.
  Impact: Homepage now reads as a short launch gateway instead of a long explainer; GitHub, docs, recipes, and install copy paths are prioritized.
  Resolution: Full bun run lint:website was not used as the required gate because it still reports existing swizzled Docusaurus theme typed-lint errors outside the homepage scope.
  Promotion: incident-candidate
  Fixability: external
