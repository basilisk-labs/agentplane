---
id: "202603061423-J3P2K8"
title: "Restore placeholder homepage and simplify blog index"
result_summary: "Homepage now uses the earlier typographic placeholder, blog entry artwork is hidden from the index page, and the site is ready to republish."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:24:27.070Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-06T14:26:10.406Z"
  updated_by: "CODER"
  note: "Verified: bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Homepage is restored to the earlier placeholder surface and blog index illustrations are removed."
commit:
  hash: "009f0fb1e3c857942c2bc626be639a71e521261d"
  message: "✨ J3P2K8 website: restore placeholder homepage"
comments:
  -
    author: "CODER"
    body: "Start: restore the earlier placeholder homepage surface and remove inline artwork from the blog landing page, then republish the site after the required checks."
  -
    author: "CODER"
    body: "Verified: the homepage is back to the placeholder holding surface, the blog index is text-only, and the required website checks passed before deployment."
events:
  -
    type: "status"
    at: "2026-03-06T14:24:36.039Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore the earlier placeholder homepage surface and remove inline artwork from the blog landing page, then republish the site after the required checks."
  -
    type: "verify"
    at: "2026-03-06T14:26:10.406Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Homepage is restored to the earlier placeholder surface and blog index illustrations are removed."
  -
    type: "status"
    at: "2026-03-06T14:26:20.634Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the homepage is back to the placeholder holding surface, the blog index is text-only, and the required website checks passed before deployment."
doc_version: 2
doc_updated_at: "2026-03-06T14:26:20.634Z"
doc_updated_by: "CODER"
description: "Revert the homepage to the previous placeholder-style typographic landing, keep the blog itself, and hide post illustrations from the blog index page before republishing the website."
id_source: "generated"
---
## Summary

Restore placeholder homepage and simplify blog index

Revert the homepage to the previous placeholder-style typographic landing, keep the blog itself, and hide post illustrations from the blog index page before republishing the website.

## Scope

In scope: website/src/pages/index.tsx, website/src/pages/index.module.css, website/src/pages/blog/index.tsx, and related blog index styles needed to hide entry visuals. Out of scope: blog post content, docs IA, navbar, or release/version work.

## Plan

1. Restore the homepage to the earlier placeholder-style typographic landing using the prior website version as the source.\n2. Remove visual illustrations from the blog index while keeping linked post entries and the blog content intact.\n3. Run website generation/typecheck/build/design checks, then push main and confirm Docs CI plus Pages Deploy.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. bun run docs:site:generate\n2. bun run --cwd website typecheck\n3. bun run --cwd website build\n4. node scripts/check-design-language.mjs\n5. git push origin main and confirm Docs CI plus Pages Deploy succeed

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T14:26:10.406Z — VERIFY — ok

By: CODER

Note: Verified: bun run docs:site:generate; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Homepage is restored to the earlier placeholder surface and blog index illustrations are removed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T14:24:36.039Z, excerpt_hash=sha256:408bbe274f74d2ed7254d73c27da9ba514373e726e21b4974fc2ac870a1bde97

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the homepage/blog index files to the previous commit if the placeholder regression is rejected or if the deploy introduces layout breakage.

## Notes

User wants the earlier placeholder homepage back, explicitly prefers a typographic-first surface, and wants blog illustrations hidden only on the blog landing page.
