---
id: "202606022123-WDMMPJ"
title: "Tighten Hermes AgentPlane integration"
result_summary: "Merged via PR #4388."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hermes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-02T21:23:54.184Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-02T22:17:54.967Z"
  updated_by: "CODER"
  note: "Review duplicate-card finding fixed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-02T22:08:52.497Z"
  updated_by: "EVALUATOR"
  note: "Hermes AgentPlane integration PR passed local and hosted verification."
  evaluated_sha: "ab77b8dabd010c5308b84c96a1de56eb91e65b89"
  blueprint_digest: "b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4"
  evidence_refs:
    - ".agentplane/tasks/202606022123-WDMMPJ/README.md"
    - ".agentplane/tasks/202606022123-WDMMPJ/quality/20260602-220852497-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606022123-WDMMPJ/quality/20260602-220852497-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606022123-WDMMPJ/quality/20260602-220852497-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json"
    - "https://github.com/basilisk-labs/agentplane/pull/4388"
  findings:
    - "GitHub PR #4388 green on CodeQL, docs, plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, and PR verification."
commit:
  hash: "028d211762dfcf1f894bd6834447ce29bd9dde3b"
  message: "Merge pull request #4388 from basilisk-labs/task/202606022123-WDMMPJ/hermes-agentplane-integration"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved Hermes AgentPlane integration changes in the dedicated branch_pr worktree, covering lifecycle recommendation, reconcile state input, Hermes runner adapter, and embedded plugin drift cleanup."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4388 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-02T21:24:06.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved Hermes AgentPlane integration changes in the dedicated branch_pr worktree, covering lifecycle recommendation, reconcile state input, Hermes runner adapter, and embedded plugin drift cleanup."
  -
    type: "verify"
    at: "2026-06-02T21:28:48.126Z"
    author: "CODER"
    state: "ok"
    note: "Focused Hermes integration checks passed."
  -
    type: "verify"
    at: "2026-06-02T21:39:09.091Z"
    author: "CODER"
    state: "ok"
    note: "CI contract lint fix verified."
  -
    type: "verify"
    at: "2026-06-02T21:50:20.632Z"
    author: "CODER"
    state: "ok"
    note: "Full contract check passed after CI fix."
  -
    type: "verify"
    at: "2026-06-02T21:55:16.012Z"
    author: "CODER"
    state: "ok"
    note: "CLI docs contract verified."
  -
    type: "verify"
    at: "2026-06-02T22:17:54.967Z"
    author: "CODER"
    state: "ok"
    note: "Review duplicate-card finding fixed."
  -
    type: "status"
    at: "2026-06-03T05:01:34.603Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4388 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-03T05:01:34.609Z"
doc_updated_by: "INTEGRATOR"
description: "Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership."
sections:
  Summary: |-
    Tighten Hermes AgentPlane integration

    Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
  Scope: |-
    - In scope: Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
    - Out of scope: unrelated refactors not required for "Tighten Hermes AgentPlane integration".
  Plan: "Implement a tighter Hermes integration in AgentPlane: (1) add explicit Hermes terminal lifecycle recommendation to supervise JSON output; (2) add reconcile input for Hermes state files so AgentPlane can compare local lifecycle intent with Hermes card state; (3) introduce a dedicated Hermes runner adapter instead of aliasing it invisibly to custom; (4) replace stale embedded Hermes plugin implementation with documentation that points to the external agentplane-hermes-plugin as the source of truth; (5) verify with focused tests, typecheck/build checks, policy routing, and final full git status."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-02T21:28:48.126Z — VERIFY — ok

    By: CODER

    Note: Focused Hermes integration checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:24:06.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    ### 2026-06-02T21:39:09.091Z — VERIFY — ok

    By: CODER

    Note: CI contract lint fix verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:28:48.144Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    ### 2026-06-02T21:50:20.632Z — VERIFY — ok

    By: CODER

    Note: Full contract check passed after CI fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:39:09.113Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    ### 2026-06-02T21:55:16.012Z — VERIFY — ok

    By: CODER

    Note: CLI docs contract verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:50:20.664Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    ### 2026-06-02T22:17:54.967Z — VERIFY — ok

    By: CODER

    Note: Review duplicate-card finding fixed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:55:16.029Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
    - old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed successfully. Scope: TypeScript project references.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: 2 files passed, 27 tests passed. Scope: Hermes CLI integration and runner adapter factory/custom path.\nCommand: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: AgentPlane policy routing.
      Impact: Hermes supervise now exposes lifecycle recommendations; reconcile can compare a read-only Hermes state snapshot; runner.default_adapter=hermes has an explicit adapter class; stale embedded plugin execution shim is removed in favor of the external plugin source of truth.
      Resolution: Implemented with focused tests and preserved AgentPlane as the engineering lifecycle authority.

    - Observation: Command: bun run format:changed && bun run lint:core. Result: pass. Evidence: changed files formatted; eslint completed with no findings. Scope: contract lint failure fix.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: tsc -b completed; 2 test files passed, 27 tests passed. Scope: Hermes reconcile/supervise and runner adapter behavior.
      Impact: Hosted verify-contract failure from no-base-to-string is resolved locally.
      Resolution: Normalized Hermes card status only when the snapshot value is a string.

    - Observation: Command: bun run ci:contract. Result: pass. Evidence: format, schemas, docs checks, lifecycle invariants, lint, dependency-cruiser, knip baseline, and coverage threshold guard all passed. Scope: hosted verify-contract equivalent for AgentPlane PR #4388.
      Impact: The hosted verify-contract failures were reproduced locally and resolved: no-base-to-string lint issue and unused type baseline issue.
      Resolution: Removed unsafe status stringification and removed the unused exported lifecycle recommendation type.

    - Observation: Command: bun run docs:cli:generate && bun run docs:cli:check && bun run ci:contract. Result: pass. Evidence: CLI reference regenerated; docs:cli:check reports up to date; ci:contract completed through knip baseline and coverage threshold guard. Scope: hosted verify-contract failure for AgentPlane PR #4388.
      Impact: The CI-only CLI docs freshness failure is resolved.
      Resolution: Regenerated docs/user/cli-reference.generated.mdx after adding the Hermes reconcile --hermes-state option.

    - Observation: Command: bun run framework:dev:bootstrap && bun run ci:contract. Result: pass. Evidence: framework bootstrap passed; ci:contract completed through lint, dependency-cruiser, knip baseline, and coverage threshold guard.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts. Result: pass. Evidence: tsc -b completed; 1 test file passed, 16 tests passed. Scope: Hermes reconcile duplicate-card behavior.
      Impact: All-board Hermes reconcile no longer reports false duplicate drift for cards mapped to different AgentPlane task ids.
      Resolution: Duplicate detection now groups cards by AgentPlane task id and tests cover distinct-task and same-task board snapshots.
