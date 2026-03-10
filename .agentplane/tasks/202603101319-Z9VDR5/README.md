---
id: "202603101319-Z9VDR5"
title: "Keep navbar menu items on one line"
result_summary: "Navbar menu pills no longer wrap long labels into two lines on desktop."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T13:20:12.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-10T13:21:38.891Z"
  updated_by: "CODER"
  note: "Command: bun run --cwd website build | Result: pass | Evidence: navbar CSS change builds successfully and only the intended website stylesheet is modified."
commit:
  hash: "28cd73ce0232b54cd2867b0f8c83edd32c19270b"
  message: "✨ Z9VDR5 task: keep navbar menu items on one line"
comments:
  -
    author: "CODER"
    body: "Start: tightening desktop navbar link layout so menu labels stay on one line, then verifying the website build before push."
  -
    author: "CODER"
    body: "Verified: desktop navbar labels now stay on one line, the website build passes, and the workspace contains only the intended navbar CSS change."
events:
  -
    type: "status"
    at: "2026-03-10T13:20:20.189Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tightening desktop navbar link layout so menu labels stay on one line, then verifying the website build before push."
  -
    type: "verify"
    at: "2026-03-10T13:21:38.891Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --cwd website build | Result: pass | Evidence: navbar CSS change builds successfully and only the intended website stylesheet is modified."
  -
    type: "status"
    at: "2026-03-10T13:21:55.516Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: desktop navbar labels now stay on one line, the website build passes, and the workspace contains only the intended navbar CSS change."
doc_version: 3
doc_updated_at: "2026-03-10T13:21:55.516Z"
doc_updated_by: "CODER"
description: "Adjust website navbar item styling so desktop menu labels no longer wrap into two lines while preserving the existing header layout."
id_source: "generated"
---
## Summary

Prevent desktop navbar menu labels from wrapping into two lines by tightening the pill styling and enforcing single-line layout.

## Scope

Adjust only the website navbar desktop styling in `website/src/css/custom.css` so menu labels remain visually clean on one line without changing the menu structure.

## Plan

1. Inspect the navbar item layout and current wrapping constraints.
2. Update desktop navbar link sizing and wrapping behavior.
3. Verify the website build, then commit and push the fix.

## Verify Steps

1. bun run --cwd website build
2. git diff -- website/src/css/custom.css
3. git status --short --untracked-files=no

## Verification

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus client and server compiled successfully; static files generated in "build". One existing non-fatal webpack warning from vscode-languageserver-types remained.
Scope: website navbar styling and overall docs site build.

Command: git diff -- website/src/css/custom.css
Result: pass
Evidence: Diff is limited to navbar link sizing, nowrap behavior, and desktop item-group wrapping constraints.
Scope: desktop navbar styling in website/src/css/custom.css.

Command: git status --short --untracked-files=no
Result: pass
Evidence: Only website/src/css/custom.css is modified.
Scope: workspace hygiene for the active task.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T13:21:38.891Z — VERIFY — ok

By: CODER

Note: Command: bun run --cwd website build | Result: pass | Evidence: navbar CSS change builds successfully and only the intended website stylesheet is modified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T13:21:26.752Z, excerpt_hash=sha256:22aa6879f3f326f9d38eaeb1dafa1e8a80211bdc7796a676b1ab64228fc144a5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the navbar styling commit if the header overflows, breaks alignment, or regresses the mobile navigation.

## Findings

The wrap came from desktop navbar items being allowed to shrink and wrap long labels like "Work on a Task" and "Upgrade & Recover" inside pill links.
