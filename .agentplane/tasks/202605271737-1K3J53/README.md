---
id: "202605271737-1K3J53"
title: "Strengthen task route oracle"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T17:38:11.077Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T17:59:20.793Z"
  updated_by: "CODER"
  note: "Refactored route oracle into a separate module after hosted hotspot failure."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-27T18:30:03.800Z"
  updated_by: "EVALUATOR"
  note: "Route oracle now reports phase, authoritative checkout, blocker, and next command across next-action/status/brief surfaces."
  evaluated_sha: "0a80638e2d4ff7fc5119782cfecd0a6abb3da3f3"
  blueprint_digest: "b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61"
  evidence_refs:
    - ".agentplane/tasks/202605271737-1K3J53/README.md"
    - ".agentplane/tasks/202605271737-1K3J53/quality/20260527-183003800-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605271737-1K3J53/quality/20260527-183003800-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605271737-1K3J53/quality/20260527-183003800-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605271737-1K3J53/blueprint/resolved-snapshot.json"
    - "PR #4169 checks: PR verification, test-windows, verify-contract, verify-unit, verify-static, verify-workflow, verify-coverage, verify-cli-critical, docs, CodeQL all passed"
  findings:
    - "Focused route-decision tests, typecheck, routing policy, doctor, hotspots, format check, and hosted PR checks passed; local pre-push full-fast timed out in broad Vitest after required focused gates had passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved route oracle improvement in the dedicated branch_pr worktree, scoped to CLI route output and focused tests."
events:
  -
    type: "status"
    at: "2026-05-27T17:39:04.733Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved route oracle improvement in the dedicated branch_pr worktree, scoped to CLI route output and focused tests."
  -
    type: "verify"
    at: "2026-05-27T17:50:55.146Z"
    author: "CODER"
    state: "ok"
    note: "Implemented route oracle packet and verified focused route-decision behavior."
  -
    type: "verify"
    at: "2026-05-27T17:59:20.793Z"
    author: "CODER"
    state: "ok"
    note: "Refactored route oracle into a separate module after hosted hotspot failure."
doc_version: 3
doc_updated_at: "2026-05-27T17:59:20.841Z"
doc_updated_by: "CODER"
description: "Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution."
sections:
  Summary: |-
    Strengthen task route oracle

    Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.
  Scope: |-
    - In scope: Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.
    - Out of scope: unrelated refactors not required for "Strengthen task route oracle".
  Plan: "Implement a stronger task route oracle without adding AGENTS.md instructions. Scope: inspect current task next-action/status route implementation; add a compact route-oracle packet that reports phase, authoritative checkout, blocker, and next concrete command; preserve existing text output compatibility where practical; add focused tests; run task verify-show, focused tests, typecheck or targeted project check as appropriate, policy routing, and doctor."
  Verify Steps: |-
    1. Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Expected: route-decision command coverage passes, including route_oracle JSON and phase plus authoritative_checkout text output.
    2. Command: bun run typecheck. Expected: TypeScript project references build cleanly after shared route decision type changes.
    3. Command: bun run framework:dev:bootstrap. Expected: repo-local CLI build snapshot is current and runtime explain succeeds.
    4. Command: node .agentplane/policy/check-routing.mjs. Expected: policy routing constraints still pass.
    5. Command: ap task next-action 202605271737-1K3J53 --explain and ap task next-action 202605271737-1K3J53 --json. Expected: one command reports phase, authoritative checkout, primary blocker or null blocker, and next command.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T17:50:55.146Z — VERIFY — ok

    By: CODER

    Note: Implemented route oracle packet and verified focused route-decision behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:49:07.127Z, excerpt_hash=sha256:b6a477cdcea0248d67fbe7b4c29cdf593057154fa2f738c9fa771a6a8ebcec8a

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 108 expect calls. Scope: route-decision next-action/status/brief output.

    Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.

    Command: bun run framework:dev:bootstrap. Result: pass. Evidence: Framework dev runtime is ready; repo-local runtime 0.6.10 matches expectation. Scope: rebuilt CLI snapshot.

    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

    Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: workspace/runtime route health.

    Command: ap task next-action 202605271737-1K3J53 --explain and --json. Result: pass. Evidence: phase=verify_or_pr_update, authoritativeCheckout=task_worktree, blocker=null, nextCommand=agentplane pr update 202605271737-1K3J53. Scope: live oracle output.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271737-1K3J53-strengthen-task-route-oracle/.agentplane/tasks/202605271737-1K3J53/blueprint/resolved-snapshot.json
    - old_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
    - current_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271737-1K3J53

    ### 2026-05-27T17:59:20.793Z — VERIFY — ok

    By: CODER

    Note: Refactored route oracle into a separate module after hosted hotspot failure.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:50:55.277Z, excerpt_hash=sha256:b6a477cdcea0248d67fbe7b4c29cdf593057154fa2f738c9fa771a6a8ebcec8a

    Details:

    Command: bun run hotspots:check. Result: pass. Evidence: Hotspot threshold check passed; route-decision.ts is 553 lines, below the 600-line hard threshold. Scope: hosted verify-contract blocker.

    Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 108 expect calls. Scope: route oracle behavior after extraction.

    Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: route-oracle module extraction.

    Command: bun run framework:dev:bootstrap. Result: pass. Evidence: Framework dev runtime is ready; repo-local runtime 0.6.10 matches expectation. Scope: rebuilt CLI snapshot.

    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

    Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: workspace/runtime route health.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271737-1K3J53-strengthen-task-route-oracle/.agentplane/tasks/202605271737-1K3J53/blueprint/resolved-snapshot.json
    - old_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
    - current_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271737-1K3J53

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Strengthen task route oracle

Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.

