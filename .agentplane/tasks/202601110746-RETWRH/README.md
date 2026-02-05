---
id: "202601110746-RETWRH"
title: "Repair task doc metadata and fill missing sections"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on: []
tags: ["docs", "tasks"]
verify: []
commit: { hash: "33b3e35be2da5d7acf1964178bf06813e285a7c4", message: "✨ RETWRH repair task docs metadata" }
comments:
  - { author: "DOCS", body: "Verified: task lint reports many legacy DONE tasks missing commit metadata (pre-existing); updated C7W2GE status/doc and scaffolded GH5YSV sections via agentctl." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:37.170Z"
doc_updated_by: "agentplane"
description: "Fix corrupted task README metadata and populate missing sections to keep PR checks healthy."
---
## Summary

Fix corrupted task README metadata and populate missing sections so task docs pass PR checks.

## Context

Task 202601071438-C7W2GE frontmatter is malformed (`Яstatus`) and contains escaped newlines, so the backend reads it as TODO. Task 202601071526-GH5YSV lacks body sections entirely, causing future PR checks to fail. Both need cleanup via agentctl.

## Scope

- Rewrite C7W2GE frontmatter via agentctl so status=DONE is respected and docs render correctly.
- Replace escaped `\n` bullets in C7W2GE with proper Markdown list items.
- Populate GH5YSV task README sections (Summary/Context/Scope/Risks/Verify Steps/Rollback Plan/Notes).

## Risks

- Manual doc updates could misrepresent task status if fields are missed.
- PR checks may still fail if required sections remain empty.

## Verify Steps

- python .agent-plane/agentctl.py task lint

## Rollback Plan

- Revert the README changes for C7W2GE and GH5YSV.

## Notes

- Do not change task ownership/status beyond correcting the corrupted frontmatter.
