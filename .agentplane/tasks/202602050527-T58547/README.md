---
id: "202602050527-T58547"
title: "AP-002: Fix JSON error format contract"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "errors", "docs"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: lock --json error schema to contract and update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-05T05:34:56.715Z"
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
