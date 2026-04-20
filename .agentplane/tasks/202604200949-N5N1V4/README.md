---
id: "202604200949-N5N1V4"
title: "Migrate release utility scripts to script-runtime DSL"
result_summary: "Migrated release parity, npm version availability, and release-ready source scripts to script-runtime helpers."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-20T09:51:10.441Z"
  updated_by: "CODER"
  note: "Command: node scripts/check-release-parity.mjs --version=0.3.15 -> pass. Command: node scripts/resolve-release-ready-source.mjs --help -> pass. Command: AGENTPLANE_NPM_VIEW_TIMEOUT_MS=1 node scripts/check-npm-version-availability.mjs --version=0.0.0-never-published-test -> expected timeout error path. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit:
  hash: "391165663663c54bb5258ddde4396c2a40ef1dc7"
  message: "♻️ N5N1V4 scripts: migrate release utilities"
comments:
  -
    author: "CODER"
    body: "Start: migrate the next small release utilities to script-runtime without changing networked behavior."
  -
    author: "CODER"
    body: "Verified: release parity, resolver help, npm timeout error path, format, and lint pass after DSL migration."
events:
  -
    type: "status"
    at: "2026-04-20T09:49:10.380Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the next small release utilities to script-runtime without changing networked behavior."
  -
    type: "verify"
    at: "2026-04-20T09:51:10.441Z"
    author: "CODER"
    state: "ok"
    note: "Command: node scripts/check-release-parity.mjs --version=0.3.15 -> pass. Command: node scripts/resolve-release-ready-source.mjs --help -> pass. Command: AGENTPLANE_NPM_VIEW_TIMEOUT_MS=1 node scripts/check-npm-version-availability.mjs --version=0.0.0-never-published-test -> expected timeout error path. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
  -
    type: "status"
    at: "2026-04-20T09:51:20.921Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release parity, resolver help, npm timeout error path, format, and lint pass after DSL migration."
doc_version: 3
doc_updated_at: "2026-04-20T09:51:20.922Z"
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
    ### 2026-04-20T09:51:10.441Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/check-release-parity.mjs --version=0.3.15 -> pass. Command: node scripts/resolve-release-ready-source.mjs --help -> pass. Command: AGENTPLANE_NPM_VIEW_TIMEOUT_MS=1 node scripts/check-npm-version-availability.mjs --version=0.0.0-never-published-test -> expected timeout error path. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:49:10.389Z, excerpt_hash=sha256:6a711a2e45b06db9e1e6b91a5adf87c7c9b57211e94f2c66e8eb2bbaa012ae54
    
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
### 2026-04-20T09:51:10.441Z — VERIFY — ok

By: CODER

Note: Command: node scripts/check-release-parity.mjs --version=0.3.15 -> pass. Command: node scripts/resolve-release-ready-source.mjs --help -> pass. Command: AGENTPLANE_NPM_VIEW_TIMEOUT_MS=1 node scripts/check-npm-version-availability.mjs --version=0.0.0-never-published-test -> expected timeout error path. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:49:10.389Z, excerpt_hash=sha256:6a711a2e45b06db9e1e6b91a5adf87c7c9b57211e94f2c66e8eb2bbaa012ae54

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
