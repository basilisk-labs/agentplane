---
id: "202604210859-3GKMTX"
title: "Route config deprecation warnings through logger"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-M2D9WZ"
tags:
  - "code"
  - "config"
  - "logging"
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
doc_version: 3
doc_updated_at: "2026-04-21T08:59:15.413Z"
doc_updated_by: "PLANNER"
description: "Replace config deprecation console.warn output with the core logger so structured logging remains parseable."
sections:
  Summary: "Change warnDeprecatedConfigKeys to use logger.warn and verify that deprecated config warnings follow the structured logging contract."
  Scope: "In scope: packages/core/src/config/config.ts, logger import/test adjustments, and console baseline update. Out of scope: removing deprecated config key support."
  Plan: |-
    1. Replace console.warn in config deprecation handling with logger.warn.
    2. Preserve existing warning visibility for human CLI output.
    3. Add or update tests for deprecated key warning emission.
    4. Update console usage baseline from T8 if needed.
  Verify Steps: |-
    - rg console.warn in core config path is empty.
    - Deprecated base_branch still warns and is ignored.
    - Structured logging/json mode is not polluted by raw console.warn.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore console.warn implementation and baseline changes for this task only."
  Findings: "Source input: AUDIT H-2 and SAFE_TO_REMOVE 1.1."
id_source: "generated"
---
## Summary

Change warnDeprecatedConfigKeys to use logger.warn and verify that deprecated config warnings follow the structured logging contract.

## Scope

In scope: packages/core/src/config/config.ts, logger import/test adjustments, and console baseline update. Out of scope: removing deprecated config key support.

## Plan

1. Replace console.warn in config deprecation handling with logger.warn.
2. Preserve existing warning visibility for human CLI output.
3. Add or update tests for deprecated key warning emission.
4. Update console usage baseline from T8 if needed.

## Verify Steps

- rg console.warn in core config path is empty.
- Deprecated base_branch still warns and is ignored.
- Structured logging/json mode is not polluted by raw console.warn.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore console.warn implementation and baseline changes for this task only.

## Findings

Source input: AUDIT H-2 and SAFE_TO_REMOVE 1.1.
