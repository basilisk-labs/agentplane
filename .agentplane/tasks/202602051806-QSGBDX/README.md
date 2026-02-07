---
id: "202602051806-QSGBDX"
title: "Fix core schema packaging"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "packaging"
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
commit:
  hash: "e95d20cb5ea9adf2f9b20e90eb6a70d49ac2d16b"
  message: "🛠 QSGBDX ship core config schema"
comments:
  -
    author: "CODER"
    body: "Start: ensure core schema is packaged and runtime loads it from core package."
  -
    author: "CODER"
    body: "Verified: core schema shipped under packages/core/schemas and path updated in config loader."
doc_version: 2
doc_updated_at: "2026-02-05T18:08:57.448Z"
doc_updated_by: "CODER"
description: "Ship config schema with @agentplaneorg/core so agentplane --version works in npm installs."
id_source: "generated"
---
## Summary

Package config schema with core and update runtime path.

## Scope

Add core schemas directory, update config schema path, include schemas in core package files.

## Risks

Wrong schema path could break config validation.

## Verify Steps

Run agentplane --version from a packed install or confirm schema file resolves under packages/core.

## Verification

Added core schema file, updated schema path, and included schemas in package files list.

## Rollback Plan

Revert schema path and packaging changes.

## Plan
