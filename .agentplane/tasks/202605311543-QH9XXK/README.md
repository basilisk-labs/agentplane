---
id: "202605311543-QH9XXK"
title: "Codify branch_pr release recovery prompt rules"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "docs"
  - "prompt-policy"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "bun run agents:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:52.980Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:10:01.669Z"
  updated_by: "DOCS"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:08:03.417Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a"
  evidence_refs:
    - ".agentplane/tasks/202605311543-QH9XXK/README.md"
    - ".agentplane/tasks/202605311543-QH9XXK/quality/20260531-160803417-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-QH9XXK/quality/20260531-160803417-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-QH9XXK/quality/20260531-160803417-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-QH9XXK/blueprint/resolved-snapshot.json"
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
    at: "2026-05-31T15:53:33.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:39.204Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:10:01.669Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
doc_version: 3
doc_updated_at: "2026-05-31T16:10:01.698Z"
doc_updated_by: "CODER"
description: "Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge."
sections:
  Summary: |-
    Codify branch_pr release recovery prompt rules

    Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
  Scope: |-
    - In scope: Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
    - Out of scope: unrelated refactors not required for "Codify branch_pr release recovery prompt rules".
  Plan: |-
    1. Identify the agent-facing policy or prompt surface that governs branch_pr release recovery.
    2. Add concise rules for route classification, GitHub truth, markdown body files, dirty cleanup preservation, and ap integrate before direct gh merge.
    3. Keep repository artifacts in English and within policy size budgets.
    4. Verify check-routing and agents checks.
  Verify Steps: |-
    PLANNER fallback scaffold for "Codify branch_pr release recovery prompt rules". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Codify branch_pr release recovery prompt rules". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:39.204Z — VERIFY — ok

    By: DOCS

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:33.718Z, excerpt_hash=sha256:3b099fafc6831e5e6990af442b0d7a955ebfba673c3d2865fd367900a2ffdc4c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-QH9XXK/blueprint/resolved-snapshot.json
    - old_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
    - current_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-QH9XXK

    ### 2026-05-31T16:10:01.669Z — VERIFY — ok

    By: DOCS

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:39.230Z, excerpt_hash=sha256:3b099fafc6831e5e6990af442b0d7a955ebfba673c3d2865fd367900a2ffdc4c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-QH9XXK/blueprint/resolved-snapshot.json
    - old_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
    - current_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-QH9XXK

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Codify branch_pr release recovery prompt rules

Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.

## Scope

- In scope: Add or update agent-facing prompt/policy guidance for release recovery: classify route before mutation, use GitHub truth, pass markdown bodies by file, preserve dirty cleanup state, and use ap integrate before direct gh merge.
- Out of scope: unrelated refactors not required for "Codify branch_pr release recovery prompt rules".

## Plan

1. Identify the agent-facing policy or prompt surface that governs branch_pr release recovery.
2. Add concise rules for route classification, GitHub truth, markdown body files, dirty cleanup preservation, and ap integrate before direct gh merge.
3. Keep repository artifacts in English and within policy size budgets.
4. Verify check-routing and agents checks.

## Verify Steps

PLANNER fallback scaffold for "Codify branch_pr release recovery prompt rules". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Codify branch_pr release recovery prompt rules". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:39.204Z — VERIFY — ok

By: DOCS

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:33.718Z, excerpt_hash=sha256:3b099fafc6831e5e6990af442b0d7a955ebfba673c3d2865fd367900a2ffdc4c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-QH9XXK/blueprint/resolved-snapshot.json
- old_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
- current_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-QH9XXK

### 2026-05-31T16:10:01.669Z — VERIFY — ok

By: DOCS

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:39.230Z, excerpt_hash=sha256:3b099fafc6831e5e6990af442b0d7a955ebfba673c3d2865fd367900a2ffdc4c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-QH9XXK/blueprint/resolved-snapshot.json
- old_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
- current_digest: f254ba4af84dd3316eca590135a28e6d32187c95ac7dcc2ee75dda72bef9bf3a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-QH9XXK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