id_source: "generated"
---
## Summary

Tighten Hermes AgentPlane integration

Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.

## Scope

- In scope: Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
- Out of scope: unrelated refactors not required for "Tighten Hermes AgentPlane integration".

## Plan

Implement a tighter Hermes integration in AgentPlane: (1) add explicit Hermes terminal lifecycle recommendation to supervise JSON output; (2) add reconcile input for Hermes state files so AgentPlane can compare local lifecycle intent with Hermes card state; (3) introduce a dedicated Hermes runner adapter instead of aliasing it invisibly to custom; (4) replace stale embedded Hermes plugin implementation with documentation that points to the external agentplane-hermes-plugin as the source of truth; (5) verify with focused tests, typecheck/build checks, policy routing, and final full git status.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-02T21:28:48.126Z — VERIFY — ok

By: CODER

Note: Focused Hermes integration checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:24:06.910Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

### 2026-06-02T21:39:09.091Z — VERIFY — ok

By: CODER

Note: CI contract lint fix verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:28:48.144Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

### 2026-06-02T21:50:20.632Z — VERIFY — ok

By: CODER

Note: Full contract check passed after CI fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:39:09.113Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

### 2026-06-02T21:55:16.012Z — VERIFY — ok

By: CODER

Note: CLI docs contract verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:50:20.664Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

### 2026-06-02T22:17:54.967Z — VERIFY — ok

By: CODER

Note: Review duplicate-card finding fixed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T21:55:16.029Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606022123-WDMMPJ-hermes-agentplane-integration/.agentplane/tasks/202606022123-WDMMPJ/blueprint/resolved-snapshot.json
- old_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- current_digest: b8ac0b187b11200d9140c2da3b3c78739dda3534d17df3ca0f8cdd9760af64c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606022123-WDMMPJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run format:changed. Result: pass. Evidence: All matched files use Prettier code style. Scope: changed files.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed successfully. Scope: TypeScript project references.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: 2 files passed, 27 tests passed. Scope: Hermes CLI integration and runner adapter factory/custom path.\nCommand: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: AgentPlane policy routing.
  Impact: Hermes supervise now exposes lifecycle recommendations; reconcile can compare a read-only Hermes state snapshot; runner.default_adapter=hermes has an explicit adapter class; stale embedded plugin execution shim is removed in favor of the external plugin source of truth.
  Resolution: Implemented with focused tests and preserved AgentPlane as the engineering lifecycle authority.

- Observation: Command: bun run format:changed && bun run lint:core. Result: pass. Evidence: changed files formatted; eslint completed with no findings. Scope: contract lint failure fix.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. Result: pass. Evidence: tsc -b completed; 2 test files passed, 27 tests passed. Scope: Hermes reconcile/supervise and runner adapter behavior.
  Impact: Hosted verify-contract failure from no-base-to-string is resolved locally.
  Resolution: Normalized Hermes card status only when the snapshot value is a string.

- Observation: Command: bun run ci:contract. Result: pass. Evidence: format, schemas, docs checks, lifecycle invariants, lint, dependency-cruiser, knip baseline, and coverage threshold guard all passed. Scope: hosted verify-contract equivalent for AgentPlane PR #4388.
  Impact: The hosted verify-contract failures were reproduced locally and resolved: no-base-to-string lint issue and unused type baseline issue.
  Resolution: Removed unsafe status stringification and removed the unused exported lifecycle recommendation type.

- Observation: Command: bun run docs:cli:generate && bun run docs:cli:check && bun run ci:contract. Result: pass. Evidence: CLI reference regenerated; docs:cli:check reports up to date; ci:contract completed through knip baseline and coverage threshold guard. Scope: hosted verify-contract failure for AgentPlane PR #4388.
  Impact: The CI-only CLI docs freshness failure is resolved.
  Resolution: Regenerated docs/user/cli-reference.generated.mdx after adding the Hermes reconcile --hermes-state option.

- Observation: Command: bun run framework:dev:bootstrap && bun run ci:contract. Result: pass. Evidence: framework bootstrap passed; ci:contract completed through lint, dependency-cruiser, knip baseline, and coverage threshold guard.\nCommand: bun run typecheck && bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/hermes/hermes.command.test.ts. Result: pass. Evidence: tsc -b completed; 1 test file passed, 16 tests passed. Scope: Hermes reconcile duplicate-card behavior.
  Impact: All-board Hermes reconcile no longer reports false duplicate drift for cards mapped to different AgentPlane task ids.
  Resolution: Duplicate detection now groups cards by AgentPlane task id and tests cover distinct-task and same-task board snapshots.
