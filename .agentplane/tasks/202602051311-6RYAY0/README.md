---
id: "202602051311-6RYAY0"
title: "Audit Epic E: align config defaults and validate spec example"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["epic-e", "config", "schema", "tests"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: align schema defaults for tasks.doc and add runtime test for spec example config." }
doc_version: 2
doc_updated_at: "2026-02-05T13:13:58.634Z"
doc_updated_by: "VERIFY"
description: "Fix schema defaults for tasks.doc to include Verification and add runtime test for spec example config."
id_source: "generated"
---
## Summary

Align schema defaults for tasks.doc and add runtime test for spec example config.

## Scope

Update schema defaults in tasks.doc and add config.test.ts coverage for spec example validation.

## Risks

Schema default alignment could affect defaultConfig output; ensure tests cover expected sections.

## Verify Steps

cmd: bun run lint
cmd: bun run test:fast
cmd: node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Verification

Pending: execute verify after implementation.

Status: pass
Verified at: 2026-02-05T13:13:58.632Z
Verified sha: 9c5607eb99abe7a6873e66cf7b2cd64c2b0bbd09

Commands:
- bun run lint
- bun run test:fast
- node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Rollback Plan

Revert schema default and config test changes.
