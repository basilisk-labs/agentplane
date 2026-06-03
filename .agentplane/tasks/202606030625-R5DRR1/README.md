---
id: "202606030625-R5DRR1"
title: "Make route context explicit for agent handoffs"
result_summary: "Merged via PR #4392."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T06:25:44.922Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T06:57:10.181Z"
  updated_by: "CODER"
  note: "Review fix verified: local route fallback now checks origin/<base> before local base for hosted close evidence; targeted route, PR validation, recovery, close-tail unit tests, format, lint, and typecheck passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-03T08:00:09.515Z"
  updated_by: "EVALUATOR"
  note: "Route-context handoff changes are covered by focused local tests, policy checks, PR checks, and hosted GitHub checks."
  evaluated_sha: "52e9ef947a163e25e640f34392094f8d52990a29"
  blueprint_digest: "a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed"
  evidence_refs:
    - ".agentplane/tasks/202606030625-R5DRR1/README.md"
    - ".agentplane/tasks/202606030625-R5DRR1/quality/20260603-080009515-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606030625-R5DRR1/quality/20260603-080009515-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606030625-R5DRR1/quality/20260603-080009515-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606030625-R5DRR1/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts"
    - "bunx vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
    - "bun run typecheck"
    - "node .agentplane/policy/check-routing.mjs"
    - "ap doctor"
    - "ap pr check 202606030625-R5DRR1"
    - "GitHub PR #4392 required checks passed at head 52e9ef947a163e25e640f34392094f8d52990a29"
  findings:
    - "Pass: route decisions now expose explicit sync/repair actions for stale hosted close state, prose-only included-batch metadata, PR artifact source, release recovery truth levels, and incident promotion guidance."
commit:
  hash: "e1004832fef5f7fe89f91668412fb4173cdfab57"
  message: "code: R5DRR1 task: record quality review"
comments:
  -
    author: "CODER"
    body: "Start: Implement explicit route and evidence contracts for post-merge hosted close, PR artifacts, batch closure metadata, incidents, and release recovery so agents receive deterministic next actions instead of inferring state from stale artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4392 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-03T06:26:10.814Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement explicit route and evidence contracts for post-merge hosted close, PR artifacts, batch closure metadata, incidents, and release recovery so agents receive deterministic next actions instead of inferring state from stale artifacts."
  -
    type: "verify"
    at: "2026-06-03T06:39:17.474Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused route/pr/release regressions passed (52 tests), incident finish/verify Vitest unit coverage passed (33 tests), typecheck passed after framework bootstrap, routing policy passed, doctor passed with only pre-existing DONE-task commit warnings, and pr check passed with explicit artifact_source output."
  -
    type: "verify"
    at: "2026-06-03T06:57:10.181Z"
    author: "CODER"
    state: "ok"
    note: "Review fix verified: local route fallback now checks origin/<base> before local base for hosted close evidence; targeted route, PR validation, recovery, close-tail unit tests, format, lint, and typecheck passed."
  -
    type: "status"
    at: "2026-06-03T08:06:45.931Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4392 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-03T08:06:45.936Z"
