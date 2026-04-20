---
id: "202604191639-A3TECT"
title: "Modularize init command pipeline and parsers"
result_summary: "The init command hotspot is decomposed into dedicated spec, parser, preset, and orchestration modules."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T18:59:52.429Z"
  updated_by: "CODER"
  note: "Verified: init.ts is now a thin shell over init/spec.ts plus dedicated presets/parsers/orchestrate modules, agentplane typecheck passed, framework:dev:bootstrap rebuilt the repo-local runtime, and the baseline init --yes integration test stayed green."
commit:
  hash: "755be1c82edc5b736e3515834650c1e983987c09"
  message: "♻️ A3TECT cli: split init command into spec and orchestration modules"
comments:
  -
    author: "CODER"
    body: "Start: mapping the remaining parser, preset, and orchestration logic in init.ts so it can collapse into a thin command shell over dedicated init modules."
  -
    author: "CODER"
    body: "Verified: init command parsing, preset selection, and orchestration now live in dedicated modules, the root init.ts shell is thin, and the focused init/typecheck/bootstrap checks passed."
events:
  -
    type: "status"
    at: "2026-04-19T18:52:06.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: mapping the remaining parser, preset, and orchestration logic in init.ts so it can collapse into a thin command shell over dedicated init modules."
  -
    type: "verify"
    at: "2026-04-19T18:59:52.429Z"
    author: "CODER"
    state: "ok"
    note: "Verified: init.ts is now a thin shell over init/spec.ts plus dedicated presets/parsers/orchestrate modules, agentplane typecheck passed, framework:dev:bootstrap rebuilt the repo-local runtime, and the baseline init --yes integration test stayed green."
  -
    type: "status"
    at: "2026-04-19T18:59:52.468Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init command parsing, preset selection, and orchestration now live in dedicated modules, the root init.ts shell is thin, and the focused init/typecheck/bootstrap checks passed."
doc_version: 3
doc_updated_at: "2026-04-19T18:59:52.472Z"
doc_updated_by: "CODER"
description: "Epic C′. Decompose the run-cli init command into parser, preset, and orchestration modules and shrink the entry file."
sections:
  Summary: |-
    Modularize init command pipeline and parsers
    
    Epic C′. Decompose the run-cli init command into parser, preset, and orchestration modules and shrink the entry file.
  Scope: |-
    - In scope: Epic C′. Decompose the run-cli init command into parser, preset, and orchestration modules and shrink the entry file.
    - Out of scope: unrelated refactors not required for "Modularize init command pipeline and parsers".
  Plan: "1. Audit packages/agentplane/src/cli/run-cli/commands/init.ts and its existing init/ submodules to identify which parser, preset, and orchestration logic still lives in the root command file. 2. Move parser/preset/orchestration code into dedicated init/ modules so init.ts collapses to spec wiring plus a thin handler, without preserving legacy indirection that no longer helps. 3. Run the relevant init command tests and repo-local bootstrap checks, then close the task with the resulting refactor commit."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T18:59:52.429Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: init.ts is now a thin shell over init/spec.ts plus dedicated presets/parsers/orchestrate modules, agentplane typecheck passed, framework:dev:bootstrap rebuilt the repo-local runtime, and the baseline init --yes integration test stayed green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:52:06.919Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Modularize init command pipeline and parsers

Epic C′. Decompose the run-cli init command into parser, preset, and orchestration modules and shrink the entry file.

## Scope

- In scope: Epic C′. Decompose the run-cli init command into parser, preset, and orchestration modules and shrink the entry file.
- Out of scope: unrelated refactors not required for "Modularize init command pipeline and parsers".

## Plan

1. Audit packages/agentplane/src/cli/run-cli/commands/init.ts and its existing init/ submodules to identify which parser, preset, and orchestration logic still lives in the root command file. 2. Move parser/preset/orchestration code into dedicated init/ modules so init.ts collapses to spec wiring plus a thin handler, without preserving legacy indirection that no longer helps. 3. Run the relevant init command tests and repo-local bootstrap checks, then close the task with the resulting refactor commit.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T18:59:52.429Z — VERIFY — ok

By: CODER

Note: Verified: init.ts is now a thin shell over init/spec.ts plus dedicated presets/parsers/orchestrate modules, agentplane typecheck passed, framework:dev:bootstrap rebuilt the repo-local runtime, and the baseline init --yes integration test stayed green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:52:06.919Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
