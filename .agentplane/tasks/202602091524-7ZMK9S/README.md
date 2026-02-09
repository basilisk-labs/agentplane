---
id: "202602091524-7ZMK9S"
title: "upgrade: stabilize agent JSON merge (canonicalization + rules)"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202602091523-XAQGKB"
tags:
  - "upgrade"
  - "quality"
  - "json"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:24:24.374Z"
doc_updated_by: "CODER"
description: "Make agent JSON merge deterministic (stable key order / canonicalization) and define authoritative vs user fields to reduce noise and false diffs."
id_source: "generated"
---
## Summary

Make agent prompt merge deterministic by canonicalizing JSON, defining merge rules (upstream/user authoritative fields), and reducing false diffs due to key order.

## Scope

packages/agentplane/src/commands/upgrade.ts and upgrade merge tests.

## Plan

1. Introduce canonical JSON stringify/parse helper.\n2. Define merge rules for agent JSON: which fields are upstream-authoritative vs user-preserved vs union.\n3. Update merge logic and tests to be deterministic.

## Risks

Risk: users may expect certain fields to be preserved; mitigate by preserving unknown/user fields and only overwriting a small upstream-authoritative set.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
