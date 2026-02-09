---
id: "202602091522-NMPVK1"
title: "CLI lint/test: forbid hardcoded CliError exitCode"
result_summary: "Exit code mapping contract enforced"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602091522-089FS2"
tags:
  - "testing"
  - "cli"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:38:24.837Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. Added a contract test that asserts any CliError with numeric exitCode matches exitCodeForError(code)."
commit:
  hash: "6eeded4d05f544442a7ccabecf52b4763d24bd0c"
  message: "✅ NMPVK1 cli: enforce exitCode mapping for CliError"
comments:
  -
    author: "TESTER"
    body: "Start: add enforcement to prevent hardcoded numeric exitCode in new CliError(...) outside exit-code mapping modules, so ErrorCode->exitCode contract stays consistent. Add test guard and fix any offenders."
  -
    author: "TESTER"
    body: "Verified: bun run lint and bun run test:full pass. Added a contract test scanning TS sources for CliError literals with code/exitCode and failing if the exit code does not match the canonical mapping."
events:
  -
    type: "status"
    at: "2026-02-09T16:31:50.264Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add enforcement to prevent hardcoded numeric exitCode in new CliError(...) outside exit-code mapping modules, so ErrorCode->exitCode contract stays consistent. Add test guard and fix any offenders."
  -
    type: "verify"
    at: "2026-02-09T16:38:08.263Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Added contract test that asserts any CliError with a hardcoded numeric exitCode matches exitCodeForError(code), preventing E_* exit code drift regressions."
  -
    type: "verify"
    at: "2026-02-09T16:38:24.837Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Added a contract test that asserts any CliError with numeric exitCode matches exitCodeForError(code)."
  -
    type: "status"
    at: "2026-02-09T16:38:24.982Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added a contract test scanning TS sources for CliError literals with code/exitCode and failing if the exit code does not match the canonical mapping."
doc_version: 2
doc_updated_at: "2026-02-09T16:38:24.982Z"
doc_updated_by: "TESTER"
description: "Add a guard (test or eslint rule) to prevent hardcoded exitCode values in CliError constructors outside the centralized mapping/helper."
id_source: "generated"
---
## Summary

Add enforcement so CliError exit codes are not hardcoded in commands; exit codes must be derived from exitCodeForError (except in the mapping module itself).

## Scope

Test/lint layer only (e.g. vitest grep test or eslint rule config + fixtures).

## Plan

1) Scan codebase for new CliError({... exitCode: <number> ...}).\n2) Define allowlist for the small set of modules where numeric exit codes are permitted (e.g., exit-codes mapping itself / test fixtures).\n3) Add a test that fails if any disallowed hardcoded exitCode literals appear.\n4) Update any remaining offenders to use exitCodeForError(...) or throwCliError helpers.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: false positives on objects that include exitCode in other contexts. Mitigation: narrow patterns and allowlist known safe modules.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:38:08.263Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Added contract test that asserts any CliError with a hardcoded numeric exitCode matches exitCodeForError(code), preventing E_* exit code drift regressions.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:31:50.550Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

#### 2026-02-09T16:38:24.837Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Added a contract test that asserts any CliError with numeric exitCode matches exitCodeForError(code).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:38:08.264Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the enforcement test/rule.
