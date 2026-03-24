---
id: "202603241029-4RY25C"
title: "Surface effective enforcement policy in dry-run and run metadata"
result_summary: "Expose requested and effective runner policy decisions in dry-run and persisted run metadata."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603241029-A28MVW"
tags:
  - "code"
  - "runner"
  - "policy"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T11:42:20.511Z"
  updated_by: "ORCHESTRATOR"
  note: "Policy metadata contract ready"
verification:
  state: "ok"
  updated_at: "2026-03-24T11:43:57.755Z"
  updated_by: "CODER"
  note: |-
    Command: agentplane task run 202603241029-4RY25C --dry-run
    Result: pass
    Evidence: output printed policy_requested {}, policy_effective {}, policy_fields, and policy_refusal null for a DOING task.
    Scope: dry-run policy surfacing.
    
    Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 2 files, 35 tests passed including refusal-path persistence assertions.
    Scope: policy decision builder plus CLI runner policy metadata paths.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: source build regression guard for touched runner and CLI files.
commit:
  hash: "2943b19204839996fa298813829d4fb8b073f041"
  message: "✅ 4RY25C code: done"
comments:
  -
    author: "CODER"
    body: "Start: surface requested versus effective runner policy metadata in dry-run output and persisted run-state before final verification and task closure."
  -
    author: "CODER"
    body: "Verified: surface requested and effective runner policy metadata in dry-run output, refusal artifacts, and run-show output without widening execution scope."
events:
  -
    type: "status"
    at: "2026-03-24T11:42:40.219Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: surface requested versus effective runner policy metadata in dry-run output and persisted run-state before final verification and task closure."
  -
    type: "verify"
    at: "2026-03-24T11:43:57.755Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: agentplane task run 202603241029-4RY25C --dry-run
      Result: pass
      Evidence: output printed policy_requested {}, policy_effective {}, policy_fields, and policy_refusal null for a DOING task.
      Scope: dry-run policy surfacing.
      
      Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: 2 files, 35 tests passed including refusal-path persistence assertions.
      Scope: policy decision builder plus CLI runner policy metadata paths.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0.
      Scope: source build regression guard for touched runner and CLI files.
  -
    type: "status"
    at: "2026-03-24T11:45:11.559Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: surface requested and effective runner policy metadata in dry-run output, refusal artifacts, and run-show output without widening execution scope."
doc_version: 3
doc_updated_at: "2026-03-24T11:45:11.560Z"
doc_updated_by: "CODER"
description: "Show requested versus effective runner policy, adapter capability levels, and refusal rationale in dry-run output and persisted run metadata."
sections:
  Summary: |-
    Surface effective enforcement policy in dry-run and run metadata
    
    Show requested versus effective runner policy, adapter capability levels, and refusal rationale in dry-run output and persisted run metadata.
  Scope: |-
    - In scope: Show requested versus effective runner policy, adapter capability levels, and refusal rationale in dry-run output and persisted run metadata.
    - Out of scope: unrelated refactors not required for "Surface effective enforcement policy in dry-run and run metadata".
  Plan: "1. Inspect current adapter capability and refusal paths in task-run preparation. 2. Add a policy-decision contract for requested policy, effective policy, field-level capability status, and refusal rationale. 3. Persist that contract into bundle/run-state metadata and surface it in dry-run and run-show output. 4. Add focused tests, run source build, and finish with a single task-scoped commit."
  Verify Steps: |-
    1. Run `agentplane task run <task-id> --dry-run` for a DOING task. Expected: dry-run output includes requested policy, effective policy, field-level policy metadata, and null refusal metadata when no refusal applies.
    2. Exercise a refusal path with recipe policy and an unenforceable capability. Expected: persisted run metadata records requested and effective policy plus refusal_reason.
    3. Run focused runner policy tests plus source build. Expected: touched runner and CLI policy surface passes without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T11:43:57.755Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task run 202603241029-4RY25C --dry-run
    Result: pass
    Evidence: output printed policy_requested {}, policy_effective {}, policy_fields, and policy_refusal null for a DOING task.
    Scope: dry-run policy surfacing.
    
    Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 2 files, 35 tests passed including refusal-path persistence assertions.
    Scope: policy decision builder plus CLI runner policy metadata paths.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: source build regression guard for touched runner and CLI files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:42:40.220Z, excerpt_hash=sha256:17f6e7a52abcf7bcff3c55317a92b62540b9d247489aef097531091b0935a65f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Surface effective enforcement policy in dry-run and run metadata

Show requested versus effective runner policy, adapter capability levels, and refusal rationale in dry-run output and persisted run metadata.

## Scope

- In scope: Show requested versus effective runner policy, adapter capability levels, and refusal rationale in dry-run output and persisted run metadata.
- Out of scope: unrelated refactors not required for "Surface effective enforcement policy in dry-run and run metadata".

## Plan

1. Inspect current adapter capability and refusal paths in task-run preparation. 2. Add a policy-decision contract for requested policy, effective policy, field-level capability status, and refusal rationale. 3. Persist that contract into bundle/run-state metadata and surface it in dry-run and run-show output. 4. Add focused tests, run source build, and finish with a single task-scoped commit.

## Verify Steps

1. Run `agentplane task run <task-id> --dry-run` for a DOING task. Expected: dry-run output includes requested policy, effective policy, field-level policy metadata, and null refusal metadata when no refusal applies.
2. Exercise a refusal path with recipe policy and an unenforceable capability. Expected: persisted run metadata records requested and effective policy plus refusal_reason.
3. Run focused runner policy tests plus source build. Expected: touched runner and CLI policy surface passes without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T11:43:57.755Z — VERIFY — ok

By: CODER

Note: Command: agentplane task run 202603241029-4RY25C --dry-run
Result: pass
Evidence: output printed policy_requested {}, policy_effective {}, policy_fields, and policy_refusal null for a DOING task.
Scope: dry-run policy surfacing.

Command: bunx vitest run packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
Result: pass
Evidence: 2 files, 35 tests passed including refusal-path persistence assertions.
Scope: policy decision builder plus CLI runner policy metadata paths.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0.
Scope: source build regression guard for touched runner and CLI files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:42:40.220Z, excerpt_hash=sha256:17f6e7a52abcf7bcff3c55317a92b62540b9d247489aef097531091b0935a65f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
