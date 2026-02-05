---
id: "202602050609-MT8GF4"
title: "AP-020b: Safe extract integration"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "security", "archive", "integration"]
verify: []
commit: { hash: "2fb1d40dfd753b14b92d9a02e31f44380c8e27f9", message: "🧩 MT8GF4 integrate safe archive checks" }
comments:
  - { author: "CODER", body: "Start: integrate safe archive validation into CLI and add tests/fixtures." }
  - { author: "CODER", body: "Verified: safe archive checks integrated with CLI; traversal tests added; pre-commit hooks passed." }
doc_version: 2
doc_updated_at: "2026-02-05T06:17:29.489Z"
doc_updated_by: "CODER"
description: "Integrate safe archive validation into CLI extraction paths and add tests."
id_source: "generated"
---
## Summary

Wire safe archive validation into CLI extraction paths and add integration tests.

## Scope

Integrate safe validation into extractArchive; cover upgrade/recipes paths; add tests and fixtures.

## Risks

Risk: extraction fails for unusual archives; mitigate with explicit errors and tests.

## Verify Steps

Run CLI tests covering archive extraction failures for traversal/symlinks; ensure E_VALIDATION.

## Rollback Plan

Revert integration commit to restore original extractArchive behavior.
