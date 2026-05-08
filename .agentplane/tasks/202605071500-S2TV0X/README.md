---
id: "202605071500-S2TV0X"
title: "Retry cloud push batch chunks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "sync"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
verify:
  - "bun run --filter=agentplane build"
  - "bun x vitest run packages/agentplane/src/backends/task-backend.cloud.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-07T15:00:43.794Z"
  updated_by: "CODER"
  note: "Approved after live 2480-task push reached batch uploads but failed on transient fetch during chunk upload."
verification:
  state: "ok"
  updated_at: "2026-05-08T02:52:55.743Z"
  updated_by: "CODER"
  note: "Cloud batch chunk retry implemented and checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add per-chunk retry for cloud batch push after live sync hit transient fetch failures."
events:
  -
    type: "status"
    at: "2026-05-08T01:09:01.440Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add per-chunk retry for cloud batch push after live sync hit transient fetch failures."
  -
    type: "verify"
    at: "2026-05-08T02:52:55.743Z"
    author: "CODER"
    state: "ok"
    note: "Cloud batch chunk retry implemented and checks passed."
doc_version: 3
doc_updated_at: "2026-05-08T02:52:55.759Z"
doc_updated_by: "CODER"
description: "Make cloud push batch uploads resilient to transient fetch failures by retrying individual chunk requests before aborting the full sync."
sections:
  Summary: |-
    Retry cloud push batch chunks
    
    Make cloud push batch uploads resilient to transient fetch failures by retrying individual chunk requests before aborting the full sync.
  Scope: |-
    - In scope: Make cloud push batch uploads resilient to transient fetch failures by retrying individual chunk requests before aborting the full sync.
    - Out of scope: unrelated refactors not required for "Retry cloud push batch chunks".
  Plan: |-
    1. Add bounded retry/backoff around each /sync/push-batch chunk upload while preserving direct push behavior for small payloads.
    2. Cover retry behavior in the cloud backend unit test using a transient failed fetch followed by a successful retry.
    3. Verify focused cloud backend tests and agentplane package build, then publish through branch_pr.
  Verify Steps: |-
    1. Review the requested outcome for "Retry cloud push batch chunks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T02:52:55.743Z — VERIFY — ok
    
    By: CODER
    
    Note: Cloud batch chunk retry implemented and checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T01:09:01.440Z, excerpt_hash=sha256:f9ea3876a828636c7a65dacac8d8ee68d1a2ed6b7d0ed41a2302ad58c1293f44
    
    Details:
    
    Added per-chunk retry/backoff for transient network fetch failures during oversized cloud push. Added unit coverage for failed final chunk retry. Checks: bun x vitest run packages/agentplane/src/backends/task-backend.cloud.test.ts; bun run --filter=agentplane build; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605071500-S2TV0X-retry-cloud-batch/.agentplane/tasks/202605071500-S2TV0X/blueprint/resolved-snapshot.json
    - old_digest: 97d07289a9fd967452d12b49e4ea75bd41eb96e93a70e6217e24c95c5312684d
    - current_digest: 97d07289a9fd967452d12b49e4ea75bd41eb96e93a70e6217e24c95c5312684d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605071500-S2TV0X
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
