---
id: "202605100837-X33YYQ"
title: "Pre-v0.5: guard against AgentPlane-owned writes to .git index.lock"
result_summary: "Merged via PR #3561."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100836-6472VE"
tags:
  - "git"
  - "locks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Search/test proves no AgentPlane code creates .git/**/index.lock as an application lock."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:00.809Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T15:27:59.599Z"
  updated_by: "CODER"
  note: "Added a tracked guard test that scans packages/scripts/.github plus the Git mutation model for index.lock occurrences, allows only documented/read-only/fake-lock regression locations, and rejects write-intent outside the E_GIT_LOCKED fixture. Checks passed: targeted Vitest guard+allow tests, prettier check, direct eslint for new test, policy routing."
  attempts: 0
commit:
  hash: "89ed683c95ba8be474467dc489faa2ba6fec220a"
  message: "Merge pull request #3561 from basilisk-labs/task/202605100837-X33YYQ/index-lock-guard"
comments:
  -
    author: "CODER"
    body: "Start: audit manual index.lock writes and add a regression guard preventing AgentPlane-owned .git index.lock usage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3561 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-10T15:20:24.884Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit manual index.lock writes and add a regression guard preventing AgentPlane-owned .git index.lock usage."
  -
    type: "verify"
    at: "2026-05-10T15:27:59.599Z"
    author: "CODER"
    state: "ok"
    note: "Added a tracked guard test that scans packages/scripts/.github plus the Git mutation model for index.lock occurrences, allows only documented/read-only/fake-lock regression locations, and rejects write-intent outside the E_GIT_LOCKED fixture. Checks passed: targeted Vitest guard+allow tests, prettier check, direct eslint for new test, policy routing."
  -
    type: "status"
    at: "2026-05-10T15:36:45.187Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3561 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-10T15:36:45.194Z"
doc_updated_by: "INTEGRATOR"
description: "Audit code, hooks, wrappers, and generated scripts for manual .git/**/index.lock use. Replace any AgentPlane lock usage with .agentplane/cache/locks and add a guard test forbidding new manual index.lock writes."
sections:
  Summary: |-
    Pre-v0.5: guard against AgentPlane-owned writes to .git index.lock
    
    Audit code, hooks, wrappers, and generated scripts for manual .git/**/index.lock use. Replace any AgentPlane lock usage with .agentplane/cache/locks and add a guard test forbidding new manual index.lock writes.
  Scope: |-
    - In scope: Audit code, hooks, wrappers, and generated scripts for manual .git/**/index.lock use. Replace any AgentPlane lock usage with .agentplane/cache/locks and add a guard test forbidding new manual index.lock writes.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: guard against AgentPlane-owned writes to .git index.lock".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100836-6472VE. Acceptance: Search/test proves no AgentPlane code creates .git/**/index.lock as an application lock.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: guard against AgentPlane-owned writes to .git index.lock". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T15:27:59.599Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a tracked guard test that scans packages/scripts/.github plus the Git mutation model for index.lock occurrences, allows only documented/read-only/fake-lock regression locations, and rejects write-intent outside the E_GIT_LOCKED fixture. Checks passed: targeted Vitest guard+allow tests, prettier check, direct eslint for new test, policy routing.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T15:20:24.894Z, excerpt_hash=sha256:1dc0fffc66a407c7566753bb783b8cf8aa4cc04696f4ac26877ca868722aa67c
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-X33YYQ-index-lock-guard/.agentplane/tasks/202605100837-X33YYQ/blueprint/resolved-snapshot.json
    - old_digest: 606dc6e599edfa5fafde057a1c4c2f52e3056a32a44d1da815296b6c3d4ce72b
    - current_digest: 606dc6e599edfa5fafde057a1c4c2f52e3056a32a44d1da815296b6c3d4ce72b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-X33YYQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: No production code, hooks, wrappers, or scripts write .git/**/index.lock; the only write is the allow.test.ts fake lock fixture for E_GIT_LOCKED.
      Impact: Future AgentPlane-owned lock paths cannot silently regress to Git index.lock usage.
      Resolution: Use AgentPlane-owned locks under .agentplane/cache/locks/ for application mutexes and reserve .git/**/index.lock for Git-owned lock diagnostics.
id_source: "generated"
---
