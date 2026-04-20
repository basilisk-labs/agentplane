---
id: "202604200949-N5N1V4"
title: "Migrate release utility scripts to script-runtime DSL"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:49:10.083Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate the next small release utilities to script-runtime without changing networked behavior."
events:
  -
    type: "status"
    at: "2026-04-20T09:49:10.380Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the next small release utilities to script-runtime without changing networked behavior."
doc_version: 3
doc_updated_at: "2026-04-20T09:49:10.389Z"
doc_updated_by: "CODER"
description: "Apply defineScript/defineCheck and parseScriptArgs to small release utility scripts so the F′ script runtime is exercised beyond docs freshness checks."
sections:
  Summary: |-
    Migrate release utility scripts to script-runtime DSL
    
    Apply defineScript/defineCheck and parseScriptArgs to small release utility scripts so the F′ script runtime is exercised beyond docs freshness checks.
  Scope: |-
    - In scope: Apply defineScript/defineCheck and parseScriptArgs to small release utility scripts so the F′ script runtime is exercised beyond docs freshness checks.
    - Out of scope: unrelated refactors not required for "Migrate release utility scripts to script-runtime DSL".
  Plan: |-
    1. Migrate check-release-parity.mjs to defineCheck + parseScriptArgs.
    2. Migrate check-npm-version-availability.mjs to defineCheck + parseScriptArgs while preserving npm availability behavior.
    3. Migrate resolve-release-ready-source.mjs to defineScript + parseScriptArgs for help/json/value flags.
    4. Run safe focused checks (release parity and help path), plus format/lint, then commit and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Migrate release utility scripts to script-runtime DSL". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate release utility scripts to script-runtime DSL

Apply defineScript/defineCheck and parseScriptArgs to small release utility scripts so the F′ script runtime is exercised beyond docs freshness checks.

## Scope

- In scope: Apply defineScript/defineCheck and parseScriptArgs to small release utility scripts so the F′ script runtime is exercised beyond docs freshness checks.
- Out of scope: unrelated refactors not required for "Migrate release utility scripts to script-runtime DSL".

## Plan

1. Migrate check-release-parity.mjs to defineCheck + parseScriptArgs.
2. Migrate check-npm-version-availability.mjs to defineCheck + parseScriptArgs while preserving npm availability behavior.
3. Migrate resolve-release-ready-source.mjs to defineScript + parseScriptArgs for help/json/value flags.
4. Run safe focused checks (release parity and help path), plus format/lint, then commit and finish.

## Verify Steps

1. Review the requested outcome for "Migrate release utility scripts to script-runtime DSL". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
