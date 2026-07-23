---
id: "202607221846-4CE7EG"
title: "Split agent semantic results from legacy observed claims"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221846-ZAENM6"
tags:
  - "milestone-alpha1"
  - "refactor"
  - "rf-01"
  - "runner"
  - "schema"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T14:36:25.428Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T15:40:05.193Z"
  updated_by: "TESTER"
  note: "RF-01a rework verified: v2 excludes observed process, check, metric, and path truth; v1 preserves those values only as agent_reported claims; observed runtime values win with auditable conflicts. schemas:check, 69 focused tests, typecheck, trust ratchet, all 11 critical chunks, ci:contract, and independent review pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-23T15:46:22.122Z"
  updated_by: "EVALUATOR"
  note: "Commit dfc9d1927 satisfies RF-01a: v2 contains only agent semantic claims, legacy v1 remains agent_reported, and supervisor observations stay authoritative with auditable conflicts."
  evaluated_sha: "dfc9d19279e56349cdffefbe0fd15ab378ddce27"
  blueprint_digest: "6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2"
  evidence_refs:
    - ".agentplane/tasks/202607221846-4CE7EG/README.md"
    - ".agentplane/tasks/202607221846-4CE7EG/quality/20260723-154622122-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-4CE7EG/quality/20260723-154622122-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-4CE7EG/quality/20260723-154622122-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-4CE7EG/blueprint/resolved-snapshot.json"
    - "commit dfc9d19279e56349cdffefbe0fd15ab378ddce27"
    - "packages/core/src/runner/agent-semantic-result.test.ts"
    - "packages/agentplane/src/runner/result-manifest.test.ts"
    - "packages/agentplane/src/runner/adapters/codex.test.ts"
    - "packages/agentplane/src/runner/adapters/custom.test.ts"
    - "packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts"
    - "bun run schemas:check: pass"
    - "6 focused test files, 70 tests: pass"
    - "bun run typecheck: pass"
  findings:
    - "PASS: the strict v2 schema excludes process, timing, metric, path, artifact, and provenance truth; adapters prevent legacy claims from overriding status, exit code, artifacts, metrics, or evidence, including repeat/history/source-snapshot negative paths."
commit:
  hash: "dfc9d19279e56349cdffefbe0fd15ab378ddce27"
  message: "🛡️ 4CE7EG task: separate agent claims from observed runner truth"
comments:
  -
    author: "CODER"
    body: "Start: implement RF-01 semantic result trust boundary with compatibility and provenance tests."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-23T14:36:56.043Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement RF-01 semantic result trust boundary with compatibility and provenance tests."
  -
    type: "verify"
    at: "2026-07-23T14:48:10.137Z"
    author: "TESTER"
    state: "needs_rework"
    note: "No implementation changes are present at the current task head; return to CODER for RF-01a implementation before evidence-based verification."
  -
    type: "verify"
    at: "2026-07-23T15:40:05.193Z"
    author: "TESTER"
    state: "ok"
    note: "RF-01a rework verified: v2 excludes observed process, check, metric, and path truth; v1 preserves those values only as agent_reported claims; observed runtime values win with auditable conflicts. schemas:check, 69 focused tests, typecheck, trust ratchet, all 11 critical chunks, ci:contract, and independent review pass."
  -
    type: "status"
    at: "2026-07-23T15:46:46.458Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-23T15:46:46.459Z"
doc_updated_by: "CODER"
description: "RF-01a: define the agent-writable AgentSemanticResult contract and a compatibility reader that cannot treat process status, exit, timing, metrics, checks, or filesystem evidence as observed truth."
sections:
  Summary: |-
    Split agent semantic results from legacy observed claims

    RF-01a: define the agent-writable AgentSemanticResult contract and a compatibility reader that cannot treat process status, exit, timing, metrics, checks, or filesystem evidence as observed truth.
  Scope: |-
    - In scope: semantic result schema/types/fixtures, provenance for agent-reported claims, compatibility reading of v1 manifests, warning/normalization behavior, and removal of observed fields from the writable v2 schema.
    - Out of scope: process/Git/check observation implementation, which belongs to the ExecutionReceipt task.
  Plan: |-
    1. Define AgentSemanticResult fields for summary, findings, uncertainty, blockers, knowledge requests, and claimed checks.
    2. Separate legacy observed-looking fields during v1 parsing and preserve them only as untrusted raw claims with warnings.
    3. Generate schema, types, and fixtures from one source.
    4. Update manifest parsing and callers without allowing claims to overwrite runtime observations.
    5. Add compatibility and provenance tests.
  Verify Steps: |-
    1. Parse v2 semantic-result fixtures. Expected: no writable exit code, timeout, duration, process metric, actual check, or actual path field exists.
    2. Parse legacy v1 fixtures containing those fields. Expected: values remain explicitly `agent_reported` raw claims and never populate observed truth.
    3. Attempt to merge conflicting semantic claims over runtime observations in fixtures. Expected: the observed value wins and the conflict is auditable.
    4. Run `bun run schemas:check`, focused manifest tests, and `bun run typecheck`. Expected: schema and runtime types stay synchronized.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T14:48:10.137Z — VERIFY — needs_rework

    By: TESTER

    Note: No implementation changes are present at the current task head; return to CODER for RF-01a implementation before evidence-based verification.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:36:56.043Z, excerpt_hash=sha256:f4ceb507797791a87c43979903da31a5e91cce5774bb8263f8074ecde692a131

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4CE7EG-split-agent-semantic-results-from-legacy-observe/.agentplane/tasks/202607221846-4CE7EG/blueprint/resolved-snapshot.json
    - old_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
    - current_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-4CE7EG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221846-4CE7EG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-23T15:40:05.193Z — VERIFY — ok

    By: TESTER

    Note: RF-01a rework verified: v2 excludes observed process, check, metric, and path truth; v1 preserves those values only as agent_reported claims; observed runtime values win with auditable conflicts. schemas:check, 69 focused tests, typecheck, trust ratchet, all 11 critical chunks, ci:contract, and independent review pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:48:11.595Z, excerpt_hash=sha256:f4ceb507797791a87c43979903da31a5e91cce5774bb8263f8074ecde692a131

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4CE7EG-split-agent-semantic-results-from-legacy-observe/.agentplane/tasks/202607221846-4CE7EG/blueprint/resolved-snapshot.json
    - old_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
    - current_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-4CE7EG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: PR head contains only task and PR metadata commits; implementation diff against main is empty.
      Impact: RF-01a acceptance criteria cannot be evaluated.
      Resolution: Implement the approved semantic-result and legacy-claim split, then rerun the listed verification steps.

    - Observation: The implementation commit dfc9d1927 cleanly separates agent semantic output from supervisor-observed runner state and fails closed on stale or symlinked source snapshots.
      Impact: Agent-authored manifests can no longer promote claims into observed execution truth while v1 compatibility remains inspectable and provenance-bearing.
      Resolution: Accepted the implementation rework with deterministic schema, reconciliation, source-preservation, marker-injection, history-retention, and conflict tests.
