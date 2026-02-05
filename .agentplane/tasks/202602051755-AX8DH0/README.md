---
id: "202602051755-AX8DH0"
title: "Document release flow"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on: []
tags: ["docs", "release"]
verify: []
commit: null
comments:
  - { author: "DOCS", body: "Start: document tag-based release flow and GitHub Release automation." }
doc_version: 2
doc_updated_at: "2026-02-05T18:01:14.568Z"
doc_updated_by: "DOCS"
description: "Update release docs to describe tag-based publish + GitHub Release generation."
id_source: "generated"
---
## Summary

Document the tag-triggered release flow and GitHub Release automation.

## Scope

Update developer release documentation to describe tagging, checks, npm publish, and GitHub Release creation.

## Risks

Docs may diverge from actual workflow behavior if not updated.

## Verify Steps

Review docs/developer/release-and-publishing.mdx to ensure it matches the tag-based release workflow.

## Verification

Updated release-and-publishing docs to reflect tag-based publish checks and GitHub Release creation.

## Rollback Plan

Revert documentation edits if inaccurate.