## Scope

- In scope: Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.
- Out of scope: unrelated refactors not required for "Strengthen task route oracle".

## Plan

Implement a stronger task route oracle without adding AGENTS.md instructions. Scope: inspect current task next-action/status route implementation; add a compact route-oracle packet that reports phase, authoritative checkout, blocker, and next concrete command; preserve existing text output compatibility where practical; add focused tests; run task verify-show, focused tests, typecheck or targeted project check as appropriate, policy routing, and doctor.

## Verify Steps

1. Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Expected: route-decision command coverage passes, including route_oracle JSON and phase plus authoritative_checkout text output.
2. Command: bun run typecheck. Expected: TypeScript project references build cleanly after shared route decision type changes.
3. Command: bun run framework:dev:bootstrap. Expected: repo-local CLI build snapshot is current and runtime explain succeeds.
4. Command: node .agentplane/policy/check-routing.mjs. Expected: policy routing constraints still pass.
5. Command: ap task next-action 202605271737-1K3J53 --explain and ap task next-action 202605271737-1K3J53 --json. Expected: one command reports phase, authoritative checkout, primary blocker or null blocker, and next command.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T17:50:55.146Z — VERIFY — ok

By: CODER

Note: Implemented route oracle packet and verified focused route-decision behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:49:07.127Z, excerpt_hash=sha256:b6a477cdcea0248d67fbe7b4c29cdf593057154fa2f738c9fa771a6a8ebcec8a

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 108 expect calls. Scope: route-decision next-action/status/brief output.

Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.

Command: bun run framework:dev:bootstrap. Result: pass. Evidence: Framework dev runtime is ready; repo-local runtime 0.6.10 matches expectation. Scope: rebuilt CLI snapshot.

Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: workspace/runtime route health.

Command: ap task next-action 202605271737-1K3J53 --explain and --json. Result: pass. Evidence: phase=verify_or_pr_update, authoritativeCheckout=task_worktree, blocker=null, nextCommand=agentplane pr update 202605271737-1K3J53. Scope: live oracle output.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271737-1K3J53-strengthen-task-route-oracle/.agentplane/tasks/202605271737-1K3J53/blueprint/resolved-snapshot.json
- old_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
- current_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271737-1K3J53

### 2026-05-27T17:59:20.793Z — VERIFY — ok

By: CODER

Note: Refactored route oracle into a separate module after hosted hotspot failure.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:50:55.277Z, excerpt_hash=sha256:b6a477cdcea0248d67fbe7b4c29cdf593057154fa2f738c9fa771a6a8ebcec8a

Details:

Command: bun run hotspots:check. Result: pass. Evidence: Hotspot threshold check passed; route-decision.ts is 553 lines, below the 600-line hard threshold. Scope: hosted verify-contract blocker.

Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 108 expect calls. Scope: route oracle behavior after extraction.

Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: route-oracle module extraction.

Command: bun run framework:dev:bootstrap. Result: pass. Evidence: Framework dev runtime is ready; repo-local runtime 0.6.10 matches expectation. Scope: rebuilt CLI snapshot.

Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.

Command: ap doctor. Result: pass. Evidence: doctor (OK), errors=0 warnings=0. Scope: workspace/runtime route health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271737-1K3J53-strengthen-task-route-oracle/.agentplane/tasks/202605271737-1K3J53/blueprint/resolved-snapshot.json
- old_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
- current_digest: b8b091d55f60e3de3d8b767e00da151179c94ed96afebcc650ca245a8c723b61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271737-1K3J53

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
