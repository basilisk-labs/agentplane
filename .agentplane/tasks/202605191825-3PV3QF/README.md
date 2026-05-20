---
id: "202605191825-3PV3QF"
title: "Split GitHub PR verification into routed parallel gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T18:25:54.020Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T05:15:29.305Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after formatting the recovery contract test; format:check, workflows:lint, and focused workflow contract test passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T05:15:29.305Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after formatting the recovery contract test; format:check, workflows:lint, and focused workflow contract test passed."
  evaluated_sha: "cc3e17188adc6d3cbe3014e96d8788611b5819ce"
  blueprint_digest: "4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b"
  evidence_refs:
    - ".agentplane/tasks/202605191825-3PV3QF/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement routed GitHub PR verification by reusing the existing local CI selector, splitting Core CI into clearer parallel jobs, adding a stable aggregate gate, and preserving release-ready behavior."
events:
  -
    type: "status"
    at: "2026-05-19T18:26:31.498Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement routed GitHub PR verification by reusing the existing local CI selector, splitting Core CI into clearer parallel jobs, adding a stable aggregate gate, and preserving release-ready behavior."
  -
    type: "verify"
    at: "2026-05-19T18:33:52.281Z"
    author: "CODER"
    state: "ok"
    note: "Verified routed GitHub CI changes locally: workflows:command-check, policy routing, workflow bucket route explanation, git diff --check, full ci:local:fast for .github/workflows/ci.yml, and aggregate/release-ready workflow structure inspection all passed."
  -
    type: "verify"
    at: "2026-05-19T18:34:58.434Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR pass: approved CI-routing scope is satisfied by commit a67500fdb; Verify Steps are backed by local command evidence; residual deployment risk is limited to updating GitHub branch protection to require Core CI / PR verification after this workflow lands."
  -
    type: "verify"
    at: "2026-05-19T19:09:55.357Z"
    author: "CODER"
    state: "ok"
    note: "Implemented split GitHub PR verification gates and confirmed hosted Core CI aggregate PR verification passes on head 92cdffa0984fe37610ee41caeef8d57d46951075."
  -
    type: "verify"
    at: "2026-05-19T19:10:08.635Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Hosted PR verification confirmed on GitHub for head 92cdffa0984fe37610ee41caeef8d57d46951075: split Core CI gates, test-windows, Release-ready manifest, and PR verification all succeeded."
  -
    type: "verify"
    at: "2026-05-20T04:55:14.550Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for integration target 8e58c020032e43817562363a7ae53604e96c3871; hosted GitHub PR verification later confirmed on b5108eed4 with Core CI / PR verification success."
  -
    type: "verify"
    at: "2026-05-20T05:08:45.986Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after preserving workflow_dispatch exact-sha recovery planning path; focused workflow checks and contract test passed."
  -
    type: "verify"
    at: "2026-05-20T05:15:29.305Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after formatting the recovery contract test; format:check, workflows:lint, and focused workflow contract test passed."
doc_version: 3
doc_updated_at: "2026-05-20T05:15:29.337Z"
doc_updated_by: "CODER"
description: "Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows."
sections:
  Summary: |-
    Split GitHub PR verification into routed parallel gates

    Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.
  Scope: |-
    - In scope: Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.
    - Out of scope: unrelated refactors not required for "Split GitHub PR verification into routed parallel gates".
  Plan: |-
    1. Reuse the existing local CI changed-file selector from GitHub by adding a plan job that emits route/bucket outputs.
    2. Split Core CI PR verification into independent jobs for contract, static analysis, unit tests, CLI critical tests, workflow checks, coverage, Windows platform checks, and release-ready manifest.
    3. Add a stable aggregate PR verification job that succeeds only when the route-required jobs pass and skipped jobs are intentional.
    4. Add Bun artifact caching to Windows setup.
    5. Verify workflow syntax/contract and local routing behavior without widening release scope.
  Verify Steps: |-
    - `bun run workflows:command-check` passes.
    - `node .agentplane/policy/check-routing.mjs` passes.
    - `AGENTPLANE_FAST_CHANGED_FILES=.github/workflows/ci.yml node scripts/checks/run-local-ci.mjs --mode smoke --explain` shows the workflow bucket is classified as `targeted (workflow)`.
    - `git diff --check` passes.
    - `bun run ci:local:fast -- --changed-files .github/workflows/ci.yml` passes.
    - The GitHub workflow defines one stable aggregate PR gate and preserves release-ready behavior for core changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T18:33:52.281Z — VERIFY — ok

    By: CODER

    Note: Verified routed GitHub CI changes locally: workflows:command-check, policy routing, workflow bucket route explanation, git diff --check, full ci:local:fast for .github/workflows/ci.yml, and aggregate/release-ready workflow structure inspection all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:33:21.802Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-19T18:34:58.434Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR pass: approved CI-routing scope is satisfied by commit a67500fdb; Verify Steps are backed by local command evidence; residual deployment risk is limited to updating GitHub branch protection to require Core CI / PR verification after this workflow lands.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:33:52.313Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-19T19:09:55.357Z — VERIFY — ok

    By: CODER

    Note: Implemented split GitHub PR verification gates and confirmed hosted Core CI aggregate PR verification passes on head 92cdffa0984fe37610ee41caeef8d57d46951075.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:34:58.469Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-19T19:10:08.635Z — VERIFY — ok

    By: EVALUATOR

    Note: Hosted PR verification confirmed on GitHub for head 92cdffa0984fe37610ee41caeef8d57d46951075: split Core CI gates, test-windows, Release-ready manifest, and PR verification all succeeded.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T19:09:55.389Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-20T04:55:14.550Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for integration target 8e58c020032e43817562363a7ae53604e96c3871; hosted GitHub PR verification later confirmed on b5108eed4 with Core CI / PR verification success.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T19:10:08.665Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-20T05:08:45.986Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after preserving workflow_dispatch exact-sha recovery planning path; focused workflow checks and contract test passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T04:55:14.582Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    ### 2026-05-20T05:15:29.305Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after formatting the recovery contract test; format:check, workflows:lint, and focused workflow contract test passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T05:08:46.017Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
    - old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Core CI now has a plan job, routed non-full path, parallel full-fast verification jobs, Windows Bun cache, release-ready dependency preservation, and one PR verification aggregate job.
      Impact: PR verification should expose a single stable merge gate while running independent full checks in parallel and keeping targeted/doc routes shorter.
      Resolution: Branch protection must be updated to require Core CI / PR verification instead of the old Core CI / test and Core CI / test-windows checks after this workflow lands.

    - Observation: Reviewed changed workflow/script surfaces and recorded command evidence from CODER verification.
      Impact: The implementation is ready for PR publication; hosted GitHub checks remain the external confirmation for the new aggregate gate.
      Resolution: Proceed to PR open/update and then adjust branch protection once the new check exists on GitHub.
