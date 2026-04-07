---
id: "202604070912-5TKNV6"
title: "Short-circuit pre-commit after failed checks stage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T09:29:09.406Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T09:32:56.786Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: 3 pass, 0 fail covering missing tools, failed prettier short-circuit, and test-fast invocation only after successful checks. Scope: pre-commit orchestration script. Command: bun x eslint scripts/run-pre-commit-hook.mjs packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: no lint errors. Scope: touched script and regression test. Command: review lefthook.yml and run-pre-commit-hook.mjs together; Result: pass; Evidence: pre-commit now exposes a single checks entry and the script invokes test-fast only after checks succeed. Scope: hook orchestration contract."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: collapse pre-commit orchestration into one fail-fast path so failed checks stop before test-fast and preserve the first actionable error."
events:
  -
    type: "status"
    at: "2026-04-07T09:29:57.696Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: collapse pre-commit orchestration into one fail-fast path so failed checks stop before test-fast and preserve the first actionable error."
  -
    type: "verify"
    at: "2026-04-07T09:32:56.786Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: 3 pass, 0 fail covering missing tools, failed prettier short-circuit, and test-fast invocation only after successful checks. Scope: pre-commit orchestration script. Command: bun x eslint scripts/run-pre-commit-hook.mjs packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: no lint errors. Scope: touched script and regression test. Command: review lefthook.yml and run-pre-commit-hook.mjs together; Result: pass; Evidence: pre-commit now exposes a single checks entry and the script invokes test-fast only after checks succeed. Scope: hook orchestration contract."
doc_version: 3
doc_updated_at: "2026-04-07T09:32:56.790Z"
doc_updated_by: "CODER"
description: "The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure."
sections:
  Summary: |-
    Short-circuit pre-commit after failed checks stage
    
    The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.
  Scope: |-
    - In scope: The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.
    - Out of scope: unrelated refactors not required for "Short-circuit pre-commit after failed checks stage".
  Plan: "1. Collapse pre-commit orchestration into one fail-fast path so test-fast runs only after checks succeed. 2. Update the hook contract and regression coverage to prove a failed checks stage does not trigger test-fast. 3. Run focused tests and lint, then capture verification evidence in the task artifacts."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts`. Expected: the pre-commit orchestration proves that a failed checks stage stops the pipeline before `test-fast`.
    2. Run `bun x eslint scripts/run-pre-commit-hook.mjs`. Expected: the updated hook orchestration stays lint-clean.
    3. Review `lefthook.yml` and the touched script behavior together. Expected: there is a single fail-fast pre-commit path where `test-fast` only runs after successful checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T09:32:56.786Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: 3 pass, 0 fail covering missing tools, failed prettier short-circuit, and test-fast invocation only after successful checks. Scope: pre-commit orchestration script. Command: bun x eslint scripts/run-pre-commit-hook.mjs packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: no lint errors. Scope: touched script and regression test. Command: review lefthook.yml and run-pre-commit-hook.mjs together; Result: pass; Evidence: pre-commit now exposes a single checks entry and the script invokes test-fast only after checks succeed. Scope: hook orchestration contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:29:57.706Z, excerpt_hash=sha256:332ccdc5b5a6fab3e8a8ae4722490f5b69ac16ec4b99fb14b7a4601085337acf
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Short-circuit pre-commit after failed checks stage

The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.

## Scope

- In scope: The pre-commit pipeline still runs test-fast even when checks/prettier already failed, which wastes time and hides the first actionable error. Stop the pipeline after a failed earlier stage and preserve the original failure.
- Out of scope: unrelated refactors not required for "Short-circuit pre-commit after failed checks stage".

## Plan

1. Collapse pre-commit orchestration into one fail-fast path so test-fast runs only after checks succeed. 2. Update the hook contract and regression coverage to prove a failed checks stage does not trigger test-fast. 3. Run focused tests and lint, then capture verification evidence in the task artifacts.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts`. Expected: the pre-commit orchestration proves that a failed checks stage stops the pipeline before `test-fast`.
2. Run `bun x eslint scripts/run-pre-commit-hook.mjs`. Expected: the updated hook orchestration stays lint-clean.
3. Review `lefthook.yml` and the touched script behavior together. Expected: there is a single fail-fast pre-commit path where `test-fast` only runs after successful checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T09:32:56.786Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: 3 pass, 0 fail covering missing tools, failed prettier short-circuit, and test-fast invocation only after successful checks. Scope: pre-commit orchestration script. Command: bun x eslint scripts/run-pre-commit-hook.mjs packages/agentplane/src/cli/pre-commit-hook-script.test.ts; Result: pass; Evidence: no lint errors. Scope: touched script and regression test. Command: review lefthook.yml and run-pre-commit-hook.mjs together; Result: pass; Evidence: pre-commit now exposes a single checks entry and the script invokes test-fast only after checks succeed. Scope: hook orchestration contract.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:29:57.706Z, excerpt_hash=sha256:332ccdc5b5a6fab3e8a8ae4722490f5b69ac16ec4b99fb14b7a4601085337acf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
