---
id: "202604210859-SS2RQG"
title: "Convert deprecated CLI flags from no-op to hard error"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:07:34.725Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:09:56.230Z"
  updated_by: "CODER"
  note: "Deprecated CLI options now fail in the command-spec parser with E_DEPRECATED_FLAG before command handlers/validateRaw run. Verification: parse.test passed (7 tests), targeted guard auto-allow CLI test passed, and agentplane typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Convert deprecated no-op CLI flags to explicit hard errors with focused parser/spec tests and no final flag removal."
events:
  -
    type: "status"
    at: "2026-04-21T09:07:35.756Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Convert deprecated no-op CLI flags to explicit hard errors with focused parser/spec tests and no final flag removal."
  -
    type: "verify"
    at: "2026-04-21T09:09:56.230Z"
    author: "CODER"
    state: "ok"
    note: "Deprecated CLI options now fail in the command-spec parser with E_DEPRECATED_FLAG before command handlers/validateRaw run. Verification: parse.test passed (7 tests), targeted guard auto-allow CLI test passed, and agentplane typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-21T09:09:56.236Z"
doc_updated_by: "CODER"
description: "Make deprecated/no-op CLI flags fail loudly with a structured E_DEPRECATED_FLAG error instead of silently doing nothing."
sections:
  Summary: "Change deprecated CLI flag handling from silent disabled/no-op behavior to a non-zero structured error for the next patch release."
  Scope: "In scope: command spec metadata, parser/validator behavior, affected command tests, and release-note-facing error text. Out of scope: removing flags entirely from the catalog."
  Plan: |-
    1. Inventory deprecated disabled/no-op flags in command specs and tests.
    2. Add or reuse a deprecated=error mode in the command parser.
    3. Emit CliError code E_DEPRECATED_FLAG with clear migration guidance and non-zero exit.
    4. Update all affected specs and command tests.
  Verify Steps: |-
    - Deprecated flags return non-zero with E_DEPRECATED_FLAG.
    - Tests cover at least start/task/guard paths that had no-op behavior.
    - No supported flag behavior changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:09:56.230Z — VERIFY — ok
    
    By: CODER
    
    Note: Deprecated CLI options now fail in the command-spec parser with E_DEPRECATED_FLAG before command handlers/validateRaw run. Verification: parse.test passed (7 tests), targeted guard auto-allow CLI test passed, and agentplane typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:07:35.768Z, excerpt_hash=sha256:9ba1dfa404e97529e32d972ae01f8524444afeef7db3f809e10c917e03b31e2e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous parser/spec behavior and tests for this task only."
  Findings: "Source input: AUDIT H-4 and REFACTORING_PLAN E.2. This is a patch-release hardening step, not final flag removal."
id_source: "generated"
---
## Summary

Change deprecated CLI flag handling from silent disabled/no-op behavior to a non-zero structured error for the next patch release.

## Scope

In scope: command spec metadata, parser/validator behavior, affected command tests, and release-note-facing error text. Out of scope: removing flags entirely from the catalog.

## Plan

1. Inventory deprecated disabled/no-op flags in command specs and tests.
2. Add or reuse a deprecated=error mode in the command parser.
3. Emit CliError code E_DEPRECATED_FLAG with clear migration guidance and non-zero exit.
4. Update all affected specs and command tests.

## Verify Steps

- Deprecated flags return non-zero with E_DEPRECATED_FLAG.
- Tests cover at least start/task/guard paths that had no-op behavior.
- No supported flag behavior changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:09:56.230Z — VERIFY — ok

By: CODER

Note: Deprecated CLI options now fail in the command-spec parser with E_DEPRECATED_FLAG before command handlers/validateRaw run. Verification: parse.test passed (7 tests), targeted guard auto-allow CLI test passed, and agentplane typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:07:35.768Z, excerpt_hash=sha256:9ba1dfa404e97529e32d972ae01f8524444afeef7db3f809e10c917e03b31e2e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous parser/spec behavior and tests for this task only.

## Findings

Source input: AUDIT H-4 and REFACTORING_PLAN E.2. This is a patch-release hardening step, not final flag removal.
