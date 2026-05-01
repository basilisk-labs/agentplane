---
id: "202605010926-A9JHHM"
title: "Add homepage hero motion and refresh Pages Actions"
result_summary: "Merged via PR #667."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T09:26:44.913Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T09:53:29.047Z"
  updated_by: "CODER"
  note: "Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions."
commit:
  hash: "9460e5c655f407de6d60d6192ce5e0bed375603c"
  message: "frontend: Add hero motion and refresh Actions (A9JHHM)"
comments:
  -
    author: "CODER"
    body: "Start: Implement restrained homepage hero motion, restore rounded header/menu affordances, add local microinteractions, and refresh Pages workflow actions within the approved frontend/CI scope."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #667 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T09:30:14.289Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement restrained homepage hero motion, restore rounded header/menu affordances, add local microinteractions, and refresh Pages workflow actions within the approved frontend/CI scope."
  -
    type: "verify"
    at: "2026-05-01T09:49:10.475Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for homepage hero motion, rounded navigation/menu affordances, copy feedback, workflow lint, and Pages action version refresh. Commands run: git diff --check; bunx prettier --check .github/workflows/pages-deploy.yml website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css; bunx eslint website/src/pages/index.tsx; bun run docs:site:generate; bun run docs:site:typecheck; bun run docs:ia:check; bun run docs:site:build; bun run docs:site:check:design; bun run workflows:lint; Playwright desktop/mobile local visual checks. Pages action tags confirmed: configure-pages@v6 and deploy-pages@v5 use node24; upload-pages-artifact@v5 delegates to upload-artifact v7. Hosted CI and live deploy verification remain for PR/main."
  -
    type: "verify"
    at: "2026-05-01T09:53:29.047Z"
    author: "CODER"
    state: "ok"
    note: "Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions."
  -
    type: "status"
    at: "2026-05-01T09:59:47.096Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #667 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T09:59:47.102Z"
doc_updated_by: "INTEGRATOR"
description: "Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation."
sections:
  Summary: |-
    Add homepage hero motion and refresh Pages Actions
    
    Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
  Scope: |-
    - In scope: Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
    - Out of scope: unrelated refactors not required for "Add homepage hero motion and refresh Pages Actions".
  Plan: |-
    1. Inspect current homepage components, CSS, and Pages workflow action versions.
    2. Add a restrained looping hero background animation that supports the Git/audit workflow story without obscuring hero copy.
    3. Restore rounded header/menu affordances and add microinteractions for nav, CTAs, copy command, cards, and focus states.
    4. Update GitHub Pages workflow action versions/configuration to remove Node.js 20 action-runtime deprecation warnings.
    5. Verify with formatting, lint/typecheck/build/design checks plus Playwright desktop/mobile visual checks before PR/deploy.
  Verify Steps: |-
    1. Run formatting checks for touched website and workflow files. Expected: no formatting drift.
    2. Run focused lint for the touched homepage TSX plus website typecheck/build/design checks. Expected: all pass; the only acceptable build warning is the pre-existing bundler static-analysis warning from vscode-languageserver-types if still present.
    3. Run workflow lint and confirm the updated Pages actions resolve to Node 24-compatible action runtimes. Expected: workflow contracts pass and Pages action versions exist.
    4. Run Playwright desktop and mobile visual checks against the local dev server. Expected: hero background animation renders behind readable copy, rounded menu affordances are restored, and CTA/copy interactions are usable.
    5. Open and merge PR through branch_pr flow, then verify GitHub Actions on main and https://agentplane.org live with a cache-busted request/browser check. Expected: Docs CI, Core CI, and Pages Deploy pass without Node.js 20 action-runtime deprecation annotations from Pages actions; live page has the new hero motion and old placeholder is absent.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T09:49:10.475Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed for homepage hero motion, rounded navigation/menu affordances, copy feedback, workflow lint, and Pages action version refresh. Commands run: git diff --check; bunx prettier --check .github/workflows/pages-deploy.yml website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css; bunx eslint website/src/pages/index.tsx; bun run docs:site:generate; bun run docs:site:typecheck; bun run docs:ia:check; bun run docs:site:build; bun run docs:site:check:design; bun run workflows:lint; Playwright desktop/mobile local visual checks. Pages action tags confirmed: configure-pages@v6 and deploy-pages@v5 use node24; upload-pages-artifact@v5 delegates to upload-artifact v7. Hosted CI and live deploy verification remain for PR/main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:48:38.572Z, excerpt_hash=sha256:68949e4b84b07b982564c567fec54b5b95b5f550f374ec5ad633796929fc5b62
    
    ### 2026-05-01T09:53:29.047Z — VERIFY — ok
    
    By: CODER
    
    Note: Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:49:10.485Z, excerpt_hash=sha256:68949e4b84b07b982564c567fec54b5b95b5f550f374ec5ad633796929fc5b62
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add homepage hero motion and refresh Pages Actions

Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.

## Scope

- In scope: Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
- Out of scope: unrelated refactors not required for "Add homepage hero motion and refresh Pages Actions".

## Plan

1. Inspect current homepage components, CSS, and Pages workflow action versions.
2. Add a restrained looping hero background animation that supports the Git/audit workflow story without obscuring hero copy.
3. Restore rounded header/menu affordances and add microinteractions for nav, CTAs, copy command, cards, and focus states.
4. Update GitHub Pages workflow action versions/configuration to remove Node.js 20 action-runtime deprecation warnings.
5. Verify with formatting, lint/typecheck/build/design checks plus Playwright desktop/mobile visual checks before PR/deploy.

## Verify Steps

1. Run formatting checks for touched website and workflow files. Expected: no formatting drift.
2. Run focused lint for the touched homepage TSX plus website typecheck/build/design checks. Expected: all pass; the only acceptable build warning is the pre-existing bundler static-analysis warning from vscode-languageserver-types if still present.
3. Run workflow lint and confirm the updated Pages actions resolve to Node 24-compatible action runtimes. Expected: workflow contracts pass and Pages action versions exist.
4. Run Playwright desktop and mobile visual checks against the local dev server. Expected: hero background animation renders behind readable copy, rounded menu affordances are restored, and CTA/copy interactions are usable.
5. Open and merge PR through branch_pr flow, then verify GitHub Actions on main and https://agentplane.org live with a cache-busted request/browser check. Expected: Docs CI, Core CI, and Pages Deploy pass without Node.js 20 action-runtime deprecation annotations from Pages actions; live page has the new hero motion and old placeholder is absent.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T09:49:10.475Z — VERIFY — ok

By: CODER

Note: Local verification passed for homepage hero motion, rounded navigation/menu affordances, copy feedback, workflow lint, and Pages action version refresh. Commands run: git diff --check; bunx prettier --check .github/workflows/pages-deploy.yml website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css; bunx eslint website/src/pages/index.tsx; bun run docs:site:generate; bun run docs:site:typecheck; bun run docs:ia:check; bun run docs:site:build; bun run docs:site:check:design; bun run workflows:lint; Playwright desktop/mobile local visual checks. Pages action tags confirmed: configure-pages@v6 and deploy-pages@v5 use node24; upload-pages-artifact@v5 delegates to upload-artifact v7. Hosted CI and live deploy verification remain for PR/main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:48:38.572Z, excerpt_hash=sha256:68949e4b84b07b982564c567fec54b5b95b5f550f374ec5ad633796929fc5b62

### 2026-05-01T09:53:29.047Z — VERIFY — ok

By: CODER

Note: Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:49:10.485Z, excerpt_hash=sha256:68949e4b84b07b982564c567fec54b5b95b5f550f374ec5ad633796929fc5b62

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
