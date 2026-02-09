---
id: "202602091524-7ZMK9S"
title: "upgrade: stabilize agent JSON merge (canonicalization + rules)"
result_summary: "Canonical JSON comparisons for agent merges"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-09T16:23:58.438Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. Agent JSON merges now use canonicalized JSON for comparisons/dedup, and 3-way fallback preserves user-only keys while letting upstream win for conflicts."
commit:
  hash: "74d4ae3651ebe116b4b7ba5c60db0fdc20614df7"
  message: "✅ 7ZMK9S upgrade: canonical JSON merge comparisons"
comments:
  -
    author: "CODER"
    body: "Start: stabilize agent JSON merge by canonicalizing JSON for comparisons/dedup, defining deterministic equality (key-order agnostic), and adding coverage to prevent false user-change detection in 3-way merges."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Upgrade JSON merge now uses canonicalized comparisons (key-order agnostic) for user-change detection and array dedup. Added regression test covering key-order-only differences during 3-way merge."
events:
  -
    type: "status"
    at: "2026-02-09T16:10:56.786Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilize agent JSON merge by canonicalizing JSON for comparisons/dedup, defining deterministic equality (key-order agnostic), and adding coverage to prevent false user-change detection in 3-way merges."
  -
    type: "verify"
    at: "2026-02-09T16:23:58.438Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Agent JSON merges now use canonicalized JSON for comparisons/dedup, and 3-way fallback preserves user-only keys while letting upstream win for conflicts."
  -
    type: "status"
    at: "2026-02-09T16:23:58.598Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Upgrade JSON merge now uses canonicalized comparisons (key-order agnostic) for user-change detection and array dedup. Added regression test covering key-order-only differences during 3-way merge."
doc_version: 2
doc_updated_at: "2026-02-09T16:23:58.598Z"
doc_updated_by: "CODER"
description: "Make agent JSON merge deterministic (stable key order / canonicalization) and define authoritative vs user fields to reduce noise and false diffs."
id_source: "generated"
---
## Summary

Make agent prompt merge deterministic by canonicalizing JSON, defining merge rules (upstream/user authoritative fields), and reducing false diffs due to key order.

## Scope

packages/agentplane/src/commands/upgrade.ts and upgrade merge tests.

## Plan

1) Implement canonical JSON equality helpers (key-order agnostic) for agent merge routines.\n2) Replace JSON.stringify-based comparisons/dedup in mergeAgentJson + mergeAgentJson3Way with canonical equality and Set-based dedup.\n3) Add a regression test ensuring 3-way merge does not treat key-order-only changes as user edits.\n4) Run bun run lint and bun run test:full.

## Risks

Risk: users may expect certain fields to be preserved; mitigate by preserving unknown/user fields and only overwriting a small upstream-authoritative set.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:23:58.438Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Agent JSON merges now use canonicalized JSON for comparisons/dedup, and 3-way fallback preserves user-only keys while letting upstream win for conflicts.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:10:57.065Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
