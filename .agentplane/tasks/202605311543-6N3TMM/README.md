---
id: "202605311543-6N3TMM"
title: "Split implementation and closure commit metadata"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "release"
  - "task-model"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:49.158Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:09:48.207Z"
  updated_by: "CODER"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:50.413Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139"
  evidence_refs:
    - ".agentplane/tasks/202605311543-6N3TMM/README.md"
    - ".agentplane/tasks/202605311543-6N3TMM/quality/20260531-160750413-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-6N3TMM/quality/20260531-160750413-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-6N3TMM/quality/20260531-160750413-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-6N3TMM/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit c7c33342a addresses the approved task scope; targeted typecheck, formatting, policy, agents, route decision, cleanup, evaluator, PR open/lifecycle, and help snapshot checks passed."
commit:
  hash: "6da8e6202c2182ddb437feca9d15caafcac855d2"
  message: "Merge pull request #4332 from basilisk-labs/task/202605311543-KS7B7N/release-recovery-cli-improvements"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4332 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:31.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:26.043Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:48.207Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  -
    type: "status"
    at: "2026-05-31T17:36:37.263Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4332 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-31T17:36:37.265Z"
doc_updated_by: "INTEGRATOR"
description: "Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings."
sections:
  Summary: |-
    Split implementation and closure commit metadata

    Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
  Scope: |-
    - In scope: Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
    - Out of scope: unrelated refactors not required for "Split implementation and closure commit metadata".
  Plan: |-
    1. Audit current task metadata fields and finish/evaluator consumers for commit semantics.
    2. Introduce separate implementation and closure evidence commit fields or an equivalent backward-compatible representation.
    3. Update finish, release checks, task README rendering, and migration/readback behavior.
    4. Verify old tasks remain readable and release checks distinguish the two commit meanings.
  Verify Steps: |-
    PLANNER fallback scaffold for "Split implementation and closure commit metadata". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Split implementation and closure commit metadata". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:26.043Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:31.121Z, excerpt_hash=sha256:2cff9b3db90548a0e34883ba939b164e8c910de331752ada0ed31b12ec730575

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-6N3TMM/blueprint/resolved-snapshot.json
    - old_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
    - current_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-6N3TMM

    ### 2026-05-31T16:09:48.207Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:26.076Z, excerpt_hash=sha256:2cff9b3db90548a0e34883ba939b164e8c910de331752ada0ed31b12ec730575

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-6N3TMM/blueprint/resolved-snapshot.json
    - old_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
    - current_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-6N3TMM

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605311543-KS7B7N/release-recovery-cli-improvements"
    included_task_ids:
      - "202605311543-0VPDRD"
      - "202605311543-3H1G55"
      - "202605311543-6N3TMM"
      - "202605311543-NWXTSG"
      - "202605311543-QH9XXK"
      - "202605311543-R282E5"
      - "202605311543-SCWWPR"
      - "202605311543-SEMKC7"
    primary_task_id: "202605311543-KS7B7N"
    role: "included"
    updated_at: "2026-05-31T16:24:35.209Z"
id_source: "generated"
---
## Summary

Split implementation and closure commit metadata

Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.

## Scope

- In scope: Model implementation commit evidence separately from evaluator or closure commit evidence so included task finish records do not overload one --commit value with two meanings.
- Out of scope: unrelated refactors not required for "Split implementation and closure commit metadata".

## Plan

1. Audit current task metadata fields and finish/evaluator consumers for commit semantics.
2. Introduce separate implementation and closure evidence commit fields or an equivalent backward-compatible representation.
3. Update finish, release checks, task README rendering, and migration/readback behavior.
4. Verify old tasks remain readable and release checks distinguish the two commit meanings.

## Verify Steps

PLANNER fallback scaffold for "Split implementation and closure commit metadata". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Split implementation and closure commit metadata". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:26.043Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:31.121Z, excerpt_hash=sha256:2cff9b3db90548a0e34883ba939b164e8c910de331752ada0ed31b12ec730575

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-6N3TMM/blueprint/resolved-snapshot.json
- old_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
- current_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-6N3TMM

### 2026-05-31T16:09:48.207Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:26.076Z, excerpt_hash=sha256:2cff9b3db90548a0e34883ba939b164e8c910de331752ada0ed31b12ec730575

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-6N3TMM/blueprint/resolved-snapshot.json
- old_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
- current_digest: b3ce78a290c213c16ca43a5f77a60f0a8701b720f14537e072b2b70b6fd04139
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-6N3TMM

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
