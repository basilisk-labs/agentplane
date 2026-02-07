---
id: "202602071329-M75GH3"
title: "AP-REGRESS-01: Regression guard (guardrails + traceability)"
status: "DONE"
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
  note: "Approved in chat on 2026-02-07T16:04:58.273Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T16:07:41.751Z"
  updated_by: "TESTER"
  note: "Verified: format:check, lint, test:fast, and test:cli:core passed. Added regressions covering integrate fallback commit subjects and PR meta base field; confirmed no non-English text in source/test files under packages/ and .agentplane/agents/."
commit:
  hash: "c6e719893254d1e7dacbec1472e8c9be2fd60102"
  message: "✅ M75GH3 tests: add integrate subject/meta regressions"
comments:
  -
    author: "TESTER"
    body: "Start: Add regression coverage for guardrails/traceability and enforce English-only source text."
  -
    author: "TESTER"
    body: "Verified: regression coverage added for integrate commit subject compliance and PR meta base field (legacy base_branch removed). Full checks passed: format:check, lint, test:fast, test:cli:core. Source code text under packages/ and .agentplane/agents is English-only."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T16:07:48.215Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T16:07:41.751Z — VERIFY — ok

By: TESTER

Note: Verified: format:check, lint, test:fast, and test:cli:core passed. Added regressions covering integrate fallback commit subjects and PR meta base field; confirmed no non-English text in source/test files under packages/ and .agentplane/agents/.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the regression/test commits from this task to restore the previous test suite and source text.
