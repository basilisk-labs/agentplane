---
id: "202607100945-T0215Q"
title: "Resolve release incident INC-20260710-01 website lint"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incident"
  - "release-0.6.22"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T09:46:02.198Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: resolve INC-20260710-01 by making website lint clean with Docusaurus-aware rule boundaries and verified source fixes."
events:
  -
    type: "status"
    at: "2026-07-10T09:47:07.767Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: resolve INC-20260710-01 by making website lint clean with Docusaurus-aware rule boundaries and verified source fixes."
doc_version: 3
doc_updated_at: "2026-07-10T09:47:07.767Z"
doc_updated_by: "CODER"
description: "For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest."
sections:
  Summary: |-
    Resolve release incident INC-20260710-01 website lint

    For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
  Scope: |-
    - In scope: For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
    - Out of scope: unrelated refactors not required for "Resolve release incident INC-20260710-01 website lint".
  Plan: |-
    1. Reproduce and classify all current website lint findings, separating Docusaurus-required naming/generated assets from actionable source defects.
    2. Add the narrowest website-specific ESLint boundaries for framework-owned conventions and fix the remaining source findings without changing site behavior.
    3. Verify website lint, typecheck, generated-doc freshness, build, core contract, and full fast tests.
    4. Archive INC-20260710-01 with the task/commit evidence, prove the release incident gate passes, and add this task to the v0.6.22 execution graph and release dependencies.
  Verify Steps: |-
    1. Run `bun run lint:website`. Expected: zero errors and zero warnings across the website surface.
    2. Run `bun run docs:site:typecheck`. Expected: website TypeScript passes.
    3. Run `bun run docs:site:generate:check`. Expected: generated site documentation remains fresh.
    4. Run `bun run docs:site:build:check`. Expected: the Docusaurus production build check passes.
    5. Run `bun run ci:contract`. Expected: repository contracts, architecture, Knip, clone, and coverage guards pass.
    6. Run `bun run test:fast`. Expected: the full fast regression suite passes.
    7. Run `node scripts/check-release-incidents.mjs`. Expected: no active release incident remains after INC-20260710-01 is archived with evidence.
    8. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve release incident INC-20260710-01 website lint

For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.

## Scope

- In scope: For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
- Out of scope: unrelated refactors not required for "Resolve release incident INC-20260710-01 website lint".

## Plan

1. Reproduce and classify all current website lint findings, separating Docusaurus-required naming/generated assets from actionable source defects.
2. Add the narrowest website-specific ESLint boundaries for framework-owned conventions and fix the remaining source findings without changing site behavior.
3. Verify website lint, typecheck, generated-doc freshness, build, core contract, and full fast tests.
4. Archive INC-20260710-01 with the task/commit evidence, prove the release incident gate passes, and add this task to the v0.6.22 execution graph and release dependencies.

## Verify Steps

1. Run `bun run lint:website`. Expected: zero errors and zero warnings across the website surface.
2. Run `bun run docs:site:typecheck`. Expected: website TypeScript passes.
3. Run `bun run docs:site:generate:check`. Expected: generated site documentation remains fresh.
4. Run `bun run docs:site:build:check`. Expected: the Docusaurus production build check passes.
5. Run `bun run ci:contract`. Expected: repository contracts, architecture, Knip, clone, and coverage guards pass.
6. Run `bun run test:fast`. Expected: the full fast regression suite passes.
7. Run `node scripts/check-release-incidents.mjs`. Expected: no active release incident remains after INC-20260710-01 is archived with evidence.
8. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
