---
id: "202601290714-GGRDKD"
title: "AP-029: local recipe manager (install/remove/list/info)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601270756-779J2V", "202601270756-V6CK4Q"]
tags: ["roadmap", "nodejs", "recipes"]
verify: []
commit: { hash: "bc04958a64853ffb98ac7e556ed2530418d943de", message: "feat: GGRDKD add local recipe manager commands and tests" }
comments:
  - { author: "CODER", body: "Start: implement local recipe manager (install/remove/list/info + lockfile)." }
  - { author: "CODER", body: "verified: GGRDKD close: bun run ci | details: document recipe manager implementation and tests." }
doc_version: 2
doc_updated_at: "2026-01-29T08:47:26+00:00"
doc_updated_by: "agentctl"
description: "Implement local recipe manager: install from archive, remove, list, and info, with recipes.lock.json tracking."
---
## Summary

Implemented local recipe manager commands (install/remove/list/info), recipes lockfile/index handling, and expanded CLI tests to cover recipe and cleanup/integrate edge cases.

## Scope

Add recipe CLI namespace with local archive install (tar/zip), list/info/remove, maintain recipes.lock.json and RECIPES.md, and add tests for recipe flows plus coverage-critical branches.

## Risks

Relies on system tar/zip commands; failures surface as CLI errors. Recipe manifests must be well-formed JSON.

## Verify Steps

bun run ci

## Rollback Plan

git revert <commit>
