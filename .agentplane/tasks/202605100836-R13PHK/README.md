---
id: "202605100836-R13PHK"
title: "Pre-v0.5: add Git mutation kind diagnostics type"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100836-NKKQEH"
tags:
  - "diagnostics"
  - "git"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Typecheck passes and at least one commit/stage diagnostic path carries mutation kind metadata."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:36:49.130Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T10:26:01.602Z"
  updated_by: "CODER"
  note: "Verified GitMutationKind diagnostics type and staging metadata path."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add internal GitMutationKind diagnostics vocabulary without behavior changes."
events:
  -
    type: "status"
    at: "2026-05-10T10:21:30.554Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add internal GitMutationKind diagnostics vocabulary without behavior changes."
  -
    type: "verify"
    at: "2026-05-10T10:26:01.602Z"
    author: "CODER"
    state: "ok"
    note: "Verified GitMutationKind diagnostics type and staging metadata path."
doc_version: 3
doc_updated_at: "2026-05-10T10:26:01.608Z"
doc_updated_by: "CODER"
description: "Introduce a GitMutationKind type for implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check. Use it initially for diagnostics/logging without behavior changes."
sections:
  Summary: |-
    Pre-v0.5: add Git mutation kind diagnostics type
    
    Introduce a GitMutationKind type for implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check. Use it initially for diagnostics/logging without behavior changes.
  Scope: |-
    - In scope: Introduce a GitMutationKind type for implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check. Use it initially for diagnostics/logging without behavior changes.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: add Git mutation kind diagnostics type".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100836-NKKQEH. Acceptance: Typecheck passes and at least one commit/stage diagnostic path carries mutation kind metadata.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: add Git mutation kind diagnostics type". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T10:26:01.602Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified GitMutationKind diagnostics type and staging metadata path.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T10:21:30.564Z, excerpt_hash=sha256:af2885dc4405fb341d03470f3b319c8ce6d2fac039a4da814a5a303983a92d4e
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100836-R13PHK-git-mutation-kind/.agentplane/tasks/202605100836-R13PHK/blueprint/resolved-snapshot.json
    - old_digest: e0df736e70ab54b197b697768ab7a629bdc0c2d668b9ca1c4685a9120df94f54
    - current_digest: e0df736e70ab54b197b697768ab7a629bdc0c2d668b9ca1c4685a9120df94f54
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100836-R13PHK
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added shared GitMutationKind vocabulary and passed mutation kind metadata through stageAllowlist diagnostics for lifecycle, implementation, PR-artifact, and close-tail commit paths. Checks: check:types-files for touched files, Vitest agentplane allow.test.ts, Prettier check, lint:core, policy routing, ap doctor.
      Impact: Commit/stage diagnostics can now classify the internal Git mutation kind without changing runtime behavior.
      Resolution: Ready for PR review and merge.
id_source: "generated"
---
