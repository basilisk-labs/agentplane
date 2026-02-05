---
id: "202602050609-2SWFWB"
title: "AP-020a: Safe archive validation"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "security", "archive", "validation"]
verify: []
commit: { hash: "fd87f5be500d8064905a5f3ec1e76f9af2f5534a", message: "🧩 2SWFWB add archive validation" }
comments:
  - { author: "CODER", body: "Start: implement archive entry validation for tar/zip safety." }
  - { author: "CODER", body: "Verified: archive validation module added with tests; pre-commit hooks passed." }
doc_version: 2
doc_updated_at: "2026-02-05T06:16:25.292Z"
doc_updated_by: "CODER"
description: "Validate tar/zip entries to prevent path traversal and symlink abuse."
id_source: "generated"
---
## Summary

Add archive entry validation to prevent zip-slip/path traversal and symlink abuse.

## Scope

Implement path validation for tar/zip entries, reject absolute paths, traversal, and symlinks with E_VALIDATION.

## Risks

Risk: false positives for edge-case archives; mitigate by clear error messages and tests.

## Verify Steps

Run archive validation tests for traversal and symlink cases; ensure E_VALIDATION exit code.

## Rollback Plan

Revert the archive validation commit to restore previous extraction behavior.
