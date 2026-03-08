---
id: "202603081453-V46YFN"
title: "Extract workflow coverage suites into shared scripts"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-08T14:53:35.768Z"
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

1. Implement the change for "Extract workflow coverage suites into shared scripts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run test:workflow-coverage`. Expected: the workflow/harness coverage suite passes through a named script.
2. Run `bun run test:significant-coverage`. Expected: the significant-file coverage suite passes through a named script.
3. Review `.github/workflows/ci.yml` and `.github/workflows/prepublish.yml`. Expected: the relevant jobs call shared scripts instead of inline `bunx vitest run` coverage blocks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
