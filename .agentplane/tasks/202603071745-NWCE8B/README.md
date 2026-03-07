---
id: "202603071745-NWCE8B"
title: "Publish blog posts for 0.3.0 to 0.3.2"
result_summary: "The public blog now explains the 0.3.0-0.3.2 line in plain language and the published site reflects the new entries without in-post header artwork."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T17:53:12.905Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add blog posts for 0.3.0-0.3.2, keep language accessible, hide in-post hero illustrations, verify locally, then publish site."
verification:
  state: "ok"
  updated_at: "2026-03-07T18:02:14.302Z"
  updated_by: "DOCS"
  note: "Blog posts for 0.3.0, 0.3.1, and 0.3.2 were added in plain language, in-post hero illustrations were removed, website build and design checks passed locally, and remote Docs CI/Core CI/Pages Deploy succeeded on 8bb6a018db17 (runs 22804204073, 22804204072, 22804227910)."
commit:
  hash: "8bb6a018db17ce48e1e797c5af0d3bca94e12eba"
  message: "📝 NWCE8B task: publish 0.3.x release journal entries"
comments:
  -
    author: "DOCS"
    body: "Verified: release journal posts for 0.3.0, 0.3.1, and 0.3.2 are published on the blog, the in-post Kandinsky hero images are hidden, and the site deploy succeeded on the same commit."
events:
  -
    type: "verify"
    at: "2026-03-07T18:02:14.302Z"
    author: "DOCS"
    state: "ok"
    note: "Blog posts for 0.3.0, 0.3.1, and 0.3.2 were added in plain language, in-post hero illustrations were removed, website build and design checks passed locally, and remote Docs CI/Core CI/Pages Deploy succeeded on 8bb6a018db17 (runs 22804204073, 22804204072, 22804227910)."
  -
    type: "status"
    at: "2026-03-07T18:02:25.689Z"
    author: "DOCS"
    from: "TODO"
    to: "DONE"
    note: "Verified: release journal posts for 0.3.0, 0.3.1, and 0.3.2 are published on the blog, the in-post Kandinsky hero images are hidden, and the site deploy succeeded on the same commit."
doc_version: 2
doc_updated_at: "2026-03-07T18:02:25.689Z"
doc_updated_by: "DOCS"
description: "Write human-readable blog posts for releases 0.3.0, 0.3.1, and 0.3.2 based on the release notes, hide the header illustrations inside the posts for now, publish the site, and verify the pages deploy."
id_source: "generated"
---
## Summary

Publish blog posts for 0.3.0 to 0.3.2

Write human-readable blog posts for releases 0.3.0, 0.3.1, and 0.3.2 based on the release notes, hide the header illustrations inside the posts for now, publish the site, and verify the pages deploy.

## Scope

- In scope: Write human-readable blog posts for releases 0.3.0, 0.3.1, and 0.3.2 based on the release notes, hide the header illustrations inside the posts for now, publish the site, and verify the pages deploy..
- Out of scope: unrelated refactors not required for "Publish blog posts for 0.3.0 to 0.3.2".

## Plan

1. Review existing release notes and blog conventions for 0.3.0, 0.3.1, and 0.3.2. 2. Write human-readable posts that explain the practical changes in plain language. 3. Keep the kandinsky header illustrations hidden inside the post pages for now, update the blog index as needed, publish the site, and verify the deployed pages.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T18:02:14.302Z — VERIFY — ok

By: DOCS

Note: Blog posts for 0.3.0, 0.3.1, and 0.3.2 were added in plain language, in-post hero illustrations were removed, website build and design checks passed locally, and remote Docs CI/Core CI/Pages Deploy succeeded on 8bb6a018db17 (runs 22804204073, 22804204072, 22804227910).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T17:46:07.599Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
