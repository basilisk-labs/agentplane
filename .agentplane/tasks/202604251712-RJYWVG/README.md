---
id: "202604251712-RJYWVG"
title: "Refactor finish command spec validation"
result_summary: "split finish spec helpers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T17:12:32.425Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T17:28:32.721Z"
  updated_by: "CODER"
  note: "Focused finish validation and help tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, targeted Prettier, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md."
commit:
  hash: "7437f2af9b73ef81cf22b360aea5bc15db17df7e"
  message: "♻️ RJYWVG task: split finish spec helpers"
comments:
  -
    author: "CODER"
    body: "Start: Split finish.spec.ts validation and parse helpers into focused sibling modules while preserving the public finishSpec export, generated help, and finish CLI behavior."
  -
    author: "CODER"
    body: "Verified: finishSpec now delegates validation and parse helpers to a shared module, focused tests and quality gates passed, and the public finish CLI surface stayed stable."
events:
  -
    type: "status"
    at: "2026-04-25T17:12:50.057Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split finish.spec.ts validation and parse helpers into focused sibling modules while preserving the public finishSpec export, generated help, and finish CLI behavior."
  -
    type: "verify"
    at: "2026-04-25T17:28:32.721Z"
    author: "CODER"
    state: "ok"
    note: "Focused finish validation and help tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, targeted Prettier, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md."
  -
    type: "status"
    at: "2026-04-25T17:28:44.410Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: finishSpec now delegates validation and parse helpers to a shared module, focused tests and quality gates passed, and the public finish CLI surface stayed stable."
doc_version: 3
doc_updated_at: "2026-04-25T17:28:44.411Z"
doc_updated_by: "CODER"
description: "Split finish.spec.ts option groups and raw validation helpers into focused modules while preserving finish flags, generated help, and parse output."
sections:
  Summary: |-
    Refactor finish command spec validation
    
    Split finish.spec.ts option groups and raw validation helpers into focused modules while preserving finish flags, generated help, and parse output.
  Scope: |-
    - In scope: Split finish.spec.ts option groups and raw validation helpers into focused modules while preserving finish flags, generated help, and parse output.
    - Out of scope: unrelated refactors not required for "Refactor finish command spec validation".
  Plan: |-
    1. Inspect finish.spec.ts and identify the smallest extraction boundary that keeps finishSpec and FinishParsed stable.
    2. Move raw validation predicates/error emission and/or option group constants into focused sibling modules.
    3. Preserve all finish flags, examples, parse output, generated help, and usage errors.
    4. Run focused finish validation/help tests plus docs:cli:check, typecheck, lint, arch, hotspot, task-state, artifact, targeted Prettier, bootstrap, doctor, and routing checks.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T17:28:32.721Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused finish validation and help tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, targeted Prettier, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:28:05.198Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: finish.spec.ts now contains only the finish command declaration surface; raw validation and parse logic moved into finish.spec.shared.ts.
      Impact: The finish spec hotspot dropped below the runtime warning threshold without changing flags, examples, help text, or parsed command shape.
      Resolution: Kept finishSpec as the single exported command declaration and re-exported FinishParsed compatibility from finish.spec.ts while finish.run.ts imports the shared type directly for lint safety.
    
    - Observation: Whole-repo format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
      Impact: This atom verified touched files with targeted Prettier but cannot honestly claim the full repo format gate in the current dirty checkout.
      Resolution: Left the untracked markdown file untouched and kept the verification evidence explicit in the task record.
id_source: "generated"
---
## Summary

Refactor finish command spec validation

Split finish.spec.ts option groups and raw validation helpers into focused modules while preserving finish flags, generated help, and parse output.

## Scope

- In scope: Split finish.spec.ts option groups and raw validation helpers into focused modules while preserving finish flags, generated help, and parse output.
- Out of scope: unrelated refactors not required for "Refactor finish command spec validation".

## Plan

1. Inspect finish.spec.ts and identify the smallest extraction boundary that keeps finishSpec and FinishParsed stable.
2. Move raw validation predicates/error emission and/or option group constants into focused sibling modules.
3. Preserve all finish flags, examples, parse output, generated help, and usage errors.
4. Run focused finish validation/help tests plus docs:cli:check, typecheck, lint, arch, hotspot, task-state, artifact, targeted Prettier, bootstrap, doctor, and routing checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T17:28:32.721Z — VERIFY — ok

By: CODER

Note: Focused finish validation and help tests passed; docs:cli:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, targeted Prettier, framework bootstrap, doctor, and routing checks passed. Full format:check remains blocked only by unrelated untracked REFACTORING_PLAN_v3.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:28:05.198Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: finish.spec.ts now contains only the finish command declaration surface; raw validation and parse logic moved into finish.spec.shared.ts.
  Impact: The finish spec hotspot dropped below the runtime warning threshold without changing flags, examples, help text, or parsed command shape.
  Resolution: Kept finishSpec as the single exported command declaration and re-exported FinishParsed compatibility from finish.spec.ts while finish.run.ts imports the shared type directly for lint safety.

- Observation: Whole-repo format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
  Impact: This atom verified touched files with targeted Prettier but cannot honestly claim the full repo format gate in the current dirty checkout.
  Resolution: Left the untracked markdown file untouched and kept the verification evidence explicit in the task record.
