---
id: "202604211312-K17WRN"
title: "Resolve remaining facade retention policy"
result_summary: "Removed remaining one-line internal facades for pr integrate and git-context, updated consumers to canonical modules, documented retention reasons for release apply pipeline and hosted-close-pr command boundaries, and updated stale test references."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604211312-2P1FPQ"
tags:
  - "architecture"
  - "cleanup"
  - "code"
verify:
  - "bun run docs:cli:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:54.002Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T17:28:18.890Z"
  updated_by: "CODER"
  note: "Verified remaining facade retention policy. Checks: bun run typecheck passed; bun run docs:cli:check passed; bun run knip:check passed; bun run lint:core passed; bun run format:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); git diff --check passed. Additional architecture check passed: bun run arch:check."
commit:
  hash: "755a8c59eb79e6f1153d5fbe1e579bde7f9dc1c5"
  message: "🧹 K17WRN architecture: resolve retained facades"
comments:
  -
    author: "CODER"
    body: "Start: classify and resolve remaining non-trivial facade retention policy for release pipeline and hosted-close command wrappers without changing public CLI behavior."
  -
    author: "CODER"
    body: "Verified: resolved remaining facade retention policy. Checks: bun run typecheck; bun run docs:cli:check; bun run knip:check; bun run lint:core; bun run format:check; bun run test:project -- cli-unit; git diff --check; bun run arch:check."
events:
  -
    type: "status"
    at: "2026-04-21T17:24:56.064Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify and resolve remaining non-trivial facade retention policy for release pipeline and hosted-close command wrappers without changing public CLI behavior."
  -
    type: "verify"
    at: "2026-04-21T17:28:18.890Z"
    author: "CODER"
    state: "ok"
    note: "Verified remaining facade retention policy. Checks: bun run typecheck passed; bun run docs:cli:check passed; bun run knip:check passed; bun run lint:core passed; bun run format:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); git diff --check passed. Additional architecture check passed: bun run arch:check."
  -
    type: "status"
    at: "2026-04-21T17:28:52.064Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: resolved remaining facade retention policy. Checks: bun run typecheck; bun run docs:cli:check; bun run knip:check; bun run lint:core; bun run format:check; bun run test:project -- cli-unit; git diff --check; bun run arch:check."
doc_version: 3
doc_updated_at: "2026-04-21T17:28:52.065Z"
doc_updated_by: "CODER"
description: "Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers."
sections:
  Summary: |-
    Resolve remaining facade retention policy
    
    Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
  Scope: |-
    - In scope: Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
    - Out of scope: unrelated refactors not required for "Resolve remaining facade retention policy".
  Plan: "Scope: handle facades that are not one-line shims. Steps: 1. For each remaining facade, classify as public CLI surface, internal adapter, or removable compatibility file. 2. Remove internal-only facades after import migration. 3. Add @deprecated comments or docs for retained compatibility files. 4. Verify CLI reference does not drift unexpectedly. Acceptance: no ambiguous shim remains; each retained facade has a reason."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T17:28:18.890Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified remaining facade retention policy. Checks: bun run typecheck passed; bun run docs:cli:check passed; bun run knip:check passed; bun run lint:core passed; bun run format:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); git diff --check passed. Additional architecture check passed: bun run arch:check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:24:56.073Z, excerpt_hash=sha256:95415bcd2ad331de9f87a6b661d4dbe56425729b1643907c2a82f77b54a3f61e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve remaining facade retention policy

Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.

## Scope

- In scope: Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
- Out of scope: unrelated refactors not required for "Resolve remaining facade retention policy".

## Plan

Scope: handle facades that are not one-line shims. Steps: 1. For each remaining facade, classify as public CLI surface, internal adapter, or removable compatibility file. 2. Remove internal-only facades after import migration. 3. Add @deprecated comments or docs for retained compatibility files. 4. Verify CLI reference does not drift unexpectedly. Acceptance: no ambiguous shim remains; each retained facade has a reason.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T17:28:18.890Z — VERIFY — ok

By: CODER

Note: Verified remaining facade retention policy. Checks: bun run typecheck passed; bun run docs:cli:check passed; bun run knip:check passed; bun run lint:core passed; bun run format:check passed; bun run test:project -- cli-unit passed (63 files, 629 tests); git diff --check passed. Additional architecture check passed: bun run arch:check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:24:56.073Z, excerpt_hash=sha256:95415bcd2ad331de9f87a6b661d4dbe56425729b1643907c2a82f77b54a3f61e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
