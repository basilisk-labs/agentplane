---
id: "202605311543-0VPDRD"
title: "Support finish closure branches in branch_pr"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "closeout"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:46.453Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:09:41.614Z"
  updated_by: "CODER"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:44.361Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1"
  evidence_refs:
    - ".agentplane/tasks/202605311543-0VPDRD/README.md"
    - ".agentplane/tasks/202605311543-0VPDRD/quality/20260531-160744361-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-0VPDRD/quality/20260531-160744361-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-0VPDRD/quality/20260531-160744361-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-0VPDRD/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit c7c33342a addresses the approved task scope; targeted typecheck, formatting, policy, agents, route decision, cleanup, evaluator, PR open/lifecycle, and help snapshot checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:29.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:19.735Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:41.614Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
doc_version: 3
doc_updated_at: "2026-05-31T16:09:41.640Z"
doc_updated_by: "CODER"
description: "Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout."
sections:
  Summary: |-
    Support finish closure branches in branch_pr

    Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
  Scope: |-
    - In scope: Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
    - Out of scope: unrelated refactors not required for "Support finish closure branches in branch_pr".
  Plan: |-
    1. Reproduce branch_pr finish attempts from non-base and base dirty states.
    2. Add closure-branch support or precise recovery hints for metadata-only closeout.
    3. Preserve existing base-branch protections and close-commit behavior.
    4. Verify command help, branch_pr lifecycle tests, and release task checks.
  Verify Steps: |-
    PLANNER fallback scaffold for "Support finish closure branches in branch_pr". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Support finish closure branches in branch_pr". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:19.735Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:29.809Z, excerpt_hash=sha256:e51170fb2f2b2b830e92a8d1940b6dc8d42f2c892309aa3319bc6737fccc519e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-0VPDRD/blueprint/resolved-snapshot.json
    - old_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
    - current_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-0VPDRD

    ### 2026-05-31T16:09:41.614Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:19.761Z, excerpt_hash=sha256:e51170fb2f2b2b830e92a8d1940b6dc8d42f2c892309aa3319bc6737fccc519e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-0VPDRD/blueprint/resolved-snapshot.json
    - old_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
    - current_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-0VPDRD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Support finish closure branches in branch_pr

Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.

## Scope

- In scope: Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
- Out of scope: unrelated refactors not required for "Support finish closure branches in branch_pr".

## Plan

1. Reproduce branch_pr finish attempts from non-base and base dirty states.
2. Add closure-branch support or precise recovery hints for metadata-only closeout.
3. Preserve existing base-branch protections and close-commit behavior.
4. Verify command help, branch_pr lifecycle tests, and release task checks.

## Verify Steps

PLANNER fallback scaffold for "Support finish closure branches in branch_pr". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Support finish closure branches in branch_pr". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:19.735Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:29.809Z, excerpt_hash=sha256:e51170fb2f2b2b830e92a8d1940b6dc8d42f2c892309aa3319bc6737fccc519e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-0VPDRD/blueprint/resolved-snapshot.json
- old_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
- current_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-0VPDRD

### 2026-05-31T16:09:41.614Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:19.761Z, excerpt_hash=sha256:e51170fb2f2b2b830e92a8d1940b6dc8d42f2c892309aa3319bc6737fccc519e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-0VPDRD/blueprint/resolved-snapshot.json
- old_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
- current_digest: 21fc0b80fadb288568acfa36d27e0d02b6d2612123323c1ad133185191aa78c1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-0VPDRD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
