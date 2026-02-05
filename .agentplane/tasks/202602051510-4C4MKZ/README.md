---
id: "202602051510-4C4MKZ"
title: "Split backend docs into per-backend files"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "5b0f7460e0faace92f5becf9184d1ad8537e744e", message: "📝 4C4MKZ split backend docs" }
comments:
  - { author: "DOCS", body: "Verified: backends overview links to per-backend docs; local and redmine docs added with parity guidance." }
doc_version: 2
doc_updated_at: "2026-02-05T15:11:55.648Z"
doc_updated_by: "DOCS"
description: "Move backend docs into separate Local and Redmine files and leave overview in backends.mdx."
id_source: "generated"
---
## Summary

Split backend docs into per-backend files and keep backends.mdx as an overview.

## Scope

- Create docs/user/backends/local.mdx and docs/user/backends/redmine.mdx.
- Move detailed content into per-backend files.
- Keep docs/user/backends.mdx as overview with links.

## Risks

- Broken doc links if paths are wrong.
- Redmine parity guidance may drift from code if not explicit.

## Verify Steps

- Open docs/user/backends.mdx to confirm it references per-backend docs.
- Ensure docs/user/backends/local.mdx and docs/user/backends/redmine.mdx exist and render.
- Confirm Redmine doc includes full-parity setup guidance and explicit mapping caveat.

## Verification

Pending.

- docs/user/backends.mdx now links to per-backend docs.
- docs/user/backends/local.mdx and docs/user/backends/redmine.mdx created.
- Redmine doc includes full-parity fields and mapping caveat.

## Rollback Plan

- Restore docs/user/backends.mdx from before the split.
- Remove per-backend doc files if needed.
