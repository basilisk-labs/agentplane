---
id: "202605091534-C49NA0"
title: "Integrate atomic global reinstall helper"
result_summary: "Merged via PR #3514."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T15:34:20.111Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T15:35:55.417Z"
  updated_by: "CODER"
  note: "Runtime reinstall helper integration verified."
commit:
  hash: "fcbcf880e88dd07c0f5e0d9e9322db016dd98fbc"
  message: "Merge pull request #3514 from basilisk-labs/task/202605091534-C49NA0/runtime-reinstall-helper"
comments:
  -
    author: "CODER"
    body: "Start: integrate the existing runtime reinstall helper branch onto current main with focused release-contract and docs verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3514 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-09T15:34:32.941Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: integrate the existing runtime reinstall helper branch onto current main with focused release-contract and docs verification."
  -
    type: "verify"
    at: "2026-05-09T15:35:55.417Z"
    author: "CODER"
    state: "ok"
    note: "Runtime reinstall helper integration verified."
  -
    type: "status"
    at: "2026-05-09T15:39:19.499Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3514 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T15:39:19.506Z"
doc_updated_by: "INTEGRATOR"
description: "Integrate the existing local runtime-install-atomic branch changes into current main: make scripts/reinstall-global-agentplane.sh use an atomic npm link workflow, update release contract coverage, and align developer docs."
sections:
  Summary: |-
    Integrate atomic global reinstall helper
    
    Integrate the existing local runtime-install-atomic branch changes into current main: make scripts/reinstall-global-agentplane.sh use an atomic npm link workflow, update release contract coverage, and align developer docs.
  Scope: |-
    - In scope: Integrate the existing local runtime-install-atomic branch changes into current main: make scripts/reinstall-global-agentplane.sh use an atomic npm link workflow, update release contract coverage, and align developer docs.
    - Out of scope: unrelated refactors not required for "Integrate atomic global reinstall helper".
  Plan: |-
    Plan:
    1. Start a dedicated branch_pr worktree for the runtime reinstall helper integration.
    2. Cherry-pick the existing local DM5JTS runtime-install-atomic commit onto current main.
    3. Resolve any drift against current release-contract tests and docs.
    4. Verify the focused release CI contract test, typecheck, and fast policy/docs checks.
    5. Open and merge the PR, then finish the task and remove the stale local branch/worktree if safe.
    
    Acceptance:
    - scripts/reinstall-global-agentplane.sh uses an atomic local npm link workflow and avoids rebuilding @agentplane/testkit.
    - release-ci-contract has explicit coverage for the reinstall helper's minimal runtime build path.
    - developer docs describe the helper accurately.
    - current main contains the integrated change and no stale DOING/TODO tasks remain.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T15:35:55.417Z — VERIFY — ok
    
    By: CODER
    
    Note: Runtime reinstall helper integration verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T15:34:32.961Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts --pool=forks --maxWorkers 2 --testTimeout 120000 --hookTimeout 120000 | Result: pass | Evidence: 8 tests passed. Scope: release CI contract and reinstall helper expectations.
    Command: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.
    Command: bunx eslint scripts/reinstall-global-agentplane.sh packages/agentplane/src/commands/release/release-ci-contract.test.ts docs/developer/testing-and-quality.mdx | Result: pass | Evidence: no errors; markdown/shell files were ignored by eslint config with warnings. Scope: touched lintable TypeScript path plus config behavior.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091534-C49NA0-runtime-reinstall-helper/.agentplane/tasks/202605091534-C49NA0/blueprint/resolved-snapshot.json
    - old_digest: e2aa4530a91440f132fb460b34bbc5f3e8499caf822b86dfbecf0b545bd7052d
    - current_digest: e2aa4530a91440f132fb460b34bbc5f3e8499caf822b86dfbecf0b545bd7052d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091534-C49NA0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
