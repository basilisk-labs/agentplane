---
id: "202604070608-4SAPCV"
title: "Add REST-backed PR close command with optional remote branch deletion"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T06:15:47.494Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T06:54:45.061Z"
  updated_by: "CODER"
  note: "Focused CLI pr-close tests and lint passed; pr close now uses REST-backed gh api calls, defaults repo from the resolved project root, and only deletes remote head branches after a successful close."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a REST-backed PR close command with optional remote head-branch deletion for stale and superseded GitHub PR cleanup."
events:
  -
    type: "status"
    at: "2026-04-07T06:37:11.498Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a REST-backed PR close command with optional remote head-branch deletion for stale and superseded GitHub PR cleanup."
  -
    type: "verify"
    at: "2026-04-07T06:54:45.061Z"
    author: "CODER"
    state: "ok"
    note: "Focused CLI pr-close tests and lint passed; pr close now uses REST-backed gh api calls, defaults repo from the resolved project root, and only deletes remote head branches after a successful close."
doc_version: 3
doc_updated_at: "2026-04-07T06:54:45.067Z"
doc_updated_by: "CODER"
description: "Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths."
sections:
  Summary: |-
    Add REST-backed PR close command with optional remote branch deletion
    
    Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.
  Scope: |-
    - In scope: Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.
    - Out of scope: unrelated refactors not required for "Add REST-backed PR close command with optional remote branch deletion".
  Plan: |-
    1. Inspect the current PR command surface and isolate the smallest new command that can close a GitHub PR without depending on gh GraphQL high-level flows.
    2. Implement a REST-backed close path with optional close comment and optional remote head-branch deletion.
    3. Add focused command tests around request shape, output, and failure mapping, then run lint/tests for the touched GitHub workflow helpers.
  Verify Steps: |-
    1. Run a focused CLI test that closes a GitHub PR through the new command. Expected: the command issues the REST close mutation and reports the closed PR deterministically.
    2. Run a focused CLI test with remote branch deletion enabled. Expected: the command attempts remote head-branch deletion only after a successful close and reports deletion outcome clearly.
    3. Run eslint and the touched PR command tests. Expected: touched checks pass without widening unrelated GitHub workflow behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T06:54:45.061Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused CLI pr-close tests and lint passed; pr close now uses REST-backed gh api calls, defaults repo from the resolved project root, and only deletes remote head branches after a successful close.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T06:37:11.509Z, excerpt_hash=sha256:dee30f4bb1b0e7e9f6ef2f2329760adbc25bd5a780d5e34555f993bcac2d5607
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add REST-backed PR close command with optional remote branch deletion

Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.

## Scope

- In scope: Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.
- Out of scope: unrelated refactors not required for "Add REST-backed PR close command with optional remote branch deletion".

## Plan

1. Inspect the current PR command surface and isolate the smallest new command that can close a GitHub PR without depending on gh GraphQL high-level flows.
2. Implement a REST-backed close path with optional close comment and optional remote head-branch deletion.
3. Add focused command tests around request shape, output, and failure mapping, then run lint/tests for the touched GitHub workflow helpers.

## Verify Steps

1. Run a focused CLI test that closes a GitHub PR through the new command. Expected: the command issues the REST close mutation and reports the closed PR deterministically.
2. Run a focused CLI test with remote branch deletion enabled. Expected: the command attempts remote head-branch deletion only after a successful close and reports deletion outcome clearly.
3. Run eslint and the touched PR command tests. Expected: touched checks pass without widening unrelated GitHub workflow behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T06:54:45.061Z — VERIFY — ok

By: CODER

Note: Focused CLI pr-close tests and lint passed; pr close now uses REST-backed gh api calls, defaults repo from the resolved project root, and only deletes remote head branches after a successful close.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T06:37:11.509Z, excerpt_hash=sha256:dee30f4bb1b0e7e9f6ef2f2329760adbc25bd5a780d5e34555f993bcac2d5607

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
