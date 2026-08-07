---
id: "202608070235-JPPAMT"
title: "Restore the release lint baseline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-07T02:35:31.306Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: restore the main lint gate with the minimal behavior-preserving social-image normalization change."
events:
  -
    type: "status"
    at: "2026-08-07T02:35:47.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore the main lint gate with the minimal behavior-preserving social-image normalization change."
doc_version: 3
doc_updated_at: "2026-08-07T02:37:41.880Z"
doc_updated_by: "CODER"
description: "Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate."
sections:
  Summary: |-
    Restore the release lint baseline

    Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
  Scope: |-
    - In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
    - Out of scope: unrelated refactors not required for "Restore the release lint baseline".
  Plan: |-
    1. Confirm the lint failure on current main and identify the minimal behavior-preserving API change.
    2. Replace the global-regex String.replace call with String.replaceAll in the social-image title normalization.
    3. Run targeted website lint, full repository lint, the social-image generator check, formatting, and typecheck.
    4. Publish and merge the focused branch before refreshing dependent 0.7.5 PRs.
  Verify Steps: |-
    1. Run `bunx eslint website/scripts/generate-social-images.mjs`. Expected: the current lint violation is gone.
    2. Run `bun run lint`. Expected: core and website lint both pass.
    3. Run `bun run docs:social:check` and `bun run format:check`. Expected: generated social assets remain current and formatting is unchanged.
    4. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "6cfac13ebadf25ac28ce0485e3b86712d147b736"
    version: 1
id_source: "generated"
---
## Summary

Restore the release lint baseline

Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.

## Scope

- In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
- Out of scope: unrelated refactors not required for "Restore the release lint baseline".

## Plan

1. Confirm the lint failure on current main and identify the minimal behavior-preserving API change.
2. Replace the global-regex String.replace call with String.replaceAll in the social-image title normalization.
3. Run targeted website lint, full repository lint, the social-image generator check, formatting, and typecheck.
4. Publish and merge the focused branch before refreshing dependent 0.7.5 PRs.

## Verify Steps

1. Run `bunx eslint website/scripts/generate-social-images.mjs`. Expected: the current lint violation is gone.
2. Run `bun run lint`. Expected: core and website lint both pass.
3. Run `bun run docs:social:check` and `bun run format:check`. Expected: generated social assets remain current and formatting is unchanged.
4. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
