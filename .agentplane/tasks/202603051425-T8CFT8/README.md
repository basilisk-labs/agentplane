---
id: "202603051425-T8CFT8"
title: "Improve release notes detail and coverage"
result_summary: "Release notes format and validation upgraded for detailed change coverage"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T15:06:23.190Z"
  updated_by: "CODER"
  note: "Verified: release plan/apply tests pass; detailed notes guidance and stricter bullet coverage checks are enforced end-to-end."
commit:
  hash: "6f8250d95ad5f48e64c83cbfe24062feb8110e64"
  message: "✨ T8CFT8 release: enforce detailed notes coverage"
comments:
  -
    author: "CODER"
    body: "Start: enforce detailed human-readable release notes with broader bullet coverage and aligned validation/test updates."
  -
    author: "CODER"
    body: "Verified: release notes generation now enforces richer human-language detail and stronger bullet coverage checks across plan, apply, and hook validation."
events:
  -
    type: "status"
    at: "2026-03-05T15:06:10.038Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce detailed human-readable release notes with broader bullet coverage and aligned validation/test updates."
  -
    type: "verify"
    at: "2026-03-05T15:06:23.190Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release plan/apply tests pass; detailed notes guidance and stricter bullet coverage checks are enforced end-to-end."
  -
    type: "status"
    at: "2026-03-05T15:08:05.175Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release notes generation now enforces richer human-language detail and stronger bullet coverage checks across plan, apply, and hook validation."
doc_version: 3
doc_updated_at: "2026-03-05T15:08:05.175Z"
doc_updated_by: "CODER"
description: "Make release notes generation enforce richer bullet coverage and detailed human-language summaries of all release differences."
id_source: "generated"
---
## Summary

Increase release notes detail requirements so generated notes include richer human-language coverage and larger bullet sets tied to release differences.

## Scope

In scope: release plan instructions, release notes template, release notes validation in apply and pre-push scripts, and related release command tests. Out of scope: publish pipeline architecture changes.

## Plan

1) Strengthen release-plan instructions to require complete detailed bullet coverage of changes. 2) Expand template structure for richer human-facing notes. 3) Enforce minimum bullet count policy in release apply and release notes checker. 4) Update release tests and verify with targeted test run.

## Verify Steps

Run: bun test packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.test.ts. Expected: all tests pass and include guard for insufficient release-note bullets.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T15:06:23.190Z — VERIFY — ok

By: CODER

Note: Verified: release plan/apply tests pass; detailed notes guidance and stricter bullet coverage checks are enforced end-to-end.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:06:10.038Z, excerpt_hash=sha256:8809dde74e80b271bff53cedb29cde04f1ac7c7f9308d14c470d301bd7d75d4b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings

### Approvals / Overrides
- None.

### Decisions
- Enforce higher release-note detail via both generation instructions and validation gates.
- Use minimum bullet rule `max(5, changes.length)` during release apply.

### Implementation Notes
- Updated release plan instructions and release notes template structure.
- Updated release apply validation and pre-push release notes checker.
- Added/updated tests for plan/apply behavior, including insufficient bullet rejection.

### Evidence / Links
- bun test packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/apply.test.ts

## Risks

Risk 1: stricter validation may fail existing lightweight notes. Mitigation: baseline minimum is predictable and documented in template/instructions. Risk 2: mismatch between plan and apply checks. Mitigation: use same bullet-count rule (max(5, changes count)).
