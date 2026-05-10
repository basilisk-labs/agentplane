---
id: "202605100836-6472VE"
title: "Pre-v0.5: split commit allowlist and Git index error taxonomy"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100836-76DX16"
tags:
  - "diagnostics"
  - "git"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Unit tests cover each new error code and message fields."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:36:58.410Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T12:27:46.969Z"
  updated_by: "CODER"
  note: "Verified split error taxonomy for commit allowlist and Git staging failures."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split commit allowlist and Git index error taxonomy into distinct CLI error codes and diagnostics."
  -
    author: "CODER"
    body: "Start: split commit allowlist and Git index error taxonomy into distinct CLI error codes and diagnostics."
events:
  -
    type: "status"
    at: "2026-05-10T12:17:39.041Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split commit allowlist and Git index error taxonomy into distinct CLI error codes and diagnostics."
  -
    type: "status"
    at: "2026-05-10T12:17:56.752Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: split commit allowlist and Git index error taxonomy into distinct CLI error codes and diagnostics."
  -
    type: "verify"
    at: "2026-05-10T12:27:46.969Z"
    author: "CODER"
    state: "ok"
    note: "Verified split error taxonomy for commit allowlist and Git staging failures."
doc_version: 3
doc_updated_at: "2026-05-10T12:27:46.996Z"
doc_updated_by: "CODER"
description: "Add distinct errors for empty allow scope, no allow match, task-artifact denial, locked index, permission failure, race, and stage failure; ensure each reports what happened, where, and safe retry/remediation."
sections:
  Summary: |-
    Pre-v0.5: split commit allowlist and Git index error taxonomy
    
    Add distinct errors for empty allow scope, no allow match, task-artifact denial, locked index, permission failure, race, and stage failure; ensure each reports what happened, where, and safe retry/remediation.
  Scope: |-
    - In scope: Add distinct errors for empty allow scope, no allow match, task-artifact denial, locked index, permission failure, race, and stage failure; ensure each reports what happened, where, and safe retry/remediation.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: split commit allowlist and Git index error taxonomy".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100836-76DX16. Acceptance: Unit tests cover each new error code and message fields.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: split commit allowlist and Git index error taxonomy". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T12:27:46.969Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified split error taxonomy for commit allowlist and Git staging failures.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T12:17:56.832Z, excerpt_hash=sha256:61b7e049043a9517a08e1e1a1599046bdb001d847fd77ee9469e28cef4277d56
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100836-6472VE-error-taxonomy/.agentplane/tasks/202605100836-6472VE/blueprint/resolved-snapshot.json
    - old_digest: f75dc6dc6c0a502106a7c32c680b74f1d38a5316e2a5e37a6679f4a61883cf84
    - current_digest: f75dc6dc6c0a502106a7c32c680b74f1d38a5316e2a5e37a6679f4a61883cf84
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100836-6472VE
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Targeted tests cover E_COMMIT_ALLOW_EMPTY, E_COMMIT_ALLOW_NO_MATCH, E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED, E_GIT_LOCKED, E_GIT_PERMISSION, E_GIT_RACE, and E_GIT_STAGE_FAILED.
      Impact: CLI callers can distinguish allowlist usage failures from Git index permission/race/stage failures while preserving usage/git exit classes.
      Resolution: Ran allow/exit/commit guard tests, type-file guard, Prettier, lint, and policy routing.
id_source: "generated"
---
