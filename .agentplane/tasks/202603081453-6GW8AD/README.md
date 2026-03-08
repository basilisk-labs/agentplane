---
id: "202603081453-6GW8AD"
title: "Guard workflows against inline test runner drift"
status: "TODO"
priority: "med"
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
doc_updated_at: "2026-03-08T14:53:42.054Z"
doc_updated_by: "CODER"
description: "Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks."
id_source: "generated"
---
## Summary

Guard workflows against inline test runner drift

Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks.

## Scope

- In scope: Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks.
- Out of scope: unrelated refactors not required for "Guard workflows against inline test runner drift".

## Plan

1. Implement the change for "Guard workflows against inline test runner drift".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run the workflow-command contract check directly. Expected: current workflow files pass when they use canonical shared scripts.
2. Introduce a controlled inline test-runner violation in a temp copy or fixture if needed. Expected: the check rejects it with a deterministic message.
3. Run the local CI gate that owns the new check. Expected: the check is enforced automatically in the normal hook/CI path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
