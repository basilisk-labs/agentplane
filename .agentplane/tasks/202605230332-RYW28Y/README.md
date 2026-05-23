---
id: "202605230332-RYW28Y"
title: "Route agent context guidance through task brief"
result_summary: "Merged via PR #4068."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "docs"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T03:32:35.572Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T03:34:58.864Z"
  updated_by: "EVALUATOR"
  note: "Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and task-scope/knip gates passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T03:34:58.864Z"
  updated_by: "EVALUATOR"
  note: "Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and task-scope/knip gates passed."
  evaluated_sha: "3274991623f39a44756290af3456faf1528dfe78"
  blueprint_digest: "5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72"
  evidence_refs:
    - ".agentplane/tasks/202605230332-RYW28Y/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230332-RYW28Y-agent-context-guidance/.agentplane/tasks/202605230332-RYW28Y/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "7d5b81ff1f5e74ecebf0f62d3832231aacf8402f"
  message: "Merge pull request #4068 from basilisk-labs/task/202605230332-RYW28Y/agent-context-guidance"
comments:
  -
    author: "CODER"
    body: "Start: implement runtime guidance routing through task active and task brief context surfaces."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4068 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T03:33:00.945Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement runtime guidance routing through task active and task brief context surfaces."
  -
    type: "verify"
    at: "2026-05-23T03:34:55.153Z"
    author: "CODER"
    state: "ok"
    note: "Verified: command-guide tests, docs bootstrap/cli/onboarding/IA checks, typecheck, lint, format, policy routing, knip, task-scope, and framework bootstrap passed."
  -
    type: "verify"
    at: "2026-05-23T03:34:58.864Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and task-scope/knip gates passed."
  -
    type: "status"
    at: "2026-05-23T03:42:05.654Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4068 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T03:42:05.662Z"
doc_updated_by: "INTEGRATOR"
description: "Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching."
sections:
  Summary: |-
    Route agent context guidance through task brief

    Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.
  Scope: |-
    - In scope: Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.
    - Out of scope: unrelated refactors not required for "Route agent context guidance through task brief".
  Plan: "Implement the runtime/source side of routing agent guidance through context surfaces: add task active/brief canonical invocations, update quickstart/role/bootstrap renderers, regenerate bootstrap docs, align onboarding checks, and verify generated/docs/help surfaces."
  Verify Steps: |-
    PLANNER fallback scaffold for "Route agent context guidance through task brief". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Route agent context guidance through task brief". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T03:34:55.153Z — VERIFY — ok

    By: CODER

    Note: Verified: command-guide tests, docs bootstrap/cli/onboarding/IA checks, typecheck, lint, format, policy routing, knip, task-scope, and framework bootstrap passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:33:00.945Z, excerpt_hash=sha256:940f2526aed4f91352fe48f160f96f531fe18942bb2bbea419989ef5ea1ff5b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230332-RYW28Y-agent-context-guidance/.agentplane/tasks/202605230332-RYW28Y/blueprint/resolved-snapshot.json
    - old_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
    - current_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230332-RYW28Y

    ### 2026-05-23T03:34:58.864Z — VERIFY — ok

    By: EVALUATOR

    Note: Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and task-scope/knip gates passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:34:55.180Z, excerpt_hash=sha256:940f2526aed4f91352fe48f160f96f531fe18942bb2bbea419989ef5ea1ff5b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230332-RYW28Y-agent-context-guidance/.agentplane/tasks/202605230332-RYW28Y/blueprint/resolved-snapshot.json
    - old_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
    - current_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230332-RYW28Y

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Quickstart and role guidance forced agents to stitch task list/show/verify/pr route state manually before task active and task brief existed as context surfaces.
      Impact: Agents could choose the wrong next task or miss route/source-confidence context, slowing backlog execution and increasing lifecycle drift risk.
      Resolution: Route preflight, quickstart, role supplements, generated bootstrap docs, and onboarding checks through task active and task brief before low-level route/recovery commands.
id_source: "generated"
---
## Summary

Route agent context guidance through task brief

Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.

## Scope

- In scope: Update installed quickstart, role supplements, generated bootstrap docs, and onboarding checks so agents use task active and task brief before low-level route/recovery command stitching.
- Out of scope: unrelated refactors not required for "Route agent context guidance through task brief".

## Plan

Implement the runtime/source side of routing agent guidance through context surfaces: add task active/brief canonical invocations, update quickstart/role/bootstrap renderers, regenerate bootstrap docs, align onboarding checks, and verify generated/docs/help surfaces.

## Verify Steps

PLANNER fallback scaffold for "Route agent context guidance through task brief". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Route agent context guidance through task brief". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T03:34:55.153Z — VERIFY — ok

By: CODER

Note: Verified: command-guide tests, docs bootstrap/cli/onboarding/IA checks, typecheck, lint, format, policy routing, knip, task-scope, and framework bootstrap passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:33:00.945Z, excerpt_hash=sha256:940f2526aed4f91352fe48f160f96f531fe18942bb2bbea419989ef5ea1ff5b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230332-RYW28Y-agent-context-guidance/.agentplane/tasks/202605230332-RYW28Y/blueprint/resolved-snapshot.json
- old_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
- current_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230332-RYW28Y

### 2026-05-23T03:34:58.864Z — VERIFY — ok

By: EVALUATOR

Note: Review: code scope owns the runtime renderer/checker changes; all focused docs/guidance checks and task-scope/knip gates passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:34:55.180Z, excerpt_hash=sha256:940f2526aed4f91352fe48f160f96f531fe18942bb2bbea419989ef5ea1ff5b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230332-RYW28Y-agent-context-guidance/.agentplane/tasks/202605230332-RYW28Y/blueprint/resolved-snapshot.json
- old_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
- current_digest: 5ff0ba4385614d524ec1079310fba0379e940c8c92b5b4421004afe6df1f7f72
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230332-RYW28Y

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Quickstart and role guidance forced agents to stitch task list/show/verify/pr route state manually before task active and task brief existed as context surfaces.
  Impact: Agents could choose the wrong next task or miss route/source-confidence context, slowing backlog execution and increasing lifecycle drift risk.
  Resolution: Route preflight, quickstart, role supplements, generated bootstrap docs, and onboarding checks through task active and task brief before low-level route/recovery commands.
