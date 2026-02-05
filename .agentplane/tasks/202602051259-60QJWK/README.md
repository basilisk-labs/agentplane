---
id: "202602051259-60QJWK"
title: "Add --yes for verify approval"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["workflow", "cli", "verify"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: add --yes for verify approval, update usage/help, and extend tests." }
doc_version: 2
doc_updated_at: "2026-02-05T13:04:16.533Z"
doc_updated_by: "VERIFY"
description: "Allow non-interactive verify approval when agents.approvals.require_verify=true by adding --yes flag; update usage/help/tests."
id_source: "generated"
---
## Summary

Add --yes flag for verify approval and document non-interactive usage.

## Scope

Update verify flag parsing/usage, enforce approval in non-interactive mode unless --yes, and extend tests/docs.

## Risks

Non-interactive verify now fails without --yes; docs/tools must be updated to avoid CI failures.

## Verify Steps

cmd: bun run lint
cmd: bun run test:fast
cmd: node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Verification

Pending: execute verify after implementation.

Status: pass
Verified at: 2026-02-05T13:04:16.532Z
Verified sha: 588c216d9433b5629a4aaf9031417d7e92e6bb64

Commands:
- bun run lint
- bun run test:fast
- node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Rollback Plan

Revert verify flag changes, restore previous approval flow, and drop docs updates.
