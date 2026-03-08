---
id: "202603061346-7ZZDQA"
title: "Refine docs spacing and blog presentation"
result_summary: "Docs spacing, homepage copy, and blog presentation now match the requested website contract more closely."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T13:47:27.604Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved docs-shell spacing pass, homepage left-edge alignment fixes, CONTENT.md-driven homepage sync, and blog presentation updates including deferred featured post and generated imagery."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:58:23.088Z"
  updated_by: "CODER"
  note: |-
    Command: git diff -- website/docusaurus.config.ts website/src/css/custom.css website/src/data/homepageContent.ts website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx website/static/img/blog/release-0-2-25-kandinsky-agentplane.svg website/static/img/blog/release-0-3-0-kandinsky-agentplane.svg
    Result: pass
    Evidence: docs shell, homepage, blog index, release post covers, and navbar active-state changes are all present in the staged scope
    Scope: website config, global CSS, homepage, blog index, blog posts, static blog artwork
    
    Command: bun run docs:site:generate
    Result: pass
    Evidence: generated docs/reference/generated-reference.mdx without drift
    Scope: generated website reference content
    
    Command: bun run --cwd website typecheck
    Result: pass
    Evidence: tsc completed without errors
    Scope: website TypeScript surface
    
    Command: bun run --cwd website build
    Result: pass
    Evidence: Docusaurus build completed and generated static files in build
    Scope: production website build
    
    Command: node scripts/check-design-language.mjs
    Result: pass
    Evidence: DESIGN.md compliance check passed
    Scope: website visual language contract
commit:
  hash: "a1d3418b4592ad9606d9f95668875eedafb3e0ea"
  message: "✨ 7ZZDQA website: refine docs shell and homepage copy"
comments:
  -
    author: "CODER"
    body: "Start: fix docs-shell spacing and divider rhythm, align homepage left edge between navbar logo and hero, sync homepage content to CONTENT.md, and refine the blog index/post affordances including hidden featured state, clickable titles, and generated abstract imagery."
  -
    author: "CODER"
    body: "Verified: docs shell spacing and divider rhythm were refined, active navbar routing is explicit, homepage copy was rewritten against the CONTENT.md contract without runtime parsing, and the blog now uses clickable titles, hidden featured state, and abstract release artwork; website generation, typecheck, build, and design checks all passed."
events:
  -
    type: "status"
    at: "2026-03-06T13:47:32.340Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix docs-shell spacing and divider rhythm, align homepage left edge between navbar logo and hero, sync homepage content to CONTENT.md, and refine the blog index/post affordances including hidden featured state, clickable titles, and generated abstract imagery."
  -
    type: "verify"
    at: "2026-03-06T13:58:23.088Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: git diff -- website/docusaurus.config.ts website/src/css/custom.css website/src/data/homepageContent.ts website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx website/static/img/blog/release-0-2-25-kandinsky-agentplane.svg website/static/img/blog/release-0-3-0-kandinsky-agentplane.svg
      Result: pass
      Evidence: docs shell, homepage, blog index, release post covers, and navbar active-state changes are all present in the staged scope
      Scope: website config, global CSS, homepage, blog index, blog posts, static blog artwork
      
      Command: bun run docs:site:generate
      Result: pass
      Evidence: generated docs/reference/generated-reference.mdx without drift
      Scope: generated website reference content
      
      Command: bun run --cwd website typecheck
      Result: pass
      Evidence: tsc completed without errors
      Scope: website TypeScript surface
      
      Command: bun run --cwd website build
      Result: pass
      Evidence: Docusaurus build completed and generated static files in build
      Scope: production website build
      
      Command: node scripts/check-design-language.mjs
      Result: pass
      Evidence: DESIGN.md compliance check passed
      Scope: website visual language contract
  -
    type: "status"
    at: "2026-03-06T14:00:13.831Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs shell spacing and divider rhythm were refined, active navbar routing is explicit, homepage copy was rewritten against the CONTENT.md contract without runtime parsing, and the blog now uses clickable titles, hidden featured state, and abstract release artwork; website generation, typecheck, build, and design checks all passed."
