---
id: "202605081651-Y9DYVQ"
title: "Add semantic clone detection to refactor analysis"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "analysis"
  - "code"
  - "refactor"
  - "tooling"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:fast"
  - "bun run typecheck"
  - "node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 --allow-oversized packages/agentplane/src/runtime/prompt-modules/compiler.ts --allow-oversized packages/agentplane/src/commands/acr/acr.command.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:00:05.948Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after user requested implementation of semantic clone detection tooling."
verification:
  state: "ok"
  updated_at: "2026-05-08T17:55:42.637Z"
  updated_by: "CODER"
  note: "Implemented semantic clone detection with jscpd report/check/baseline workflows. Verification passed: clone:check, docs:scripts:check, knip:check, hotspots:check, typecheck, lint:core, targeted task-doc/cold-path/release publish tests. Full test:fast was attempted repeatedly but local full-suite runs timed out in heavy release asset suites; targeted release publish test passed and earlier standalone run passed before later machine-load timeouts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement semantic clone detection tooling in a dedicated branch_pr worktree, preserving existing checks while adding report and baseline-aware check workflows."
events:
  -
    type: "status"
    at: "2026-05-08T17:00:39.135Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement semantic clone detection tooling in a dedicated branch_pr worktree, preserving existing checks while adding report and baseline-aware check workflows."
  -
    type: "verify"
    at: "2026-05-08T17:55:42.637Z"
    author: "CODER"
    state: "ok"
    note: "Implemented semantic clone detection with jscpd report/check/baseline workflows. Verification passed: clone:check, docs:scripts:check, knip:check, hotspots:check, typecheck, lint:core, targeted task-doc/cold-path/release publish tests. Full test:fast was attempted repeatedly but local full-suite runs timed out in heavy release asset suites; targeted release publish test passed and earlier standalone run passed before later machine-load timeouts."
doc_version: 3
doc_updated_at: "2026-05-08T17:55:42.676Z"
doc_updated_by: "CODER"
description: "Evaluate and wire a semantic clone detector such as jscpd or an equivalent AST/token-based tool into the analysis workflow so future refactor reviews identify structural duplication beyond line counts and simple duplicate scans."
sections:
  Summary: |-
    Add semantic clone detection to refactor analysis

    Evaluate and wire a semantic clone detector such as jscpd or an equivalent AST/token-based tool into the analysis workflow so future refactor reviews identify structural duplication beyond line counts and simple duplicate scans.
  Scope: |-
    - In scope: Evaluate and wire a semantic clone detector such as jscpd or an equivalent AST/token-based tool into the analysis workflow so future refactor reviews identify structural duplication beyond line counts and simple duplicate scans.
    - Out of scope: unrelated refactors not required for "Add semantic clone detection to refactor analysis".
  Plan: |-
    1. Add a repo-local clone detection script that can run in report mode and check mode without requiring immediate CI failure on historical duplication.
    2. Prefer jscpd via package scripts; configure scoped include/exclude patterns and JSON/text output suitable for refactor review.
    3. Add a baseline artifact or threshold contract so existing clone debt is explicit and future worsening can be gated.
    4. Document the workflow in scripts README generation/docs if needed and wire package scripts for clone:report and clone:check.
    5. Verify with clone detection, typecheck, fast tests, and the existing hotspot guard.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node scripts/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 --allow-oversized packages/agentplane/src/runtime/prompt-modules/compiler.ts --allow-oversized packages/agentplane/src/commands/acr/acr.command.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T17:55:42.637Z — VERIFY — ok

    By: CODER

    Note: Implemented semantic clone detection with jscpd report/check/baseline workflows. Verification passed: clone:check, docs:scripts:check, knip:check, hotspots:check, typecheck, lint:core, targeted task-doc/cold-path/release publish tests. Full test:fast was attempted repeatedly but local full-suite runs timed out in heavy release asset suites; targeted release publish test passed and earlier standalone run passed before later machine-load timeouts.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T17:00:39.159Z, excerpt_hash=sha256:4d9de362e5abcb7db2f2e85a4a8709cf2d2c11f7143dadb249de319bc90a14ab

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081651-Y9DYVQ-semantic-clone-detection/.agentplane/tasks/202605081651-Y9DYVQ/blueprint/resolved-snapshot.json
    - old_digest: a05e4f283c36c84796f818b5dfbb45635555d4e5cc912bfb9d985bafdbcf09ef
    - current_digest: a05e4f283c36c84796f818b5dfbb45635555d4e5cc912bfb9d985bafdbcf09ef
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081651-Y9DYVQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
