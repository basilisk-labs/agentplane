---
id: "202603261911-KAR6C2"
title: "Fix presentation route recursion for AIMindset deck"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "website"
  - "presentation"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T19:11:39.389Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T19:13:16.845Z"
  updated_by: "CODER"
  note: |-
    Command: bun run --filter=website build
    Result: pass
    Evidence: website build now emits website/build/presentation/aimindset20260325/index.html as the raw deck HTML, with no Docusaurus Layout wrapper or iframe recursion.
    Scope: website presentation route and static deck publishing path.
    
    Command: sed -n '1,40p' website/build/presentation/aimindset20260325/index.html
    Result: pass
    Evidence: the built file starts with the static Russian presentation document title and deck markup, not a docs-shell page.
    Scope: generated presentation artifact for /presentation/aimindset20260325/.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the recursive Docusaurus route so the AIMindset presentation path resolves directly to the static deck."
events:
  -
    type: "status"
    at: "2026-03-26T19:12:08.338Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the recursive Docusaurus route so the AIMindset presentation path resolves directly to the static deck."
  -
    type: "verify"
    at: "2026-03-26T19:13:16.845Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run --filter=website build
      Result: pass
      Evidence: website build now emits website/build/presentation/aimindset20260325/index.html as the raw deck HTML, with no Docusaurus Layout wrapper or iframe recursion.
      Scope: website presentation route and static deck publishing path.
      
      Command: sed -n '1,40p' website/build/presentation/aimindset20260325/index.html
      Result: pass
      Evidence: the built file starts with the static Russian presentation document title and deck markup, not a docs-shell page.
      Scope: generated presentation artifact for /presentation/aimindset20260325/.
doc_version: 3
doc_updated_at: "2026-03-26T19:13:16.846Z"
doc_updated_by: "CODER"
description: "Remove the Docusaurus route that shadows /presentation/aimindset20260325/index.html so the public URL serves the static presentation instead of recursively embedding the same page."
sections:
  Summary: |-
    Fix presentation route recursion for AIMindset deck
    
    Remove the Docusaurus route that shadows /presentation/aimindset20260325/index.html so the public URL serves the static presentation instead of recursively embedding the same page.
  Scope: |-
    - In scope: Remove the Docusaurus route that shadows /presentation/aimindset20260325/index.html so the public URL serves the static presentation instead of recursively embedding the same page.
    - Out of scope: unrelated refactors not required for "Fix presentation route recursion for AIMindset deck".
  Plan: |-
    1. Confirm the public presentation path conflict by comparing the static deck and the Docusaurus route, and remove the route layer that shadows the static /presentation/aimindset20260325/index.html asset path.
    2. Rebuild the website and inspect the generated output for /presentation/aimindset20260325 to confirm the published file is now the static presentation, not a recursive iframe page.
    3. Publish the fix through the normal branch_pr path and verify the public URL returns the deck content without Docusaurus chrome recursion.
  Verify Steps: |-
    1. Inspect the route and static presentation path. Expected: there is no React page that shadows /presentation/aimindset20260325/index.html, so the public path resolves directly to the static deck.
    2. Run the website production build and inspect the generated /presentation/aimindset20260325/index.html. Expected: the built file is the deck HTML itself, not a Docusaurus page containing an iframe back to the same route.
    3. Verify the public URL after deploy. Expected: https://agentplane.org/presentation/aimindset20260325/ renders the presentation deck content without recursive navbars or docs-shell fallback.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-26T19:13:16.845Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run --filter=website build\nResult: pass\nEvidence: website build now emits website/build/presentation/aimindset20260325/index.html as the raw deck HTML, with no Docusaurus Layout wrapper or iframe recursion.\nScope: website presentation route and static deck publishing path.\n\nCommand: sed -n '1,40p' website/build/presentation/aimindset20260325/index.html\nResult: pass\nEvidence: the built file starts with the static Russian presentation document title and deck markup, not a docs-shell page.\nScope: generated presentation artifact for /presentation/aimindset20260325/.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T19:12:08.339Z, excerpt_hash=sha256:0a47e6a0b69a18a0108f0b9040952ab430a5aee640f91f7b821ddb9f8bfdf799
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix presentation route recursion for AIMindset deck

Remove the Docusaurus route that shadows /presentation/aimindset20260325/index.html so the public URL serves the static presentation instead of recursively embedding the same page.

## Scope

- In scope: Remove the Docusaurus route that shadows /presentation/aimindset20260325/index.html so the public URL serves the static presentation instead of recursively embedding the same page.
- Out of scope: unrelated refactors not required for "Fix presentation route recursion for AIMindset deck".

## Plan

1. Confirm the public presentation path conflict by comparing the static deck and the Docusaurus route, and remove the route layer that shadows the static /presentation/aimindset20260325/index.html asset path.
2. Rebuild the website and inspect the generated output for /presentation/aimindset20260325 to confirm the published file is now the static presentation, not a recursive iframe page.
3. Publish the fix through the normal branch_pr path and verify the public URL returns the deck content without Docusaurus chrome recursion.

## Verify Steps

1. Inspect the route and static presentation path. Expected: there is no React page that shadows /presentation/aimindset20260325/index.html, so the public path resolves directly to the static deck.
2. Run the website production build and inspect the generated /presentation/aimindset20260325/index.html. Expected: the built file is the deck HTML itself, not a Docusaurus page containing an iframe back to the same route.
3. Verify the public URL after deploy. Expected: https://agentplane.org/presentation/aimindset20260325/ renders the presentation deck content without recursive navbars or docs-shell fallback.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-26T19:13:16.845Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=website build\nResult: pass\nEvidence: website build now emits website/build/presentation/aimindset20260325/index.html as the raw deck HTML, with no Docusaurus Layout wrapper or iframe recursion.\nScope: website presentation route and static deck publishing path.\n\nCommand: sed -n '1,40p' website/build/presentation/aimindset20260325/index.html\nResult: pass\nEvidence: the built file starts with the static Russian presentation document title and deck markup, not a docs-shell page.\nScope: generated presentation artifact for /presentation/aimindset20260325/.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T19:12:08.339Z, excerpt_hash=sha256:0a47e6a0b69a18a0108f0b9040952ab430a5aee640f91f7b821ddb9f8bfdf799

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
