---
id: "202602030957-6B5C51"
title: "Document npm version requirement for trusted publishing"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "2d1b37ffd2efd68128f36f5a6d67d0efa34940bb", message: "📝 6B5C51 note npm version for trusted publishing" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Add documentation note that trusted publishing requires npm >= 11.5.1 and point to workflow context." }
  - { author: "ORCHESTRATOR", body: "Verified: Added npm >= 11.5.1 requirement to trusted publishing docs in release-and-publishing.mdx." }
doc_version: 2
doc_updated_at: "2026-02-03T11:02:14.486Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add documentation note that npm trusted publishing in GitHub Actions requires npm >= 11.5.1, and reference publish workflow expectations."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Document that npm trusted publishing in GitHub Actions requires npm >= 11.5.1.

## Scope

Update release/publishing docs to include the npm version requirement for trusted publishing.

## Risks

Low risk; documentation-only change.

## Verify Steps

Open docs/developer/release-and-publishing.mdx and confirm the trusted publishing section mentions npm >= 11.5.1.

## Rollback Plan

Revert the documentation line if it causes confusion or becomes outdated.

## Summary

Normalized task doc sections (dedupe).
