---
id: "202602051458-XDYC0T"
title: "Document Redmine setup and custom fields"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-02-05T15:00:05.921Z"
doc_updated_by: "DOCS"
description: "Add a Redmine setup section describing required custom fields and configuration for parity."
id_source: "generated"
---
## Summary

Document Redmine setup requirements and custom fields for backend parity.

## Scope

- Add a Redmine setup section in docs.
- Describe required custom fields and config keys.
- Keep instructions concise and actionable.

## Risks

- Mismatch with actual Redmine field IDs if not updated in .env.
- Docs may diverge from backend behavior.

## Verify Steps

- Review docs/user/backends.mdx for the new Redmine setup section.
- Ensure custom fields and .env keys are listed and match backend expectations.

## Verification

Pending.

- Reviewed docs/user/backends.mdx for Redmine setup section and custom fields list.
- Confirmed .env keys and backend config example are included.

## Rollback Plan

- Revert docs/user/backends.mdx changes.
- Update task doc Verification with rollback note if needed.
