---
id: "202602051655-AZ858W"
title: "Update Redmine env defaults"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
verify: []
commit: null
comments:
  - { author: "DOCS", body: "Start: update .env.example with recommended Redmine env defaults and note local .env owner alias." }
doc_version: 2
doc_updated_at: "2026-02-05T16:57:10.218Z"
doc_updated_by: "DOCS"
description: "Document recommended Redmine env values in .env.example and sync local .env owner alias."
id_source: "generated"
---
## Summary

Document recommended Redmine env values in .env.example and align local .env owner alias.

## Scope

- Update .env.example with recommended Redmine env defaults and custom field placeholders.\n- Set AGENTPLANE_REDMINE_OWNER_AGENT in .env to match owner (local only).

## Risks

- Minimal risk; only docs/example updates.\n- Local .env edit should not be committed.

## Verify Steps

- bun run format:check.\n- bun run lint.\n- bun run test:fast.

## Verification

- ✅ bun run format:check.\n- ✅ bun run lint.\n- ✅ bun run test:fast.

## Rollback Plan

- Revert .env.example changes if undesired.
