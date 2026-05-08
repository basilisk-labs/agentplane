---
id: "202605081826-S5X1S7"
title: "Stabilize CLI cold-start pre-push benchmark"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T18:27:24.604Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:49:59.809Z"
  updated_by: "CODER"
  note: "Implemented bounded pre-push cold-start smoke gate. Evidence: focused Vitest suite passed for benchmark scripts, schema acceptance, and task backend; bench:cli:cold:check passed with fixture local-basic, runs=1, warmups=0, attempts=1, timeout=10000ms, smoke thresholds quickstart=5000 task_list=10000 task_search=6000 task_next=3000 preflight_quick=6000; schemas:check and docs:scripts:check passed; @agentplaneorg/core and agentplane typecheck passed; policy routing and doctor passed after rebase."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: stabilizing CLI cold-start benchmark so pre-push cannot hang on mutable task/cloud state, while preserving strict regression evidence."
events:
  -
    type: "status"
    at: "2026-05-08T18:29:50.873Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilizing CLI cold-start benchmark so pre-push cannot hang on mutable task/cloud state, while preserving strict regression evidence."
  -
    type: "verify"
    at: "2026-05-08T18:49:59.809Z"
    author: "CODER"
    state: "ok"
    note: "Implemented bounded pre-push cold-start smoke gate. Evidence: focused Vitest suite passed for benchmark scripts, schema acceptance, and task backend; bench:cli:cold:check passed with fixture local-basic, runs=1, warmups=0, attempts=1, timeout=10000ms, smoke thresholds quickstart=5000 task_list=10000 task_search=6000 task_next=3000 preflight_quick=6000; schemas:check and docs:scripts:check passed; @agentplaneorg/core and agentplane typecheck passed; policy routing and doctor passed after rebase."
doc_version: 3
doc_updated_at: "2026-05-08T18:49:59.935Z"
doc_updated_by: "CODER"
description: "Make the CLI cold-start pre-push benchmark deterministic by isolating it from mutable repo/cloud backend state, adding bounded per-command execution, and preserving diagnostics for real performance regressions. Also synchronize the remaining core blueprint_request schemas so specialized blueprint ids can be stored safely."
sections:
  Summary: |-
    Stabilize CLI cold-start pre-push benchmark
    
    Make the CLI cold-start pre-push benchmark deterministic by isolating it from mutable repo/cloud backend state, adding bounded per-command execution, and preserving diagnostics for real performance regressions. Also synchronize the remaining core blueprint_request schemas so specialized blueprint ids can be stored safely.
  Scope: |-
    - In scope: Make the CLI cold-start pre-push benchmark deterministic by isolating it from mutable repo/cloud backend state, adding bounded per-command execution, and preserving diagnostics for real performance regressions. Also synchronize the remaining core blueprint_request schemas so specialized blueprint ids can be stored safely.
    - Out of scope: unrelated refactors not required for "Stabilize CLI cold-start pre-push benchmark".
  Plan: |-
    Plan:
    1. Synchronize remaining core/task schemas so specialized blueprint_request ids are valid wherever task README/export frontmatter is validated.
    2. Make CLI cold-start benchmark bounded per command with timeout diagnostics instead of unbounded hangs.
    3. Add a hermetic/pre-push-safe benchmark mode or root fixture path that avoids mutable cloud backend state and keeps full benchmark diagnostics available.
    4. Update baseline/check scripts and tests to classify timeout/noisy infrastructure failures without hiding real median regressions.
    5. Verify with focused unit tests, targeted benchmark checks, typecheck, policy routing, and doctor.
    
    Acceptance:
    - Pre-push cold benchmark cannot hang indefinitely on task_search/task_next.
    - Specialized blueprint_request ids pass core README/export schema validation.
    - Benchmark failures report command id, timeout/exit, and last measurement evidence.
    - Existing benchmark comparison behavior remains strict for completed commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:49:59.809Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented bounded pre-push cold-start smoke gate. Evidence: focused Vitest suite passed for benchmark scripts, schema acceptance, and task backend; bench:cli:cold:check passed with fixture local-basic, runs=1, warmups=0, attempts=1, timeout=10000ms, smoke thresholds quickstart=5000 task_list=10000 task_search=6000 task_next=3000 preflight_quick=6000; schemas:check and docs:scripts:check passed; @agentplaneorg/core and agentplane typecheck passed; policy routing and doctor passed after rebase.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:29:50.895Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081826-S5X1S7-cold-benchmark-stability/.agentplane/tasks/202605081826-S5X1S7/blueprint/resolved-snapshot.json
    - old_digest: 9aa3dc97f0e3d16345ea5ad124833564021a58636104c803755bed7fbf51e30d
    - current_digest: 9aa3dc97f0e3d16345ea5ad124833564021a58636104c803755bed7fbf51e30d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081826-S5X1S7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Old pre-push used the full cold-start baseline against mutable repository/task state and could stall on CLI cold-start behavior.
      Impact: pre-push can block publication or force --no-verify despite otherwise valid changes.
      Resolution: bench:cli:cold:check now uses a temporary local-basic fixture, per-command timeout diagnostics, one smoke attempt, and a dedicated smoke baseline while retaining full benchmark via bench:cli:cold.
id_source: "generated"
---
