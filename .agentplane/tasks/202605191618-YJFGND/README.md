---
id: "202605191618-YJFGND"
title: "Refresh evidence bundle during hosted close"
result_summary: "Merged via PR #3944."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "trust"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T16:18:56.501Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T16:57:46.329Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test, test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests, agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before integration."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T16:57:46.329Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test, test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests, agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before integration."
  evaluated_sha: "f0db737713b9f0c61778db660eb571b958e6273a"
  blueprint_digest: "2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9"
  evidence_refs:
    - ".agentplane/tasks/202605191618-YJFGND/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "b7fcd7b32d0c7419f8d8a68097ba797e03719676"
  message: "Merge pull request #3944 from basilisk-labs/task/202605191618-YJFGND/hosted-close-evidence"
comments:
  -
    author: "CODER"
    body: "Start: Make hosted close regenerate task evidence manifests after final README/meta mutations."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3944 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-19T16:19:53.213Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Make hosted close regenerate task evidence manifests after final README/meta mutations."
  -
    type: "verify"
    at: "2026-05-19T16:22:29.737Z"
    author: "CODER"
    state: "ok"
    note: "Implemented hosted close evidence refresh and repaired stale evidence manifest for 202605191421-D566XJ on main. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap, evidence verify --strict for both tasks."
  -
    type: "verify"
    at: "2026-05-19T16:48:54.418Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review thread by preserving hosted-close --quiet semantics during internal evidence refresh. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap."
  -
    type: "verify"
    at: "2026-05-19T16:57:46.329Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test, test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests, agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before integration."
  -
    type: "status"
    at: "2026-05-19T17:14:44.902Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3944 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-19T17:14:44.909Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close."
sections:
  Summary: |-
    Refresh evidence bundle during hosted close

    Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.
  Scope: |-
    - In scope: Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.
    - Out of scope: unrelated refactors not required for "Refresh evidence bundle during hosted close".
  Plan: "Fix close-tail evidence freshness. In scope: update hosted close flow so, after it records final DONE README and PR metadata, it regenerates the task evidence manifest when one exists or evidence bundling is available; add focused regression coverage proving post-close README/meta changes do not leave strict evidence verification stale. Out of scope: changing ACR schema or preserving external signing/storage integrations."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T16:22:29.737Z — VERIFY — ok

    By: CODER

    Note: Implemented hosted close evidence refresh and repaired stale evidence manifest for 202605191421-D566XJ on main. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap, evidence verify --strict for both tasks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:19:53.213Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
    - old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191618-YJFGND

    ### 2026-05-19T16:48:54.418Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review thread by preserving hosted-close --quiet semantics during internal evidence refresh. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:22:29.766Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
    - old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191618-YJFGND

    ### 2026-05-19T16:57:46.329Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test, test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests, agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:48:54.478Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
    - old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191618-YJFGND

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh evidence bundle during hosted close

Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.

## Scope

- In scope: Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.
- Out of scope: unrelated refactors not required for "Refresh evidence bundle during hosted close".

## Plan

Fix close-tail evidence freshness. In scope: update hosted close flow so, after it records final DONE README and PR metadata, it regenerates the task evidence manifest when one exists or evidence bundling is available; add focused regression coverage proving post-close README/meta changes do not leave strict evidence verification stale. Out of scope: changing ACR schema or preserving external signing/storage integrations.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T16:22:29.737Z — VERIFY — ok

By: CODER

Note: Implemented hosted close evidence refresh and repaired stale evidence manifest for 202605191421-D566XJ on main. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap, evidence verify --strict for both tasks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:19:53.213Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
- old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191618-YJFGND

### 2026-05-19T16:48:54.418Z — VERIFY — ok

By: CODER

Note: Addressed PR review thread by preserving hosted-close --quiet semantics during internal evidence refresh. Checks passed: hosted-close/evidence focused tests, agentplane typecheck, framework:dev:bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:22:29.766Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
- old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191618-YJFGND

### 2026-05-19T16:57:46.329Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test, test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests, agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T16:48:54.478Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191618-YJFGND-hosted-close-evidence/.agentplane/tasks/202605191618-YJFGND/blueprint/resolved-snapshot.json
- old_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- current_digest: 2471ee601a1ca2d3c42bcbf815df6e9c18ff64c3419c6dabaf442bc8e10d1dd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191618-YJFGND

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
