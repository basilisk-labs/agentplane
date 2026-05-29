---
id: "202605291949-5NBC1A"
title: "Remove direct Redmine task backend"
result_summary: "Merged via PR #4318."
status: "DONE"
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
  updated_at: "2026-05-29T19:50:53.941Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T20:12:19.520Z"
  updated_by: "CODER"
  note: "Implemented and verified: focused backend/init tests, backend-critical suite, typecheck, build, doctor, and policy routing all passed. Commits: 05b42f6f5, 5aa293214."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-29T20:14:27.793Z"
  updated_by: "EVALUATOR"
  note: "Direct Redmine backend removed from public AgentPlane and cloud autosync timeout issue fixed separately."
  evaluated_sha: "5aa293214b812abd4086c8273fe85e5bf21e0cf6"
  blueprint_digest: "c139396fb8bb7ab9e7da7656b26636c46267166ec1c4eb70dafd2d03852b425f"
  evidence_refs:
    - ".agentplane/tasks/202605291949-5NBC1A/README.md"
    - ".agentplane/tasks/202605291949-5NBC1A/quality/20260529-201427793-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605291949-5NBC1A/quality/20260529-201427793-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605291949-5NBC1A/quality/20260529-201427793-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605291949-5NBC1A/blueprint/resolved-snapshot.json"
    - "bun run build; bun run test:backend-critical; ap doctor; node .agentplane/policy/check-routing.mjs"
  findings:
    - "Checks passed: focused backend/init tests, backend-critical, typecheck, build, doctor, policy routing."
commit:
  hash: "b02ba48721934533ad226b3827b34343a29366b6"
  message: "Merge pull request #4318 from basilisk-labs/task/202605291949-5NBC1A/remove-direct-redmine-task-backend"
comments:
  -
    author: "CODER"
    body: "Start: Remove direct Redmine task backend from public AgentPlane and keep Redmine connector behavior in cloud-sync integration scope."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4318 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T19:51:11.560Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove direct Redmine task backend from public AgentPlane and keep Redmine connector behavior in cloud-sync integration scope."
  -
    type: "verify"
    at: "2026-05-29T20:12:19.520Z"
    author: "CODER"
    state: "ok"
    note: "Implemented and verified: focused backend/init tests, backend-critical suite, typecheck, build, doctor, and policy routing all passed. Commits: 05b42f6f5, 5aa293214."
  -
    type: "status"
    at: "2026-05-29T21:53:02.914Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4318 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T21:53:02.919Z"
doc_updated_by: "INTEGRATOR"
description: "Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior."
sections:
  Summary: |-
    Remove direct Redmine task backend

    Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
  Scope: |-
    - In scope: Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
    - Out of scope: unrelated refactors not required for "Remove direct Redmine task backend".
  Plan: |-
    1. Implement the change for "Remove direct Redmine task backend".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run focused task backend and init CLI tests. Expected: local/cloud backend choices pass and redmine is rejected with a migration-oriented error.
    2. Run repository routing/policy checks. Expected: backend removal does not violate AGENTS or policy routing budgets.
    3. Run package typecheck/build or the narrowest available equivalent. Expected: no public AgentPlane code imports Redmine backend modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T20:12:19.520Z — VERIFY — ok

    By: CODER

    Note: Implemented and verified: focused backend/init tests, backend-critical suite, typecheck, build, doctor, and policy routing all passed. Commits: 05b42f6f5, 5aa293214.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:51:11.560Z, excerpt_hash=sha256:baea32d677c746bd0a3b42ea7bc812373ef6aa5005c20338e96b2e58f14e6970

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291949-5NBC1A-remove-direct-redmine-task-backend/.agentplane/tasks/202605291949-5NBC1A/blueprint/resolved-snapshot.json
    - old_digest: c139396fb8bb7ab9e7da7656b26636c46267166ec1c4eb70dafd2d03852b425f
    - current_digest: c139396fb8bb7ab9e7da7656b26636c46267166ec1c4eb70dafd2d03852b425f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291949-5NBC1A

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove direct Redmine task backend

Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.

## Scope

- In scope: Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
- Out of scope: unrelated refactors not required for "Remove direct Redmine task backend".

## Plan

1. Implement the change for "Remove direct Redmine task backend".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run focused task backend and init CLI tests. Expected: local/cloud backend choices pass and redmine is rejected with a migration-oriented error.
2. Run repository routing/policy checks. Expected: backend removal does not violate AGENTS or policy routing budgets.
3. Run package typecheck/build or the narrowest available equivalent. Expected: no public AgentPlane code imports Redmine backend modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T20:12:19.520Z — VERIFY — ok

By: CODER

Note: Implemented and verified: focused backend/init tests, backend-critical suite, typecheck, build, doctor, and policy routing all passed. Commits: 05b42f6f5, 5aa293214.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:51:11.560Z, excerpt_hash=sha256:baea32d677c746bd0a3b42ea7bc812373ef6aa5005c20338e96b2e58f14e6970

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291949-5NBC1A-remove-direct-redmine-task-backend/.agentplane/tasks/202605291949-5NBC1A/blueprint/resolved-snapshot.json
- old_digest: c139396fb8bb7ab9e7da7656b26636c46267166ec1c4eb70dafd2d03852b425f
- current_digest: c139396fb8bb7ab9e7da7656b26636c46267166ec1c4eb70dafd2d03852b425f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291949-5NBC1A

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
