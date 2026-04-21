---
id: "202604210859-3GKMTX"
title: "Route config deprecation warnings through logger"
result_summary: "Routed config deprecation warnings through logger."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "approved"
  updated_at: "2026-04-21T09:35:46.986Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:36:43.514Z"
  updated_by: "CODER"
  note: "Replaced config deprecation console.warn with core logger.warn-style event output and lowered production console baseline from 26 to 25. Verification: core config test passed (18 tests), core typecheck passed, logging:check passed, and rg found no console.warn in core/agentplane production TS files."
commit:
  hash: "64c671d573087d853c68617c3581d66a6b3abcf5"
  message: "✅ 3GKMTX code: done"
comments:
  -
    author: "CODER"
    body: "Start: Replace config deprecation console.warn with the core logger and lower the console usage baseline accordingly."
  -
    author: "CODER"
    body: "Verified: config deprecation warnings now use the core logger and production console baseline is reduced to 25."
events:
  -
    type: "status"
    at: "2026-04-21T09:35:47.815Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replace config deprecation console.warn with the core logger and lower the console usage baseline accordingly."
  -
    type: "verify"
    at: "2026-04-21T09:36:43.514Z"
    author: "CODER"
    state: "ok"
    note: "Replaced config deprecation console.warn with core logger.warn-style event output and lowered production console baseline from 26 to 25. Verification: core config test passed (18 tests), core typecheck passed, logging:check passed, and rg found no console.warn in core/agentplane production TS files."
  -
    type: "status"
    at: "2026-04-21T09:37:37.704Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: config deprecation warnings now use the core logger and production console baseline is reduced to 25."
doc_version: 3
doc_updated_at: "2026-04-21T09:37:37.707Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T09:36:43.514Z — VERIFY — ok
    
    By: CODER
    
    Note: Replaced config deprecation console.warn with core logger.warn-style event output and lowered production console baseline from 26 to 25. Verification: core config test passed (18 tests), core typecheck passed, logging:check passed, and rg found no console.warn in core/agentplane production TS files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:35:47.830Z, excerpt_hash=sha256:1de2442c5c6f21c73c145b6095bfd7b7456ad35a87135b65e38efd98de22af0d
    
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
### 2026-04-21T09:36:43.514Z — VERIFY — ok

By: CODER

Note: Replaced config deprecation console.warn with core logger.warn-style event output and lowered production console baseline from 26 to 25. Verification: core config test passed (18 tests), core typecheck passed, logging:check passed, and rg found no console.warn in core/agentplane production TS files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:35:47.830Z, excerpt_hash=sha256:1de2442c5c6f21c73c145b6095bfd7b7456ad35a87135b65e38efd98de22af0d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore console.warn implementation and baseline changes for this task only.

## Findings

Source input: AUDIT H-2 and SAFE_TO_REMOVE 1.1.