doc_updated_by: "INTEGRATOR"
description: "Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose."
sections:
  Summary: |-
    Make route context explicit for agent handoffs

    Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
  Scope: |-
    - In scope: Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
    - Out of scope: unrelated refactors not required for "Make route context explicit for agent handoffs".
  Plan: |-
    1. Add explicit route states for merged/recorded hosted close tails so task status routes to base sync/cleanup instead of owner-lane pr update.
    2. Surface PR artifact source details in pr check/status output so stale local artifacts do not require branch-source guessing.
    3. Replace included-batch closure text heuristics with structured batch metadata and make missing metadata a clear blocker.
    4. Add structured incident/release guidance fields where current output forces agents to infer promotion or publication truth.
    5. Cover each changed contract with focused regression tests and run route/policy checks plus the declared task verification.
  Verify Steps: |-
    1. Run focused route/pr/release/incident regression tests covering the changed contracts. Expected: all targeted tests pass.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
    3. Run `ap doctor`. Expected: no blocking diagnostics for the changed workflow contracts.
    4. After PR artifacts are published, run `ap pr check 202606030625-R5DRR1`. Expected: PR artifacts and verification metadata are fresh.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T06:39:17.474Z — VERIFY — ok

    By: CODER

    Note: Verified: focused route/pr/release regressions passed (52 tests), incident finish/verify Vitest unit coverage passed (33 tests), typecheck passed after framework bootstrap, routing policy passed, doctor passed with only pre-existing DONE-task commit warnings, and pr check passed with explicit artifact_source output.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T06:26:10.814Z, excerpt_hash=sha256:7cbcf825b4b9809805fc458e8693cf79f2e068b5128d28a92621b59bd5304add

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030625-R5DRR1-make-route-context-explicit-for-agent-handoffs/.agentplane/tasks/202606030625-R5DRR1/blueprint/resolved-snapshot.json
    - old_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
    - current_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030625-R5DRR1

    ### 2026-06-03T06:57:10.181Z — VERIFY — ok

    By: CODER

    Note: Review fix verified: local route fallback now checks origin/<base> before local base for hosted close evidence; targeted route, PR validation, recovery, close-tail unit tests, format, lint, and typecheck passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T06:39:17.491Z, excerpt_hash=sha256:7cbcf825b4b9809805fc458e8693cf79f2e068b5128d28a92621b59bd5304add

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030625-R5DRR1-make-route-context-explicit-for-agent-handoffs/.agentplane/tasks/202606030625-R5DRR1/blueprint/resolved-snapshot.json
    - old_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
    - current_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606030625-R5DRR1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: PR review noted that sync_hosted_close must work when hosted close landed on origin/<base> but local base is stale.
      Impact: Agents no longer miss the sync_hosted_close route in the common stale-local-base state.
      Resolution: resolveLocalRecordedCloseFlow checks remote-tracking base first and keeps local base as fallback; route-decision test now resets local main behind origin/main.
id_source: "generated"
---
## Summary

Make route context explicit for agent handoffs

Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.

## Scope

- In scope: Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
- Out of scope: unrelated refactors not required for "Make route context explicit for agent handoffs".

## Plan

1. Add explicit route states for merged/recorded hosted close tails so task status routes to base sync/cleanup instead of owner-lane pr update.
2. Surface PR artifact source details in pr check/status output so stale local artifacts do not require branch-source guessing.
3. Replace included-batch closure text heuristics with structured batch metadata and make missing metadata a clear blocker.
4. Add structured incident/release guidance fields where current output forces agents to infer promotion or publication truth.
5. Cover each changed contract with focused regression tests and run route/policy checks plus the declared task verification.

## Verify Steps

1. Run focused route/pr/release/incident regression tests covering the changed contracts. Expected: all targeted tests pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
3. Run `ap doctor`. Expected: no blocking diagnostics for the changed workflow contracts.
4. After PR artifacts are published, run `ap pr check 202606030625-R5DRR1`. Expected: PR artifacts and verification metadata are fresh.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T06:39:17.474Z — VERIFY — ok

By: CODER

Note: Verified: focused route/pr/release regressions passed (52 tests), incident finish/verify Vitest unit coverage passed (33 tests), typecheck passed after framework bootstrap, routing policy passed, doctor passed with only pre-existing DONE-task commit warnings, and pr check passed with explicit artifact_source output.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T06:26:10.814Z, excerpt_hash=sha256:7cbcf825b4b9809805fc458e8693cf79f2e068b5128d28a92621b59bd5304add

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030625-R5DRR1-make-route-context-explicit-for-agent-handoffs/.agentplane/tasks/202606030625-R5DRR1/blueprint/resolved-snapshot.json
- old_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
- current_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030625-R5DRR1

### 2026-06-03T06:57:10.181Z — VERIFY — ok

By: CODER

Note: Review fix verified: local route fallback now checks origin/<base> before local base for hosted close evidence; targeted route, PR validation, recovery, close-tail unit tests, format, lint, and typecheck passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T06:39:17.491Z, excerpt_hash=sha256:7cbcf825b4b9809805fc458e8693cf79f2e068b5128d28a92621b59bd5304add

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606030625-R5DRR1-make-route-context-explicit-for-agent-handoffs/.agentplane/tasks/202606030625-R5DRR1/blueprint/resolved-snapshot.json
- old_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
- current_digest: a9a94162b2886894cc690f61e1918b24d178ab27ac051265570e602c713f99ed
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606030625-R5DRR1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: PR review noted that sync_hosted_close must work when hosted close landed on origin/<base> but local base is stale.
  Impact: Agents no longer miss the sync_hosted_close route in the common stale-local-base state.
  Resolution: resolveLocalRecordedCloseFlow checks remote-tracking base first and keeps local base as fallback; route-decision test now resets local main behind origin/main.
