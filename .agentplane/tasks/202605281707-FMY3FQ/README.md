---
id: "202605281707-FMY3FQ"
title: "Targeted local CI buckets for agent-critical surfaces"
result_summary: "Closed included batch task from merged PR #4197"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "ci"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:08:21.451Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:22.623Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: runner, route-oracle, prompt-modules, and evaluator buckets route to targeted tests. Scope: local CI bucket selection."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T15:00:24.930Z"
  updated_by: "EVALUATOR"
  note: "Included task verified in merged batch PR #4197."
  evaluated_sha: "c318cabc49a29ffcbf2b8246af76201f5ccbb324"
  blueprint_digest: "442c2c9b8ead7a7b9febe8d5a7cc6f484179b3fc495a9873621ef18474db5480"
  evidence_refs:
    - ".agentplane/tasks/202605281707-FMY3FQ/README.md"
    - ".agentplane/tasks/202605281707-FMY3FQ/quality/20260531-150024930-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281707-FMY3FQ/quality/20260531-150024930-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281707-FMY3FQ/quality/20260531-150024930-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281707-FMY3FQ/blueprint/resolved-snapshot.json"
  findings:
    - "Task has verification.ok evidence and was included in the 51DD0G route-packet-v2 batch merged to main at 26704abb70798fb4ecca714fa3c21050d3893c18."
commit:
  hash: "c318cabc49a29ffcbf2b8246af76201f5ccbb324"
  message: "Merge pull request #4329 from basilisk-labs/task/202605310706-GV6ECK/verify-ghost-progress"
comments:
  -
    author: "CODER"
    body: "Start: Implementing targeted local CI bucket routing as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; evaluator review recorded SHA c318cabc49a29ffcbf2b8246af76201f5ccbb324."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:45.285Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing targeted local CI bucket routing as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:22.623Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: runner, route-oracle, prompt-modules, and evaluator buckets route to targeted tests. Scope: local CI bucket selection."
  -
    type: "status"
    at: "2026-05-31T15:00:27.342Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; evaluator review recorded SHA c318cabc49a29ffcbf2b8246af76201f5ccbb324."
doc_version: 3
doc_updated_at: "2026-05-31T15:00:27.342Z"
doc_updated_by: "INTEGRATOR"
description: "Add dedicated local CI selection buckets for runner, route oracle, prompt modules, and evaluator changes."
sections:
  Summary: |-
    Targeted local CI buckets for agent-critical surfaces

    Add dedicated local CI selection buckets for runner, route oracle, prompt modules, and evaluator changes.
  Scope: |-
    - In scope: Add dedicated local CI selection buckets for runner, route oracle, prompt modules, and evaluator changes.
    - Out of scope: unrelated refactors not required for "Targeted local CI buckets for agent-critical surfaces".
  Plan: "Add targeted local CI buckets for runner, route-oracle, prompt-modules, and evaluator surfaces. Keep routing deterministic and avoid full-fast fallback for narrow changes. Verify with local-ci-selection tests and run-local-ci explain fixtures."
  Verify Steps: "1. Run local-ci-selection tests covering runner, route-oracle, prompt-modules, and evaluator changed paths. 2. Run node scripts/checks/run-local-ci.mjs --mode smoke --explain against representative changed path fixtures if supported. 3. Run bun run workflows:command-check or the focused workflow routing checks if touched."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:22.623Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: runner, route-oracle, prompt-modules, and evaluator buckets route to targeted tests. Scope: local CI bucket selection.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:45.285Z, excerpt_hash=sha256:106e175a18d7acc49eb7d360ba9ac6577dc88e3914c86789ea46e4104c53ab3c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-FMY3FQ/blueprint/resolved-snapshot.json
    - old_digest: 442c2c9b8ead7a7b9febe8d5a7cc6f484179b3fc495a9873621ef18474db5480
    - current_digest: 442c2c9b8ead7a7b9febe8d5a7cc6f484179b3fc495a9873621ef18474db5480
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-FMY3FQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Targeted local CI buckets for agent-critical surfaces

Add dedicated local CI selection buckets for runner, route oracle, prompt modules, and evaluator changes.

## Scope

- In scope: Add dedicated local CI selection buckets for runner, route oracle, prompt modules, and evaluator changes.
- Out of scope: unrelated refactors not required for "Targeted local CI buckets for agent-critical surfaces".

## Plan

Add targeted local CI buckets for runner, route-oracle, prompt-modules, and evaluator surfaces. Keep routing deterministic and avoid full-fast fallback for narrow changes. Verify with local-ci-selection tests and run-local-ci explain fixtures.

## Verify Steps

1. Run local-ci-selection tests covering runner, route-oracle, prompt-modules, and evaluator changed paths. 2. Run node scripts/checks/run-local-ci.mjs --mode smoke --explain against representative changed path fixtures if supported. 3. Run bun run workflows:command-check or the focused workflow routing checks if touched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:22.623Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: runner, route-oracle, prompt-modules, and evaluator buckets route to targeted tests. Scope: local CI bucket selection.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:45.285Z, excerpt_hash=sha256:106e175a18d7acc49eb7d360ba9ac6577dc88e3914c86789ea46e4104c53ab3c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-FMY3FQ/blueprint/resolved-snapshot.json
- old_digest: 442c2c9b8ead7a7b9febe8d5a7cc6f484179b3fc495a9873621ef18474db5480
- current_digest: 442c2c9b8ead7a7b9febe8d5a7cc6f484179b3fc495a9873621ef18474db5480
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-FMY3FQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
