---
id: "202605042000-Y8B7V1"
title: "Generate per-doc social images"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T20:01:32.427Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T20:16:15.108Z"
  updated_by: "CODER"
  note: "Generated per-doc social cards and verified docs social metadata."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement build-time per-doc social image generation and include the user-provided refreshed website image assets in the same task branch."
events:
  -
    type: "status"
    at: "2026-05-04T20:02:53.040Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement build-time per-doc social image generation and include the user-provided refreshed website image assets in the same task branch."
  -
    type: "verify"
    at: "2026-05-04T20:16:15.108Z"
    author: "CODER"
    state: "ok"
    note: "Generated per-doc social cards and verified docs social metadata."
doc_version: 3
doc_updated_at: "2026-05-04T20:16:15.112Z"
doc_updated_by: "CODER"
description: "Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time."
sections:
  Summary: |-
    Generate per-doc social images
    
    Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.
  Scope: |-
    - In scope: Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.
    - Out of scope: unrelated refactors not required for "Generate per-doc social images".
  Plan: |-
    1. Add a build-time social-image generator under website/scripts that scans docs MDX front matter and emits minimal PNG cards from SVG markup, using the official AgentPlane logo asset.
    2. Wire the website build to regenerate cards and expose per-doc og/twitter image metadata through Docusaurus theme code without editing every MDX page.
    3. Verify generated output for docs/developer/blueprints plus website typecheck/build and routing policy checks.
  Verify Steps: |-
    1. Review the requested outcome for "Generate per-doc social images". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T20:16:15.108Z — VERIFY — ok
    
    By: CODER
    
    Note: Generated per-doc social cards and verified docs social metadata.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T20:02:53.040Z, excerpt_hash=sha256:d2863f4d5be62283757685b6525d8ee8823136e4f8b19215a5fce162f2cb302f
    
    Details:
    
    Command: bun run --cwd website check-social-images
    Result: pass
    Evidence: checked 154 docs social images.
    Scope: generated docs social PNG freshness.
    
    Command: bun run docs:site:typecheck
    Result: pass
    Evidence: tsc completed with exit 0.
    Scope: Docusaurus TypeScript surface.
    
    Command: bun eslint website/scripts/generate-social-images.mjs website/src/theme/DocItem/Layout/index.tsx
    Result: pass
    Evidence: focused eslint completed with exit 0.
    Scope: changed JS/TS files.
    
    Command: bun run docs:site:build
    Result: pass
    Evidence: Docusaurus generated static files in website/build; only warning was existing vscode-languageserver-types dynamic require warning.
    Scope: production docs build and generated meta tags.
    
    Command: rg og:image website/build/docs/developer/blueprints/index.html
    Result: pass
    Evidence: built HTML contains https://agentplane.org/img/social/docs/developer/blueprints.png for og:image and twitter:image.
    Scope: requested shared URL behavior.
    
    Command: git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor
    Result: pass
    Evidence: diff check and policy routing passed; doctor OK with one unrelated warning about two pre-existing shipped branch_pr tasks still open on base.
    Scope: repository hygiene and routing policy.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate per-doc social images

Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.

## Scope

- In scope: Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.
- Out of scope: unrelated refactors not required for "Generate per-doc social images".

## Plan

1. Add a build-time social-image generator under website/scripts that scans docs MDX front matter and emits minimal PNG cards from SVG markup, using the official AgentPlane logo asset.
2. Wire the website build to regenerate cards and expose per-doc og/twitter image metadata through Docusaurus theme code without editing every MDX page.
3. Verify generated output for docs/developer/blueprints plus website typecheck/build and routing policy checks.

## Verify Steps

1. Review the requested outcome for "Generate per-doc social images". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T20:16:15.108Z — VERIFY — ok

By: CODER

Note: Generated per-doc social cards and verified docs social metadata.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T20:02:53.040Z, excerpt_hash=sha256:d2863f4d5be62283757685b6525d8ee8823136e4f8b19215a5fce162f2cb302f

Details:

Command: bun run --cwd website check-social-images
Result: pass
Evidence: checked 154 docs social images.
Scope: generated docs social PNG freshness.

Command: bun run docs:site:typecheck
Result: pass
Evidence: tsc completed with exit 0.
Scope: Docusaurus TypeScript surface.

Command: bun eslint website/scripts/generate-social-images.mjs website/src/theme/DocItem/Layout/index.tsx
Result: pass
Evidence: focused eslint completed with exit 0.
Scope: changed JS/TS files.

Command: bun run docs:site:build
Result: pass
Evidence: Docusaurus generated static files in website/build; only warning was existing vscode-languageserver-types dynamic require warning.
Scope: production docs build and generated meta tags.

Command: rg og:image website/build/docs/developer/blueprints/index.html
Result: pass
Evidence: built HTML contains https://agentplane.org/img/social/docs/developer/blueprints.png for og:image and twitter:image.
Scope: requested shared URL behavior.

Command: git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor
Result: pass
Evidence: diff check and policy routing passed; doctor OK with one unrelated warning about two pre-existing shipped branch_pr tasks still open on base.
Scope: repository hygiene and routing policy.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
