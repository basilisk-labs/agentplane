---
id: "202604200937-SW77BH"
title: "Introduce shared script entrypoint runner"
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
  updated_at: "2026-04-20T09:37:38.343Z"
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
    body: "Start: introduce a shared script entrypoint runner and migrate the scripts already touched by F′ to it first."
events:
  -
    type: "status"
    at: "2026-04-20T09:37:38.682Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce a shared script entrypoint runner and migrate the scripts already touched by F′ to it first."
doc_version: 3
doc_updated_at: "2026-04-20T09:37:38.692Z"
doc_updated_by: "CODER"
description: "Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it."
sections:
  Summary: |-
    Introduce shared script entrypoint runner
    
    Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
  Scope: |-
    - In scope: Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
    - Out of scope: unrelated refactors not required for "Introduce shared script entrypoint runner".
  Plan: |-
    1. Add defineScript({ name, run }) and runScriptMain to scripts/lib/script-runtime.mjs with a single error-reporting path.
    2. Replace generated-artifacts local runner export with the shared script-runtime runner.
    3. Migrate generated-artifact check scripts and generate-agent-bootstrap-doc.mjs to defineScript without changing output or validation semantics.
    4. Run the affected docs checks/generator dry path plus format/lint, then commit and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Introduce shared script entrypoint runner". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Introduce shared script entrypoint runner

Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.

## Scope

- In scope: Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
- Out of scope: unrelated refactors not required for "Introduce shared script entrypoint runner".

## Plan

1. Add defineScript({ name, run }) and runScriptMain to scripts/lib/script-runtime.mjs with a single error-reporting path.
2. Replace generated-artifacts local runner export with the shared script-runtime runner.
3. Migrate generated-artifact check scripts and generate-agent-bootstrap-doc.mjs to defineScript without changing output or validation semantics.
4. Run the affected docs checks/generator dry path plus format/lint, then commit and finish.

## Verify Steps

1. Review the requested outcome for "Introduce shared script entrypoint runner". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