id_source: "generated"
---
## Summary

Split agent semantic results from legacy observed claims

RF-01a: define the agent-writable AgentSemanticResult contract and a compatibility reader that cannot treat process status, exit, timing, metrics, checks, or filesystem evidence as observed truth.

## Scope

- In scope: semantic result schema/types/fixtures, provenance for agent-reported claims, compatibility reading of v1 manifests, warning/normalization behavior, and removal of observed fields from the writable v2 schema.
- Out of scope: process/Git/check observation implementation, which belongs to the ExecutionReceipt task.

## Plan

1. Define AgentSemanticResult fields for summary, findings, uncertainty, blockers, knowledge requests, and claimed checks.
2. Separate legacy observed-looking fields during v1 parsing and preserve them only as untrusted raw claims with warnings.
3. Generate schema, types, and fixtures from one source.
4. Update manifest parsing and callers without allowing claims to overwrite runtime observations.
5. Add compatibility and provenance tests.

## Verify Steps

1. Parse v2 semantic-result fixtures. Expected: no writable exit code, timeout, duration, process metric, actual check, or actual path field exists.
2. Parse legacy v1 fixtures containing those fields. Expected: values remain explicitly `agent_reported` raw claims and never populate observed truth.
3. Attempt to merge conflicting semantic claims over runtime observations in fixtures. Expected: the observed value wins and the conflict is auditable.
4. Run `bun run schemas:check`, focused manifest tests, and `bun run typecheck`. Expected: schema and runtime types stay synchronized.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T14:48:10.137Z — VERIFY — needs_rework

By: TESTER

Note: No implementation changes are present at the current task head; return to CODER for RF-01a implementation before evidence-based verification.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:36:56.043Z, excerpt_hash=sha256:f4ceb507797791a87c43979903da31a5e91cce5774bb8263f8074ecde692a131

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4CE7EG-split-agent-semantic-results-from-legacy-observe/.agentplane/tasks/202607221846-4CE7EG/blueprint/resolved-snapshot.json
- old_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
- current_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-4CE7EG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221846-4CE7EG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-23T15:40:05.193Z — VERIFY — ok

By: TESTER

Note: RF-01a rework verified: v2 excludes observed process, check, metric, and path truth; v1 preserves those values only as agent_reported claims; observed runtime values win with auditable conflicts. schemas:check, 69 focused tests, typecheck, trust ratchet, all 11 critical chunks, ci:contract, and independent review pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T14:48:11.595Z, excerpt_hash=sha256:f4ceb507797791a87c43979903da31a5e91cce5774bb8263f8074ecde692a131

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4CE7EG-split-agent-semantic-results-from-legacy-observe/.agentplane/tasks/202607221846-4CE7EG/blueprint/resolved-snapshot.json
- old_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
- current_digest: 6809d84737a34a8695daada16e6b5bd91aa915e289b2a85128ec18a4641191d2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-4CE7EG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: PR head contains only task and PR metadata commits; implementation diff against main is empty.
  Impact: RF-01a acceptance criteria cannot be evaluated.
  Resolution: Implement the approved semantic-result and legacy-claim split, then rerun the listed verification steps.

- Observation: The implementation commit dfc9d1927 cleanly separates agent semantic output from supervisor-observed runner state and fails closed on stale or symlinked source snapshots.
  Impact: Agent-authored manifests can no longer promote claims into observed execution truth while v1 compatibility remains inspectable and provenance-bearing.
  Resolution: Accepted the implementation rework with deterministic schema, reconciliation, source-preservation, marker-injection, history-retention, and conflict tests.
