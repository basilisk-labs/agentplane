---
id: "202603101304-VCVH90"
title: "Widen docs shell after regression"
result_summary: "Docs shell width restored on desktop without changing the centered two-column structure."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T13:06:07.021Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-10T13:09:26.727Z"
  updated_by: "CODER"
  note: "Command: bun run --cwd website build | Result: pass | Evidence: production build succeeded; only expected CSS/theme layout files changed in workspace."
commit:
  hash: "3b7cae7689dc2d919d9be7e032ff9c4861781808"
  message: "✨ VCVH90 task: widen docs shell after regression"
comments:
  -
    author: "CODER"
    body: "Start: inspecting docs shell width regression, then applying a narrow CSS-only fix and verifying the website build before push."
  -
    author: "CODER"
    body: "Verified: website docs shell is wider again, sidebar width is consistent, and bun run --cwd website build passed before publish."
events:
  -
    type: "status"
    at: "2026-03-10T13:06:31.311Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspecting docs shell width regression, then applying a narrow CSS-only fix and verifying the website build before push."
  -
    type: "verify"
    at: "2026-03-10T13:09:26.727Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --cwd website build | Result: pass | Evidence: production build succeeded; only expected CSS/theme layout files changed in workspace."
  -
    type: "status"
    at: "2026-03-10T13:10:17.909Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: website docs shell is wider again, sidebar width is consistent, and bun run --cwd website build passed before publish."
doc_version: 3
doc_updated_at: "2026-03-10T13:10:17.909Z"
doc_updated_by: "CODER"
description: "Adjust docs page width so the documentation columns are no longer overly narrow while preserving centered layout and balanced gutters."
id_source: "generated"
---
## Summary

Restore a wider desktop documentation shell after the latest layout regression made the page content visibly too narrow.

## Scope

Adjust only the website documentation layout width and related desktop spacing in the docs shell so the page stays centered and balanced relative to the navbar.

## Plan

1. Inspect the docs-shell width cap and surrounding spacing rules.
2. Relax the desktop frame width and any associated gutters just enough to restore the intended reading width.
3. Verify the website build, then commit and push the fix.

## Verify Steps

1. bun run --cwd website build
2. git diff -- website/src/css/custom.css
3. git status --short --untracked-files=no

## Verification

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus client and server compiled successfully; static files generated in "build". One existing webpack warning from vscode-languageserver-types remained non-fatal.
Scope: website documentation shell CSS and Docusaurus site build.

Command: git diff -- website/src/css/custom.css
Result: pass
Evidence: Diff shows only docs frame width and desktop spacing adjustments in the docs shell variables.
Scope: docs shell width and gutter tuning in website/src/css/custom.css.

Command: git status --short --untracked-files=no
Result: pass
Evidence: Only website/src/css/custom.css and website/src/theme/DocRoot/Layout/Sidebar/styles.module.css are modified.
Scope: workspace hygiene for the active task.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T13:09:26.727Z — VERIFY — ok

By: CODER

Note: Command: bun run --cwd website build | Result: pass | Evidence: production build succeeded; only expected CSS/theme layout files changed in workspace.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T13:09:13.539Z, excerpt_hash=sha256:22aa6879f3f326f9d38eaeb1dafa1e8a80211bdc7796a676b1ab64228fc144a5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the CSS width adjustment commit if the docs shell becomes misaligned, overflows on desktop, or regresses mobile layout.

## Findings

The regression came from the combination of a narrow 1200px docs frame, large outer gutters, and a separate sidebar width override that still defaulted to 300px.