id_source: "generated"
---
## Summary

Split GitHub PR verification into routed parallel gates

Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.

## Scope

- In scope: Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.
- Out of scope: unrelated refactors not required for "Split GitHub PR verification into routed parallel gates".

## Plan

1. Reuse the existing local CI changed-file selector from GitHub by adding a plan job that emits route/bucket outputs.
2. Split Core CI PR verification into independent jobs for contract, static analysis, unit tests, CLI critical tests, workflow checks, coverage, Windows platform checks, and release-ready manifest.
3. Add a stable aggregate PR verification job that succeeds only when the route-required jobs pass and skipped jobs are intentional.
4. Add Bun artifact caching to Windows setup.
5. Verify workflow syntax/contract and local routing behavior without widening release scope.

## Verify Steps

- `bun run workflows:command-check` passes.
- `node .agentplane/policy/check-routing.mjs` passes.
- `AGENTPLANE_FAST_CHANGED_FILES=.github/workflows/ci.yml node scripts/checks/run-local-ci.mjs --mode smoke --explain` shows the workflow bucket is classified as `targeted (workflow)`.
- `git diff --check` passes.
- `bun run ci:local:fast -- --changed-files .github/workflows/ci.yml` passes.
- The GitHub workflow defines one stable aggregate PR gate and preserves release-ready behavior for core changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T18:33:52.281Z — VERIFY — ok

By: CODER

Note: Verified routed GitHub CI changes locally: workflows:command-check, policy routing, workflow bucket route explanation, git diff --check, full ci:local:fast for .github/workflows/ci.yml, and aggregate/release-ready workflow structure inspection all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:33:21.802Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-19T18:34:58.434Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR pass: approved CI-routing scope is satisfied by commit a67500fdb; Verify Steps are backed by local command evidence; residual deployment risk is limited to updating GitHub branch protection to require Core CI / PR verification after this workflow lands.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:33:52.313Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-19T19:09:55.357Z — VERIFY — ok

By: CODER

Note: Implemented split GitHub PR verification gates and confirmed hosted Core CI aggregate PR verification passes on head 92cdffa0984fe37610ee41caeef8d57d46951075.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:34:58.469Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-19T19:10:08.635Z — VERIFY — ok

By: EVALUATOR

Note: Hosted PR verification confirmed on GitHub for head 92cdffa0984fe37610ee41caeef8d57d46951075: split Core CI gates, test-windows, Release-ready manifest, and PR verification all succeeded.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T19:09:55.389Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-20T04:55:14.550Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for integration target 8e58c020032e43817562363a7ae53604e96c3871; hosted GitHub PR verification later confirmed on b5108eed4 with Core CI / PR verification success.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T19:10:08.665Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-20T05:08:45.986Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after preserving workflow_dispatch exact-sha recovery planning path; focused workflow checks and contract test passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T04:55:14.582Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

### 2026-05-20T05:15:29.305Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after formatting the recovery contract test; format:check, workflows:lint, and focused workflow contract test passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T05:08:46.017Z, excerpt_hash=sha256:e76c5b48218adbe9fa9f694c321fa1a2b011832a88841ff0740263c0ffa4668a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191825-3PV3QF-github-verification-gates/.agentplane/tasks/202605191825-3PV3QF/blueprint/resolved-snapshot.json
- old_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- current_digest: 4853d90da83b6531a4931e9984e3ebc33041e2f6211e41cf53ac685cb7eac73b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191825-3PV3QF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Core CI now has a plan job, routed non-full path, parallel full-fast verification jobs, Windows Bun cache, release-ready dependency preservation, and one PR verification aggregate job.
  Impact: PR verification should expose a single stable merge gate while running independent full checks in parallel and keeping targeted/doc routes shorter.
  Resolution: Branch protection must be updated to require Core CI / PR verification instead of the old Core CI / test and Core CI / test-windows checks after this workflow lands.

- Observation: Reviewed changed workflow/script surfaces and recorded command evidence from CODER verification.
  Impact: The implementation is ready for PR publication; hosted GitHub checks remain the external confirmation for the new aggregate gate.
  Resolution: Proceed to PR open/update and then adjust branch protection once the new check exists on GitHub.
