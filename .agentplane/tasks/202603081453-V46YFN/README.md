---
id: "202603081453-V46YFN"
title: "Extract workflow coverage suites into shared scripts"
result_summary: "The remaining coverage suites are now owned by shared scripts in the repository, reducing YAML-level duplication and keeping workflow coverage semantics in one place."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:55:25.210Z"
  updated_by: "ORCHESTRATOR"
  note: "Safe first step: create canonical coverage scripts before enforcing workflow command style."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:05:32.118Z"
  updated_by: "CODER"
  note: |-
    Checks passed:
    - bun run test:workflow-coverage
    - bun run test:significant-coverage
    - bun run workflows:lint
    - reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm the remaining inline coverage blocks now call canonical scripts.
commit:
  hash: "2e87596ffddcdca869acca17640798320100dc2d"
  message: "🧪 V46YFN ci: extract workflow coverage suites"
comments:
  -
    author: "CODER"
    body: "Start: extract the remaining coverage suites from workflow YAML into canonical package scripts and switch CI to those scripts."
  -
    author: "CODER"
    body: "Verified: workflow/harness coverage and significant-file coverage now run through canonical repository scripts, and CI workflows call those scripts instead of inline coverage commands."
events:
  -
    type: "status"
    at: "2026-03-08T14:55:29.700Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract the remaining coverage suites from workflow YAML into canonical package scripts and switch CI to those scripts."
  -
    type: "verify"
    at: "2026-03-08T15:05:32.118Z"
    author: "CODER"
    state: "ok"
    note: |-
      Checks passed:
      - bun run test:workflow-coverage
      - bun run test:significant-coverage
      - bun run workflows:lint
      - reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm the remaining inline coverage blocks now call canonical scripts.
  -
    type: "status"
    at: "2026-03-08T15:05:37.239Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow/harness coverage and significant-file coverage now run through canonical repository scripts, and CI workflows call those scripts instead of inline coverage commands."
doc_version: 3
doc_updated_at: "2026-03-08T15:05:37.239Z"
doc_updated_by: "CODER"
description: "Move workflow/harness coverage and significant-file coverage suites out of inline GitHub workflow YAML and into canonical package scripts so local and CI runners share the same coverage command contract."
id_source: "generated"
---
## Summary

Extract workflow coverage suites into shared scripts

Move workflow/harness coverage and significant-file coverage suites out of inline GitHub workflow YAML and into canonical package scripts so local and CI runners share the same coverage command contract.

## Scope

- In scope: Move workflow/harness coverage and significant-file coverage suites out of inline GitHub workflow YAML and into canonical package scripts so local and CI runners share the same coverage command contract.
- Out of scope: unrelated refactors not required for "Extract workflow coverage suites into shared scripts".

## Plan

1. Add canonical package scripts for workflow/harness coverage and significant-file coverage so the suites have one source of truth.
2. Replace the remaining inline `bunx vitest run` coverage blocks in `.github/workflows/ci.yml` and `.github/workflows/prepublish.yml` with those scripts.
3. Run the shared suites and workflow lint, then close the task with the changed workflow contract recorded.

## Verify Steps

1. Run `bun run test:workflow-coverage`. Expected: the workflow/harness coverage suite passes through a named script.
2. Run `bun run test:significant-coverage`. Expected: the significant-file coverage suite passes through a named script.
3. Review `.github/workflows/ci.yml` and `.github/workflows/prepublish.yml`. Expected: the relevant jobs call shared scripts instead of inline `bunx vitest run` coverage blocks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:05:32.118Z — VERIFY — ok

By: CODER

Note: Checks passed:
- bun run test:workflow-coverage
- bun run test:significant-coverage
- bun run workflows:lint
- reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm the remaining inline coverage blocks now call canonical scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:55:29.700Z, excerpt_hash=sha256:bd8f7ce174a6fcd09445031fcb1756de9f488b7c150c856a7dc8a97038303b3d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
