---
id: "202602051513-F0G9Q7"
title: "Add Redmine setup checklist"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "8a6366f4f6f77478361cc682bd3de8d8cff008de", message: "📝 F0G9Q7 redmine setup checklist" }
comments:
  - { author: "DOCS", body: "Verified: Redmine doc includes setup checklist, sources for IDs and API key, and env var list with sources." }
doc_version: 2
doc_updated_at: "2026-02-05T15:15:18.393Z"
doc_updated_by: "DOCS"
description: "Add step-by-step Redmine setup instructions including custom field configuration and env vars."
id_source: "generated"
---
## Summary

Add step-by-step Redmine setup instructions for new installations.

## Scope

- Expand docs/user/backends/redmine.mdx with setup checklist.
- Explain where to get API key, project id, and custom field IDs.
- List required .env variables and their sources.

## Risks

- Redmine UI steps may vary by version.
- Field ID locations may differ if admin UI is customized.

## Verify Steps

- Review docs/user/backends/redmine.mdx for step-by-step setup instructions.
- Confirm env vars list includes where to obtain each value.
- Ensure custom field IDs and types are explained.

## Verification

Pending.

- docs/user/backends/redmine.mdx now includes setup checklist, where to find API key/project id/custom field IDs, and env var sources.

## Rollback Plan

- Revert docs/user/backends/redmine.mdx changes.
