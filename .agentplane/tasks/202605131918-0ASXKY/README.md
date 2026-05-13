---
id: "202605131918-0ASXKY"
title: "Harden shared env root worktree detection"
result_summary: "Merged via PR #3668."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "sync"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T19:19:32.664Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T19:46:09.182Z"
  updated_by: "CODER"
  note: "Re-verified after fallback refinement: backend/CLI tests pass, changed-file ESLint passes, routing policy passes, doctor passed earlier after bootstrap."
  attempts: 0
commit:
  hash: "67311eb71d7905980127084fd27bceec11f31d96"
  message: "Fix shared env root detection for separate git dirs"
comments:
  -
    author: "CODER"
    body: "Start: Address PR #3662 review by making shared .env root detection independent of the repo-local .git/worktrees path layout."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3668 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T19:20:22.689Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Address PR #3662 review by making shared .env root detection independent of the repo-local .git/worktrees path layout."
  -
    type: "verify"
    at: "2026-05-13T19:43:22.202Z"
    author: "CODER"
    state: "ok"
    note: "Verified env root hardening with targeted backend/CLI tests, changed-file ESLint, routing policy, and doctor."
  -
    type: "verify"
    at: "2026-05-13T19:46:09.182Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after fallback refinement: backend/CLI tests pass, changed-file ESLint passes, routing policy passes, doctor passed earlier after bootstrap."
  -
    type: "status"
    at: "2026-05-13T20:46:19.408Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3668 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T20:46:19.414Z"
doc_updated_by: "INTEGRATOR"
description: "Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts."
sections:
  Summary: |-
    Harden shared env root worktree detection
    
    Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.
  Scope: |-
    - In scope: Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.
    - Out of scope: unrelated refactors not required for "Harden shared env root worktree detection".
  Plan: "1. Replace the string-slice .git/worktrees heuristic in resolveDotEnvRoot with a layout-independent Git-backed worktree root resolver. 2. Preserve the existing current-root behavior for normal checkouts and non-worktree repositories. 3. Add regression coverage for worktrees whose gitdir lives under a separate common git dir such as /tmp/repo.git/worktrees/name. 4. Run targeted backend/env tests plus lint/policy checks. 5. Publish a follow-up PR referencing PR #3662 review comment."
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Expected: shared root .env tests pass for normal and separate git-dir worktree layouts.
    2. Run bun run lint:core. Expected: ESLint passes for touched TypeScript.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    4. Run ap doctor. Expected: doctor OK or only pre-existing unrelated workspace drift is reported.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T19:43:22.202Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified env root hardening with targeted backend/CLI tests, changed-file ESLint, routing policy, and doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:20:22.689Z, excerpt_hash=sha256:4d4c749d2edbfc3576c40eda3956f7280f50e4a5f6ccb3f102278893d142febd
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131918-0ASXKY-harden-env-root/.agentplane/tasks/202605131918-0ASXKY/blueprint/resolved-snapshot.json
    - old_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
    - current_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131918-0ASXKY
    
    ### 2026-05-13T19:46:09.182Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after fallback refinement: backend/CLI tests pass, changed-file ESLint passes, routing policy passes, doctor passed earlier after bootstrap.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:43:22.218Z, excerpt_hash=sha256:4d4c749d2edbfc3576c40eda3956f7280f50e4a5f6ccb3f102278893d142febd
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131918-0ASXKY-harden-env-root/.agentplane/tasks/202605131918-0ASXKY/blueprint/resolved-snapshot.json
    - old_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
    - current_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131918-0ASXKY
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Full bun run lint:core was attempted twice but did not complete or emit diagnostics after a long wait; terminated to avoid leaving a stale eslint process.
      Impact: Repo-wide lint remains unconfirmed for this task; changed files pass ESLint directly.
      Resolution: Regression coverage passes for standard worktree and separate git-dir layouts.
    
    - Observation: Full bun run lint:core still did not complete during this session and was terminated without diagnostics.
      Impact: Repo-wide lint remains unconfirmed; task-local changed files are lint-clean.
      Resolution: Shared .env root resolution no longer depends only on repo-local .git/worktrees path slicing and covers separate git-dir worktree layouts.
id_source: "generated"
---
## Summary

Harden shared env root worktree detection

Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.

## Scope

- In scope: Address PR #3662 review feedback by resolving the shared .env root without assuming the repo-local .git/worktrees layout, including separate git-dir worktree layouts.
- Out of scope: unrelated refactors not required for "Harden shared env root worktree detection".

## Plan

1. Replace the string-slice .git/worktrees heuristic in resolveDotEnvRoot with a layout-independent Git-backed worktree root resolver. 2. Preserve the existing current-root behavior for normal checkouts and non-worktree repositories. 3. Add regression coverage for worktrees whose gitdir lives under a separate common git dir such as /tmp/repo.git/worktrees/name. 4. Run targeted backend/env tests plus lint/policy checks. 5. Publish a follow-up PR referencing PR #3662 review comment.

## Verify Steps

1. Run bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Expected: shared root .env tests pass for normal and separate git-dir worktree layouts.
2. Run bun run lint:core. Expected: ESLint passes for touched TypeScript.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
4. Run ap doctor. Expected: doctor OK or only pre-existing unrelated workspace drift is reported.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T19:43:22.202Z — VERIFY — ok

By: CODER

Note: Verified env root hardening with targeted backend/CLI tests, changed-file ESLint, routing policy, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:20:22.689Z, excerpt_hash=sha256:4d4c749d2edbfc3576c40eda3956f7280f50e4a5f6ccb3f102278893d142febd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131918-0ASXKY-harden-env-root/.agentplane/tasks/202605131918-0ASXKY/blueprint/resolved-snapshot.json
- old_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
- current_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131918-0ASXKY

### 2026-05-13T19:46:09.182Z — VERIFY — ok

By: CODER

Note: Re-verified after fallback refinement: backend/CLI tests pass, changed-file ESLint passes, routing policy passes, doctor passed earlier after bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:43:22.218Z, excerpt_hash=sha256:4d4c749d2edbfc3576c40eda3956f7280f50e4a5f6ccb3f102278893d142febd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131918-0ASXKY-harden-env-root/.agentplane/tasks/202605131918-0ASXKY/blueprint/resolved-snapshot.json
- old_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
- current_digest: 76d60ef4e010bb3a5c8e9203e1aa3daeafc33fbb3d3a067826808bc10e53a6f1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131918-0ASXKY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Full bun run lint:core was attempted twice but did not complete or emit diagnostics after a long wait; terminated to avoid leaving a stale eslint process.
  Impact: Repo-wide lint remains unconfirmed for this task; changed files pass ESLint directly.
  Resolution: Regression coverage passes for standard worktree and separate git-dir layouts.

- Observation: Full bun run lint:core still did not complete during this session and was terminated without diagnostics.
  Impact: Repo-wide lint remains unconfirmed; task-local changed files are lint-clean.
  Resolution: Shared .env root resolution no longer depends only on repo-local .git/worktrees path slicing and covers separate git-dir worktree layouts.
