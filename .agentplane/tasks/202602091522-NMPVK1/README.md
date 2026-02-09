---
id: "202602091522-NMPVK1"
title: "CLI lint/test: forbid hardcoded CliError exitCode"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:22:32.156Z"
doc_updated_by: "TESTER"
description: "Add a guard (test or eslint rule) to prevent hardcoded exitCode values in CliError constructors outside the centralized mapping/helper."
id_source: "generated"
---
## Summary

Add enforcement so CliError exit codes are not hardcoded in commands; exit codes must be derived from exitCodeForError (except in the mapping module itself).

## Scope

Test/lint layer only (e.g. vitest grep test or eslint rule config + fixtures).

## Plan

1. Add a repo-level test that searches for "new CliError({" with "exitCode:" hardcoded outside allowlisted files.\n2. Keep an explicit allowlist for mapping/helper modules.\n3. Ensure bun run test:full passes.

## Risks

Risk: false positives on objects that include exitCode in other contexts. Mitigation: narrow patterns and allowlist known safe modules.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the enforcement test/rule.
