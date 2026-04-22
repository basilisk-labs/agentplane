---
id: "202604220255-07NK08"
title: "Replace sleep and polling tests with deterministic wait helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-9XHT1G"
tags:
  - "cleanup"
  - "stability"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:07.282Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T07:46:01.643Z"
  updated_by: "CODER"
  note: "Verified deterministic wait helper migration. Checks passed: direct sleep inventory for changed test scopes; focused Vitest for testkit, mtime, TaskStore, runner lifecycle, process supervision, and query-run consumers; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace fragile sleep/polling waits in tests with deterministic wait helpers where predicates are available."
events:
  -
    type: "status"
    at: "2026-04-22T07:37:38.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace fragile sleep/polling waits in tests with deterministic wait helpers where predicates are available."
  -
    type: "verify"
    at: "2026-04-22T07:46:01.643Z"
    author: "CODER"
    state: "ok"
    note: "Verified deterministic wait helper migration. Checks passed: direct sleep inventory for changed test scopes; focused Vitest for testkit, mtime, TaskStore, runner lifecycle, process supervision, and query-run consumers; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T07:46:01.649Z"
doc_updated_by: "CODER"
description: "Remove short setTimeout sleeps and ad hoc polling loops from test suites where deterministic hooks or filesystem/event predicates can be used."
sections:
  Summary: "Reduce timing-sensitive tests by introducing deterministic wait helpers in testkit."
  Scope: "Testkit wait utilities and affected tests. Do not increase default test timeouts."
  Plan: |-
    1. Inventory setTimeout sleep and polling loop usages in tests.
    2. Add explicit wait helpers around events/files/state predicates.
    3. Replace fragile sleeps in the highest-impact suites first.
    4. Verify repeated local runs of affected tests.
  Verify Steps: "Run affected tests repeatedly where cheap, fast CI, testkit tests."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T07:46:01.643Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified deterministic wait helper migration. Checks passed: direct sleep inventory for changed test scopes; focused Vitest for testkit, mtime, TaskStore, runner lifecycle, process supervision, and query-run consumers; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:37:38.042Z, excerpt_hash=sha256:0f80f5208cf22af089c264ec5cbc75817fbcdc751f72cafe6164325bc5c663ba
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous sleeps/polling loops and remove helper changes."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce timing-sensitive tests by introducing deterministic wait helpers in testkit.

## Scope

Testkit wait utilities and affected tests. Do not increase default test timeouts.

## Plan

1. Inventory setTimeout sleep and polling loop usages in tests.
2. Add explicit wait helpers around events/files/state predicates.
3. Replace fragile sleeps in the highest-impact suites first.
4. Verify repeated local runs of affected tests.

## Verify Steps

Run affected tests repeatedly where cheap, fast CI, testkit tests.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T07:46:01.643Z — VERIFY — ok

By: CODER

Note: Verified deterministic wait helper migration. Checks passed: direct sleep inventory for changed test scopes; focused Vitest for testkit, mtime, TaskStore, runner lifecycle, process supervision, and query-run consumers; focused lint; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:37:38.042Z, excerpt_hash=sha256:0f80f5208cf22af089c264ec5cbc75817fbcdc751f72cafe6164325bc5c663ba

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous sleeps/polling loops and remove helper changes.

## Findings

None yet.
