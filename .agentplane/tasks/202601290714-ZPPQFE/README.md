---
id: "202601290714-ZPPQFE"
title: "AP-031: recipe list-remote + cache"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-GGRDKD"]
tags: ["roadmap", "nodejs", "recipes"]
verify: []
commit: { hash: "514c356cf71b32dfba920b4f7d4afd5d23d353fe", message: "feat: ZPPQFE list-remote cache" }
comments:
  - { author: "CODER", body: "Start: implement recipe list-remote with cached index fetching." }
  - { author: "CODER", body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: list-remote with cached index and refresh flag." }
doc_version: 2
doc_updated_at: "2026-01-29T09:56:16+00:00"
doc_updated_by: "agentctl"
description: "Implement recipe list-remote with cached index.json, timestamps, and --refresh support."
---
## Summary

Add recipe list-remote with cached index loading and optional refresh.

## Scope

- Add list-remote subcommand with cache file under .agentplane/cache/recipes-index.json.\n- Validate remote index schema and print latest version per recipe.\n- Add tests for cached and refreshed index reading.

## Risks

- Remote index schema drift could break parsing; validation errors surface clearly.\n- Cache can become stale until refreshed.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit(s) to remove list-remote and cache handling.
