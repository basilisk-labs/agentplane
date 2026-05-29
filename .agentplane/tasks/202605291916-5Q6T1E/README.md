---
id: "202605291916-5Q6T1E"
title: "Add provider-neutral task sync envelope"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T19:35:41.563Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T19:50:10.491Z"
  updated_by: "CODER"
  note: "Implemented provider-neutral sync envelope contract with schema/export coverage, generated schema snapshots, and docs. Verified with focused schema/export/projection/cloud tests, typecheck, schemas:check, docs IA, and policy routing."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-29T21:10:46.724Z"
  updated_by: "EVALUATOR"
  note: "Review-thread fix for Redmine sync envelope preservation."
  evaluated_sha: "5f40b1cec814bf6b0fa7bbbab52ac04b74e8269d"
  blueprint_digest: "2462cf8787ac4d7caee778f65bc126c9c76c0c47818d096ed9b76af6efbb5491"
  evidence_refs:
    - ".agentplane/tasks/202605291916-5Q6T1E/README.md"
    - ".agentplane/tasks/202605291916-5Q6T1E/quality/20260529-211046724-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605291916-5Q6T1E/quality/20260529-211046724-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605291916-5Q6T1E/quality/20260529-211046724-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605291916-5Q6T1E/blueprint/resolved-snapshot.json"
    - "bun x vitest run packages/agentplane/src/backends/task-backend.redmine.write.test.ts"
    - "bun run typecheck"
    - "bun run --filter=agentplane build"
  findings:
    - "Redmine issue mapping now carries canonical_state.sync into TaskData and the write mapping test covers provider external refs, field policies, freshness, and conflicts round-trip preservation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the combined task sync contract batch in this task worktree, including sync envelope, remote import policy, and provider-safe projection fields."
events:
  -
    type: "status"
    at: "2026-05-29T19:36:23.418Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the combined task sync contract batch in this task worktree, including sync envelope, remote import policy, and provider-safe projection fields."
  -
    type: "verify"
    at: "2026-05-29T19:50:10.491Z"
    author: "CODER"
    state: "ok"
    note: "Implemented provider-neutral sync envelope contract with schema/export coverage, generated schema snapshots, and docs. Verified with focused schema/export/projection/cloud tests, typecheck, schemas:check, docs IA, and policy routing."
doc_version: 3
doc_updated_at: "2026-05-29T19:50:10.522Z"
doc_updated_by: "CODER"
description: "Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies."
sections:
  Summary: |-
    Add provider-neutral task sync envelope

    Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.
  Scope: |-
    - In scope: Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.
    - Out of scope: unrelated refactors not required for "Add provider-neutral task sync envelope".
  Plan: |-
    1. Use 202605291916-5Q6T1E as the primary branch_pr batch task and include 202605291916-YGJASQ and 202605291917-4RF08R in the same worktree/PR because all three changes touch one task sync contract surface.
    2. Add a versioned provider-neutral sync envelope type to the task/frontmatter contract, covering external refs, field ownership, projection freshness, and conflict summaries.
    3. Add remote_create_policy behavior for cloud backend pulls so remote-only provider items can be diffed, ignored, or explicitly materialized without silent provider authority.
    4. Add a provider-safe projection helper/API for cloud connectors that emits summary-level fields while keeping full plans, findings, raw evidence, and private logs AgentPlane-owned.
    5. Update schema generation, validation, docs, and focused tests for the combined contract.
  Verify Steps: |-
    1. Run schema/type tests for task README frontmatter and task-store normalization. Expected: provider-neutral sync envelope accepts valid refs/policies/conflicts and rejects malformed shapes.
    2. Run docs and routing validation. Expected: task README v3 remains the canonical human/machine split and no provider-specific fields are introduced into body sections.
    3. Inspect generated schemas. Expected: public schemas expose the sync envelope and preserve backward compatibility for existing task READMEs.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T19:50:10.491Z — VERIFY — ok

    By: CODER

    Note: Implemented provider-neutral sync envelope contract with schema/export coverage, generated schema snapshots, and docs. Verified with focused schema/export/projection/cloud tests, typecheck, schemas:check, docs IA, and policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:23.418Z, excerpt_hash=sha256:ed2917235f5da871b6d3edebf087861efabe5a1d6842740e59faa913e86d9e7f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291916-5Q6T1E/blueprint/resolved-snapshot.json
    - old_digest: 2462cf8787ac4d7caee778f65bc126c9c76c0c47818d096ed9b76af6efbb5491
    - current_digest: 2462cf8787ac4d7caee778f65bc126c9c76c0c47818d096ed9b76af6efbb5491
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291916-5Q6T1E

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605291916-5Q6T1E/task-sync-contract"
    included_task_ids:
      - "202605291916-YGJASQ"
      - "202605291917-4RF08R"
    primary_task_id: "202605291916-5Q6T1E"
    role: "primary"
    updated_at: "2026-05-29T20:50:38.017Z"
id_source: "generated"
---
## Summary

Add provider-neutral task sync envelope

Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.

## Scope

- In scope: Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.
- Out of scope: unrelated refactors not required for "Add provider-neutral task sync envelope".

## Plan

1. Use 202605291916-5Q6T1E as the primary branch_pr batch task and include 202605291916-YGJASQ and 202605291917-4RF08R in the same worktree/PR because all three changes touch one task sync contract surface.
2. Add a versioned provider-neutral sync envelope type to the task/frontmatter contract, covering external refs, field ownership, projection freshness, and conflict summaries.
3. Add remote_create_policy behavior for cloud backend pulls so remote-only provider items can be diffed, ignored, or explicitly materialized without silent provider authority.
4. Add a provider-safe projection helper/API for cloud connectors that emits summary-level fields while keeping full plans, findings, raw evidence, and private logs AgentPlane-owned.
5. Update schema generation, validation, docs, and focused tests for the combined contract.

## Verify Steps

1. Run schema/type tests for task README frontmatter and task-store normalization. Expected: provider-neutral sync envelope accepts valid refs/policies/conflicts and rejects malformed shapes.
2. Run docs and routing validation. Expected: task README v3 remains the canonical human/machine split and no provider-specific fields are introduced into body sections.
3. Inspect generated schemas. Expected: public schemas expose the sync envelope and preserve backward compatibility for existing task READMEs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T19:50:10.491Z — VERIFY — ok

By: CODER

Note: Implemented provider-neutral sync envelope contract with schema/export coverage, generated schema snapshots, and docs. Verified with focused schema/export/projection/cloud tests, typecheck, schemas:check, docs IA, and policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:23.418Z, excerpt_hash=sha256:ed2917235f5da871b6d3edebf087861efabe5a1d6842740e59faa913e86d9e7f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291916-5Q6T1E/blueprint/resolved-snapshot.json
- old_digest: 2462cf8787ac4d7caee778f65bc126c9c76c0c47818d096ed9b76af6efbb5491
- current_digest: 2462cf8787ac4d7caee778f65bc126c9c76c0c47818d096ed9b76af6efbb5491
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291916-5Q6T1E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
