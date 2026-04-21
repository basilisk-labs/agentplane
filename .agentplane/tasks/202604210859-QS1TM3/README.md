---
id: "202604210859-QS1TM3"
title: "Add production no-console guard"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-3GKMTX"
tags:
  - "code"
  - "lint"
  - "logging"
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
doc_version: 3
doc_updated_at: "2026-04-21T08:59:19.666Z"
doc_updated_by: "PLANNER"
description: "Turn the console inventory into an enforced guard for production core/command paths after logger migration."
sections:
  Summary: "Enforce no new console.* usage in production paths while allowing tests, scripts, and deliberately human-facing CLI plumbing."
  Scope: "In scope: ESLint/check configuration and baseline removal/tightening after T9. Out of scope: replacing every UX stdout writer."
  Plan: |-
    1. Decide whether existing ESLint or script-runtime check is the right enforcement surface.
    2. Configure forbidden console usage for core and command production paths.
    3. Add explicit allowlist comments/config for scripts/tests/approved UX paths.
    4. Run lint/checks.
  Verify Steps: |-
    - A new console.warn in core would fail lint/check.
    - Existing approved stdout/stderr UX paths still pass.
    - The guard is documented by config, not tribal knowledge.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert lint/check enforcement and restore previous baseline behavior."
  Findings: "Depends on T9 to avoid creating noisy false positives."
id_source: "generated"
---
## Summary

Enforce no new console.* usage in production paths while allowing tests, scripts, and deliberately human-facing CLI plumbing.

## Scope

In scope: ESLint/check configuration and baseline removal/tightening after T9. Out of scope: replacing every UX stdout writer.

## Plan

1. Decide whether existing ESLint or script-runtime check is the right enforcement surface.
2. Configure forbidden console usage for core and command production paths.
3. Add explicit allowlist comments/config for scripts/tests/approved UX paths.
4. Run lint/checks.

## Verify Steps

- A new console.warn in core would fail lint/check.
- Existing approved stdout/stderr UX paths still pass.
- The guard is documented by config, not tribal knowledge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert lint/check enforcement and restore previous baseline behavior.

## Findings

Depends on T9 to avoid creating noisy false positives.
