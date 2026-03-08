---
id: "202603061332-T1ZQH0"
title: "Tighten website alignment and simplify blog layout"
result_summary: "Homepage and blog now read as cleaner left-aligned surfaces within the existing design contract."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T13:32:55.183Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved homepage/blog minimalism pass, navbar cleanup, and blog-index restructuring within the current design contract."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:36:31.389Z"
  updated_by: "CODER"
  note: "Command: git diff -- website/src/css/custom.css website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css\nResult: pass\nEvidence: homepage and blog copy are left-aligned; navbar frame removed; active nav link stays visible; blog converted to editorial index\nScope: website homepage, blog landing, global navbar styles\n\nCommand: bun run --cwd website typecheck\nResult: pass\nEvidence: tsc completed without errors\nScope: website TypeScript surface\n\nCommand: bun run --cwd website build\nResult: pass\nEvidence: client and server compiled successfully; static files generated in build\nScope: production website build\n\nCommand: node scripts/check-design-language.mjs\nResult: pass\nEvidence: DESIGN.md compliance check passed\nScope: website visual language contract"
commit:
  hash: "f803dcb94ef25421623aae102fd4e48cec4cca71"
  message: "✨ T1ZQH0 website: simplify layout and blog index"
comments:
  -
    author: "CODER"
    body: "Start: left-align the website text system, simplify the navbar chrome and active state, reduce visual noise, and rebuild the blog page into a proper journal index within the existing design contract."
  -
    author: "CODER"
    body: "Verified: left-aligned homepage/blog copy, simplified navbar chrome and active state, blog index rebuilt into an editorial layout; website typecheck, production build, and design-language checks all passed."
events:
  -
    type: "status"
    at: "2026-03-06T13:33:00.555Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: left-align the website text system, simplify the navbar chrome and active state, reduce visual noise, and rebuild the blog page into a proper journal index within the existing design contract."
  -
    type: "verify"
    at: "2026-03-06T13:36:31.389Z"
    author: "CODER"
    state: "ok"
    note: "Command: git diff -- website/src/css/custom.css website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css\nResult: pass\nEvidence: homepage and blog copy are left-aligned; navbar frame removed; active nav link stays visible; blog converted to editorial index\nScope: website homepage, blog landing, global navbar styles\n\nCommand: bun run --cwd website typecheck\nResult: pass\nEvidence: tsc completed without errors\nScope: website TypeScript surface\n\nCommand: bun run --cwd website build\nResult: pass\nEvidence: client and server compiled successfully; static files generated in build\nScope: production website build\n\nCommand: node scripts/check-design-language.mjs\nResult: pass\nEvidence: DESIGN.md compliance check passed\nScope: website visual language contract"
  -
    type: "status"
    at: "2026-03-06T13:37:22.952Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: left-aligned homepage/blog copy, simplified navbar chrome and active state, blog index rebuilt into an editorial layout; website typecheck, production build, and design-language checks all passed."
doc_version: 3
doc_updated_at: "2026-03-06T13:37:22.952Z"
doc_updated_by: "CODER"
description: "Left-align homepage/blog typography, remove navbar frame background, simplify the visual system further, fix active navbar state visibility, and turn /blog into a true blog index instead of a homepage-like hero."
id_source: "generated"
---
## Summary

Tighten website alignment and simplify blog layout

Left-align homepage/blog typography, remove navbar frame background, simplify the visual system further, fix active navbar state visibility, and turn /blog into a true blog index instead of a homepage-like hero.

## Scope

- In scope: Left-align homepage/blog typography, remove navbar frame background, simplify the visual system further, fix active navbar state visibility, and turn /blog into a true blog index instead of a homepage-like hero..
- Out of scope: unrelated refactors not required for "Tighten website alignment and simplify blog layout".

## Plan

1) Left-align homepage and blog typography and section headings so the pages read as editorial/product surfaces rather than centered promo blocks. 2) Simplify the navbar by removing the extra framed brand/background treatment and fixing active-link contrast so the selected item remains visible. 3) Reduce visual noise across homepage and shared theme by trimming chrome, hover treatments, and redundant container styling. 4) Rework /blog into a true blog index with a list/journal structure instead of a homepage-like hero composition. 5) Run website typecheck, build, and design-language validation; then publish the updated site.

## Verify Steps

### Scope
Validate the left-aligned, more minimal homepage/blog refinements and the navbar fixes.

### Checks
- Review diffs for touched homepage/blog/theme files.
- Run website typecheck.
- Run website production build.
- Run the design-language check.

### Evidence / Commands
- git diff -- website/src/css/custom.css website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css
- bun run --cwd website typecheck
- bun run --cwd website build
- node scripts/check-design-language.mjs

### Pass criteria
- Homepage and blog headings/content are left-aligned.
- Navbar no longer has the extra framed background treatment and active links stay visible.
- Blog reads like a blog index rather than a second homepage.
- Website build and design-language checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T13:36:31.389Z — VERIFY — ok

By: CODER

Note: Command: git diff -- website/src/css/custom.css website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css
Result: pass
Evidence: homepage and blog copy are left-aligned; navbar frame removed; active nav link stays visible; blog converted to editorial index
Scope: website homepage, blog landing, global navbar styles

Command: bun run --cwd website typecheck
Result: pass
Evidence: tsc completed without errors
Scope: website TypeScript surface

Command: bun run --cwd website build
Result: pass
Evidence: client and server compiled successfully; static files generated in build
Scope: production website build

Command: node scripts/check-design-language.mjs
Result: pass
Evidence: DESIGN.md compliance check passed
Scope: website visual language contract

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T13:33:00.555Z, excerpt_hash=sha256:756f254adf24e592bd64f96508a2fdd8492762291848632cce04a40fd7bbf797

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Homepage typography and section headings were moved to a consistent left-aligned layout.\n- Navbar chrome was reduced to a simple underline navigation pattern and the active state now keeps readable foreground contrast.\n- The blog landing was rewritten as an editorial index with featured entry, recent entries, and reference links.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
