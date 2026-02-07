---
id: "202602051506-WJEZBQ"
title: "Split backend docs: local vs redmine, add parity guidance"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "8b400e4a2eb2c2a5478de2180116fdd6abc758db"
  message: "📝 WJEZBQ split backend docs"
comments:
  -
    author: "DOCS"
    body: "Verified: Local and Redmine backend sections separated; Redmine parity requirements include extra fields and mapping note."
doc_version: 2
doc_updated_at: "2026-02-05T15:07:29.505Z"
doc_updated_by: "DOCS"
description: "Restructure backends doc into separate sections and document Redmine full-parity setup."
id_source: "generated"
---
## Summary

Split backend docs into local and Redmine sections with full-parity setup guidance.

## Scope

- Restructure docs/user/backends.mdx into separate Local and Redmine sections.
- Add instructions for full-parity Redmine setup (custom fields + mapping).
- Keep guidance concise and accurate to current code.

## Risks

- Doc may imply parity without code changes if wording is careless.
- Redmine field IDs can drift from actual project settings.

## Verify Steps

- Review docs/user/backends.mdx for separate Local and Redmine sections.
- Confirm Redmine parity requirements list custom fields and mapping notes.
- Ensure wording does not claim parity without code support.

## Verification

Pending.

- docs/user/backends.mdx now has separate Local and Redmine sections.
- Redmine parity requirements list extra custom fields and note code mapping requirement.

## Rollback Plan

- Revert changes in docs/user/backends.mdx.
- Update Verification with rollback note if needed.

## Plan
