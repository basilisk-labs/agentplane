---
id: "202602050527-T58547"
title: "AP-002: Fix JSON error format contract"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "errors", "docs"]
verify: []
commit: { hash: "7230912182c04276e09ab025209cb42fbdf77f94", message: "🧩 T58547 lock --json error schema" }
comments:
  - { author: "CODER", body: "Start: lock --json error schema to contract and update tests/docs." }
  - { author: "CODER", body: "Verified: bun run test:agentplane; JSON error schema now matches cli-contract exactly (no extra keys)." }
doc_version: 2
doc_updated_at: "2026-02-05T05:39:12.383Z"
doc_updated_by: "CODER"
description: "Define stable --json error format; update docs and tests; no backward compatibility."
id_source: "generated"
---
## Summary

Define the canonical --json error format, update docs and code, and enforce via tests (no backward compatibility).

## Scope

Update JSON error formatting to match contract, revise cli-contract docs, and add strict tests for required fields.

## Risks

Risk: downstream tooling relying on extra JSON keys may break; mitigated by explicit contract update and tests.

## Verify Steps

Run errors JSON tests; confirm exact keys and types; ensure docs and runtime output match.

## Rollback Plan

Revert commit for this task; restore previous JSON error format if integrations require it.
