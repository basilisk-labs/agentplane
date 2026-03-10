---
id: "202603101339-YKBPKN"
title: "Rework docs columns and remove shell indents"
result_summary: "Desktop docs layout now behaves as a fixed-left-plus-centered-main column model without extra shell indents."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T13:39:32.540Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-10T13:44:27.667Z"
  updated_by: "CODER"
  note: "Command: bun run --cwd website build | Result: pass | Evidence: docs-shell CSS refactor builds successfully and only the intended stylesheet changed."
commit:
  hash: "e136e4ef5f0c5f908cca9c08985e5e7b35daa633"
  message: "✨ YKBPKN task: simplify docs shell columns"
comments:
  -
    author: "CODER"
    body: "Start: removing structural docs-shell indents and reworking the desktop column model into a fixed sidebar plus centered auto main column before build verification."
  -
    author: "CODER"
    body: "Verified: docs-shell indents were removed, the left docs sidebar now uses a fixed width and fixed top offset, and the main documentation column is centered with the website build passing."
events:
  -
    type: "status"
    at: "2026-03-10T13:39:39.322Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: removing structural docs-shell indents and reworking the desktop column model into a fixed sidebar plus centered auto main column before build verification."
  -
    type: "verify"
    at: "2026-03-10T13:44:27.667Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --cwd website build | Result: pass | Evidence: docs-shell CSS refactor builds successfully and only the intended stylesheet changed."
  -
    type: "status"
    at: "2026-03-10T13:44:47.248Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs-shell indents were removed, the left docs sidebar now uses a fixed width and fixed top offset, and the main documentation column is centered with the website build passing."
doc_version: 3
doc_updated_at: "2026-03-10T13:44:47.248Z"
doc_updated_by: "CODER"
description: "Remove structural docs-shell indents, keep the left documentation sidebar at a fixed width with a fixed top offset, and center the main documentation column horizontally with automatic width."
id_source: "generated"
---
## Summary

Rework the desktop documentation shell so structural indents are removed, the left docs sidebar keeps a fixed width and fixed top offset, and the main docs column is horizontally centered with automatic width.

## Scope

Adjust only the website documentation layout CSS for desktop docs pages. Keep the existing docs shell structure, but simplify it into a fixed sidebar plus centered main column without extra shell padding.

## Plan

1. Inspect the current docs-shell layout rules and identify the remaining structural indents.
2. Rework the desktop layout so the left sidebar has a fixed width and fixed vertical offset while the main column uses automatic width and centers horizontally.
3. Verify the website build, then record evidence and commit the CSS-only fix.

## Verify Steps

1. bun run --cwd website build
2. git diff -- website/src/css/custom.css website/src/theme/DocRoot/Layout/Sidebar/styles.module.css
3. git status --short --untracked-files=no

## Verification

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus client and server compiled successfully; static files generated in "build". One existing non-fatal webpack warning from vscode-languageserver-types remained.
Scope: website documentation shell layout and site build.

Command: git diff -- website/src/css/custom.css website/src/theme/DocRoot/Layout/Sidebar/styles.module.css
Result: pass
Evidence: Diff is limited to website/src/css/custom.css and rewires the docs-shell column model, removes shell indents, and introduces a fixed sidebar top offset.
Scope: docs-shell layout CSS for desktop documentation pages.

Command: git status --short --untracked-files=no
Result: pass
Evidence: Only website/src/css/custom.css is modified.
Scope: workspace hygiene for the active task.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T13:44:27.667Z — VERIFY — ok

By: CODER

Note: Command: bun run --cwd website build | Result: pass | Evidence: docs-shell CSS refactor builds successfully and only the intended stylesheet changed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T13:44:21.755Z, excerpt_hash=sha256:0fd0e1be5f37459cccc6b58ff26bec3baa8f921c279f847399aa05455502c122

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the docs-shell CSS commit if desktop docs alignment regresses, sidebar stickiness breaks, or the centered main column becomes narrower or off-center.

## Findings

The remaining layout complexity came from outer shell gutters and a dynamic sidebar clearance being mixed into a layout that should behave as a simple fixed-left-plus-centered-main desktop split.
