---
id: "202603061309-GCDENN"
title: "Refine website visual system within DESIGN.md"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T13:13:31.894Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved under stricter scope: DESIGN.md remains unchanged; redesign must conform to the existing contract and finish only legitimately completed open tasks."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:20:37.382Z"
  updated_by: "CODER"
  note: "Command: git diff -- website/src/css/custom.css website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css; bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: homepage/blog/shared theme were tightened to a calmer proof-first layout; docs generation, website build, and design-language validation all passed. Scope: website visual system within existing DESIGN.md."
commit:
  hash: "5e89de17a561fa97595835ba2f6607746895b285"
  message: "✨ website: refine public site within design contract"
comments:
  -
    author: "CODER"
    body: "Start: audit the current website visual system, update DESIGN.md to preserve the approved motifs explicitly, and refine the homepage, blog landing, and shared theme into a cleaner modern baseline."
  -
    author: "CODER"
    body: "Verified: homepage, blog landing, content-map, docs-readiness follow-up, and the final website refinement all passed their recorded checks and now resolve the remaining open website/docs tasks without changing the DESIGN.md contract."
events:
  -
    type: "status"
    at: "2026-03-06T13:10:22.194Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the current website visual system, update DESIGN.md to preserve the approved motifs explicitly, and refine the homepage, blog landing, and shared theme into a cleaner modern baseline."
  -
    type: "verify"
    at: "2026-03-06T13:20:37.382Z"
    author: "CODER"
    state: "ok"
    note: "Command: git diff -- website/src/css/custom.css website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css; bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: homepage/blog/shared theme were tightened to a calmer proof-first layout; docs generation, website build, and design-language validation all passed. Scope: website visual system within existing DESIGN.md."
  -
    type: "status"
    at: "2026-03-06T13:22:32.548Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: homepage, blog landing, content-map, docs-readiness follow-up, and the final website refinement all passed their recorded checks and now resolve the remaining open website/docs tasks without changing the DESIGN.md contract."
doc_version: 2
doc_updated_at: "2026-03-06T13:22:32.548Z"
doc_updated_by: "CODER"
description: "Use the existing DESIGN.md contract to make the public website cleaner and more modern, while preserving strong typography, a disciplined navbar shell, and proof-first hierarchy on homepage and blog surfaces."
id_source: "generated"
---
## Summary

Refine website visual system within DESIGN.md

Use the existing DESIGN.md contract to make the public website cleaner and more modern, with stronger hierarchy, calmer surfaces, and a more disciplined proof-first presentation on homepage and blog pages.

## Scope

- In scope: homepage, blog landing, and shared website theme refinements that stay inside the current DESIGN.md contract.
- In scope: reducing visual noise while preserving strong typography, a disciplined navbar shell, and clear docs-first/product-proof hierarchy.
- Out of scope: changing DESIGN.md, release/version work, and unrelated repository refactors.

## Plan

1) Audit the current homepage, blog landing, navbar, and global theme against DESIGN.md and current product needs. 2) Refine shared website styles to remove glow/card-noise patterns and improve typography, spacing, and surface discipline. 3) Tighten homepage and blog layout hierarchy using proof-first product-marketing best practice without copying external styles. 4) Run docs/site generation, typecheck, build, and the design-language check, then record evidence.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
Validate the updated visual contract execution on the public website after the homepage, blog landing, and shared theme cleanup.

### Checks
- Review diffs for the touched website files.
- Regenerate website-backed docs reference.
- Run website typecheck.
- Run website production build.
- Run the design-language check against the unchanged DESIGN.md contract.

### Evidence / Commands
- git diff -- website/src/css/custom.css website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css
- bun run docs:site:generate
- bun run --cwd website typecheck
- bun run --cwd website build
- node scripts/check-design-language.mjs

### Pass criteria
- DESIGN.md remains unchanged and the website conforms to it.
- Homepage and blog landing retain strong hierarchy but look cleaner, calmer, and more modern.
- Docs generation, website build, and design-language validation all pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T13:20:37.382Z — VERIFY — ok

By: CODER

Note: Command: git diff -- website/src/css/custom.css website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css; bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: homepage/blog/shared theme were tightened to a calmer proof-first layout; docs generation, website build, and design-language validation all passed. Scope: website visual system within existing DESIGN.md.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T13:10:22.194Z, excerpt_hash=sha256:8ff91d1ddefba1b0050b4a5125367db1ba88066f3559126a95b1a52445511eee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
