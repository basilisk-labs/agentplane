---
id: "202601271159-MHW8Q3"
title: "Update docs structure assets"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs", "assets"]
verify: []
commit: { hash: "72a4f109728d0ffb3475eafac459ba1ee9bc811b", message: "✨ MHW8Q3 docs: update header asset location" }
comments:
  - { author: "DOCS", body: "verified: bun run ci passed | details: docs header asset moved and README updated." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:09.659Z"
doc_updated_by: "agentplane"
description: "Apply updated documentation asset placement (move header image to docs/assets) and README references."
---
## Summary

Move docs header image under docs/assets and update README reference.

## Scope

Update README asset path; relocate header image to docs/assets.

## Risks

Low risk; ensure README still renders header image.

## Verify Steps

bun run ci

## Rollback Plan

Revert commit 72a4f109728d.
