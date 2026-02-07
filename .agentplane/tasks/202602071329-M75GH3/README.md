---
id: "202602071329-M75GH3"
title: "AP-REGRESS-01: Regression guard (guardrails + traceability)"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602071329-CG7SJP"
  - "202602071329-PYB8DV"
  - "202602071329-7H5M54"
tags:
  - "roadmap"
  - "testing"
  - "guardrails"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:04:58.273Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Add regression coverage for guardrails/traceability and enforce English-only source text."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T16:04:58.655Z"
doc_updated_by: "TESTER"
description: "Smoke/regression: agents can write arbitrary code within the repo; guardrails (protected paths, commit subject, base branch, approvals) remain strict; traceability (task docs, start/verify/finish, commit allowlist) remains intact. Run vitest suites and add any missing coverage."
id_source: "generated"
---
## Summary

Regression coverage: ensure strict guardrails and end-to-end traceability remain intact after policy/git/CLI refactors, and enforce English-only text in source code.

## Scope

In scope: add/adjust tests for guard/hooks/policy parity and integrate commit/meta behavior; scan and fix non-English text in TypeScript source/test files. Out of scope: rewriting documentation content.

## Plan

1. Add regression coverage for guardrails and traceability (policy engine parity, protected paths, commit subject, base branch pinning).
2. Extend PR/integrate tests to ensure integration commits use a compliant subject and PR meta no longer writes legacy fields.
3. Audit the codebase for non-English strings/comments in source files and convert them to English.
4. Run format:check, lint, test:fast, and test:cli:core.

## Risks

Risk: English-only sweeps may touch many files. Mitigation: restrict to source/test files and keep changes mechanical; rely on full lint/test runs.

## Verification

- bun run format:check
- bun run lint
- bun run test:fast
- bun run test:cli:core

## Rollback Plan

Revert the regression/test commits from this task to restore the previous test suite and source text.
