---
id: "202605211025-P8N5XR"
title: "Harden recent issue candidates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "context"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T10:25:44.034Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T10:41:26.006Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates, Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent when version surfaces already match, and observations harvest avoids loading the full task registry when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy routing, doctor, changed Verify Steps lint, and diff whitespace checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-21T10:41:26.006Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates, Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent when version surfaces already match, and observations harvest avoids loading the full task registry when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy routing, doctor, changed Verify Steps lint, and diff whitespace checks passed."
  evaluated_sha: "85752945e6468dce40ec9463b5c60f0e2a9df4dc"
  blueprint_digest: "c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4"
  evidence_refs:
    - ".agentplane/tasks/202605211025-P8N5XR/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211025-P8N5XR-recent-issue-candidates/.agentplane/tasks/202605211025-P8N5XR/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved recent issue candidate hardening in the dedicated branch_pr worktree, with focused reproduction before each code change."
events:
  -
    type: "status"
    at: "2026-05-21T10:26:10.732Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved recent issue candidate hardening in the dedicated branch_pr worktree, with focused reproduction before each code change."
  -
    type: "verify"
    at: "2026-05-21T10:41:15.467Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/task/observations.unit.test.ts packages/agentplane/src/commands/release/apply.mutation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts. Result: pass. Evidence: 76 pass, 0 fail, 281 expect calls. Scope: routed CI prerequisites, observations harvest shortcut, release mutation idempotency, maximum-assimilation glossary validation, and local CI routing tests. Command: bunx eslint touched source/test files. Result: pass. Evidence: no ESLint output after unicorn fixes. Scope: touched JS/TS files. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Scope: agentplane TS compile after framework bootstrap. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference unchanged. Scope: new task lint flag docs. Command: bun run workflows:lint. Result: pass. Evidence: workflow command contract, lifecycle parity, critical route OK. Scope: ci.yml outputs and routed prerequisites. Command: ap task lint --verify-steps-changed, ap doctor, node .agentplane/policy/check-routing.mjs, git diff --check. Result: pass. Scope: task lint rollout, runtime, policy, whitespace."
  -
    type: "verify"
    at: "2026-05-21T10:41:26.006Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates, Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent when version surfaces already match, and observations harvest avoids loading the full task registry when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy routing, doctor, changed Verify Steps lint, and diff whitespace checks passed."
doc_version: 3
doc_updated_at: "2026-05-21T10:41:26.026Z"
doc_updated_by: "CODER"
description: "Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible."
sections:
  Summary: |-
    Harden recent issue candidates

    Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.
  Scope: |-
    - In scope: Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.
    - Out of scope: unrelated refactors not required for "Harden recent issue candidates".
  Plan: "1. Reproduce or falsify each candidate from recent history using current source, open GitHub issues, and local commands. 2. Implement only confirmed repo-local fixes in one batch branch: routed CI prerequisite preflight, legacy Verify Steps migration/scope support, maximum-assimilation glossary content validation, release version-surface idempotency guard, and observations harvest fast path if measurable. 3. Add focused regression coverage for each changed behavior and keep existing public CLI surfaces stable. 4. Verify with task verify-show, focused tests for touched areas, typecheck/lint where scoped, policy routing, doctor, and task-specific CLI smokes. 5. Record rejected candidates as Findings with evidence instead of expanding scope."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T10:41:15.467Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/commands/task/observations.unit.test.ts packages/agentplane/src/commands/release/apply.mutation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts. Result: pass. Evidence: 76 pass, 0 fail, 281 expect calls. Scope: routed CI prerequisites, observations harvest shortcut, release mutation idempotency, maximum-assimilation glossary validation, and local CI routing tests. Command: bunx eslint touched source/test files. Result: pass. Evidence: no ESLint output after unicorn fixes. Scope: touched JS/TS files. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Scope: agentplane TS compile after framework bootstrap. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference unchanged. Scope: new task lint flag docs. Command: bun run workflows:lint. Result: pass. Evidence: workflow command contract, lifecycle parity, critical route OK. Scope: ci.yml outputs and routed prerequisites. Command: ap task lint --verify-steps-changed, ap doctor, node .agentplane/policy/check-routing.mjs, git diff --check. Result: pass. Scope: task lint rollout, runtime, policy, whitespace.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:26:10.732Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211025-P8N5XR-recent-issue-candidates/.agentplane/tasks/202605211025-P8N5XR/blueprint/resolved-snapshot.json
    - old_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
    - current_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211025-P8N5XR

    ### 2026-05-21T10:41:26.006Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates, Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent when version surfaces already match, and observations harvest avoids loading the full task registry when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy routing, doctor, changed Verify Steps lint, and diff whitespace checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:41:15.485Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211025-P8N5XR-recent-issue-candidates/.agentplane/tasks/202605211025-P8N5XR/blueprint/resolved-snapshot.json
    - old_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
    - current_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605211025-P8N5XR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden recent issue candidates

Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.

## Scope

- In scope: Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.
- Out of scope: unrelated refactors not required for "Harden recent issue candidates".

## Plan

1. Reproduce or falsify each candidate from recent history using current source, open GitHub issues, and local commands. 2. Implement only confirmed repo-local fixes in one batch branch: routed CI prerequisite preflight, legacy Verify Steps migration/scope support, maximum-assimilation glossary content validation, release version-surface idempotency guard, and observations harvest fast path if measurable. 3. Add focused regression coverage for each changed behavior and keep existing public CLI surfaces stable. 4. Verify with task verify-show, focused tests for touched areas, typecheck/lint where scoped, policy routing, doctor, and task-specific CLI smokes. 5. Record rejected candidates as Findings with evidence instead of expanding scope.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T10:41:15.467Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/commands/task/observations.unit.test.ts packages/agentplane/src/commands/release/apply.mutation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts. Result: pass. Evidence: 76 pass, 0 fail, 281 expect calls. Scope: routed CI prerequisites, observations harvest shortcut, release mutation idempotency, maximum-assimilation glossary validation, and local CI routing tests. Command: bunx eslint touched source/test files. Result: pass. Evidence: no ESLint output after unicorn fixes. Scope: touched JS/TS files. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit. Result: pass. Scope: agentplane TS compile after framework bootstrap. Command: bun run docs:cli:check. Result: pass. Evidence: generated CLI reference unchanged. Scope: new task lint flag docs. Command: bun run workflows:lint. Result: pass. Evidence: workflow command contract, lifecycle parity, critical route OK. Scope: ci.yml outputs and routed prerequisites. Command: ap task lint --verify-steps-changed, ap doctor, node .agentplane/policy/check-routing.mjs, git diff --check. Result: pass. Scope: task lint rollout, runtime, policy, whitespace.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:26:10.732Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211025-P8N5XR-recent-issue-candidates/.agentplane/tasks/202605211025-P8N5XR/blueprint/resolved-snapshot.json
- old_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
- current_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211025-P8N5XR

### 2026-05-21T10:41:26.006Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates, Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent when version surfaces already match, and observations harvest avoids loading the full task registry when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy routing, doctor, changed Verify Steps lint, and diff whitespace checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T10:41:15.485Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211025-P8N5XR-recent-issue-candidates/.agentplane/tasks/202605211025-P8N5XR/blueprint/resolved-snapshot.json
- old_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
- current_digest: c4dad68254bd34b7aca89e0606ec5f39d2ba416800fd9ccea270ba7635b0e0c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605211025-P8N5XR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
