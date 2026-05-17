---
id: "202605171725-AB0HM9"
title: "Document local Turborepo developer workflow"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:26:02.367Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:50:16.262Z"
  updated_by: "DOCS"
  note: "Local Turborepo developer workflow documentation verified: developer docs explain local-only scope, graph/cache/evidence use, semantic code-map boundary, docs lane, scripts README freshness, docs build, formatting, policy routing, and doctor pass."
  attempts: 0
commit:
  hash: "1ff8db627f0bf772acd587f276a2a1ef7aa908c5"
  message: "Merge pull request #3852 from basilisk-labs/task/202605171724-JW38N0/local-turbo-dev-overlay"
comments:
  -
    author: "DOCS"
    body: "Start: documenting the approved local Turborepo developer workflow for AgentPlane framework contributors without changing user-facing runtime contracts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3852 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:44:58.704Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: documenting the approved local Turborepo developer workflow for AgentPlane framework contributors without changing user-facing runtime contracts."
  -
    type: "verify"
    at: "2026-05-17T17:50:16.262Z"
    author: "DOCS"
    state: "ok"
    note: "Local Turborepo developer workflow documentation verified: developer docs explain local-only scope, graph/cache/evidence use, semantic code-map boundary, docs lane, scripts README freshness, docs build, formatting, policy routing, and doctor pass."
  -
    type: "status"
    at: "2026-05-17T18:50:26.673Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3852 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T18:50:26.685Z"
doc_updated_by: "INTEGRATOR"
description: "Document the local-only Turborepo developer workflow for AgentPlane maintainers and coding agents, including affected graph commands, evidence boundaries, and non-goals that keep Turborepo out of the public AgentPlane runtime contract."
sections:
  Summary: |-
    Document local Turborepo developer workflow

    Document the local-only Turborepo developer workflow for AgentPlane maintainers and coding agents, including affected graph commands, evidence boundaries, and non-goals that keep Turborepo out of the public AgentPlane runtime contract.
  Scope: |-
    - In scope: Document the local-only Turborepo developer workflow for AgentPlane maintainers and coding agents, including affected graph commands, evidence boundaries, and non-goals that keep Turborepo out of the public AgentPlane runtime contract.
    - Out of scope: unrelated refactors not required for "Document local Turborepo developer workflow".
  Plan: "Follow-up docs task. Scope: document the local-only Turborepo developer workflow for maintainers and coding agents after implementation exists: affected graph commands, evidence boundaries, cache caveats, and non-goals that keep Turborepo out of public runtime/user-project contracts. Depends conceptually on 202605171724-JW38N0 and optionally 202605171725-AEFDJR."
  Verify Steps: |-
    PLANNER fallback scaffold for "Document local Turborepo developer workflow". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Document local Turborepo developer workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    - Command: bun run dev:turbo:docs
      Result: pass
      Evidence: website typecheck/build passed; generated docs social images were cleaned from untracked output after verification; summary .turbo/runs/3DrVJ7rk1suViep1BTggSrAhXnw.json.
      Scope: docs-site build/typecheck after developer docs update.
    - Command: bun run docs:scripts:check
      Result: pass after regenerating scripts/README.md with bun run docs:scripts:generate.
      Scope: scripts README freshness after adding run-turbo-local-ci.mjs.
    - Command: bunx prettier --check package.json scripts/checks/run-turbo-local-ci.mjs docs/developer/testing-and-quality.mdx scripts/README.md
      Result: pass
      Scope: changed docs/script formatting.
    - Command: git diff --check
      Result: pass
      Scope: whitespace safety.
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; repo-local handoff info only.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:50:16.262Z — VERIFY — ok

    By: DOCS

    Note: Local Turborepo developer workflow documentation verified: developer docs explain local-only scope, graph/cache/evidence use, semantic code-map boundary, docs lane, scripts README freshness, docs build, formatting, policy routing, and doctor pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:49:57.474Z, excerpt_hash=sha256:ad67e92b4277162f659bdf2ad0ed819d95bd80d0ba6d5048fb6f84995a7dd845

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171724-JW38N0-local-turbo-dev-overlay/.agentplane/tasks/202605171725-AB0HM9/blueprint/resolved-snapshot.json
    - old_digest: f4d4acfeba8bfd373ee98e9cebd18633c0cd003d19f36ca26af98741112ddab8
    - current_digest: f4d4acfeba8bfd373ee98e9cebd18633c0cd003d19f36ca26af98741112ddab8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171725-AB0HM9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document local Turborepo developer workflow

Document the local-only Turborepo developer workflow for AgentPlane maintainers and coding agents, including affected graph commands, evidence boundaries, and non-goals that keep Turborepo out of the public AgentPlane runtime contract.

## Scope

- In scope: Document the local-only Turborepo developer workflow for AgentPlane maintainers and coding agents, including affected graph commands, evidence boundaries, and non-goals that keep Turborepo out of the public AgentPlane runtime contract.
- Out of scope: unrelated refactors not required for "Document local Turborepo developer workflow".

## Plan

Follow-up docs task. Scope: document the local-only Turborepo developer workflow for maintainers and coding agents after implementation exists: affected graph commands, evidence boundaries, cache caveats, and non-goals that keep Turborepo out of public runtime/user-project contracts. Depends conceptually on 202605171724-JW38N0 and optionally 202605171725-AEFDJR.

## Verify Steps

PLANNER fallback scaffold for "Document local Turborepo developer workflow". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Document local Turborepo developer workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

- Command: bun run dev:turbo:docs
  Result: pass
  Evidence: website typecheck/build passed; generated docs social images were cleaned from untracked output after verification; summary .turbo/runs/3DrVJ7rk1suViep1BTggSrAhXnw.json.
  Scope: docs-site build/typecheck after developer docs update.
- Command: bun run docs:scripts:check
  Result: pass after regenerating scripts/README.md with bun run docs:scripts:generate.
  Scope: scripts README freshness after adding run-turbo-local-ci.mjs.
- Command: bunx prettier --check package.json scripts/checks/run-turbo-local-ci.mjs docs/developer/testing-and-quality.mdx scripts/README.md
  Result: pass
  Scope: changed docs/script formatting.
- Command: git diff --check
  Result: pass
  Scope: whitespace safety.
- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK; repo-local handoff info only.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:50:16.262Z — VERIFY — ok

By: DOCS

Note: Local Turborepo developer workflow documentation verified: developer docs explain local-only scope, graph/cache/evidence use, semantic code-map boundary, docs lane, scripts README freshness, docs build, formatting, policy routing, and doctor pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:49:57.474Z, excerpt_hash=sha256:ad67e92b4277162f659bdf2ad0ed819d95bd80d0ba6d5048fb6f84995a7dd845

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171724-JW38N0-local-turbo-dev-overlay/.agentplane/tasks/202605171725-AB0HM9/blueprint/resolved-snapshot.json
- old_digest: f4d4acfeba8bfd373ee98e9cebd18633c0cd003d19f36ca26af98741112ddab8
- current_digest: f4d4acfeba8bfd373ee98e9cebd18633c0cd003d19f36ca26af98741112ddab8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171725-AB0HM9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
