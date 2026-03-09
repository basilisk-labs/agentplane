---
id: "202603091604-JE15TK"
title: "Simplify preview homepage surface and widen docs shell"
result_summary: "Preview homepage surface simplified; docs shell widened; navbar and footer chrome reduced."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T16:05:03.961Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T16:13:24.322Z"
  updated_by: "REVIEWER"
  note: |-
    Command: bun run docs:site:check. Result: pass. Evidence: docs generation, typecheck, build, and design check completed successfully. Scope: website/src/pages/home-preview.tsx, website/src/pages/home-preview.module.css, website/src/css/custom.css.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway validation for the current repo.
    Command: agentplane doctor. Result: pass. Evidence: doctor finished with errors=0 warnings=0. Scope: workspace/runtime health for the current checkout.
commit:
  hash: "616e0eb474469822618e6d79a8464dcc830857d4"
  message: "🎨 JE15TK frontend: simplify preview homepage surface"
comments:
  -
    author: "CODER"
    body: "Start: simplify the preview homepage to a typographic surface, remove most shadows and card-heavy chrome, and widen the docs shell so content reads comfortably under the navbar."
  -
    author: "CODER"
    body: "Verified: simplified the preview homepage to a flatter typographic surface, widened the docs shell, and confirmed the site/design/policy checks pass without touching the root placeholder."
events:
  -
    type: "status"
    at: "2026-03-09T16:05:10.539Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: simplify the preview homepage to a typographic surface, remove most shadows and card-heavy chrome, and widen the docs shell so content reads comfortably under the navbar."
  -
    type: "verify"
    at: "2026-03-09T16:13:24.322Z"
    author: "REVIEWER"
    state: "ok"
    note: |-
      Command: bun run docs:site:check. Result: pass. Evidence: docs generation, typecheck, build, and design check completed successfully. Scope: website/src/pages/home-preview.tsx, website/src/pages/home-preview.module.css, website/src/css/custom.css.
      Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway validation for the current repo.
      Command: agentplane doctor. Result: pass. Evidence: doctor finished with errors=0 warnings=0. Scope: workspace/runtime health for the current checkout.
  -
    type: "status"
    at: "2026-03-09T16:13:35.668Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: simplified the preview homepage to a flatter typographic surface, widened the docs shell, and confirmed the site/design/policy checks pass without touching the root placeholder."
doc_version: 3
doc_updated_at: "2026-03-09T16:13:35.668Z"
doc_updated_by: "CODER"
description: "Reduce visual noise on /home-preview, remove most shadows and card-heavy surfaces, and fix docs content width and side gutters without touching the root placeholder homepage."
id_source: "generated"
---
## Summary

Simplify preview homepage surface and widen docs shell

Reduce visual noise on /home-preview, remove most shadows and card-heavy surfaces, and fix docs content width and side gutters without touching the root placeholder homepage.

## Scope

- In scope: Reduce visual noise on /home-preview, remove most shadows and card-heavy surfaces, and fix docs content width and side gutters without touching the root placeholder homepage.
- Out of scope: unrelated refactors not required for "Simplify preview homepage surface and widen docs shell".

## Plan

1. Implement the change for "Simplify preview homepage surface and widen docs shell".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: the website build, formatting, and design checks pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing validation reports OK.
3. Run `agentplane doctor`. Expected: doctor finishes with no errors and no warnings for the current workspace.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T16:13:24.322Z — VERIFY — ok

By: REVIEWER

Note: Command: bun run docs:site:check. Result: pass. Evidence: docs generation, typecheck, build, and design check completed successfully. Scope: website/src/pages/home-preview.tsx, website/src/pages/home-preview.module.css, website/src/css/custom.css.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway validation for the current repo.
Command: agentplane doctor. Result: pass. Evidence: doctor finished with errors=0 warnings=0. Scope: workspace/runtime health for the current checkout.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T16:05:10.539Z, excerpt_hash=sha256:d215e7af7d9536f4954757015be80e5df2b16f622e3a731257a7eee99a2f9bbd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