doc_version: 3
doc_updated_at: "2026-03-06T14:00:13.831Z"
doc_updated_by: "CODER"
description: "Adjust documentation spacing/dividers and nav affordances, rewrite homepage copy to match CONTENT.md, and improve blog index/post presentation including deferred featured post handling and generated art treatment."
id_source: "generated"
---
## Summary

Refine docs spacing and blog presentation

Adjust documentation spacing/dividers and nav affordances, rewrite homepage copy to match CONTENT.md, and improve blog index/post presentation including deferred featured post handling and generated art treatment.

## Scope

- In scope: Adjust documentation spacing/dividers and nav affordances, rewrite homepage copy to match CONTENT.md, and improve blog index/post presentation including deferred featured post handling and generated art treatment..
- Out of scope: unrelated refactors not required for "Refine docs spacing and blog presentation".

## Plan

1. Implement the change for "Refine docs spacing and blog presentation".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Verify Steps

### Scope

Validate docs shell spacing and divider rhythm, navbar active states, homepage copy/alignment, and blog index/post presentation.

### Checks

- Review diffs for touched website config, CSS, homepage, and blog files.
- Regenerate website-derived docs reference.
- Run website typecheck.
- Run website production build.
- Run the design-language check.

### Evidence / Commands

- `git diff -- website/docusaurus.config.ts website/src/css/custom.css website/src/data/homepageContent.ts website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx website/static/img/blog/release-0-2-25-kandinsky-agentplane.svg website/static/img/blog/release-0-3-0-kandinsky-agentplane.svg`
- `bun run docs:site:generate`
- `bun run --cwd website typecheck`
- `bun run --cwd website build`
- `node scripts/check-design-language.mjs`

### Pass criteria

- Docs content starts lower beneath the navbar, left padding is cleaner, and the sidebar divider no longer feels clipped into the header.
- Current navbar section is visibly active on child pages.
- Homepage logo and hero content share the same left alignment rhythm, and copy follows the CONTENT.md contract without runtime-reading it.
- Blog titles are clickable, featured entry is hidden, and abstract cover imagery is present on release posts.
- Website generation, build, and design checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T13:58:23.088Z — VERIFY — ok

By: CODER

Note: Command: git diff -- website/docusaurus.config.ts website/src/css/custom.css website/src/data/homepageContent.ts website/src/pages/index.tsx website/src/pages/index.module.css website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx website/static/img/blog/release-0-2-25-kandinsky-agentplane.svg website/static/img/blog/release-0-3-0-kandinsky-agentplane.svg
Result: pass
Evidence: docs shell, homepage, blog index, release post covers, and navbar active-state changes are all present in the staged scope
Scope: website config, global CSS, homepage, blog index, blog posts, static blog artwork

Command: bun run docs:site:generate
Result: pass
Evidence: generated docs/reference/generated-reference.mdx without drift
Scope: generated website reference content

Command: bun run --cwd website typecheck
Result: pass
Evidence: tsc completed without errors
Scope: website TypeScript surface

Command: bun run --cwd website build
Result: pass
Evidence: Docusaurus build completed and generated static files in build
Scope: production website build

Command: node scripts/check-design-language.mjs
Result: pass
Evidence: DESIGN.md compliance check passed
Scope: website visual language contract

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T13:57:02.230Z, excerpt_hash=sha256:2171620dcde4df548f79b19a87cb60f00aa3f418342669f62d09635fc058e57a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Homepage copy was rewritten manually from the CONTENT.md content contract; the page does not parse CONTENT.md at runtime.
- Docs-shell spacing and divider fixes were made in global website CSS because Docusaurus shell behavior is theme-level, not page-local.
- Blog index now hides the featured block, uses clickable post titles, and includes Kandinsky-like abstract SVG covers for release posts.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
